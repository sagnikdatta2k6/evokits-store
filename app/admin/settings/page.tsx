"use client";

import { useState, useEffect } from "react";
import { Save, Lock, ShieldCheck, ShieldAlert, Key } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("EVOKITS");
  const [contactEmail, setContactEmail] = useState("contact@evokits.com");
  const [taxRate, setTaxRate] = useState("0");
  
  // Security State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  
  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [setupMode, setSetupMode] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [twoFactorMessage, setTwoFactorMessage] = useState("");

  useEffect(() => {
    fetch('/api/auth/2fa')
      .then(res => res.json())
      .then(data => setTwoFactorEnabled(data.isEnabled));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully! (Mock)");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage("");
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    const data = await res.json();
    if (res.ok) {
      setPwdMessage("✅ Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } else {
      setPwdMessage("❌ " + data.error);
    }
  };

  const start2FASetup = async () => {
    setTwoFactorMessage("");
    const res = await fetch('/api/auth/2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate' })
    });
    const data = await res.json();
    setQrCodeUrl(data.qrCodeUrl);
    setTwoFactorSecret(data.secret);
    setSetupMode(true);
  };

  const confirm2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'enable', secret: twoFactorSecret, token: tokenInput })
    });
    const data = await res.json();
    if (res.ok) {
      setTwoFactorEnabled(true);
      setSetupMode(false);
      setTwoFactorMessage("✅ 2FA Enabled Successfully");
    } else {
      setTwoFactorMessage("❌ " + data.error);
    }
  };

  const disable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'disable', password: disablePassword })
    });
    const data = await res.json();
    if (res.ok) {
      setTwoFactorEnabled(false);
      setDisablePassword("");
      setTwoFactorMessage("✅ 2FA Disabled");
    } else {
      setTwoFactorMessage("❌ " + data.error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-xl)' }}>Store Settings</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
        
        {/* Left Column: General Settings */}
        <div className="neo-card">
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>General</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <label className="neo-label">Store Name</label>
              <input type="text" className="neo-input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div>
              <label className="neo-label">Contact Email</label>
              <input type="email" className="neo-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div>
              <label className="neo-label">Tax Rate (%)</label>
              <input type="number" className="neo-input" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
            </div>
            <button type="submit" className="neo-btn neo-btn--primary" style={{ marginTop: 'var(--space-md)', alignSelf: 'flex-start' }}>
              <Save size={18} /> Save Settings
            </button>
          </form>
        </div>

        {/* Right Column: Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          
          {/* Change Password */}
          <div className="neo-card">
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={20} /> Change Password
            </h2>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label className="neo-label">Current Password</label>
                <input type="password" required className="neo-input" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div>
                <label className="neo-label">New Password</label>
                <input type="password" required minLength={4} className="neo-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              {pwdMessage && <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{pwdMessage}</div>}
              <button type="submit" className="neo-btn neo-btn--outline" style={{ alignSelf: 'flex-start' }}>Update Password</button>
            </form>
          </div>

          {/* 2FA */}
          <div className="neo-card" style={{ background: twoFactorEnabled ? 'var(--neo-lime)' : 'var(--neo-white)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {twoFactorEnabled ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />} 
              Two-Factor Authentication
            </h2>
            
            {twoFactorMessage && <div style={{ marginBottom: 'var(--space-md)', fontWeight: 600 }}>{twoFactorMessage}</div>}

            {!twoFactorEnabled && !setupMode && (
              <div>
                <p style={{ opacity: 0.8, marginBottom: 'var(--space-md)' }}>Add an extra layer of security to your admin account by requiring a 6-digit code from an authenticator app when you log in.</p>
                <button type="button" onClick={start2FASetup} className="neo-btn neo-btn--primary">Setup 2FA</button>
              </div>
            )}

            {!twoFactorEnabled && setupMode && (
              <form onSubmit={confirm2FA}>
                <p style={{ fontWeight: 600, marginBottom: '8px' }}>1. Scan this QR code with Google Authenticator or Authy</p>
                <div style={{ background: '#fff', padding: '16px', display: 'inline-block', borderRadius: '8px', border: '2px solid var(--neo-black)', marginBottom: 'var(--space-md)' }}>
                  {qrCodeUrl && <img src={qrCodeUrl} alt="2FA QR Code" width="150" height="150" />}
                </div>
                <p style={{ fontWeight: 600, marginBottom: '8px' }}>2. Enter the 6-digit code generated by the app</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" required placeholder="000000" maxLength={6} className="neo-input" value={tokenInput} onChange={e => setTokenInput(e.target.value)} style={{ width: '150px', letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800 }} />
                  <button type="submit" className="neo-btn neo-btn--primary">Verify & Enable</button>
                </div>
              </form>
            )}

            {twoFactorEnabled && (
              <form onSubmit={disable2FA}>
                <p style={{ fontWeight: 600, marginBottom: 'var(--space-md)' }}>2FA is currently active. Your account is secure.</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <div>
                    <label className="neo-label" style={{ fontSize: '0.8rem' }}>Enter password to disable</label>
                    <input type="password" required className="neo-input" value={disablePassword} onChange={e => setDisablePassword(e.target.value)} />
                  </div>
                  <button type="submit" className="neo-btn neo-btn--pink">Disable 2FA</button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
