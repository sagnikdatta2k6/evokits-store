"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { marqueeTeams } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Decorative floating shapes */}
      <div className="hero__shapes" aria-hidden="true">
        <motion.div
          className="hero__shape hero__shape--1"
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero__shape hero__shape--2"
          animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="hero__shape hero__shape--3"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="hero__shape hero__shape--4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="hero__shape hero__shape--5"
          animate={{ y: [0, 12, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="neo-badge neo-badge--lime hero__badge">
              <Zap size={12} /> New Season Kits Available
            </span>
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Authentic Jerseys,{" "}
            <span className="hero__title-highlight">Unbeatable</span>{" "}
            Prices.
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Bringing football fans closer to the game with premium kits from
            clubs around the world. Your team, your passion, your jersey.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link href="/shop" className="neo-btn neo-btn--primary neo-btn--large">
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="neo-btn neo-btn--outline neo-btn--large">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="hero__stat">
              <span className="hero__stat-number">500+</span>
              <span className="hero__stat-label">Jerseys Sold</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">50+</span>
              <span className="hero__stat-label">Teams Available</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">100%</span>
              <span className="hero__stat-label">Authentic</span>
            </div>
          </motion.div>
        </div>

        {/* Right — Jersey Visual */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className="hero__jersey-stack">
            {/* Stacked jersey cards */}
            <motion.div
              className="hero__jersey-card hero__jersey-card--back"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="hero__jersey-gradient"
                style={{
                  background: "linear-gradient(135deg, #004D98 0%, #A50044 100%)",
                }}
              />
              <span className="hero__jersey-team" style={{ background: 'var(--neo-white)', color: 'var(--neo-black)', padding: '4px 12px', border: '2px solid var(--neo-black)', borderRadius: '99px', width: 'fit-content', boxShadow: '2px 2px 0 var(--neo-black)', textShadow: 'none' }}>Barcelona</span>
            </motion.div>

            <motion.div
              className="hero__jersey-card hero__jersey-card--mid"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div
                className="hero__jersey-gradient"
                style={{
                  background: "linear-gradient(135deg, #DA291C 0%, #FBE122 100%)",
                }}
              />
              <span className="hero__jersey-team" style={{ background: 'var(--neo-white)', color: 'var(--neo-black)', padding: '4px 12px', border: '2px solid var(--neo-black)', borderRadius: '99px', width: 'fit-content', boxShadow: '2px 2px 0 var(--neo-black)', textShadow: 'none' }}>Man United</span>
            </motion.div>

            <motion.div
              className="hero__jersey-card hero__jersey-card--front"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div
                className="hero__jersey-gradient"
                style={{
                  background: "linear-gradient(135deg, #FEBE10 0%, #FFFFFF 100%)",
                }}
              />
              <span className="hero__jersey-team" style={{ background: 'var(--neo-white)', color: 'var(--neo-black)', padding: '4px 12px', border: '2px solid var(--neo-black)', borderRadius: '99px', width: 'fit-content', boxShadow: '2px 2px 0 var(--neo-black)', textShadow: 'none' }}>Real Madrid</span>
              <div className="hero__jersey-price neo-badge neo-badge--yellow">
                ₹1,499
              </div>
            </motion.div>
          </div>

          {/* Decorative sticker */}
          <motion.div
            className="neo-sticker neo-sticker--pink hero__sticker"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            New<br />Season<br />25/26
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="hero__marquee">
        <div className="hero__marquee-track">
          {[...marqueeTeams, ...marqueeTeams].map((team, i) => (
            <span key={i} className="hero__marquee-item">
              <span className="hero__marquee-dot">⚽</span>
              {team}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
