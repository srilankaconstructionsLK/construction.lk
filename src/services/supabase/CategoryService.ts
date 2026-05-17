import { cache } from "react";
import { supabase as typedSupabase } from "@/lib/supabase/client";
import { createStaticClient } from "@/lib/supabase/static";
import { storage as firebaseStorage } from "@/lib/firebase/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const supabase = typedSupabase as any;

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  status: 'active' | 'draft' | 'archived';
  icon_url: string | null;
  sub_categories?: Category[];
};

export class CategoryService {
  /**
   * Fetches the entire category hierarchy.
   * ✅ Wrapped in React cache() with zero arguments for a 100% stable cache key.
   * ✅ Instantiates createStaticClient() internally to ensure clean server-side queries.
   */
  static getCategoriesHierarchy = cache(async (): Promise<Category[]> => {
    const supabase = createStaticClient() as any;
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("[CategoryService] Error fetching categories:", error);
      throw error;
    }

    const categories = data as Category[];
    return CategoryService.buildHierarchy(categories);
  });

  /**
   * Helper to transform flat array into a tree structure.
   */
  private static buildHierarchy(items: Category[]): Category[] {
    const rootItems: Category[] = [];
    const lookup: Record<string, Category> = {};

    for (const item of items) {
      lookup[item.id] = { ...item, sub_categories: [] };
    }

    for (const item of items) {
      const parentId = item.parent_id;
      if (parentId && lookup[parentId]) {
        lookup[parentId].sub_categories!.push(lookup[item.id]);
      } else {
        rootItems.push(lookup[item.id]);
      }
    }

    return rootItems;
  }

  /**
   * Uploads an icon to Firebase Storage.
   * Runs on the client during category creation.
   */
  static async uploadIcon(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(firebaseStorage, `categories/${path}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("[CategoryService] Error uploading icon to Firebase:", error);
      throw error;
    }
  }

  /**
   * Creates or updates a category.
   * Runs on the client using the browser client.
   */
  static async upsertCategory(category: { 
    id?: string;
    name: string; 
    slug?: string; 
    parent_id?: string | null;
    icon_url?: string | null;
    status?: 'active' | 'draft' | 'archived';
  }) {
    const slug = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
    
    const { data, error } = await supabase
      .from("categories")
      .upsert({
        ...category,
        slug,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Helper to delete an icon from Firebase Storage using its URL.
   * ✅ Stays fallback regex-based for backwards compatibility since the DB schema lacks 'icon_storage_path'.
   */
  private static async deleteIconByUrl(url: string | null) {
    if (!url) return;
    try {
      const decodedUrl = decodeURIComponent(url);
      const pathMatch = decodedUrl.match(/\/o\/(categories\/.*?)\?/);
      
      if (pathMatch && pathMatch[1]) {
        const fullPath = pathMatch[1];
        const fileRef = ref(firebaseStorage, fullPath);
        await deleteObject(fileRef);
      }
    } catch (error) {
      console.warn("[CategoryService] Could not delete icon from storage:", error);
    }
  }

  /**
   * Deletes a category, its subcategories, and all associated icons.
   * Runs on the client using the browser client.
   */
  static async deleteCategory(id: string) {
    const { data, error: fetchError } = await supabase
      .from("categories")
      .select("id, parent_id, icon_url");

    if (fetchError) throw fetchError;
    const allCategories = (data || []) as Category[];

    const findDescendants = (parentId: string): string[] => {
      const children = allCategories.filter(c => c.parent_id === parentId);
      return [parentId, ...children.flatMap(c => findDescendants(c.id))];
    };

    const targetIds = findDescendants(id);
    const targetCategories = allCategories.filter(c => targetIds.includes(c.id));

    await Promise.all(targetCategories.map(c => this.deleteIconByUrl(c.icon_url)));

    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);
    
    if (deleteError) throw deleteError;
  }
}

