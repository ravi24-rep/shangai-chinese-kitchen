"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Check, Clock, X, Package, IndianRupee, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  payment_method: string;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  created_at: string;
}

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-400", icon: Check },
  preparing: { label: "Preparing", color: "bg-orange-500/10 text-orange-400", icon: Package },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-400", icon: Check },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-400", icon: X },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders on mount
  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchOrders();

    // Set up realtime subscription for new incoming orders
    const channel = supabase
      .channel("public-orders")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) => [payload.new as Order, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) => prev.map((o) => o.id === payload.new.id ? payload.new as Order : o));
        if (selectedOrder?.id === payload.new.id) {
            setSelectedOrder(payload.new as Order);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOrder?.id]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    // Optimistic UI update
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });

    // Actual DB update
    try {
        await supabase.from("orders").update({ status }).eq("id", id);
    } catch (err) {
        console.error("Failed to update status in DB", err);
    }
  };

  const todayRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center text-white/40"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-white/5 rounded-2xl p-5">
          <div className="text-white/40 text-sm mb-1">Total Orders</div>
          <div className="text-2xl font-display font-bold">{orders.length}</div>
        </div>
        <div className="bg-card border border-white/5 rounded-2xl p-5">
          <div className="text-white/40 text-sm mb-1">Pending</div>
          <div className="text-2xl font-display font-bold text-yellow-400">{orders.filter((o) => o.status === "pending").length}</div>
        </div>
        <div className="bg-card border border-white/5 rounded-2xl p-5">
          <div className="text-white/40 text-sm mb-1">Preparing</div>
          <div className="text-2xl font-display font-bold text-orange-400">{orders.filter((o) => o.status === "preparing").length}</div>
        </div>
        <div className="bg-card border border-white/5 rounded-2xl p-5">
          <div className="text-white/40 text-sm mb-1 flex items-center gap-1"><IndianRupee size={14} /> Revenue</div>
          <div className="text-2xl font-display font-bold text-secondary">₹{todayRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="text-left py-4 px-6 font-medium">Order ID</th>
                <th className="text-left py-4 px-6 font-medium">Customer</th>
                <th className="text-left py-4 px-6 font-medium">Items</th>
                <th className="text-left py-4 px-6 font-medium">Total</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-left py-4 px-6 font-medium">Time (UTC)</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white/40">No orders yet.</td>
                </tr>
              ) : (
                orders.map((order) => {
                  const statusConfig = STATUS_CONFIG[order.status];
                  return (
                    <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="py-4 px-6 font-mono text-primary font-bold">{order.id}</td>
                      <td className="py-4 px-6 font-medium">{order.customer_name}</td>
                      <td className="py-4 px-6 text-white/60">{order.items?.length || 0} items</td>
                      <td className="py-4 px-6 text-secondary font-bold">₹{order.total_amount}</td>
                      <td className="py-4 px-6">
                        <span className={cn("text-xs font-bold px-3 py-1 rounded-full", statusConfig.color)}>{statusConfig.label}</span>
                      </td>
                      <td className="py-4 px-6 text-white/40">{new Date(order.created_at).toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold">{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="grid grid-cols-2 gap-y-3">
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-white/40 text-xs block mb-1">Customer</span> 
                      <span className="font-bold">{selectedOrder.customer_name}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-white/40 text-xs block mb-1">Phone</span> 
                      <span className="font-medium">{selectedOrder.phone_number}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-white/40 text-xs block mb-1">Delivery Address</span> 
                      <span className="font-medium text-sm leading-relaxed">{selectedOrder.delivery_address || 'Not Provided'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-white/40 text-xs block mb-1">Payment Method</span> 
                      <span className="font-bold text-primary uppercase text-sm tracking-wider">
                        {selectedOrder.payment_method === 'upi' ? 'UPI Scanner' : 'Cash on Delivery'}
                      </span>
                    </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="border border-white/5 rounded-xl p-4">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-3">Order Items</span>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex justify-between py-1 text-sm border-b border-white/5 last:border-0">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="text-white/60 font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center bg-black/20 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <span className="font-bold text-white/60">Total Amount</span>
                  <span className="text-primary text-xl font-bold">₹{selectedOrder.total_amount}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex gap-2 pt-4 flex-wrap">
                {selectedOrder.status === "pending" && (
                    <button onClick={() => updateStatus(selectedOrder.id, "confirmed")} 
                      className="flex-1 bg-blue-500/10 text-blue-400 py-3 rounded-xl font-bold text-sm hover:bg-blue-500/20 transition-colors">Confirm Order</button>
                )}
                {selectedOrder.status === "confirmed" && (
                    <button onClick={() => updateStatus(selectedOrder.id, "preparing")} 
                      className="flex-1 bg-orange-500/10 text-orange-400 py-3 rounded-xl font-bold text-sm hover:bg-orange-500/20 transition-colors">Start Preparing</button>
                )}
                {(selectedOrder.status === "preparing" || selectedOrder.status === "confirmed") && (
                    <button onClick={() => updateStatus(selectedOrder.id, "delivered")} 
                      className="flex-1 bg-green-500/10 text-green-400 py-3 rounded-xl font-bold text-sm hover:bg-green-500/20 transition-colors">Mark Delivered</button>
                )}
                
                {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                     <button onClick={() => { updateStatus(selectedOrder.id, "cancelled") }}
                      className="flex-1 bg-red-500/10 text-red-400 py-3 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors">Cancel</button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
