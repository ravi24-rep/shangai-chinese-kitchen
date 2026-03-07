"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Flame, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { MenuItem } from "@/types";

interface MenuClientProps {
  categories: string[];
  items: MenuItem[];
}

export function MenuClient({ categories, items }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItems((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 2000);
  };

  return (
    <>
      <ScrollReveal delay={0.1}>
        {/* Category Tabs */}
        <div
          role="tablist"
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`panel-${category}`}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeCategory === category
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(193,18,31,0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(193,18,31,0.15)] flex flex-col h-full ring-offset-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-black/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.popular && (
                      <div className="bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1">
                        <Flame size={12} className="text-yellow-400" />
                        Popular
                      </div>
                    )}
                    {item.spicy && (
                      <div className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center" aria-label="Spicy">
                        🌶️
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-display font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-white/50 text-sm mb-6 flex-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-display font-bold text-secondary">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 outline-none",
                        addedItems.has(item.id)
                          ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                          : "bg-white/5 text-white hover:bg-primary hover:scale-110 hover:shadow-[0_0_20px_rgba(193,18,31,0.4)] focus-visible:bg-primary focus-visible:scale-110"
                      )}
                    >
                      {addedItems.has(item.id) ? (
                        <Check size={20} className="animate-in zoom-in" />
                      ) : (
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollReveal>
    </>
  );
}
