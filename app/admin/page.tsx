"use client";

import { useStore } from "@/lib/store";
import { DollarSign, Package, ShoppingBag, Users, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { orders, inventory } = useStore();

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "Processing").length;

  // Compute recent orders (last 5)
  const recentOrders = [...orders].reverse().slice(0, 5);

  // Compute low stock items
  const lowStockItems: { jerseyName: string; size: string; stock: number }[] = [];
  inventory.forEach(jersey => {
    Object.entries(jersey.stock).forEach(([size, stock]) => {
      if (stock < 10) {
        lowStockItems.push({ jerseyName: jersey.name, size, stock });
      }
    });
  });

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

      {/* Widgets Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        
        {/* Recent Orders Widget */}
        <motion.div className="neo-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} /> Recent Orders
          </h2>
          {recentOrders.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No orders yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: 'var(--border-thin)' }}>
                    <th style={{ padding: 'var(--space-sm)' }}>ID</th>
                    <th style={{ padding: 'var(--space-sm)' }}>Date</th>
                    <th style={{ padding: 'var(--space-sm)' }}>Items</th>
                    <th style={{ padding: 'var(--space-sm)' }}>Total</th>
                    <th style={{ padding: 'var(--space-sm)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: 'var(--space-sm)', fontWeight: 700 }}>#{order.id.slice(0, 8)}</td>
                      <td style={{ padding: 'var(--space-sm)' }}>{new Date(order.date).toLocaleDateString()}</td>
                      <td style={{ padding: 'var(--space-sm)' }}>{order.items.length}</td>
                      <td style={{ padding: 'var(--space-sm)', fontWeight: 900 }}>₹{order.total}</td>
                      <td style={{ padding: 'var(--space-sm)' }}>
                        <span className={`neo-badge ${order.status === 'Processing' ? 'neo-badge--yellow' : order.status === 'Delivered' ? 'neo-badge--lime' : 'neo-badge--pink'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Low Stock Alerts Widget */}
        <motion.div className="neo-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neo-pink)' }}>
            <AlertTriangle size={20} /> Low Stock Alerts
          </h2>
          {lowStockItems.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: 'var(--space-md)', background: 'var(--neo-lime)', borderRadius: 'var(--radius-sm)', border: 'var(--border-thin)' }}>
              <span style={{ fontWeight: 700 }}>All items well stocked!</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {lowStockItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm)', borderBottom: '1px dashed #ccc' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.jerseyName}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Size: {item.size}</div>
                  </div>
                  <div className="neo-badge neo-badge--pink">
                    Only {item.stock} left
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
