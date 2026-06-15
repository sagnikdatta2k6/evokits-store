"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Check,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { signup } from "@/lib/auth";

const steps = [
  { label: "Your Info", icon: "👤" },
  { label: "Security", icon: "🔒" },
  { label: "Done!", icon: "🎉" },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateStep1()) {
      setStep(1);
      setErrors({});
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateStep2()) return;

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const result = signup(name, email, password);

    if (result.success) {
      setSuccess(true);
      setStep(2);
      window.dispatchEvent(new Event("auth-change"));

      setTimeout(() => {
        router.push("/");
      }, 2500);
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
          initial={{ opacity: 0, y: 30, rotate: 1 }}
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
              <span className="neo-badge neo-badge--pink">
                <Sparkles size={12} /> Join the Team
              </span>
            </motion.div>
            <h1 className="auth-card__title">Sign Up</h1>
            <p className="auth-card__subtitle">
              Create your EVOKITS account and start your jersey collection.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="auth-card__steps">
            {steps.map((s, i) => (
              <div
                key={s.label}
                className={`auth-card__step ${i <= step ? "auth-card__step--active" : ""} ${i < step ? "auth-card__step--done" : ""}`}
              >
                <motion.div
                  className="auth-card__step-circle"
                  animate={i === step ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {i < step ? <Check size={14} /> : <span>{s.icon}</span>}
                </motion.div>
                <span className="auth-card__step-label">{s.label}</span>
                {i < steps.length - 1 && <div className="auth-card__step-line" />}
              </div>
            ))}
          </div>

          {/* Server Error */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                className="auth-card__server-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                <span>⚠️ {serverError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-card__form" noValidate>
            <AnimatePresence mode="wait">
              {/* Step 1: Name & Email */}
              {step === 0 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="auth-card__step-fields"
                >
                  {/* Name */}
                  <div className="neo-field">
                    <label className="neo-label" htmlFor="signup-name">
                      Full Name
                    </label>
                    <div className="auth-card__input-wrap">
                      <User size={18} className="auth-card__input-icon" />
                      <input
                        id="signup-name"
                        type="text"
                        className={`neo-input auth-card__input ${errors.name ? "neo-input--error" : ""}`}
                        placeholder="Arnesh Jana"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                        }}
                        autoComplete="name"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          className="neo-error-text"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="neo-field">
                    <label className="neo-label" htmlFor="signup-email">
                      Email Address
                    </label>
                    <div className="auth-card__input-wrap">
                      <Mail size={18} className="auth-card__input-icon" />
                      <input
                        id="signup-email"
                        type="email"
                        className={`neo-input auth-card__input ${errors.email ? "neo-input--error" : ""}`}
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
                          exit={{ opacity: 0 }}
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    className="neo-btn neo-btn--primary neo-btn--large auth-card__submit"
                    onClick={handleNext}
                  >
                    Next Step <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Password */}
              {step === 1 && !success && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="auth-card__step-fields"
                >
                  {/* Password */}
                  <div className="neo-field">
                    <label className="neo-label" htmlFor="signup-password">
                      Password
                    </label>
                    <div className="auth-card__input-wrap">
                      <Lock size={18} className="auth-card__input-icon" />
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        className={`neo-input auth-card__input ${errors.password ? "neo-input--error" : ""}`}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors((p) => ({ ...p, password: "" }));
                        }}
                        autoComplete="new-password"
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
                          exit={{ opacity: 0 }}
                        >
                          {errors.password}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div className="neo-field">
                    <label className="neo-label" htmlFor="signup-confirm">
                      Confirm Password
                    </label>
                    <div className="auth-card__input-wrap">
                      <Lock size={18} className="auth-card__input-icon" />
                      <input
                        id="signup-confirm"
                        type="password"
                        className={`neo-input auth-card__input ${errors.confirmPassword ? "neo-input--error" : ""}`}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword)
                            setErrors((p) => ({ ...p, confirmPassword: "" }));
                        }}
                        autoComplete="new-password"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.confirmPassword && (
                        <motion.span
                          className="neo-error-text"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {errors.confirmPassword}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="auth-card__btn-row">
                    <button
                      type="button"
                      className="neo-btn neo-btn--outline"
                      onClick={() => {
                        setStep(0);
                        setErrors({});
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="neo-btn neo-btn--primary neo-btn--large"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="auth-card__loading">
                          <span className="auth-card__spinner" />
                          Creating...
                        </span>
                      ) : (
                        <>
                          Create Account <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {success && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="auth-card__success"
                >
                  <motion.div
                    className="auth-card__success-icon"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <PartyPopper size={48} />
                  </motion.div>
                  <h2>Welcome aboard, {name.split(" ")[0]}!</h2>
                  <p>Your account has been created successfully. Redirecting you to the homepage...</p>

                  {/* Confetti dots */}
                  <div className="auth-card__confetti" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="auth-card__confetti-dot"
                        style={{
                          background: [
                            "var(--neo-lime)",
                            "var(--neo-pink)",
                            "var(--neo-yellow)",
                            "var(--neo-blue)",
                            "var(--neo-purple)",
                            "var(--neo-orange)",
                          ][i % 6],
                          left: `${10 + Math.random() * 80}%`,
                        }}
                        initial={{ y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          y: [0, -(80 + Math.random() * 120), 200],
                          opacity: [1, 1, 0],
                          scale: [1, 1.3, 0.5],
                          x: (Math.random() - 0.5) * 100,
                        }}
                        transition={{
                          duration: 1.5 + Math.random() * 0.5,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Footer (only show on step 0 & 1) */}
          {!success && (
            <motion.p
              className="auth-card__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Already have an account?{" "}
              <Link href="/login" className="auth-card__link">
                Log In <ArrowRight size={13} />
              </Link>
            </motion.p>
          )}
        </motion.div>

        {/* Right — Decorative Panel */}
        <motion.div
          className="auth-page__decor"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="auth-page__decor-card neo-card neo-card--pink">
            <div className="auth-page__decor-emoji">🏟️</div>
            <h2 className="auth-page__decor-title">
              Join the<br />EVOKITS Family
            </h2>
            <p className="auth-page__decor-text">
              Get access to exclusive drops, early releases, and the best deals
              on authentic football jerseys.
            </p>
            <div className="auth-page__decor-perks">
              <div className="auth-page__decor-perk">
                <Check size={14} /> Exclusive Deals
              </div>
              <div className="auth-page__decor-perk">
                <Check size={14} /> Early Access
              </div>
              <div className="auth-page__decor-perk">
                <Check size={14} /> Order Tracking
              </div>
            </div>
          </div>

          <motion.div
            className="neo-sticker neo-sticker--yellow auth-page__sticker"
            animate={{ y: [0, -10, 0], rotate: [-12, -5, -12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Free<br />Sign<br />Up!
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
