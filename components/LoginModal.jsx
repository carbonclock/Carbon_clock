"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose, onSwitchToSignup }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onClose();
      router.push("/welcome");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(15,61,46,0.55)", backdropFilter: "blur(6px)" }}
      >
        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0F3D2E] via-[#2E7D5B] to-[#A7D7C5]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F4F8F6] flex items-center justify-center text-[#0F3D2E] hover:bg-[#E6F2ED] transition-colors z-10"
          >
            <X size={16} />
          </button>

          <div className="px-8 py-8">
            {/* Brand */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#0F3D2E] flex items-center justify-center">
                <Leaf size={18} className="text-[#A7D7C5]" />
              </div>
              <span className="font-bold text-[#0F3D2E] text-sm tracking-wide">Carbon Clock</span>
            </div>

            <h2 className="text-2xl font-bold text-[#0F3D2E] mb-1">Welcome back</h2>
            <p className="text-[#355F53] text-sm mb-7">Sign in to access your certifications</p>

            {/* Error */}
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

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#355F53] hover:text-[#0F3D2E] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <button type="button" className="text-xs text-[#2E7D5B] hover:text-[#0F3D2E] font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2E7D5B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <> Sign In <ArrowRight size={15} /> </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#A7D7C5]/40" />
              <span className="text-xs text-[#355F53]">Don't have an account?</span>
              <div className="flex-1 h-px bg-[#A7D7C5]/40" />
            </div>

            {/* Switch to signup */}
            <motion.button
              onClick={onSwitchToSignup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 border-2 border-[#2E7D5B] text-[#2E7D5B] rounded-xl font-semibold text-sm hover:bg-[#2E7D5B] hover:text-white transition-all"
            >
              Create an Account
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}