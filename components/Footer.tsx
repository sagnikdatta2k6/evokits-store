"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Heart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide the customer Footer completely if we are on any admin route
  if (pathname.startsWith('/admin') || pathname.startsWith('/admin-login')) {
    return null;
  }

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop Jerseys" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact Us" },
  ];

  const supportLinks = [
    { href: "/login", label: "My Account" },
    { href: "/contact", label: "Order Inquiry" },
    { href: "/about", label: "Shipping Info" },
    { href: "/contact", label: "Returns" },
  ];

  return (
    <footer className="footer">
      {/* Zigzag divider */}
      <div className="neo-zigzag" />

      <div className="footer__inner container">
        {/* Brand Column */}
        <div className="footer__col footer__col--brand">
          <Link href="/" className="footer__logo" style={{ textDecoration: 'none' }}>
            <img 
              src="/images/evokits-logo-dark.png" 
              alt="EVOKITS Logo" 
              style={{ height: '56px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
          <p className="footer__tagline">
            Bringing football fans closer to the game with authentic jerseys
            from teams around the world. Premium quality, unbeatable prices.
          </p>
          <div className="footer__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Twitter"
            >
              <Globe size={20} />
            </a>
            <a
              href="mailto:contact@evokits.com"
              className="footer__social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__link-list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="footer__link">
                  <ArrowUpRight size={14} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__link-list">
            {supportLinks.map((link, i) => (
              <li key={`${link.label}-${i}`}>
                <Link href={link.href} className="footer__link">
                  <ArrowUpRight size={14} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer__col">
          <h4 className="footer__heading">Get in Touch</h4>
          <div className="footer__contact-items">
            <a href="tel:9051306766" className="footer__contact-item">
              <div className="footer__contact-icon">
                <Phone size={16} />
              </div>
              <div>
                <span className="footer__contact-label">Call / WhatsApp</span>
                <span className="footer__contact-value">9051306766</span>
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
              <div className="footer__contact-icon footer__contact-icon--pink">
                <MessageCircle size={16} />
              </div>
              <div>
                <span className="footer__contact-label">DM us on</span>
                <span className="footer__contact-value">Instagram</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p className="footer__copyright">
            © {currentYear} EVOKITS. All rights reserved.
          </p>
          <p className="footer__founders">
            Founded with <Heart size={13} className="footer__heart" /> by{" "}
            <strong>Arnesh Jana</strong> & <strong>Samanway Roy</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
