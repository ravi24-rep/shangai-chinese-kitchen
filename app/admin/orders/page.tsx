"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Check, Clock, X, Package, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  time: string;
  phone: string;
}

const SAMPLE_ORDERS: Order[] = [];

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-400", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-400", icon: Check },
  preparing: { label: "Preparing", color: "bg-orange-500/10 text-orange-400", icon: Package },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-400", icon: Check },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-400", icon: X },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status });
  };

  const todayRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0);

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
                <th className="text-left py-4 px-6 font-medium">Time</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusConfig = STATUS_CONFIG[order.status];
                return (
                  <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="py-4 px-6 font-mono text-primary font-bold">{order.id}</td>
                    <td className="py-4 px-6 font-medium">{order.customer}</td>
                    <td className="py-4 px-6 text-white/60">{order.items.length} items</td>
                    <td className="py-4 px-6 text-secondary font-bold">₹{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full", statusConfig.color)}>{statusConfig.label}</span>
                    </td>
                    <td className="py-4 px-6 text-white/40">{order.time}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                          <Eye size={16} />
                        </button>
                        {order.status === "pending" && (
                          <button onClick={() => updateStatus(order.id, "confirmed")} className="p-2 hover:bg-green-500/10 rounded-lg text-white/40 hover:text-green-400 transition-colors">
                            <Check size={16} />
                          </button>
                        )}
                        {order.status === "confirmed" && (
                          <button onClick={() => updateStatus(order.id, "preparing")} className="p-2 hover:bg-orange-500/10 rounded-lg text-white/40 hover:text-orange-400 transition-colors">
                            <Package size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-card border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold">{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><span className="text-white/40 text-sm">Customer:</span> <span className="font-medium ml-2">{selectedOrder.customer}</span></div>
              <div><span className="text-white/40 text-sm">Phone:</span> <span className="font-medium ml-2">{selectedOrder.phone}</span></div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-white/40 text-sm block mb-3">Order Items:</span>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span className="text-secondary font-bold">₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="border-t border-white/5 mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary text-lg">₹{selectedOrder.total}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                  <>
                    <button onClick={() => { updateStatus(selectedOrder.id, "delivered"); setSelectedOrder(null); }}
                      className="flex-1 bg-green-500/10 text-green-400 py-3 rounded-xl font-bold text-sm hover:bg-green-500/20 transition-colors">Mark Delivered</button>
                    <button onClick={() => { updateStatus(selectedOrder.id, "cancelled"); setSelectedOrder(null); }}
                      className="flex-1 bg-red-500/10 text-red-400 py-3 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors">Cancel</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
