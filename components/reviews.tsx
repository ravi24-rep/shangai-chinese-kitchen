"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { REVIEWS, RESTAURANT_DATA } from "@/data/restaurant";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our <span className="text-secondary">Guests</span> Say
          </h3>

          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className={cn(i < 4 ? "text-secondary fill-secondary" : "text-white/20")} />
              ))}
            </div>
            <span className="text-3xl font-display font-bold">{RESTAURANT_DATA.rating}</span>
            <span className="text-white/50 text-sm">({RESTAURANT_DATA.reviewCount} reviews)</span>
          </div>
        </div>
        </ScrollReveal>

        {/* Review Carousel */}
        <div className="max-w-3xl mx-auto relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-white/5 rounded-3xl p-8 md:p-12 text-center"
            >
              <Quote size={40} className="text-primary/30 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-medium italic">
                &ldquo;{REVIEWS[current].comment}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                  {REVIEWS[current].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold">{REVIEWS[current].name}</div>
                  <div className="text-white/40 text-sm">{REVIEWS[current].date}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === current ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
