-- Enable extensions for fuzzy and unaccented search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Add search_vector column to business_profiles
ALTER TABLE business_profiles 
ADD COLUMN search_vector tsvector;

-- Index for full-text search
CREATE INDEX business_search_idx ON business_profiles USING GIN (search_vector);

-- Index for fuzzy title matching (Trigram)
CREATE INDEX business_title_trgm_idx ON business_profiles USING GIN (title gin_trgm_ops);

-- Function to update search vector with Construction-specific fields
CREATE OR REPLACE FUNCTION update_business_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.cida_grading, '')), 'A') || -- Priority for CIDA grading
    setweight(to_tsvector('english', coalesce(NEW.district, '')), 'A') || -- Priority for Location
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.category_info->>'primary', '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.category_info->>'subcategories', '')), 'B') ||
    setweight(to_tsvector('english', array_to_string(NEW.cida_specialties, ' ')), 'B') || -- Searchable specialties
    setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector
CREATE TRIGGER update_business_search_vector_trigger
  BEFORE INSERT OR UPDATE ON business_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_business_search_vector();

-- Populate search_vector for existing rows
UPDATE business_profiles
SET search_vector = 
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(cida_grading, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(district, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(city, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(category_info->>'primary', '')), 'A') ||
  setweight(to_tsvector('english', coalesce(category_info->>'subcategories', '')), 'B') ||
  setweight(to_tsvector('english', array_to_string(cida_specialties, ' ')), 'B') ||
  setweight(to_tsvector('english', array_to_string(tags, ' ')), 'B') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'C')
WHERE search_vector IS NULL;

-- Construction Search RPC: Combines keywords + CIDA grading + location
CREATE OR REPLACE FUNCTION search_construction_businesses(
  search_query text,
  limit_count int DEFAULT 20,
  filter_category text DEFAULT NULL,
  filter_district text DEFAULT NULL,
  filter_city text DEFAULT NULL,
  filter_cida_grade text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  description text,
  category_primary text,
  cida_grading text,
  district text,
  city text,
  rating numeric,
  review_count integer,
  verified boolean,
  similarity_score real
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    bp.id,
    bp.title,
    bp.description,
    (bp.category_info->>'primary')::text as category_primary,
    bp.cida_grading,
    bp.district,
    bp.city,
    bp.rating,
    bp.review_count,
    bp.verified,
    (
      ts_rank(search_vector, websearch_to_tsquery('english', search_query)) +
      (similarity(bp.title, search_query) * 0.5)
    )::real as similarity_score
  FROM
    business_profiles bp
  WHERE
    bp.published = true
    AND bp.status = 'active'
    AND (filter_category IS NULL OR (bp.category_info->>'primary')::text = filter_category)
    AND (filter_district IS NULL OR bp.district = filter_district) -- District filtering (Primary Location)
    AND (filter_city IS NULL OR bp.city = filter_city) -- City filtering
    AND (filter_cida_grade IS NULL OR bp.cida_grading = filter_cida_grade)
    AND (
      (search_vector @@ websearch_to_tsquery('english', search_query)) OR
      (similarity(bp.title, search_query) > 0.1)
    )
  ORDER BY
    similarity_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
