"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Settings, ArrowLeft, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Exclude login page from layout wrapping
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r border-white/10 z-50 transition-transform lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-primary">SHANGAI</span>
            <span className="text-[9px] tracking-[0.2em] text-secondary font-semibold uppercase">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 mt-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-400 hover:text-white hover:bg-red-500/20 text-sm font-medium transition-colors px-4 py-2 rounded-xl"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold capitalize">
            {NAV_ITEMS.find((i) => i.href === pathname)?.label || "Admin"}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
