"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ChefHat, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();
      if (error) throw error;
      setOrder(data);
    } catch (err: any) {
      setError("Order not found or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }

    // Subscribe to realtime changes on this specific order
    const channel = supabase
      .channel(`public:orders:id=eq.${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <ChefHat className="w-12 h-12 text-primary animate-bounce opacity-50" />
        <h2 className="text-xl font-bold font-display animate-pulse">Loading Order Data...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-display font-bold text-red-500 mb-4">Order Not Found</h1>
        <p className="text-white/60 max-w-sm mb-6">We couldn't find an order matching that ID. It may have been deleted.</p>
        <Link href="/" className="bg-primary px-6 py-3 rounded-xl font-bold text-white hover:bg-primary/90 transition-colors">
          Return to Menu
        </Link>
      </div>
    );
  }

  const getStatusNumber = (status: string) => {
    switch (status) {
      case "pending": return 1;
      case "confirmed": return 2;
      case "preparing": return 3;
      case "delivered": return 4;
      default: return 0; // cancelled or unknown
    }
  };

  const statusNumber = getStatusNumber(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-8 font-medium">
        <ArrowLeft size={16} /> Back to Menu
      </Link>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 backdrop-blur-xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Order Tracking</p>
          <h1 className="text-3xl sm:text-4xl font-display font-black mb-4">{order.id}</h1>
          <p className="text-white/60">Placed by {order.customer_name} • {new Date(order.created_at).toLocaleString()}</p>
        </div>

        {/* Status Tracker */}
        {isCancelled ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400 font-bold mb-10">
            This order has been cancelled.
          </div>
        ) : (
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden z-0">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: `${(statusNumber - 1) * 33.33}%` }}
                 transition={{ duration: 1, ease: "easeInOut" }}
                 className="h-full bg-primary"
               />
            </div>

            <div className="relative z-10 flex justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${statusNumber >= 1 ? "bg-primary text-white" : "bg-card border-2 border-white/20 text-white/40"}`}>
                   <Clock size={18} />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${statusNumber >= 1 ? "text-white" : "text-white/40"}`}>Pending</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${statusNumber >= 2 ? "bg-primary text-white" : "bg-card border-2 border-white/20 text-white/40"}`}>
                   <CheckCircle2 size={18} />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${statusNumber >= 2 ? "text-white" : "text-white/40"}`}>Confirmed</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${statusNumber >= 3 ? "bg-primary text-white" : "bg-card border-2 border-white/20 text-white/40"}`}>
                   <ChefHat size={18} />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${statusNumber >= 3 ? "text-white" : "text-white/40"}`}>Preparing</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${statusNumber >= 4 ? "bg-primary text-white" : "bg-card border-2 border-white/20 text-white/40"}`}>
                   <MapPin size={18} />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${statusNumber >= 4 ? "text-white" : "text-white/40"}`}>Delivered</span>
              </div>
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
           
           {/* Items */}
           <div>
             <h3 className="text-lg font-bold font-display mb-4 text-white/80">Order Summary</h3>
             <div className="space-y-3 mb-6">
                {(order.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                     <span className="text-white/70">{item.quantity}x {item.name}</span>
                     <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
             </div>
             <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-bold text-white/60">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{order.total_amount}</span>
             </div>
           </div>

           {/* Delivery Info */}
           <div className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-4">
             <div>
               <p className="text-xs text-white/40 mb-1 uppercase tracking-wider font-bold">Delivery Address</p>
               <p className="text-sm font-medium leading-relaxed">{order.delivery_address || 'Not Provided'}</p>
             </div>
             <div>
               <p className="text-xs text-white/40 mb-1 uppercase tracking-wider font-bold">Payment Method</p>
               <p className="text-sm font-medium capitalize">{order.payment_method === 'upi' ? 'UPI Scanner On Delivery' : 'Cash On Delivery'}</p>
             </div>
             <div>
               <p className="text-xs text-white/40 mb-1 uppercase tracking-wider font-bold">Contact Number</p>
               <p className="text-sm font-medium">{order.phone_number}</p>
             </div>
           </div>

        </div>

      </div>
    </main>
  );
}
