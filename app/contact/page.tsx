"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, MessageCircle, Map, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Mock form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Decorative Background */}
      <div className="contact-page__bg">
        <motion.div 
          className="contact-page__shape contact-page__shape--1"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="contact-page__shape contact-page__shape--2"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container">
        <div className="contact-page__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="neo-badge neo-badge--yellow mb-sm">
              <MessageCircle size={14} /> Get in Touch
            </div>
            <h1 className="contact-page__title">Let's Talk Football.</h1>
            <p className="contact-page__subtitle">
              Have a question about your order, want to request a specific team kit, or just want to chat about the weekend's fixtures? We're here for you.
            </p>
          </motion.div>
        </div>

        <div className="contact-page__grid">
          {/* Left Column - Contact Info */}
          <motion.div 
            className="contact-page__info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="neo-card contact-info-card">
              <h2 className="contact-info-card__title">Reach Out Directly</h2>
              
              <div className="contact-info-list">
                <a href="tel:9051306766" className="contact-item neo-card neo-card--lime">
                  <div className="contact-item__icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">Call / WhatsApp</span>
                    <span className="contact-item__value">9051306766</span>
                  </div>
                </a>

                <a href="mailto:contact@evokits.com" className="contact-item neo-card neo-card--blue">
                  <div className="contact-item__icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">Email Us</span>
                    <span className="contact-item__value">contact@evokits.com</span>
                  </div>
                </a>

                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-item neo-card neo-card--pink">
                  <div className="contact-item__icon">
                    <MessageCircle size={24} />
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">Instagram DM</span>
                    <span className="contact-item__value">@evokits</span>
                  </div>
                  <ExternalLink size={16} className="contact-item__arrow" />
                </a>
              </div>

              <div className="contact-map">
                <div className="contact-map__visual">
                  <Map size={48} className="contact-map__icon" />
                  <div className="contact-map__pin">
                    <MapPin size={24} />
                  </div>
                </div>
                <p>Based in India, shipping premium football kits worldwide.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            className="contact-page__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="neo-card contact-form-card">
              <h2>Send a Message</h2>
              <p className="mb-lg text-muted">Fill out the form below and we'll get back to you within 24 hours.</p>

              {status === "success" ? (
                <motion.div 
                  className="contact-form__success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="contact-form__success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="neo-input" 
                      placeholder="Lionel Messi"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      className="neo-input" 
                      placeholder="leo@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select 
                      id="subject" 
                      className="neo-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    >
                      <option value="">Select a topic...</option>
                      <option value="order">Order Inquiry</option>
                      <option value="request">Kit Request</option>
                      <option value="collab">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message"
                      className="neo-input contact-form__textarea" 
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="neo-btn neo-btn--primary contact-form__submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
            
            {/* Decorative element */}
            <div className="contact-page__sticker neo-sticker neo-sticker--yellow">
              We reply<br/>FAST! ⚡
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
