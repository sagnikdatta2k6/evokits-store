"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, CreditCard, ArrowRight, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, userProfile, processOrder } = useStore();
  
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const subtotal = cart.reduce((acc, item) => acc + (item.jersey.price * item.quantity), 0);
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "EVO10") {
      setDiscount(subtotal * 0.1);
      alert("Coupon applied! 10% off.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setProcessing(true);

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: total,
      status: "Processing" as const
    };

    try {
      // Mock API call for emailing the invoice
      await fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder, userProfile })
      });
    } catch (err) {
      console.error("Failed to send email:", err);
      // We continue with the checkout even if email fails in this mock
    }

    processOrder(newOrder, cart);

    // Navigate to success
    router.push(`/success?order_id=${newOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-page" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'var(--neo-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="neo-card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <ShoppingBag size={48} style={{ margin: '0 auto var(--space-md)' }} />
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>You need items in your cart to checkout.</p>
          <button className="neo-btn neo-btn--primary" onClick={() => router.push('/shop')}>Go to Shop</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh', background: 'var(--neo-white)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xl)' }}>Checkout</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 'var(--space-xl)' }}>
          {/* Left Column: Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            
            {/* Delivery Details */}
            <div className="neo-card">
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Delivery Details</h2>
              <div style={{ padding: 'var(--space-sm)', background: 'var(--neo-lime)', border: '2px solid var(--neo-black)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ fontWeight: 700 }}>{userProfile.name}</p>
                <p>{userProfile.address}</p>
                <p>Pincode: {userProfile.pincode}</p>
                <p>Phone: {userProfile.phone}</p>
                <button className="neo-btn neo-btn--small neo-btn--outline" style={{ marginTop: 'var(--space-sm)' }} onClick={() => router.push('/profile')}>Edit Address</button>
              </div>
            </div>

            {/* Payment Details */}
            <div className="neo-card">
              <h2 style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={24} /> Secure Payment
              </h2>
              <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700 }}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')} 
                      style={{ accentColor: 'var(--neo-black)', width: '18px', height: '18px' }} 
                    />
                    Credit / Debit Card
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700 }}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')} 
                      style={{ accentColor: 'var(--neo-black)', width: '18px', height: '18px' }} 
                    />
                    Cash on Delivery (COD)
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="neo-label">Card Number</label>
                      <input type="text" className="neo-input" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                      <div>
                        <label className="neo-label">Expiry Date</label>
                        <input type="text" className="neo-input" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <label className="neo-label">CVV</label>
                        <input type="password" maxLength={4} className="neo-input" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <label className="neo-label">Name on Card</label>
                      <input type="text" className="neo-input" placeholder="JOHN DOE" required />
                    </div>
                  </>
                )}

                <button type="submit" className="neo-btn neo-btn--dark neo-btn--large" style={{ marginTop: 'var(--space-md)', width: '100%', justifyContent: 'center' }} disabled={processing}>
                  {processing ? "Processing Order..." : paymentMethod === 'card' ? `Pay ₹${total.toLocaleString("en-IN")}` : `Confirm Cash on Delivery`}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="neo-card">
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <div style={{ fontWeight: 700 }}>{item.quantity}x</div>
                      <div>
                        <div>{item.jersey.name}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Size: {item.size}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 800 }}>₹{(item.jersey.price * item.quantity).toLocaleString("en-IN")}</div>
                  </div>
                ))}
              </div>

              {/* Coupon Bar */}
              <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '2px dashed var(--neo-black)' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Tag size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                  <input 
                    type="text" 
                    className="neo-input" 
                    placeholder="Coupon Code (try EVO10)" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ paddingLeft: '32px', paddingRight: '8px' }}
                  />
                </div>
                <button className="neo-btn neo-btn--outline" onClick={handleApplyCoupon}>Apply</button>
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', paddingTop: 'var(--space-sm)', borderTop: '2px solid var(--neo-black)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 700 }}>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                    <span>Discount</span>
                    <span style={{ fontWeight: 700 }}>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping</span>
                  <span style={{ fontWeight: 700 }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-sm)', paddingTop: 'var(--space-sm)', borderTop: '2px solid var(--neo-black)', fontSize: '1.2rem', fontWeight: 900 }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
