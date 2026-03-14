"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Leaf, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Show success popup, then redirect to login
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2500);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F8F6] flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background blobs */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#A7D7C5]/25 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#2E7D5B]/15 blur-3xl pointer-events-none" />

      {/* ── SUCCESS POPUP ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(15,61,46,0.50)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden text-center"
            >
              <div className="h-1.5 bg-linear-to-r from-[#0F3D2E] via-[#2E7D5B] to-[#A7D7C5]" />
              <div className="px-8 py-10">
                {/* Animated check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-[#E6F2ED] flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle size={32} className="text-[#2E7D5B]" />
                </motion.div>

                <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">
                  Account Created! 🎉
                </h3>
                <p className="text-[#355F53] text-sm leading-relaxed mb-6">
                  You have registered successfully. You can now log in to access your certifications.
                </p>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#E6F2ED] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "linear" }}
                    className="h-full bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5] rounded-full"
                  />
                </div>
                <p className="text-xs text-[#355F53]/60 mt-2">Redirecting to login...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md relative z-10">

        <FadeUp>
          <Link href="/" className="inline-flex items-center gap-2 text-[#355F53] text-sm mb-6 hover:text-[#0F3D2E] transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="h-1.5 bg-linear-to-r from-[#0F3D2E] via-[#2E7D5B] to-[#A7D7C5]" />

          <div className="px-8 py-8">
            <FadeUp delay={0.05} className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#0F3D2E] flex items-center justify-center">
                <Leaf size={18} className="text-[#A7D7C5]" />
              </div>
              <span className="font-bold text-[#0F3D2E] text-sm tracking-wide">Carbon Clock</span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-2xl font-bold text-[#0F3D2E] mb-1">Create your account</h1>
              <p className="text-[#355F53] text-sm mb-7">Join Carbon Clock and start your sustainability journey</p>
            </FadeUp>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">

              <FadeUp delay={0.15}>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                </div>
              </FadeUp>

              <FadeUp delay={0.25}>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input name="phone" type="tel" placeholder="Phone Number (optional)" value={form.phone} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="Create Password" value={form.password} onChange={handleChange} required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#355F53] hover:text-[#0F3D2E] transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FadeUp>

              <FadeUp delay={0.35}>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input name="confirm" type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#355F53] hover:text-[#0F3D2E] transition-colors">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2E7D5B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <> Create Account <ArrowRight size={15} /> </>
                  )}
                </motion.button>
              </FadeUp>

            </form>

            <FadeUp delay={0.45}>
              <p className="text-center text-sm text-[#355F53] mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-[#2E7D5B] font-semibold hover:text-[#0F3D2E] transition-colors">
                  Sign in
                </Link>
              </p>
            </FadeUp>

          </div>
        </motion.div>
      </div>
    </main>
  );
}