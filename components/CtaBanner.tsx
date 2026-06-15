"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="cta-banner section">
      <div className="container">
        <motion.div
          className="cta-banner__card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative shapes */}
          <div className="cta-banner__shapes" aria-hidden="true">
            <div className="cta-banner__shape cta-banner__shape--1" />
            <div className="cta-banner__shape cta-banner__shape--2" />
            <div className="cta-banner__shape cta-banner__shape--3" />
          </div>

          <motion.div
            className="cta-banner__content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="neo-badge neo-badge--yellow">⚽ Game Day Ready</span>
            <h2 className="cta-banner__title">
              Start Your Collection Today
            </h2>
            <p className="cta-banner__subtitle">
              Don&#39;t wait — your favorite team&#39;s jersey is just a click away.
              Join hundreds of satisfied fans who trust EVOKITS.
            </p>
            <div className="cta-banner__actions">
              <Link href="/shop" className="neo-btn neo-btn--primary neo-btn--large">
                Browse Jerseys
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="neo-btn neo-btn--outline neo-btn--large" style={{ background: "var(--neo-white)" }}>
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Sticker */}
          <motion.div
            className="neo-sticker neo-sticker--lime cta-banner__sticker"
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: -15 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            Free<br />Ship<br />⚡
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
