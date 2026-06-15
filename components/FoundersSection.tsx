"use client";

import { motion } from "framer-motion";
import { founders } from "@/lib/data";

export default function FoundersSection() {
  return (
    <section className="founders section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="founders__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="neo-badge neo-badge--yellow">👋 Meet the Team</span>
          <h2 className="founders__title">The People Behind EVOKITS</h2>
          <p className="founders__subtitle">
            Built with passion for football and commitment to quality and
            customer satisfaction. This is just the beginning.
          </p>
        </motion.div>

        {/* Founder Cards */}
        <div className="founders__grid">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              className="founders__card neo-card"
              initial={{ opacity: 0, x: i === 0 ? -40 : 40, rotate: i === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 80 }}
            >
              {/* Avatar placeholder */}
              <div
                className="founders__avatar"
                style={{ background: founder.color }}
              >
                <span className="founders__avatar-emoji">{founder.emoji}</span>
                <div className="founders__avatar-initials">
                  {founder.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>

              <div className="founders__info">
                <h3 className="founders__name">{founder.name}</h3>
                <span
                  className="neo-badge founders__role"
                  style={{
                    background: founder.color,
                    color: "var(--neo-black)",
                  }}
                >
                  {founder.role}
                </span>
                <p className="founders__bio">{founder.bio}</p>
              </div>

              {/* Decorative quote */}
              <div className="founders__quote-mark" aria-hidden="true">
                &ldquo;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
