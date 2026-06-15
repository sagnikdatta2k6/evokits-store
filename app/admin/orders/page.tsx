"use client";

import React, { useState } from "react";
import { useStore, Order } from "@/lib/store";
import { Package, Truck, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (orderId: string) => {
    setExpandedRows(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

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
                <React.Fragment key={order.id}>
                  <tr 
                    style={{ borderBottom: expandedRows[order.id] ? 'none' : '2px solid var(--neo-black)', cursor: 'pointer', background: expandedRows[order.id] ? 'rgba(0,0,0,0.02)' : 'transparent' }}
                    onClick={() => toggleRow(order.id)}
                  >
                    <td style={{ padding: 'var(--space-md)', fontWeight: 700 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        {expandedRows[order.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        #{order.id}
                      </div>
                    </td>
                    <td style={{ padding: 'var(--space-md)' }}>{order.date}</td>
                    <td style={{ padding: 'var(--space-md)' }}>
                      <div style={{ fontWeight: 600 }}>Guest User</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>contact@evokits.com</div>
                    </td>
                    <td style={{ padding: 'var(--space-md)' }}>
                      {order.items.length} item(s)
                    </td>
                    <td style={{ padding: 'var(--space-md)', fontWeight: 800 }}>₹{order.total.toLocaleString("en-IN")}</td>
                    <td style={{ padding: 'var(--space-md)' }} onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        style={{ 
                          padding: '4px 8px', 
                          border: '2px solid var(--neo-black)', 
                          background: order.status === 'Processing' ? 'var(--neo-yellow)' : order.status === 'Shipped' ? 'var(--neo-pink)' : order.status === 'Cancelled' ? '#e0e0e0' : 'var(--neo-lime)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        <option value="Processing">⏳ Processing</option>
                        <option value="Shipped">🚚 Shipped</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </td>
                  </tr>
                  {expandedRows[order.id] && (
                    <tr style={{ borderBottom: '2px solid var(--neo-black)', background: 'rgba(0,0,0,0.02)' }}>
                      <td colSpan={6} style={{ padding: '0 var(--space-xl) var(--space-md) var(--space-xl)' }}>
                        <div style={{ border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)', background: 'var(--neo-white)', padding: 'var(--space-md)' }}>
                          <h4 style={{ marginBottom: 'var(--space-sm)', fontSize: '1rem' }}>Order Items</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            {order.items.map((item, idx) => (
                              <div key={`${order.id}-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: idx < order.items.length - 1 ? '1px dashed rgba(0,0,0,0.1)' : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                  <div style={{ width: 40, height: 40, background: item.jersey.image ? 'var(--neo-white)' : `linear-gradient(135deg, ${item.jersey.colors[0]}, ${item.jersey.colors[1]})`, border: '1px solid var(--neo-black)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {item.jersey.image ? (
                                      <img src={item.jersey.image} alt={item.jersey.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    ) : (
                                      <span style={{ fontSize: '1.2rem' }}>{item.jersey.badge}</span>
                                    )}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700 }}>{item.jersey.name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Size: {item.size}</div>
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontWeight: 600 }}>x {item.quantity}</div>
                                  <div style={{ fontSize: '0.9rem' }}>₹{(item.jersey.price * item.quantity).toLocaleString("en-IN")}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
