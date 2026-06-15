"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ShoppingBag, Check, ChevronDown, Heart } from "lucide-react";
import { jerseys, type Jersey } from "@/lib/data";

const leagues = Array.from(new Set(jerseys.map((j) => j.league)));
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,400", min: 0, max: 1399 },
  { label: "₹1,400 – ₹1,500", min: 1400, max: 1500 },
  { label: "Above ₹1,500", min: 1501, max: Infinity },
];

const tagColors: Record<string, string> = {
  new: "neo-badge--purple",
  hot: "neo-badge--orange",
  sale: "neo-badge--pink",
  limited: "neo-badge--yellow",
};

import { useStore } from "@/lib/store";

function ShopJerseyCard({ jersey, index }: { jersey: Jersey; index: number }) {
  const { setSelectedJersey, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.some((j) => j.id === jersey.id);

  return (
    <motion.div
      className="jersey-card neo-card"
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
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
          {jersey.originalPrice && (
            <span className="neo-badge neo-badge--lime" style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}>
              {Math.round(((jersey.originalPrice - jersey.price) / jersey.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>

      {/* View Details */}
      <motion.button
        className="neo-btn jersey-card__cta neo-btn--dark"
        onClick={() => setSelectedJersey(jersey)}
        whileTap={{ scale: 0.95 }}
      >
        <span className="jersey-card__cta-inner">
          View Details
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function ShopPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { inventory } = useStore();
  const [search, setSearch] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "low" | "high">("default");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const leagues = Array.from(new Set(inventory.map((j) => j.league)));

  const filtered = useMemo(() => {
    let result = inventory;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.team.toLowerCase().includes(q) ||
          j.name.toLowerCase().includes(q) ||
          j.league.toLowerCase().includes(q)
      );
    }

    // League filter
    if (selectedLeague !== "All") {
      result = result.filter((j) => j.league === selectedLeague);
    }

    // Price filter
    const range = priceRanges[selectedPrice];
    result = result.filter((j) => j.price >= range.min && j.price <= range.max);

    // Sort
    if (sortBy === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedLeague, selectedPrice, sortBy]);

  const activeFilterCount =
    (selectedLeague !== "All" ? 1 : 0) +
    (selectedPrice !== 0 ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const clearFilters = () => {
    setSelectedLeague("All");
    setSelectedPrice(0);
    setSortBy("default");
    setSearch("");
  };

  if (!isMounted) return null;

  return (
    <section className="shop-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="shop-page__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="neo-card" style={{ background: 'var(--neo-white)', padding: 'var(--space-lg)', display: 'inline-block' }}>
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="neo-badge neo-badge--lime">Shop</span>
            </div>
            <h1 className="shop-page__title" style={{ margin: 0, lineHeight: 1.1 }}>All Jerseys</h1>
            <p className="shop-page__subtitle" style={{ opacity: 1, fontWeight: 600, margin: 0, marginTop: '12px' }}>
              Browse our collection of authentic football jerseys from top clubs worldwide.
            </p>
          </div>
          <div className="shop-page__result-count">
            <span className="neo-badge neo-badge--yellow">
              {filtered.length} {filtered.length === 1 ? "jersey" : "jerseys"} found
            </span>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="shop-page__toolbar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Search */}
          <div className="shop-page__search">
            <Search size={18} className="shop-page__search-icon" />
            <input
              type="text"
              className="neo-input shop-page__search-input"
              placeholder="Search teams, leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="shop-page__search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle (mobile) + Sort */}
          <div className="shop-page__toolbar-right">
            <button
              className={`neo-btn neo-btn--outline neo-btn--small shop-page__filter-toggle ${filtersOpen ? "shop-page__filter-toggle--active" : ""}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="shop-page__filter-count">{activeFilterCount}</span>
              )}
            </button>

            <div className="shop-page__sort">
              <ChevronDown size={14} className="shop-page__sort-icon" />
              <select
                className="neo-input shop-page__sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "default" | "low" | "high")}
              >
                <option value="default">Sort: Default</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="shop-page__filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="shop-page__filters-inner">
                {/* League Filter */}
                <div className="shop-page__filter-group">
                  <label className="neo-label">League</label>
                  <div className="shop-page__filter-chips">
                    <button
                      className={`shop-page__chip ${selectedLeague === "All" ? "shop-page__chip--active" : ""}`}
                      onClick={() => setSelectedLeague("All")}
                    >
                      All Leagues
                    </button>
                    {leagues.map((league) => (
                      <button
                        key={league}
                        className={`shop-page__chip ${selectedLeague === league ? "shop-page__chip--active" : ""}`}
                        onClick={() => setSelectedLeague(league)}
                      >
                        {league}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="shop-page__filter-group">
                  <label className="neo-label">Price Range</label>
                  <div className="shop-page__filter-chips">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        className={`shop-page__chip ${selectedPrice === i ? "shop-page__chip--active" : ""}`}
                        onClick={() => setSelectedPrice(i)}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                {activeFilterCount > 0 && (
                  <button
                    className="neo-btn neo-btn--outline neo-btn--small"
                    onClick={clearFilters}
                  >
                    <X size={14} /> Clear All Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="shop-page__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((jersey, i) => (
              <ShopJerseyCard key={jersey.id} jersey={jersey} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            className="shop-page__empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="shop-page__empty-icon">🔍</div>
            <h3>No jerseys found</h3>
            <p>Try adjusting your search or filters to find what you&#39;re looking for.</p>
            <button className="neo-btn neo-btn--primary" onClick={clearFilters}>
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
