"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg("Please fill in all details.");
      return;
    }
    
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: { name: formData.name, phone: formData.phone },
          delivery_address: formData.address,
          payment_method: formData.paymentMethod,
          items: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to place order");

      // 1. WhatsApp Notification to the Owner
      const ownerNumber = "917200872363"; // India code assumed
      let msg = `*New Order: ${data.order.id}*\n\n`;
      msg += `*Customer:* ${formData.name}\n`;
      msg += `*Phone:* ${formData.phone}\n`;
      msg += `*Address:* ${formData.address}\n`;
      msg += `*Payment:* ${formData.paymentMethod.toUpperCase()}\n\n`;
      msg += `*Items:*\n`;
      cart.forEach((item) => {
        msg += `- ${item.quantity}x ${item.name} (₹${item.price})\n`;
      });
      msg += `\n*Total: ₹${totalPrice}*`;
      
      const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, "_blank");

      // 2. Clear Cart & Redirect to Live Tracking
      clearCart();
      setIsCartOpen(false);
      setIsCheckingOut(false);
      router.push(`/track/${data.order.id}`);

    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCartView = () => {
    setIsCheckingOut(false);
    setErrorMsg("");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsCartOpen(false); resetCartView(); }}
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
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                {isCheckingOut ? (
                   <button onClick={resetCartView} className="text-white/60 hover:text-white transition-colors text-sm font-medium">← Back to Cart</button>
                ) : (
                  <>
                    <ShoppingBag className="text-primary" />
                    <h2 className="text-xl font-bold font-display">Your Cart</h2>
                    {cart.length > 0 && (
                      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                        {cart.length} items
                      </span>
                    )}
                  </>
                )}
              </div>
              <button onClick={() => { setIsCartOpen(false); resetCartView(); }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {!isCheckingOut ? (
                 cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-white/40 gap-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p className="font-medium">Your cart is empty</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-primary text-sm font-bold hover:underline">
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
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
                    ))}
                  </div>
                )
              ) : (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-bold font-display mb-2">Delivery Details</h3>
                  
                  {errorMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">{errorMsg}</div>}

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-1.5 block">Full Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Rahul S." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-1.5 block">Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-1.5 block">Complete Delivery Address</label>
                      <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Flat No, Building Name, Street..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/60 mb-2 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`cursor-pointer border rounded-xl p-3 text-center text-sm font-bold transition-all ${formData.paymentMethod === 'upi' ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-white/10 text-white/60 hover:border-white/20'}`}>
                          <input type="radio" name="payment" value="upi" checked={formData.paymentMethod === 'upi'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="hidden" />
                          UPI Payment
                        </label>
                        <label className={`cursor-pointer border rounded-xl p-3 text-center text-sm font-bold transition-all ${formData.paymentMethod === 'cash' ? 'bg-primary/20 border-primary text-primary' : 'bg-card border-white/10 text-white/60 hover:border-white/20'}`}>
                          <input type="radio" name="payment" value="cash" checked={formData.paymentMethod === 'cash'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="hidden" />
                          Cash on Delivery
                        </label>
                      </div>
                      {formData.paymentMethod === 'upi' && (
                        <p className="text-xs text-white/40 mt-2 italic">* You will pay via UPI scanner when the delivery executive arrives.</p>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-background/95 backdrop-blur-lg shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Total Amount</span>
                  <span className="text-2xl font-bold font-display text-primary">₹{totalPrice}</span>
                </div>
                
                {!isCheckingOut ? (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20 mb-3"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20 mb-3"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={20} className="animate-spin" /> Processing...</>
                    ) : (
                      "Place Order & Notify Owner"
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
