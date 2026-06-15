"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("EVOKITS");
  const [contactEmail, setContactEmail] = useState("contact@evokits.com");
  const [taxRate, setTaxRate] = useState("0");
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully! (Mock)");
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>Store Settings</h1>

      <div className="neo-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          
          <div>
            <label className="neo-label">Store Name</label>
            <input 
              type="text" 
              className="neo-input" 
              value={storeName} 
              onChange={(e) => setStoreName(e.target.value)} 
            />
          </div>

          <div>
            <label className="neo-label">Contact Email</label>
            <input 
              type="email" 
              className="neo-input" 
              value={contactEmail} 
              onChange={(e) => setContactEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="neo-label">Tax Rate (%)</label>
            <input 
              type="number" 
              className="neo-input" 
              value={taxRate} 
              onChange={(e) => setTaxRate(e.target.value)} 
            />
          </div>

          <div style={{ marginTop: 'var(--space-md)' }}>
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>Payment Gateway</h3>
            <div style={{ padding: 'var(--space-sm)', border: '2px dashed var(--neo-black)', opacity: 0.7 }}>
              <p style={{ margin: 0 }}>Currently operating in <strong>Mock Mode</strong>.</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>Connect Stripe or Razorpay to accept real payments.</p>
            </div>
          </div>

          <button type="submit" className="neo-btn neo-btn--primary" style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}>
            <Save size={18} /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
