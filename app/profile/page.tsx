"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, HelpCircle, MapPin, CheckCircle, Download } from "lucide-react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, updateProfile, orders, cancelOrder } = useStore();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "help">("profile");

  // Local state for the form
  const [formData, setFormData] = useState(userProfile);
  const [saved, setSaved] = useState(false);
  const [confirmingCancelId, setConfirmingCancelId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get('tab');
      if (tab === 'orders' || tab === 'help') {
        setActiveTab(tab);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="profile-page" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div className="neo-card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)', background: 'var(--neo-white)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--neo-yellow)', border: '2px solid var(--neo-black)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={40} />
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.2rem', lineHeight: 1.1 }}>Welcome, {userProfile.name.split(" ")[0]}</h1>
              <p style={{ opacity: 0.7, margin: 0, fontWeight: 600 }}>@{userProfile.username}</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-sm)', borderTop: '2px solid var(--neo-black)', paddingTop: 'var(--space-md)' }}>
            <button 
              className={`neo-btn neo-btn--small ${activeTab === 'profile' ? 'neo-btn--dark' : 'neo-btn--outline'}`}
              onClick={() => setActiveTab('profile')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <User size={16} /> Personal Info
            </button>
            <button 
              className={`neo-btn neo-btn--small ${activeTab === 'orders' ? 'neo-btn--dark' : 'neo-btn--outline'}`}
              onClick={() => setActiveTab('orders')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <Package size={16} /> Order History
            </button>
            <button 
              className={`neo-btn neo-btn--small ${activeTab === 'help' ? 'neo-btn--dark' : 'neo-btn--outline'}`}
              onClick={() => setActiveTab('help')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <HelpCircle size={16} /> Help & Support
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="neo-card"
              style={{ padding: 'var(--space-xl)' }}
            >
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>Edit Profile</h2>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="neo-label">Full Name</label>
                    <input type="text" name="name" className="neo-input" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="neo-label">Username</label>
                    <input type="text" name="username" className="neo-input" value={formData.username} onChange={handleChange} required />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="neo-label">Email</label>
                    <input type="email" name="email" className="neo-input" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="neo-label">Phone Number</label>
                    <input type="tel" name="phone" className="neo-input" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <label className="neo-label">Avatar URL (Optional)</label>
                  <input type="text" name="avatar" className="neo-input" value={formData.avatar} onChange={handleChange} placeholder="https://..." />
                </div>

                <div>
                  <label className="neo-label">Delivery Address</label>
                  <input type="text" name="address" className="neo-input" value={formData.address} onChange={handleChange} required />
                </div>

                <div>
                  <label className="neo-label">Pincode</label>
                  <input type="text" name="pincode" className="neo-input" value={formData.pincode} onChange={handleChange} style={{ width: '200px' }} required />
                </div>

                <div style={{ marginTop: 'var(--space-md)' }}>
                  <button type="submit" className={`neo-btn ${saved ? 'neo-btn--lime' : 'neo-btn--primary'}`}>
                    {saved ? <><CheckCircle size={18}/> Saved!</> : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>Your Orders</h2>
              
              {orders.length === 0 ? (
                <div className="neo-card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                  <Package size={48} style={{ margin: '0 auto var(--space-md)', opacity: 0.3 }} />
                  <h3>No orders yet</h3>
                  <p style={{ opacity: 0.7, marginBottom: 'var(--space-md)' }}>Looks like you haven't bought any jerseys yet.</p>
                  <button className="neo-btn neo-btn--primary" onClick={() => router.push('/shop')}>Start Shopping</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  {orders.map((order) => (
                    <div key={order.id} className="neo-card" style={{ padding: 'var(--space-lg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--neo-black)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '1.2rem', textDecoration: order.status === 'Cancelled' ? 'line-through' : 'none' }}>Order #{order.id}</span>
                          <span style={{ marginLeft: 'var(--space-sm)', opacity: 0.6, fontSize: '0.9rem' }}>{order.date}</span>
                        </div>
                        <span className={`neo-badge ${order.status === 'Cancelled' ? 'neo-badge--pink' : 'neo-badge--lime'}`}>{order.status}</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {order.items.map(item => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                              <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${item.jersey.colors[0]}, ${item.jersey.colors[1]})`, border: '1px solid var(--neo-black)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                {item.jersey.badge}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700 }}>{item.jersey.name}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Size: {item.size} x {item.quantity}</div>
                              </div>
                            </div>
                            <div style={{ fontWeight: 800 }}>
                              ₹{(item.jersey.price * item.quantity).toLocaleString("en-IN")}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)', paddingTop: 'var(--space-md)', borderTop: '2px dashed var(--neo-black)' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, textDecoration: order.status === 'Cancelled' ? 'line-through' : 'none', opacity: order.status === 'Cancelled' ? 0.5 : 1 }}>
                          Total: ₹{order.total.toLocaleString("en-IN")}
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                          {order.status === 'Processing' && (
                            <button 
                              className={`neo-btn neo-btn--small ${confirmingCancelId === order.id ? 'neo-btn--dark' : 'neo-btn--pink'}`}
                              onClick={() => {
                                if (confirmingCancelId === order.id) {
                                  cancelOrder(order.id);
                                  setConfirmingCancelId(null);
                                } else {
                                  setConfirmingCancelId(order.id);
                                  setTimeout(() => setConfirmingCancelId(null), 3000); // reset after 3s
                                }
                              }}
                            >
                              {confirmingCancelId === order.id ? 'Click to Confirm' : 'Cancel Order'}
                            </button>
                          )}
                          <Link 
                            href={`/invoice/${order.id}`}
                            target="_blank"
                            className={`neo-btn neo-btn--outline neo-btn--small ${order.status === 'Cancelled' ? 'disabled' : ''}`}
                            style={{ textDecoration: 'none', pointerEvents: order.status === 'Cancelled' ? 'none' : 'auto', opacity: order.status === 'Cancelled' ? 0.5 : 1 }}
                          >
                            <Download size={16} /> Download Invoice
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'help' && (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="neo-card"
              style={{ padding: 'var(--space-xl)' }}
            >
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>Help & Support</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ padding: 'var(--space-md)', background: 'var(--neo-lime)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)' }}>
                  <h4>How long does delivery take?</h4>
                  <p>Standard delivery takes 3-5 business days across India.</p>
                </div>
                <div style={{ padding: 'var(--space-md)', background: 'var(--neo-yellow)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)' }}>
                  <h4>What is the return policy?</h4>
                  <p>We accept returns within 7 days of delivery for unworn items with tags intact.</p>
                </div>
                <div style={{ padding: 'var(--space-md)', background: 'var(--neo-pink)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)' }}>
                  <h4>Need to contact us directly?</h4>
                  <p>Email us at contact@evokits.com or WhatsApp us at 9051306766.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
