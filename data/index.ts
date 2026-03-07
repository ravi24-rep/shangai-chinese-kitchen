/**
 * DATA LAYER — Supabase Database Integration
 *
 * Fetches data from the live database.
 * Falls back to static data if the database is unreachable or empty.
 */

import { RESTAURANT_DATA, MENU_ITEMS, REVIEWS, CATEGORIES } from "./restaurant";
import type { MenuItem, Review, RestaurantData } from "@/types";
import { supabase } from "@/lib/supabase";

/** Get all restaurant metadata (Still static for now, can move to DB later) */
export async function getRestaurantData(): Promise<RestaurantData> {
  return RESTAURANT_DATA;
}

/** Get full menu from Supabase */
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category");

    if (error) throw error;
    if (data && data.length > 0) return data as MenuItem[];
    
    return MENU_ITEMS; // Fallback
  } catch (error) {
    console.warn("Failed to fetch menu from Supabase. Using local static data.");
    return MENU_ITEMS;
  }
}

/** Get menu items filtered by category */
export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  const items = await getMenuItems();
  if (category === "All") return items;
  return items.filter((item) => item.category === category);
}

/** Get popular dishes only */
export async function getPopularItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.popular);
}

/** Get a single item by ID */
export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  const items = await getMenuItems();
  return items.find((item) => item.id === id);
}

/** Get all reviews */
export async function getReviews(): Promise<Review[]> {
  return REVIEWS; // Keeping reviews static for now
}

/** Get available menu categories */
export async function getCategories(): Promise<string[]> {
  // We can dynamically extract categories from the database items
  const items = await getMenuItems();
  const categorySet = new Set(items.map((item) => item.category));
  return ["All", ...Array.from(categorySet)];
}
