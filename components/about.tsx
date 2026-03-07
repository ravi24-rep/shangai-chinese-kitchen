"use client";

import { motion } from "framer-motion";
import { Star, Truck, UtensilsCrossed, Clock, ShieldCheck } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import ScrollReveal from "@/components/ui/scroll-reveal";

const SERVICES = [
  { icon: UtensilsCrossed, label: "Dine-in" },
  { icon: Truck, label: "Delivery" },
  { icon: Clock, label: "Takeaway" },
  { icon: ShieldCheck, label: "Hygiene First" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800"
                  alt="Our Kitchen"
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-card border border-white/10 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < 4 ? "text-secondary fill-secondary" : "text-white/20"} />
                ))}
              </div>
              <div className="text-3xl font-display font-bold text-secondary">{RESTAURANT_DATA.rating}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{RESTAURANT_DATA.reviewCount} Reviews</div>
            </motion.div>
          </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              A Taste of <span className="text-secondary">Tradition</span>
            </h3>
            <p className="text-white/60 leading-relaxed mb-4 text-lg">
              At Shangai Chinese Kitchen, we bring the authentic flavours of Chinese cuisine right to your table
              in the heart of Maduravoyal, Chennai. Our chefs use time-honored recipes and the freshest ingredients
              to create dishes that burst with flavour.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              From our fiery Chilli Chicken to our delicate Steamed Momos, every dish is crafted with passion
              and served with love. Whether you dine in, take away, or order online — we promise an unforgettable
              culinary experience.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <motion.div
                  key={service.label}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
                >
                  <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                    <service.icon size={20} />
                  </div>
                  <span className="font-semibold text-sm">{service.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
