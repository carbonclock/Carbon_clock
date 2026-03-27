"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf, ArrowLeft } from "lucide-react";
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

export default function LoginPage() {
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
      localStorage.setItem("loginAt", Date.now().toString());

      // Go to welcome splash which then redirects to dashboard
      router.push("/welcome");

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
              <h1 className="text-2xl font-bold text-[#0F3D2E] mb-1">Welcome back</h1>
              <p className="text-[#355F53] text-sm mb-7">Sign in to access your certifications</p>
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

            <form onSubmit={handleLogin} className="space-y-4">

              <FadeUp delay={0.15}>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input type="email" placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A7D7C5]" />
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-[#A7D7C5]/60 bg-[#F4F8F6] text-[#0F3D2E] text-sm placeholder-[#355F53]/50 focus:outline-none focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/10 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#355F53] hover:text-[#0F3D2E] transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FadeUp>

              <FadeUp delay={0.25}>
                <div className="text-right">
                  <button type="button" className="text-xs text-[#2E7D5B] hover:text-[#0F3D2E] font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2E7D5B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <> Sign In <ArrowRight size={15} /> </>
                  )}
                </motion.button>
              </FadeUp>

            </form>

            <FadeUp delay={0.35}>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#A7D7C5]/40" />
                <span className="text-xs text-[#355F53]">Don't have an account?</span>
                <div className="flex-1 h-px bg-[#A7D7C5]/40" />
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link href="/signup"
                className="w-full py-3.5 border-2 border-[#2E7D5B] text-[#2E7D5B] rounded-xl font-semibold text-sm hover:bg-[#2E7D5B] hover:text-white transition-all flex items-center justify-center gap-2">
                Create an Account
              </Link>
            </FadeUp>

          </div>
        </motion.div>
      </div>
    </main>
  );
}