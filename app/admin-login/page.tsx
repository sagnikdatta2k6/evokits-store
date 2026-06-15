"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Secure HTTP-Only cookie has been set!
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh(); // Force a refresh to ensure middleware picks up the new cookie
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ minHeight: '100vh', background: 'var(--neo-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style dangerouslySetInnerHTML={{__html: `
        body { 
          background-image: none !important; 
          background-color: var(--neo-yellow) !important; 
        }
      `}} />
      <div className="neo-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', background: 'var(--neo-white)' }}>
        <div style={{ background: 'var(--neo-black)', color: 'var(--neo-white)', display: 'inline-flex', padding: 'var(--space-sm)', borderRadius: '50%', marginBottom: 'var(--space-md)' }}>
          <Lock size={32} />
        </div>
        <h1 style={{ marginBottom: 'var(--space-sm)' }}>Secure Admin Access</h1>
        <p style={{ marginBottom: 'var(--space-lg)', opacity: 0.7 }}>Server-Side Authentication Portal</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <input 
            type="password" 
            className="neo-input" 
            placeholder="Enter Master Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={loading}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem', margin: 0, textAlign: 'left', fontWeight: 700 }}>❌ Incorrect password or server error.</p>}
          <button type="submit" className="neo-btn neo-btn--primary" style={{ justifyContent: 'center' }} disabled={loading}>
            {loading ? "Verifying Credentials..." : "Authenticate Server"}
          </button>
        </form>
      </div>
    </section>
  );
}
