"use client";

import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        style={{ display: 'inline-flex', marginBottom: 'var(--space-lg)' }}
      >
        <div style={{ background: 'var(--neo-lime)', borderRadius: '50%', padding: 'var(--space-md)', border: '4px solid var(--neo-black)', boxShadow: '4px 4px 0 var(--neo-black)' }}>
          <CheckCircle size={64} color="var(--neo-black)" />
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}
      >
        Payment Successful!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: 'var(--space-xl)' }}
      >
        Thank you for your purchase. Your order #{orderId || "12345"} has been confirmed and is now being processed.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="neo-card"
        style={{ padding: 'var(--space-xl)', background: 'var(--neo-yellow)', marginBottom: 'var(--space-xl)' }}
      >
        <Package size={40} style={{ margin: '0 auto var(--space-md)' }} />
        <h3>What happens next?</h3>
        <p style={{ opacity: 0.8, marginTop: 'var(--space-sm)' }}>
          You will receive an email confirmation shortly. You can track the status of your order and download your invoice from your profile.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}
      >
        <Link href="/profile?tab=orders" className="neo-btn neo-btn--dark">
          <Package size={18} /> View Orders
        </Link>
        <Link href="/" className="neo-btn neo-btn--outline">
          <Home size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <section className="success-page" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'var(--neo-white)', display: 'flex', alignItems: 'center' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </section>
  );
}
