"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { featuredJerseys, type Jersey } from "@/lib/data";
import { Heart, ArrowRight } from "lucide-react";

import { useStore } from "@/lib/store";

function JerseyCard({ jersey, index }: { jersey: Jersey; index: number }) {
  const { setSelectedJersey, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.some((j) => j.id === jersey.id);

  const tagColors: Record<string, string> = {
    new: "neo-badge--purple",
    hot: "neo-badge--orange",
    sale: "neo-badge--pink",
    limited: "neo-badge--yellow",
  };

  return (
    <motion.div
      className="jersey-card neo-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ position: 'relative' }}
    >
      {/* Wishlist Button */}
      <button 
        className="neo-btn neo-btn--small" 
        onClick={(e) => { e.stopPropagation(); toggleWishlist(jersey); }}
        style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px', 
          zIndex: 10, 
          padding: '8px',
          background: isWishlisted ? 'var(--neo-pink)' : 'var(--neo-white)',
          border: '2px solid var(--neo-black)',
          borderRadius: '50%'
        }}
      >
        <Heart size={16} fill={isWishlisted ? 'var(--neo-black)' : 'transparent'} />
      </button>

      {/* Jersey Visual */}
      <div className="jersey-card__visual">
        {jersey.image ? (
          <div className="jersey-card__gradient" style={{ background: 'var(--neo-white)', borderBottom: 'var(--border-thin)' }}>
            <img src={jersey.image} alt={jersey.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div
            className="jersey-card__gradient"
            style={{
              background: `linear-gradient(145deg, ${jersey.colors[0]} 0%, ${jersey.colors[1]} 100%)`,
            }}
          >
            {/* Jersey silhouette overlay */}
            <div className="jersey-card__silhouette">
              <svg
                viewBox="0 0 200 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="jersey-card__svg"
              >
                <path
                  d="M40 10 L10 50 L10 80 L35 70 L35 210 L165 210 L165 70 L190 80 L190 50 L160 10 L130 25 C120 32 80 32 70 25 Z"
                  fill="rgba(255,255,255,0.15)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="jersey-card__badge-emoji">{jersey.badge}</span>
          </div>
        )}

        {/* Tag */}
        {jersey.tag && (
          <span className={`neo-badge ${tagColors[jersey.tag]} jersey-card__tag`}>
            {jersey.tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="jersey-card__info">
        <span className="jersey-card__league">{jersey.league}</span>
        <h4 className="jersey-card__team">{jersey.team}</h4>
        <p className="jersey-card__name">{jersey.name}</p>

        <div className="jersey-card__price-row">
          <span className="jersey-card__price">₹{jersey.price.toLocaleString("en-IN")}</span>
          {jersey.originalPrice && (
            <span className="jersey-card__original-price">
              ₹{jersey.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <button 
        className="neo-btn neo-btn--dark jersey-card__cta"
        onClick={() => setSelectedJersey(jersey)}
      >
        View Details
      </button>
    </motion.div>
  );
}

export default function FeaturedJerseys() {
  const [isMounted, setIsMounted] = useState(false);
  const { inventory } = useStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const featured = inventory.slice(0, 3);

  return (
    <section className="featured section">
      <div className="container">
        {/* Header */}
        <div className="featured__header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="neo-card" style={{ background: 'var(--neo-white)', padding: 'var(--space-lg)', display: 'inline-block' }}>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <span className="neo-badge neo-badge--orange">Trending Now</span>
              </div>
              <h2 className="featured__title" style={{ margin: 0, lineHeight: 1.1 }}>
                Featured Kits
              </h2>
              <p className="featured__subtitle" style={{ opacity: 1, fontWeight: 600, margin: 0, marginTop: '12px' }}>
                The most popular jerseys this season. Grab yours before they&#39;re gone.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Grid */}
        <div className="featured__grid">
          {featured.slice(0, 3).map((jersey, index) => (
            <JerseyCard key={jersey.id} jersey={jersey} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}
        >
          <Link href="/shop" className="neo-btn neo-btn--primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Explore All Jerseys
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ArrowRight size={24} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
