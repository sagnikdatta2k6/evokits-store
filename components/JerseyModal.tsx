"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function JerseyModal() {
  const router = useRouter();
  const { selectedJersey, setSelectedJersey, addToCart } = useStore();
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (selectedJersey) {
      document.body.style.overflow = "hidden";
      setSize("");
      setQuantity(1);
      setJustAdded(false);
      setIsZoomed(false);
      setActiveImage(selectedJersey.image || (selectedJersey.gallery && selectedJersey.gallery.length > 0 ? selectedJersey.gallery[0] : null));
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedJersey]);

  if (!selectedJersey) return null;

  const stockAvailable = size && selectedJersey.stock ? (selectedJersey.stock[size] || 0) : 0;

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size first!");
      return;
    }
    if (stockAvailable === 0) {
      alert("This size is out of stock!");
      return;
    }
    addToCart(selectedJersey, size, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setSelectedJersey(null);
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!size) {
      alert("Please select a size first!");
      return;
    }
    if (stockAvailable === 0) {
      alert("This size is out of stock!");
      return;
    }
    addToCart(selectedJersey, size, quantity);
    setSelectedJersey(null);
    router.push("/checkout");
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <AnimatePresence>
      <div className="jersey-modal-overlay">
        <motion.div
          className="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedJersey(null)}
          style={{ zIndex: 3000 }} // Above everything
        />

        <motion.div
          className="jersey-modal-content neo-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button 
            className="jersey-modal-close"
            onClick={() => setSelectedJersey(null)}
          >
            <X size={24} />
          </button>

          <div className="jersey-modal-grid">
            {/* Visual Side */}
            {activeImage ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', borderRight: 'var(--border-thick)' }}>
                <div 
                  className="jersey-modal-visual"
                  style={{ background: 'var(--neo-white)', borderRight: 'none', borderBottom: 'var(--border-thick)', flex: 1, minHeight: 0, cursor: 'zoom-in' }}
                  onClick={() => setIsZoomed(true)}
                >
                  <img src={activeImage} alt={selectedJersey.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                {selectedJersey.gallery && selectedJersey.gallery.length > 0 && (
                  <div className="jersey-modal-gallery">
                    {selectedJersey.image && (
                      <img 
                        src={selectedJersey.image} 
                        className={`jersey-modal-thumbnail ${activeImage === selectedJersey.image ? 'active' : ''}`}
                        onClick={() => setActiveImage(selectedJersey.image!)}
                        alt="Main"
                      />
                    )}
                    {selectedJersey.gallery.map((g, idx) => (
                      <img 
                        key={idx}
                        src={g} 
                        className={`jersey-modal-thumbnail ${activeImage === g ? 'active' : ''}`}
                        onClick={() => setActiveImage(g)}
                        alt={`Gallery ${idx}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="jersey-modal-visual"
                style={{
                  background: `linear-gradient(135deg, ${selectedJersey.colors[0]} 0%, ${selectedJersey.colors[1]} 100%)`
                }}
              >
                <div className="jersey-modal-badge">{selectedJersey.badge}</div>
                <h2 className="jersey-modal-team-bg">{selectedJersey.team}</h2>
              </div>
            )}

            {/* Details Side */}
            <div className="jersey-modal-details">
              <div>
                <span className="neo-badge neo-badge--yellow" style={{ marginBottom: 'var(--space-sm)' }}>
                  {selectedJersey.league} {selectedJersey.year}
                </span>
                <h2 className="jersey-modal-title">{selectedJersey.name}</h2>
                <h3 className="jersey-modal-team">{selectedJersey.team}</h3>
                <div className="jersey-modal-price">₹{selectedJersey.price}</div>
              </div>

              {/* Size Selector */}
              <div className="jersey-modal-section">
                <h4>Select Size</h4>
                <div className="jersey-modal-sizes" style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {sizes.map(s => {
                    const sizeStock = selectedJersey.stock ? (selectedJersey.stock[s] || 0) : 0;
                    const isOutOfStock = sizeStock === 0;
                    
                    return (
                      <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <button
                          className={`neo-btn neo-btn--small ${size === s ? 'neo-btn--dark' : 'neo-btn--outline'}`}
                          onClick={() => {
                            if (!isOutOfStock) {
                              setSize(s);
                              setQuantity(1); // Reset qty on size change
                            }
                          }}
                          style={{
                            opacity: isOutOfStock ? 0.5 : 1,
                            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                          }}
                          disabled={isOutOfStock}
                        >
                          {s}
                        </button>
                        <span style={{ fontSize: '0.7rem', color: isOutOfStock ? 'var(--neo-pink)' : 'var(--neo-black)', fontWeight: 600 }}>
                          {isOutOfStock ? 'Out' : `${sizeStock} left`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="jersey-modal-section">
                <h4>Quantity</h4>
                <div className="jersey-modal-qty">
                  <button 
                    className="neo-btn neo-btn--outline" 
                    style={{ padding: '0.5rem' }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!size}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="jersey-modal-qty-value">{quantity}</span>
                  <button 
                    className="neo-btn neo-btn--outline" 
                    style={{ padding: '0.5rem' }}
                    onClick={() => setQuantity(Math.min(stockAvailable, quantity + 1))}
                    disabled={!size || quantity >= stockAvailable}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginTop: 'auto' }}>
                <button 
                  className={`neo-btn neo-btn--large ${justAdded ? 'neo-btn--lime' : 'neo-btn--outline'}`}
                  style={{ opacity: (!size || stockAvailable === 0) ? 0.5 : 1, cursor: (!size || stockAvailable === 0) ? 'not-allowed' : 'pointer' }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  {justAdded ? "Added!" : "Add to Cart"}
                </button>
                <button 
                  className="neo-btn neo-btn--large neo-btn--primary"
                  style={{ opacity: (!size || stockAvailable === 0) ? 0.5 : 1, cursor: (!size || stockAvailable === 0) ? 'not-allowed' : 'pointer' }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zoomed Image Overlay */}
        <AnimatePresence>
          {isZoomed && activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 4000,
                background: 'rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-out',
                padding: 'var(--space-md)'
              }}
              onClick={() => setIsZoomed(false)}
            >
              <button 
                style={{
                  position: 'absolute',
                  top: 'var(--space-md)',
                  right: 'var(--space-md)',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: 'var(--space-sm)',
                  zIndex: 4001
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
              >
                <X size={32} />
              </button>
              <img 
                src={activeImage} 
                alt="Zoomed" 
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
