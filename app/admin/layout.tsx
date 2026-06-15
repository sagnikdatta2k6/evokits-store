"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push("/admin-login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <section style={{ minHeight: '100vh', background: 'var(--neo-white)', display: 'flex' }}>
      <style dangerouslySetInnerHTML={{__html: `
        body { 
          background-image: none !important; 
          background-color: var(--neo-white) !important; 
        }
      `}} />
      {/* Sidebar */}
      <aside style={{ width: '250px', borderRight: '2px solid var(--neo-black)', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <h2 style={{ padding: '0 var(--space-sm)', marginBottom: 'var(--space-md)' }}>Admin Panel</h2>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`neo-btn neo-btn--small ${isActive ? 'neo-btn--dark' : 'neo-btn--outline'}`}
              style={{ justifyContent: 'flex-start', border: isActive ? '' : 'none', boxShadow: isActive ? '' : 'none' }}
            >
              <item.icon size={16} /> {item.name}
            </Link>
          );
        })}
        <div style={{ flex: 1 }} />
        <button 
          onClick={handleLogout}
          className="neo-btn neo-btn--small neo-btn--outline" 
          style={{ justifyContent: 'flex-start', color: 'red', borderColor: 'red' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Admin Content */}
      <div style={{ flex: 1, padding: 'var(--space-xl)', overflowY: 'auto' }}>
        {children}
      </div>
    </section>
  );
}
