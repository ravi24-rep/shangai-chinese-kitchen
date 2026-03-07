export const RESTAURANT_DATA = {
  name: "Shangai Chinese Kitchen",
  tamilName: "சாங்காய் சைனீஸ் கிச்சன்",
  category: "Chinese Restaurant",
  rating: 4.2,
  reviewCount: 888,
  priceRange: "₹200–₹400 per person",
  address: "302, Poonamallee High Rd, Pallavan Nagar, Maduravoyal, Chennai, Tamil Nadu 600095",
  phone: "+91 93809 87369",
  phoneClean: "+919380987369",
  whatsapp: "919380987369",
  email: "hello@shangaichinese.com",
  openingHours: "11:00 AM - 11:00 PM",
  services: ["Dine-in", "Takeaway", "Delivery", "Online Ordering"],
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.635835614917!2d80.1654!3d13.067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52613955555555%3A0x6b4b4b4b4b4b4b4b!2s302%2C%20Poonamallee%20High%20Rd%2C%20Pallavan%20Nagar%2C%20Maduravoyal%2C%20Chennai%2C%20Tamil%20Nadu%20600095!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  mapsUrl: "https://www.google.com/maps/dir//302,+Poonamallee+High+Rd,+Pallavan+Nagar,+Maduravoyal,+Chennai,+Tamil+Nadu+600095",
  seo: {
    title: "Shangai Chinese Kitchen | Best Chinese Restaurant in Maduravoyal, Chennai",
    description: "Experience authentic Chinese flavours at Shangai Chinese Kitchen, Maduravoyal. From spicy Schezwan to crispy starters, delicious Chinese dishes at affordable prices. Order online or dine-in.",
    keywords: [
      "Chinese restaurant Maduravoyal",
      "Best fried rice Chennai",
      "Chinese takeaway Chennai",
      "Momos near me",
      "Chinese food Chennai",
      "Shangai Chinese Kitchen",
    ],
  },
};

export interface MenuItem {
  id: string;
  name: string;
  category: "Starters" | "Main Course" | "Seafood" | "Rice & Noodles" | "Snacks";
  price: number;
  description: string;
  image: string;
  popular?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Chilli Beef",
    category: "Main Course",
    price: 280,
    description: "Tender beef tossed in a spicy chilli sauce with bell peppers and onions.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "2",
    name: "Chicken Fried Rice",
    category: "Rice & Noodles",
    price: 220,
    description: "Classic wok-tossed rice with succulent chicken and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "3",
    name: "Veg Table Momo",
    category: "Snacks",
    price: 140,
    description: "Steamed dumplings filled with finely chopped garden vegetables.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "4",
    name: "Phuket Fish",
    category: "Seafood",
    price: 320,
    description: "Crispy fish fillets tossed in a tangy and spicy Phuket-style sauce.",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "5",
    name: "Schezwan Fish",
    category: "Seafood",
    price: 310,
    description: "Fish fillets cooked in a fiery Schezwan pepper sauce.",
    image: "https://images.unsplash.com/photo-1559058789-672da06263d8?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "6",
    name: "Wonton Chicken",
    category: "Starters",
    price: 190,
    description: "Crispy fried wontons stuffed with seasoned minced chicken.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "7",
    name: "Chilli Chicken",
    category: "Starters",
    price: 240,
    description: "A crowd favorite — spicy chicken with green chillies and onions.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "8",
    name: "Chicken Biryani",
    category: "Main Course",
    price: 250,
    description: "Fragrant basmati rice cooked with aromatic spices and chicken.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "9",
    name: "Steamed Chicken Momos",
    category: "Snacks",
    price: 160,
    description: "Juicy chicken dumplings served with spicy red chutney.",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "10",
    name: "Veg Hakka Noodles",
    category: "Rice & Noodles",
    price: 180,
    description: "Stir-fried noodles with crunchy vegetables and soy sauce.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  },
  {
    id: "11",
    name: "Gobi Manchurian",
    category: "Starters",
    price: 160,
    description: "Crispy cauliflower florets in a spicy and tangy manchurian sauce.",
    image: "https://images.unsplash.com/photo-1645696301019-35adcc6ef0f0?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Dragon Chicken",
    category: "Starters",
    price: 260,
    description: "Battered chicken tossed with dried chillies in a smoky soy-garlic glaze.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
  },
];

export const REVIEWS = [
  {
    id: "1",
    name: "Rahul S.",
    rating: 5,
    comment: "Best place to eat at best price. The quality is consistently good. Highly recommend for Chinese food lovers!",
    date: "2 weeks ago",
    avatar: "RS",
  },
  {
    id: "2",
    name: "Priya M.",
    rating: 5,
    comment: "Chicken served is tasty and good quality. Highly recommend the Chilli Chicken. Great ambiance too!",
    date: "1 month ago",
    avatar: "PM",
  },
  {
    id: "3",
    name: "Arun Kumar",
    rating: 4,
    comment: "Beef rice tastes best in this restaurant. Authentic flavors and generous portions!",
    date: "3 weeks ago",
    avatar: "AK",
  },
  {
    id: "4",
    name: "Deepika R.",
    rating: 4,
    comment: "Good portions and affordable. The Schezwan Fish is a must-try. Will visit again!",
    date: "2 months ago",
    avatar: "DR",
  },
  {
    id: "5",
    name: "Karthik V.",
    rating: 5,
    comment: "The momos are absolutely divine! Best Chinese restaurant in Maduravoyal without a doubt.",
    date: "1 week ago",
    avatar: "KV",
  },
];

export const CATEGORIES = ["All", "Starters", "Main Course", "Seafood", "Rice & Noodles", "Snacks"] as const;
