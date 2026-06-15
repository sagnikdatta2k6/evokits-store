"use client";

import { useEffect, useState } from "react";
import { useStore, Order } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";

export default function InvoicePage() {
  const { id } = useParams();
  const { orders, userProfile } = useStore();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const found = orders.find(o => o.id === id);
    if (found) {
      setOrder(found);
      setTimeout(() => {
        window.print();
      }, 500);
    } else {
      // Delay redirect slightly to ensure Zustand persist has fully hydrated
      const timer = setTimeout(() => {
        router.push("/profile?tab=orders");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [id, orders, router, mounted]);

  if (!order) return null;

  return (
    <div id="invoice-root" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-body)', background: '#fff', color: '#000', minHeight: '100vh' }}>
      
      {/* Invoice Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '4px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
        <div>
          <img src="/images/evokits-logo-light.png" alt="EVOKITS Logo" style={{ height: '60px', marginBottom: '10px' }} />
          <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>INVOICE</h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
          <p style={{ fontWeight: 700, margin: '0 0 5px 0', fontSize: '1.2rem' }}>EVOKITS</p>
          <p style={{ margin: '0 0 2px 0' }}>123 Stadium Road</p>
          <p style={{ margin: '0 0 2px 0' }}>Kolkata, WB 700001</p>
          <p style={{ margin: '0 0 2px 0' }}>contact@evokits.com</p>
          <p style={{ margin: 0 }}>+91 9051306766</p>
        </div>
      </div>

      {/* Invoice Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ padding: '20px', border: '2px solid #000', borderRadius: '8px', background: '#FDE100', width: '45%', boxShadow: '4px 4px 0 #000' }}>
          <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #000', paddingBottom: '5px' }}>Billed To:</h3>
          <p style={{ margin: '0 0 5px 0', fontWeight: 700, fontSize: '1.1rem' }}>{userProfile.name}</p>
          <p style={{ margin: '0 0 2px 0' }}>{userProfile.address}</p>
          <p style={{ margin: '0 0 2px 0' }}>Pincode: {userProfile.pincode}</p>
          <p style={{ margin: 0 }}>Phone: {userProfile.phone}</p>
        </div>
        
        <div style={{ width: '45%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 700 }}>Invoice No:</span>
            <span>#INV-{order.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 700 }}>Date:</span>
            <span>{order.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 700 }}>Status:</span>
            <span style={{ color: '#10B981', fontWeight: 700, textTransform: 'uppercase' }}>PAID</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', border: '2px solid #000' }}>
        <thead>
          <tr style={{ background: '#000', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '15px', borderBottom: '2px solid #000' }}>Item Description</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #000', textAlign: 'center' }}>Size</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #000', textAlign: 'center' }}>Qty</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #000', textAlign: 'right' }}>Price</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #000', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #000' }}>
              <td style={{ padding: '15px' }}>
                <div style={{ fontWeight: 700 }}>{item.jersey.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.jersey.team}</div>
              </td>
              <td style={{ padding: '15px', textAlign: 'center' }}>{item.size}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '15px', textAlign: 'right' }}>₹{item.jersey.price.toLocaleString("en-IN")}</td>
              <td style={{ padding: '15px', textAlign: 'right', fontWeight: 700 }}>₹{(item.jersey.price * item.quantity).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px' }}>
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Subtotal:</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Shipping:</span>
            <span>₹0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, background: '#10B981', color: '#fff', padding: '10px', borderRadius: '4px' }}>
            <span>Total:</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <p>Thank you for shopping with EVOKITS!</p>
        <p>If you have any questions concerning this invoice, contact us at contact@evokits.com.</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Hide navbar, footer, and modals globally on this page */
        .navbar, footer, .jersey-modal-overlay {
          display: none !important;
        }
        
        /* Reset main content padding */
        .main-content {
          padding-top: 0 !important;
        }

        /* Force solid white background to remove grid and prevent extra pages */
        html, body {
          background: #fff !important;
          height: auto !important;
          min-height: auto !important;
        }

        /* Force backgrounds to print! */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        @media print {
          @page {
            size: auto;
            margin: 10mm;
          }
        }
      `}} />
    </div>
  );
}
