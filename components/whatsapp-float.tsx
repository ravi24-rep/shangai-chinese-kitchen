"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppUrl([], RESTAURANT_DATA.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 transition-colors"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </motion.a>
  );
}
