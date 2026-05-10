-- Update ad_placements with pixel dimensions for frontend rendering
UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"1000 x 312 px"')
WHERE id IN ('home_main_slider', 'home_mid_banner_1');

UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"400 x 300 px"')
WHERE id = 'home_popular_brands';

UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"400 x 500 px"')
WHERE id = 'home_mid_banner_2';

UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"1280 x 720 px"')
WHERE id = 'search_result_banner';

UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"1600 x 300 px"')
WHERE id = 'search_result_top_slider';

UPDATE public.ad_placements
SET config = jsonb_set(config, '{pixel_dimensions}', '"300 x 400 px"')
WHERE id = 'details_sidebar_banner';
