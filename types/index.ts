/* ═══════════════════════════════════════════════════════════════════
   CENTRALIZED TYPE DEFINITIONS
   All TypeScript interfaces for the project in one place.
   ═══════════════════════════════════════════════════════════════════ */

/** Menu item categories */
export type MenuCategory = "Starters" | "Main Course" | "Seafood" | "Rice & Noodles" | "Snacks";

/** A single dish in the menu */
export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
}

/** A cart item extends MenuItem with a quantity */
export interface CartItem extends MenuItem {
  quantity: number;
}

/** Customer review */
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

/** Restaurant metadata */
export interface RestaurantData {
  name: string;
  tamilName: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  address: string;
  phone: string;
  phoneClean: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  services: string[];
  mapEmbedUrl: string;
  mapsUrl: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/** Cart context shape */
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

/** Order (for admin/API) */
export interface Order {
  id: string;
  customer: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  time: string;
  address?: string;
}
