"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

/* ── Floating orb decoration ── */
const Orb = ({ className, delay = 0, duration = 6 }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Hero() {
  /* Mouse‑driven 3‑D tilt on the image card */
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;   // -0.5 → +0.5
    const y = (e.clientY - top) / height - 0.5;
    rotateX.set(-y * 18);   // tilt up/down
    rotateY.set(x * 18);    // tilt left/right
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  /* Stagger variants for left text */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-linear-to-b from-[#F4F8F6] to-[#E6F2ED] overflow-hidden">

      {/* ── Background decorative orbs (matching reference palette) ── */}
      <Orb
        className="w-64 h-64 bg-[#A7D7C5]/30 top-10 right-[5%]"
        delay={0} duration={7}
      />
      <Orb
        className="w-48 h-48 bg-[#C5E8D8]/40 bottom-12 right-[20%]"
        delay={1.5} duration={5.5}
      />
      <Orb
        className="w-32 h-32 bg-[#D4EDE4]/50 top-1/3 left-[2%]"
        delay={0.8} duration={8}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-20 w-full grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* ══ LEFT — text content ══ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-3 py-1 rounded-full mb-6 tracking-wide lg:text-center">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
              Youth‑Led Climate Initiative
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-[2.8rem] lg:text-[3.6rem] leading-[1.1] font-bold text-[#0F3D2E] tracking-tight"
          >
            The Climate Clock
            <br />
            Is{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2E7D5B]">Ticking.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-1 left-0 w-full h-0.75 bg-[#2E7D5B]/40 origin-left rounded-full"
              />
            </span>
            <br />
            Action Cannot Wait.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-5 lg:mt-6 text-[0.95rem] lg:text-[1.05rem] leading-relaxed text-[#355F53] max-w-lg"
          >
            Carbon Clock is a youth‑led sustainability initiative focused on
            carbon literacy, climate education, and measurable environmental
            action. Together we drive change that lasts.
          </motion.p>

          {/* Trust strip — on mobile shows here (below paragraph, above image) */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex xl:hidden items-center gap-4 text-sm text-[#355F53] flex-wrap justify-center"
          >
            {["Carbon Literacy", "Global Reach", "Youth‑Driven"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#2E7D5B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs — hidden on mobile, visible on sm and above */}
          <motion.div variants={fadeUp} className="mt-6 lg:mt-8 hidden sm:flex flex-row flex-wrap gap-3 lg:gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(15,61,46,0.30)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 lg:px-8 lg:py-4 bg-[#0F3D2E] text-white rounded-lg text-sm lg:text-[15px] font-semibold tracking-wide transition-colors hover:bg-[#2E7D5B]"
            >
              Explore Carbon Clock
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#0F3D2E", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 lg:px-8 lg:py-4 border-2 border-[#0F3D2E] text-[#0F3D2E] rounded-lg text-sm lg:text-[15px] font-semibold tracking-wide transition-all"
            >
              Join Climate Correction Day
            </motion.button>
          </motion.div>

          {/* Trust strip — desktop only */}
          <motion.div
            variants={fadeUp}
            className="mt-12 hidden xl:flex items-center justify-center gap-6 text-sm text-[#355F53]"
          >
            {["Carbon Literacy", "Global Reach", "Youth‑Driven"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#2E7D5B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ RIGHT — 3‑D floating image card ══ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-center relative mt-10 xl:mt-0"
        >
          {/* Outer floating wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* 3‑D tilt card */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 800,
              }}
              className="relative w-80 h-65 sm:w-100 sm:h-80 md:w-95 md:h-77.5 lg:w-110 lg:h-90 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            >
              {/* The image — clean, no overlays or badges */}
              <Image
                src="/hero.png"
                alt="Climate Action"
                fill
                className="object-cover"
                priority
              />

              {/* Glossy shine layer only — no tint, no text */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Decorative ring behind card */}
            <div className="absolute -inset-6 rounded-3xl border-2 border-[#A7D7C5]/50 -z-10" />
            <div className="absolute -inset-12 rounded-3xl border border-[#A7D7C5]/25 -z-10" />

            {/* Glow blob behind */}
            <div className="absolute -inset-4 bg-[#A7D7C5]/20 rounded-3xl blur-2xl -z-20" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}