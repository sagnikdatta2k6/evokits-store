"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <section style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'var(--neo-white)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)', background: 'var(--neo-lime)', padding: 'var(--space-xs) var(--space-sm)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', fontWeight: 800 }}>
            <Truck size={18} /> Shipping & Delivery
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: 'var(--space-xl)' }}>
            GET YOUR GEAR. <span className="neo-highlight neo-highlight--yellow">FAST.</span>
          </h1>

          <div className="neo-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Clock size={24} /> Processing Times
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8, marginBottom: 'var(--space-md)' }}>
              All orders are processed within <strong>1 to 2 business days</strong> (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
            </p>
            <div style={{ background: 'var(--neo-yellow)', padding: 'var(--space-md)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
              🚀 Pro Tip: Orders placed before 12 PM usually ship the exact same day!
            </div>
          </div>

          <div className="neo-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', background: 'var(--neo-pink)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <MapPin size={24} /> Domestic Shipping Rates
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
              We offer flat-rate shipping to all locations across the country. Simple, transparent pricing.
            </p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--neo-white)', border: '2px solid var(--neo-black)' }}>
              <thead>
                <tr style={{ background: 'var(--neo-black)', color: 'var(--neo-white)' }}>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Shipping Method</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Estimated Delivery Time</th>
                  <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '2px solid var(--neo-black)' }}>
                  <td style={{ padding: 'var(--space-md)', fontWeight: 700 }}>Standard Shipping</td>
                  <td style={{ padding: 'var(--space-md)' }}>3-5 Business Days</td>
                  <td style={{ padding: 'var(--space-md)', textAlign: 'right', fontWeight: 800 }}>Free</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--space-md)', fontWeight: 700 }}>Express Shipping</td>
                  <td style={{ padding: 'var(--space-md)' }}>1-2 Business Days</td>
                  <td style={{ padding: 'var(--space-md)', textAlign: 'right', fontWeight: 800 }}>₹199</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="neo-card" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <ShieldCheck size={24} /> How do I check the status of my order?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
              When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
              <br/><br/>
              If you haven’t received your order within 7 days of receiving your shipping confirmation email, please contact us at support@evokits.com with your name and order number, and we will look into it for you.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
