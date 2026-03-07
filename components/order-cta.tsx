"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Utensils, Phone, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { RESTAURANT_DATA } from "@/data/restaurant";

export default function OrderCTA() {
  const { setIsCartOpen, cart } = useCart();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=1920"
          alt="Food Background"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8">
            Craving <span className="text-primary">Chinese</span> Tonight?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Order your favorite dishes online and enjoy authentic flavors from the comfort of your home. Fast delivery and easy takeaway available.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={buildWhatsAppUrl(cart as any, RESTAURANT_DATA.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20"
            >
              <MessageCircle size={24} />
              Order on WhatsApp
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/30"
            >
              <ShoppingCart size={24} />
              Order Online
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                🚀
              </motion.span>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <a href="#menu" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
              <Utensils size={16} />
              View Menu
            </a>
            <div className="w-px h-4 bg-white/10" />
            <a href={`tel:${RESTAURANT_DATA.phoneClean}`} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-medium">
              <Phone size={16} />
              Call: <span className="text-white font-bold">{RESTAURANT_DATA.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
