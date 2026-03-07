"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Store, Phone, Clock, MapPin, Mail } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: RESTAURANT_DATA.name,
    tamilName: RESTAURANT_DATA.tamilName,
    phone: RESTAURANT_DATA.phone,
    email: RESTAURANT_DATA.email,
    address: RESTAURANT_DATA.address,
    openingHours: RESTAURANT_DATA.openingHours,
    priceRange: RESTAURANT_DATA.priceRange,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: "name", label: "Restaurant Name", icon: Store },
    { key: "tamilName", label: "Tamil Name", icon: Store },
    { key: "phone", label: "Phone", icon: Phone },
    { key: "email", label: "Email", icon: Mail },
    { key: "address", label: "Address", icon: MapPin },
    { key: "openingHours", label: "Opening Hours", icon: Clock },
    { key: "priceRange", label: "Price Range", icon: Store },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold mb-2">Restaurant Settings</h2>
        <p className="text-white/40 text-sm">Update your restaurant details and contact information.</p>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl p-8 space-y-6">
        {fields.map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <label className="text-sm font-medium text-white/60 mb-2 flex items-center gap-2">
              <Icon size={14} className="text-primary" />
              {label}
            </label>
            {key === "address" ? (
              <textarea
                value={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                rows={3}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            ) : (
              <input
                value={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-white/5">
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? "bg-green-500 text-white" : "bg-primary hover:bg-primary/90 text-white"}`}
          >
            <Save size={18} />
            {saved ? "Settings Saved!" : "Save Changes"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
