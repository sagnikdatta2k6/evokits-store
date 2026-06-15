"use client";

import { useStore } from "@/lib/store";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { orders, inventory } = useStore();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "Processing").length;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>Dashboard Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
        
        <motion.div className="neo-card" style={{ background: 'var(--neo-lime)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ background: 'var(--neo-black)', color: 'var(--neo-lime)', padding: 'var(--space-sm)', borderRadius: '50%' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Revenue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>₹{totalRevenue.toLocaleString("en-IN")}</div>
          </div>
        </motion.div>

        <motion.div className="neo-card" style={{ background: 'var(--neo-pink)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ background: 'var(--neo-black)', color: 'var(--neo-pink)', padding: 'var(--space-sm)', borderRadius: '50%' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Orders</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{orders.length}</div>
          </div>
        </motion.div>

        <motion.div className="neo-card" style={{ background: 'var(--neo-yellow)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ background: 'var(--neo-black)', color: 'var(--neo-yellow)', padding: 'var(--space-sm)', borderRadius: '50%' }}>
            <Package size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Inventory Items</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{inventory.length}</div>
          </div>
        </motion.div>

        <motion.div className="neo-card" style={{ background: 'var(--neo-white)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ background: 'var(--neo-black)', color: 'var(--neo-white)', padding: 'var(--space-sm)', borderRadius: '50%' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>Pending Orders</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{pendingOrders}</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
