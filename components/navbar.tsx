"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Reviews", href: "#reviews" },
  { name: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex flex-col cursor-pointer group">
          <span className="text-2xl font-display font-bold text-primary leading-tight group-hover:text-primary/90 transition-colors">
            SHANGAI
          </span>
          <span className="text-[10px] tracking-[0.2em] text-secondary font-semibold uppercase">
            Chinese Kitchen
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/admin"
            className="text-sm font-medium text-white/40 hover:text-secondary transition-colors flex items-center gap-1"
          >
            <ChefHat size={14} />
            Admin
          </Link>
          <motion.button
            key={totalItems}
            onClick={() => setIsCartOpen(true)}
            initial={{ scale: 1 }}
            animate={{ scale: totalItems > 0 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 relative"
          >
            <ShoppingCart size={16} />
            Order Online
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-secondary text-background text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={24} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium py-2 border-b border-white/5 text-white/80"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium py-2 border-b border-white/5 text-white/40 flex items-center gap-2"
            >
              <ChefHat size={18} />
              Admin Dashboard
            </Link>
            <button
              onClick={() => { setMobileOpen(false); setIsCartOpen(true); }}
              className="bg-primary text-white w-full py-4 rounded-xl font-bold mt-2 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Order Online {totalItems > 0 && `(${totalItems})`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
