"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { RESTAURANT_DATA } from "@/data/restaurant";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const url = buildWhatsAppUrl(cart, RESTAURANT_DATA.whatsapp);
    window.open(url, "_blank");
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" />
                <h2 className="text-xl font-bold font-display">Your Cart</h2>
                {cart.length > 0 && (
                  <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.length} items
                  </span>
                )}
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-medium">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-primary text-sm font-bold hover:underline">
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" loading="lazy" />
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold line-clamp-1 pr-2 text-sm">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-500 transition-colors shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="text-secondary font-bold text-sm mb-auto">₹{item.price}</span>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-background rounded-full px-1 py-1 border border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-background/95 backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Total Amount</span>
                  <span className="text-2xl font-bold font-display text-primary">₹{totalPrice}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20 mb-3"
                >
                  <MessageCircle size={20} />
                  Checkout on WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-white/40 hover:text-red-400 py-2 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
