"use client";

import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <section style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'var(--neo-white)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)', background: 'var(--neo-purple)', color: 'var(--neo-white)', padding: 'var(--space-xs) var(--space-sm)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', fontWeight: 800 }}>
            <RotateCcw size={18} /> Returns & Refunds
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: 'var(--space-xl)' }}>
            NOT QUITE RIGHT? <span className="neo-highlight neo-highlight--purple">LET'S FIX IT.</span>
          </h1>

          <div className="neo-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <RefreshCcw size={24} /> Our 30-Day Policy
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8, marginBottom: 'var(--space-md)' }}>
              We accept returns up to <strong>30 days after delivery</strong>, if the item is unused and in its original condition. We will refund the full order amount minus the shipping costs for the return.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
              <div style={{ flex: 1, border: '2px dashed var(--neo-black)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <CheckCircle2 size={32} color="var(--neo-lime)" style={{ margin: '0 auto var(--space-sm)' }} />
                <div style={{ fontWeight: 800, marginBottom: '4px' }}>Original Tags</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Must be attached</div>
              </div>
              <div style={{ flex: 1, border: '2px dashed var(--neo-black)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <CheckCircle2 size={32} color="var(--neo-lime)" style={{ margin: '0 auto var(--space-sm)' }} />
                <div style={{ fontWeight: 800, marginBottom: '4px' }}>Unworn Condition</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>No odors or stains</div>
              </div>
              <div style={{ flex: 1, border: '2px dashed var(--neo-black)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <CheckCircle2 size={32} color="var(--neo-lime)" style={{ margin: '0 auto var(--space-sm)' }} />
                <div style={{ fontWeight: 800, marginBottom: '4px' }}>Original Bag</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Must be included</div>
              </div>
            </div>
          </div>

          <div className="neo-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', background: 'var(--neo-yellow)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <AlertTriangle size={24} /> Exceptions & Non-Returnable Items
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
              Certain types of items cannot be returned due to hygiene and customization reasons:
            </p>
            <ul style={{ paddingLeft: 'var(--space-xl)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 600 }}>
              <li style={{ marginBottom: '8px' }}>Jerseys with custom name or number printing</li>
              <li style={{ marginBottom: '8px' }}>Undergarments and socks (if removed from packaging)</li>
              <li style={{ marginBottom: '8px' }}>Sale items or gift cards</li>
            </ul>
          </div>

          <div className="neo-card" style={{ padding: 'var(--space-xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>How to Start a Return</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8, marginBottom: 'var(--space-lg)' }}>
              To start a return, you can contact us at <strong>support@evokits.com</strong>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
            </p>
            <Link href="/contact" className="neo-btn neo-btn--primary">
              Contact Support Now
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
