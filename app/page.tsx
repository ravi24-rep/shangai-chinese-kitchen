"use client";

import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import MenuSection from "@/components/menu-section";
import Reviews from "@/components/reviews";
import Location from "@/components/location";
import OrderCTA from "@/components/order-cta";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <CartProvider>
      <Navbar />
      <CartSidebar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Reviews />
        <Location />
        <OrderCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
