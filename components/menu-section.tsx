"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, Check, Flame } from "lucide-react";
import type { MenuItem } from "@/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function MenuInteractive({ initialCategories, initialItems }: { initialCategories: string[], initialItems: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? initialItems
      : initialItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Menu</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Explore Our <span className="text-secondary">Delicacies</span>
            </h3>

            {/* Accessible Category Tabs */}
            <div
              role="tablist"
              aria-label="Menu categories"
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {initialCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  aria-controls="menu-grid"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all border relative overflow-hidden",
                    activeCategory === cat
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-primary/50 hover:text-white"
                  )}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          id="menu-grid"
          role="tabpanel"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <MenuItemCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="bg-card rounded-3xl overflow-hidden border border-white/5 group hover:border-primary/20 hover:shadow-[0_20px_60px_-15px_rgba(193,18,31,0.15)] transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {item.popular && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#C1121F] to-[#ff2a3a] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <Flame size={10} />
            Popular
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <button
            onClick={handleAdd}
            aria-label={`Add ${item.name} to cart`}
            className={cn(
              "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300",
              isAdded ? "bg-green-500 text-white" : "bg-primary hover:bg-primary/90 text-white"
            )}
          >
            {isAdded ? (
              <>
                <Check size={18} />
                Added!
              </>
            ) : (
              <>
                <Plus size={18} />
                Add to Cart — ₹{item.price}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{item.name}</h4>
          <span className="text-secondary font-bold text-lg shrink-0 ml-3">₹{item.price}</span>
        </div>
        <p className="text-white/50 text-sm line-clamp-2 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{item.category}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className={cn(i < 4 ? "text-secondary fill-secondary" : "text-white/20")} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
