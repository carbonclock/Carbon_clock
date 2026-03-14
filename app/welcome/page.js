"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Explorer");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.name) setUserName(user.name.split(" ")[0]);
    } catch {}

    const outTimer = setTimeout(() => setLeaving(true), 3000);
    const redirectTimer = setTimeout(() => router.push("/dashboard"), 3800);
    return () => { clearTimeout(outTimer); clearTimeout(redirectTimer); };
  }, [router]);

  return (
    <motion.div
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F3D2E] overflow-hidden"
    >
      {/* Pulsing rings */}
      {[1, 1.6, 2.4].map((scale, i) => (
        <motion.div key={i}
          animate={{ scale: [1, scale, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
          className="absolute w-80 h-80 rounded-full border border-[#A7D7C5]/20 pointer-events-none" />
      ))}

      {/* Floating particles */}
      {[
        { top: "15%", left: "12%", size: 5, delay: 0,   dur: 5 },
        { top: "25%", left: "80%", size: 3, delay: 1,   dur: 7 },
        { top: "70%", left: "8%",  size: 4, delay: 0.5, dur: 6 },
        { top: "75%", left: "85%", size: 5, delay: 1.5, dur: 5 },
        { top: "50%", left: "5%",  size: 3, delay: 0.8, dur: 8 },
        { top: "40%", left: "92%", size: 4, delay: 0.3, dur: 6 },
      ].map((p, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className="absolute rounded-full bg-[#A7D7C5]"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }} />
      ))}

      {/* Corner accents */}
      {[
        { top: "2rem", left: "2rem",  borderClass: "border-t-2 border-l-2" },
        { top: "2rem", right: "2rem", borderClass: "border-t-2 border-r-2" },
        { bottom: "2rem", left: "2rem",  borderClass: "border-b-2 border-l-2" },
        { bottom: "2rem", right: "2rem", borderClass: "border-b-2 border-r-2" },
      ].map((c, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className={`absolute w-10 h-10 ${c.borderClass} border-[#A7D7C5]/30 pointer-events-none`}
          style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom }} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center flex flex-col items-center px-6">

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 120 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 rounded-2xl bg-[#2E7D5B]/50 blur-xl scale-150" />
          <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-[#2E7D5B] to-[#A7D7C5] flex items-center justify-center shadow-2xl">
            <Leaf size={36} className="text-white" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[#A7D7C5] text-sm font-medium tracking-widest uppercase mb-3"
        >
          Welcome to Carbon Clock
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Hello, {userName}! 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-[#A7D7C5]/70 text-sm max-w-xs leading-relaxed"
        >
          Taking you to your dashboard…
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }} animate={{ width: "100%" }}
            transition={{ duration: 2.6, delay: 0.8, ease: "linear" }}
            className="h-full bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5] rounded-full"
          />
        </motion.div>

        {/* Dots */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-1.5 mt-5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#A7D7C5]" />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}