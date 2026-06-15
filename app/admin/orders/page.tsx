"use client";

import { useStore, Order } from "@/lib/store";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>Order Management</h1>

      <div className="neo-card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--neo-black)', color: 'var(--neo-white)' }}>
              <th style={{ padding: 'var(--space-md)' }}>Order ID</th>
              <th style={{ padding: 'var(--space-md)' }}>Date</th>
              <th style={{ padding: 'var(--space-md)' }}>Customer</th>
              <th style={{ padding: 'var(--space-md)' }}>Items</th>
              <th style={{ padding: 'var(--space-md)' }}>Total</th>
              <th style={{ padding: 'var(--space-md)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 'var(--space-xl)', textAlign: 'center', opacity: 0.5 }}>
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '2px solid var(--neo-black)' }}>
                  <td style={{ padding: 'var(--space-md)', fontWeight: 700 }}>#{order.id}</td>
                  <td style={{ padding: 'var(--space-md)' }}>{order.date}</td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <div style={{ fontWeight: 600 }}>Guest User</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>contact@evokits.com</div>
                  </td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    {order.items.length} item(s)
                  </td>
                  <td style={{ padding: 'var(--space-md)', fontWeight: 800 }}>₹{order.total.toLocaleString("en-IN")}</td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      style={{ 
                        padding: '4px 8px', 
                        border: '2px solid var(--neo-black)', 
                        background: order.status === 'Processing' ? 'var(--neo-yellow)' : order.status === 'Shipped' ? 'var(--neo-pink)' : 'var(--neo-lime)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="Processing">⏳ Processing</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
