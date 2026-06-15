"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Heart, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__shapes" aria-hidden="true">
          <motion.div
            className="about-hero__shape about-hero__shape--1"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="about-hero__shape about-hero__shape--2"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="container about-hero__container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero__content"
          >
            <div className="neo-badge neo-badge--yellow about-hero__badge">
              <Star size={14} /> Our Story
            </div>
            <h1 className="about-hero__title">
              Built with Passion for the <span className="highlight-gold">Beautiful Game.</span>
            </h1>
            <p className="about-hero__subtitle">
              At EVOKITS, we&apos;re all about bringing football fans closer to the game with authentic jerseys from almost every team around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission section">
        <div className="container">
          <div className="about-mission__grid">
            <motion.div
              className="about-mission__text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Something for Every Football Lover</h2>
              <p>
                Whether you&apos;re supporting your favorite club through thick and thin, or building your dream kit collection, we&apos;ve got exactly what you need. 
              </p>
              <p>
                We believe that wearing your team&apos;s colors shouldn&apos;t break the bank. That&apos;s why we&apos;re committed to offering premium quality at the Best possible prices, ensuring you get unbeatable value without ever compromising on quality.
              </p>
              
              <ul className="about-mission__list">
                <li><Check size={20} className="text-gold" /> Authentic, premium-grade materials</li>
                <li><Check size={20} className="text-gold" /> Unbeatable value & competitive pricing</li>
                <li><Check size={20} className="text-gold" /> 100% customer satisfaction guarantee</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="about-mission__visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="neo-card about-mission__card">
                <div className="about-mission__card-icon">
                  <ShieldCheck size={40} />
                </div>
                <h3>Our Promise</h3>
                <p>Every jersey shipped from EVOKITS undergoes strict quality checks to ensure you receive only the best.</p>
              </div>
              <div className="neo-card neo-card--pink about-mission__card about-mission__card--offset">
                <div className="about-mission__card-icon">
                  <Heart size={40} />
                </div>
                <h3>For the Fans</h3>
                <p>Created by fans, for the fans. We share your unwavering passion for football.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="about-founders section">
        <div className="container">
          <motion.div
            className="about-founders__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Meet the Founders</h2>
            <p>The visionaries behind EVOKITS</p>
          </motion.div>
          
          <div className="about-founders__grid">
            {/* Arnesh Jana */}
            <motion.div
              className="neo-card about-founders__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="about-founders__avatar-wrap">
                <div className="about-founders__avatar about-founders__avatar--1">
                  AJ
                </div>
                <div className="neo-badge neo-badge--lime about-founders__role">Co-Founder</div>
              </div>
              <h3>Arnesh Jana</h3>
              <p>Driven by a lifelong obsession with football tactics and kit history, Arnesh co-founded EVOKITS to make premium jerseys accessible to everyone in the community.</p>
            </motion.div>
            
            {/* Samanway Roy */}
            <motion.div
              className="neo-card about-founders__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="about-founders__avatar-wrap">
                <div className="about-founders__avatar about-founders__avatar--2">
                  SR
                </div>
                <div className="neo-badge neo-badge--yellow about-founders__role">Co-Founder</div>
              </div>
              <h3>Samanway Roy</h3>
              <p>With an eye for design and a commitment to customer experience, Samanway ensures that every EVOKITS order delivers the ultimate matchday feeling.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="neo-card neo-card--lime about-cta__card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join the EVOKITS Family</h2>
            <p>Ready to wear your colors with pride? Browse our massive collection of authentic jerseys today.</p>
            <Link href="/shop" className="neo-btn neo-btn--primary neo-btn--large about-cta__btn">
              Shop Now <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
