"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shakeField, setShakeField] = useState("");

  const triggerShake = (field: string) => {
    setShakeField(field);
    setTimeout(() => setShakeField(""), 500);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      triggerShake("email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      triggerShake("email");
    }

    if (!password) {
      newErrors.password = "Password is required";
      triggerShake("password");
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      triggerShake("password");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const result = login(email, password);

    if (result.success) {
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    } else {
      setServerError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page">
      {/* Decorative shapes */}
      <div className="auth-page__shapes" aria-hidden="true">
        <motion.div
          className="auth-page__shape auth-page__shape--1"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="auth-page__shape auth-page__shape--2"
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="auth-page__shape auth-page__shape--3"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container auth-page__container">
        {/* Left — Form Card */}
        <motion.div
          className="auth-card neo-card"
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          {/* Header */}
          <div className="auth-card__header">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="neo-badge neo-badge--lime">
                <Sparkles size={12} /> Welcome Back
              </span>
            </motion.div>
            <h1 className="auth-card__title">Log In</h1>
            <p className="auth-card__subtitle">
              Sign in to your EVOKITS account to continue shopping.
            </p>
          </div>

          {/* Server Error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                className="auth-card__server-error"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                <span>⚠️ {serverError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-card__form" noValidate>
            {/* Email */}
            <motion.div
              className="neo-field"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="neo-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="auth-card__input-wrap">
                <Mail size={18} className="auth-card__input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className={`neo-input auth-card__input ${errors.email ? "neo-input--error" : ""} ${shakeField === "email" ? "neo-input--error" : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                  }}
                  autoComplete="email"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    className="neo-error-text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div
              className="neo-field"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label className="neo-label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-card__input-wrap">
                <Lock size={18} className="auth-card__input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className={`neo-input auth-card__input ${errors.password ? "neo-input--error" : ""} ${shakeField === "password" ? "neo-input--error" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                  }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-card__eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.span
                    className="neo-error-text"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="neo-btn neo-btn--primary neo-btn--large auth-card__submit"
              disabled={isLoading}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {isLoading ? (
                <span className="auth-card__loading">
                  <span className="auth-card__spinner" />
                  Signing in...
                </span>
              ) : (
                <>
                  Log In <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="auth-card__divider">
            <span>or</span>
          </div>

          {/* Social Buttons (Decorative) */}
          <motion.div
            className="auth-card__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <button className="neo-btn neo-btn--outline auth-card__social-btn" type="button">
              🌐 Continue with Google
            </button>
          </motion.div>

          {/* Footer */}
          <motion.p
            className="auth-card__footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-card__link">
              Sign Up <ArrowRight size={13} />
            </Link>
          </motion.p>
        </motion.div>

        {/* Right — Decorative Panel */}
        <motion.div
          className="auth-page__decor"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="auth-page__decor-card neo-card neo-card--lime">
            <div className="auth-page__decor-emoji">⚽</div>
            <h2 className="auth-page__decor-title">
              Welcome to<br />EVOKITS
            </h2>
            <p className="auth-page__decor-text">
              Your favorite team&apos;s jersey is just a login away. Join hundreds
              of football fans who trust us.
            </p>
            <div className="auth-page__decor-stats">
              <div className="auth-page__decor-stat">
                <span className="auth-page__decor-stat-num">500+</span>
                <span className="auth-page__decor-stat-label">Happy Fans</span>
              </div>
              <div className="auth-page__decor-stat">
                <span className="auth-page__decor-stat-num">50+</span>
                <span className="auth-page__decor-stat-label">Teams</span>
              </div>
            </div>
          </div>

          {/* Floating sticker */}
          <motion.div
            className="neo-sticker neo-sticker--pink auth-page__sticker"
            animate={{ y: [0, -10, 0], rotate: [-12, -5, -12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Game<br />On!<br />⚡
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
