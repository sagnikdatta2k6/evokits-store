"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
  Package,
  HelpCircle,
  Settings
} from "lucide-react";
import { getSession, logout, type User as AuthUser } from "@/lib/auth";
import SlideDrawer from "./SlideDrawer";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();

  // Hide the customer Navbar completely if we are on any admin route
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { cart, wishlist, userProfile } = useStore();

  /* ---- Auth state ---- */
  useEffect(() => {
    setUser(getSession());

    const handleStorage = () => setUser(getSession());
    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-change", handleStorage);
    };
  }, []);

  /* ---- Scroll effect ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Close mobile menu on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ---- Lock body scroll when mobile menu open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link href="/" className="navbar__logo" style={{ textDecoration: 'none' }}>
            <img 
              src="/images/evokits-logo-light.png" 
              alt="EVOKITS Logo" 
              style={{ height: '64px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(2px 2px 0 var(--neo-black))' }} 
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`navbar__link ${isActive(link.href) ? "navbar__link--active" : ""}`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="navbar__link-underline"
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            
            {/* Wishlist & Cart Icons */}
            <div className="navbar__icon-actions">
              <button 
                className="navbar__icon-btn" 
                onClick={() => setWishlistOpen(true)}
                aria-label="Wishlist"
              >
                <Heart size={22} />
                <span className="navbar__icon-badge">{wishlist.length}</span>
              </button>
              <button 
                className="navbar__icon-btn" 
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                <span className="navbar__icon-badge">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
              </button>
            </div>

            <div className="navbar__divider" />

            {user ? (
              <div className="navbar__user-group" style={{ position: 'relative' }}>
                <button 
                  className="navbar__user-badge" 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{ cursor: 'pointer' }}
                >
                  {userProfile.avatar ? (
                    <img src={userProfile.avatar} alt="Avatar" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--neo-black)' }} />
                  ) : (
                    <User size={16} />
                  )}
                  <span>{userProfile.name.split(" ")[0]}</span>
                  <ChevronDown size={14} style={{ transform: userDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div 
                      className="navbar__user-dropdown neo-card"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '200px',
                        padding: 'var(--space-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        zIndex: 1000
                      }}
                    >
                      <Link href="/profile" className="neo-btn neo-btn--outline neo-btn--small" style={{ justifyContent: 'flex-start', border: 'none', boxShadow: 'none' }} onClick={() => setUserDropdownOpen(false)}>
                        <User size={14} /> Profile
                      </Link>
                      <Link href="/profile?tab=orders" className="neo-btn neo-btn--outline neo-btn--small" style={{ justifyContent: 'flex-start', border: 'none', boxShadow: 'none' }} onClick={() => setUserDropdownOpen(false)}>
                        <Package size={14} /> Orders
                      </Link>
                      <Link href="/profile?tab=help" className="neo-btn neo-btn--outline neo-btn--small" style={{ justifyContent: 'flex-start', border: 'none', boxShadow: 'none' }} onClick={() => setUserDropdownOpen(false)}>
                        <HelpCircle size={14} /> Help
                      </Link>
                      <div className="navbar__divider" style={{ width: '100%', height: '1px', margin: '4px 0' }} />
                      <button
                        className="neo-btn neo-btn--dark neo-btn--small"
                        onClick={handleLogout}
                        style={{ justifyContent: 'flex-start', border: 'none', boxShadow: 'none' }}
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="neo-btn neo-btn--outline neo-btn--small">
                  Log In
                </Link>
                <Link href="/signup" className="neo-btn neo-btn--primary neo-btn--small">
                  <User size={15} />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="navbar__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="navbar__drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="navbar__drawer-header">
                <img 
                  src="/images/evokits-logo-light.png" 
                  alt="EVOKITS Logo" 
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(1px 1px 0 var(--neo-black))' }} 
                />
              </div>

              {/* Mobile Quick Actions (Cart/Wishlist) */}
              <div className="navbar__drawer-quick-actions">
                <button className="neo-btn neo-btn--outline" onClick={() => { setMobileOpen(false); setWishlistOpen(true); }}>
                  <Heart size={18} /> Wishlist
                </button>
                <button className="neo-btn neo-btn--lime" onClick={() => { setMobileOpen(false); setCartOpen(true); }}>
                  <ShoppingCart size={18} /> Cart
                </button>
              </div>

              <ul className="navbar__drawer-links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`navbar__drawer-link ${isActive(link.href) ? "navbar__drawer-link--active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="navbar__drawer-dot" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="navbar__drawer-actions">
                {user ? (
                  <>
                    <div className="navbar__user-badge" style={{ marginBottom: "var(--space-md)" }}>
                      <User size={18} />
                      <span>{user.name}</span>
                    </div>
                    <button
                      className="neo-btn neo-btn--dark"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      style={{ width: "100%" }}
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="neo-btn neo-btn--outline"
                      onClick={() => setMobileOpen(false)}
                      style={{ width: "100%" }}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="neo-btn neo-btn--primary"
                      onClick={() => setMobileOpen(false)}
                      style={{ width: "100%" }}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <SlideDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Your Cart"
        side="right"
      >
        {cart.length === 0 ? (
          <div className="drawer-empty">
            <ShoppingCart size={64} className="drawer-empty-icon" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any jerseys yet.</p>
            <button 
              className="neo-btn neo-btn--primary" 
              style={{ marginTop: 'var(--space-md)' }}
              onClick={() => setCartOpen(false)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', paddingBottom: 'var(--space-md)' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: 'var(--space-sm)', borderBottom: '2px solid var(--neo-black)', paddingBottom: 'var(--space-sm)' }}>
                  <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${item.jersey.colors[0]}, ${item.jersey.colors[1]})`, border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    {item.jersey.badge}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>{item.jersey.name}</div>
                    <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{item.jersey.team} • Size {item.size}</div>
                    <div style={{ fontWeight: 900, marginTop: '4px' }}>₹{item.jersey.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 'var(--space-md)', borderTop: '3px solid var(--neo-black)', marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-md)', fontWeight: 900, fontSize: '1.2rem' }}>
                <span>Total</span>
                <span>₹{cart.reduce((total, item) => total + (item.jersey.price * item.quantity), 0).toLocaleString("en-IN")}</span>
              </div>
              <Link 
                href="/checkout" 
                className="neo-btn neo-btn--primary" 
                style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                onClick={() => setCartOpen(false)}
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        )}
      </SlideDrawer>

      {/* Wishlist Drawer */}
      <SlideDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        title="Your Wishlist"
        side="right"
      >
        <div className="drawer-empty">
          <Heart size={64} className="drawer-empty-icon" />
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite jerseys here for later.</p>
          <button 
            className="neo-btn neo-btn--pink" 
            style={{ marginTop: 'var(--space-md)' }}
            onClick={() => setWishlistOpen(false)}
          >
            Explore Jerseys
          </button>
        </div>
      </SlideDrawer>
    </>
  );
}
