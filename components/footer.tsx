"use client";

import { useRef } from "react";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Heart, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const QUICK_LINKS = ["Home", "About", "Menu", "Reviews", "Location"];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Moves the content down initially, then to 0 as it scrolls into full view
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  return (
    <footer ref={containerRef} className="bg-[#050505] border-t border-white/5 overflow-hidden">
      <motion.div style={{ y }} className="pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-3xl font-display font-bold text-primary leading-tight">SHANGAI</span>
              <span className="text-xs tracking-[0.2em] text-secondary font-semibold uppercase">Chinese Kitchen</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Authentic Chinese flavors in the heart of Maduravoyal. Delicious dishes at prices that make you smile.
            </p>
            <div className="flex gap-3">
              <a href={buildWhatsAppUrl([], RESTAURANT_DATA.whatsapp)} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-colors border border-white/10">
                <MessageCircle size={18} />
              </a>
              <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 cursor-pointer">
                <Instagram size={18} />
              </span>
              <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 cursor-pointer">
                <Facebook size={18} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/40 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{RESTAURANT_DATA.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <a href={`tel:${RESTAURANT_DATA.phoneClean}`} className="text-white/40 hover:text-white transition-colors">{RESTAURANT_DATA.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-white/40">{RESTAURANT_DATA.email}</span>
              </li>
            </ul>
            <a
              href={buildWhatsAppUrl([], RESTAURANT_DATA.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between text-sm">
                <span className="text-white/40">Monday – Sunday</span>
                <span className="text-white font-medium">{RESTAURANT_DATA.openingHours}</span>
              </li>
              <li className="pt-4">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl">
                  <div className="text-primary font-bold text-xs uppercase tracking-wider mb-1">Status</div>
                  <div className="text-white font-bold">Open Now</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Shangai Chinese Kitchen. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-primary fill-primary" /> for food lovers in Chennai.
          </p>
        </div>
      </div>
      </motion.div>
    </footer>
  );
}
