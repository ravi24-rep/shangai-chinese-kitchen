"use client";

import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import MenuWrapper from "@/components/menu-wrapper";
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
        <MenuWrapper />
        <Reviews />
        <Location />
        <OrderCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
