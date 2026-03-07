"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { MENU_ITEMS, MenuItem, CATEGORIES } from "@/data/restaurant";
import { cn } from "@/lib/utils";

export default function MenuManagement() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", category: "Starters" as MenuItem["category"], price: "", description: "", image: "", popular: false,
  });

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  const openNewForm = () => {
    setEditItem(null);
    setFormData({ name: "", category: "Starters", price: "", description: "", image: "", popular: false });
    setIsFormOpen(true);
  };

  const openEditForm = (item: MenuItem) => {
    setEditItem(item);
    setFormData({
      name: item.name, category: item.category, price: String(item.price),
      description: item.description, image: item.image, popular: item.popular || false,
    });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (editItem) {
      setItems((prev) => prev.map((i) => i.id === editItem.id ? {
        ...i, ...formData, price: Number(formData.price),
      } : i));
    } else {
      const newItem: MenuItem = {
        id: String(Date.now()), ...formData, price: Number(formData.price),
      };
      setItems((prev) => [...prev, newItem]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">Menu Items</h2>
          <p className="text-white/40 text-sm">{items.length} dishes in the menu</p>
        </div>
        <button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm">
          <Plus size={18} />
          Add New Dish
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Items Table */}
      <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="text-left py-4 px-6 font-medium">Dish</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Price</th>
                <th className="text-left py-4 px-6 font-medium">Popular</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-white/40 text-xs line-clamp-1">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/60">{item.category}</td>
                  <td className="py-4 px-6 text-secondary font-bold">₹{item.price}</td>
                  <td className="py-4 px-6">
                    {item.popular && (
                      <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-full">⭐ Popular</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditForm(item)} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-card border border-white/10 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold">{editItem ? "Edit Dish" : "Add New Dish"}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/60 mb-1 block">Name</label>
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white/60 mb-1 block">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem["category"] })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50">
                    {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/60 mb-1 block">Price (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white/60 mb-1 block">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-white/60 mb-1 block">Image URL</label>
                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium">Mark as Popular</span>
              </label>
              <button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-colors mt-4">
                {editItem ? "Save Changes" : "Add Dish"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
