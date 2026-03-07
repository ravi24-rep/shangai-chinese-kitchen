/**
 * DATA LAYER — Abstract data access for future database migration.
 *
 * Currently reads from static TypeScript files.
 * When migrating to Supabase/Prisma, replace these function bodies
 * without changing any component imports.
 */

import { RESTAURANT_DATA, MENU_ITEMS, REVIEWS, CATEGORIES } from "./restaurant";
import type { MenuItem, Review, RestaurantData, MenuCategory } from "@/types";

/** Get all restaurant metadata */
export function getRestaurantData(): RestaurantData {
  return RESTAURANT_DATA;
}

/** Get full menu */
export function getMenuItems(): MenuItem[] {
  return MENU_ITEMS;
}

/** Get menu items filtered by category */
export function getMenuByCategory(category: string): MenuItem[] {
  if (category === "All") return MENU_ITEMS;
  return MENU_ITEMS.filter((item) => item.category === category);
}

/** Get popular dishes only */
export function getPopularItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.popular);
}

/** Get a single item by ID */
export function getMenuItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}

/** Get all reviews */
export function getReviews(): Review[] {
  return REVIEWS;
}

/** Get available menu categories */
export function getCategories(): readonly string[] {
  return CATEGORIES;
}
