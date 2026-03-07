"use client";

import { motion } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, TrendingUp, Users, IndianRupee } from "lucide-react";
import { MENU_ITEMS } from "@/data/restaurant";
import Link from "next/link";

const STATS = [
  { label: "Total Menu Items", value: String(MENU_ITEMS.length), icon: UtensilsCrossed, color: "text-primary" },
  { label: "Today's Orders", value: "0", icon: ShoppingBag, color: "text-green-400" },
  { label: "Today's Revenue", value: "₹0", icon: IndianRupee, color: "text-secondary" },
  { label: "Total Customers", value: "0", icon: Users, color: "text-blue-400" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-2">Welcome Back! 👋</h2>
        <p className="text-white/50">Here&apos;s what&apos;s happening at Shangai Chinese Kitchen today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-white/5 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} className={stat.color} />
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
            <div className="text-white/40 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/menu"
          className="bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-colors group"
        >
          <UtensilsCrossed size={32} className="text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Manage Menu</h3>
          <p className="text-white/40 text-sm">Add, edit or remove dishes from your menu.</p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-card border border-white/5 rounded-2xl p-8 hover:border-green-500/30 transition-colors group"
        >
          <ShoppingBag size={32} className="text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">View Orders</h3>
          <p className="text-white/40 text-sm">See and manage all customer orders.</p>
        </Link>
      </div>

      {/* Recent Menu Items */}
      <div className="bg-card border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Recent Menu Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Category</th>
                <th className="text-left py-3 px-4 font-medium">Price</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {MENU_ITEMS.slice(0, 5).map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-white/60">{item.category}</td>
                  <td className="py-3 px-4 text-secondary font-bold">₹{item.price}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
