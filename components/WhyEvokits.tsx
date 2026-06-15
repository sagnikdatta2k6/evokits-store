"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";

export default function WhyEvokits() {
  return (
    <section className="why-us section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="why-us__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neo-badge neo-badge--purple">✦ Why Us</span>
          <h2 className="why-us__title">
            Why Choose <span style={{ color: "var(--neo-pink)" }}>EVOKITS</span>?
          </h2>
          <p className="why-us__subtitle">
            We&apos;re not just selling jerseys — we&apos;re building a community of
            passionate football fans who deserve the best.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="why-us__grid">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="why-us__card neo-card"
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div
                className="why-us__icon"
                style={{ background: feature.color }}
              >
                <span>{feature.icon}</span>
              </div>
              <h3 className="why-us__card-title">{feature.title}</h3>
              <p className="why-us__card-desc">{feature.description}</p>

              {/* Decorative corner */}
              <div
                className="why-us__corner"
                style={{ background: feature.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
