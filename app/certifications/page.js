"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Award, GraduationCap, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── Fade up on scroll ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const certifications = [
  {
    id: 1,
    emoji: "🌍",
    label: "COURSE 01",
    title: "Climate Change: Science & Solutions",
    level: "Foundational",
    headerBg: "#1A3D2B",
    overview:
      "Understand the climate system, drivers of change, and evidence-based global solutions from policy to technology.",
    topics: [
      "The Climate System & Greenhouse Effect",
      "Impacts, Risks & Tipping Points",
      "Mitigation, Adaptation & Global Frameworks",
    ],
    slug: "climate-change-science-solutions",
  },
  {
    id: 2,
    emoji: "📊",
    label: "COURSE 02",
    title: "Carbon Accounting & Reporting",
    level: "Intermediate",
    headerBg: "#1B3A5C",
    overview:
      "Master the principles and methodologies for measuring, reporting, and verifying corporate carbon footprints.",
    topics: [
      "Foundations of Carbon Accounting",
      "Scope 1, 2 & 3 Emissions Measurement",
      "Reporting Standards & Verification",
    ],
    slug: "carbon-accounting-reporting",
  },
  {
    id: 3,
    emoji: "🏭",
    label: "COURSE 03",
    title: "GHG Accounting & the GHG Protocol",
    level: "Intermediate-Advanced",
    headerBg: "#4A3800",
    overview:
      "Deep-dive into greenhouse gas accounting frameworks, IPCC categories, and corporate standard implementation.",
    topics: [
      "GHG Protocol: Corporate Standard",
      "Activity Data, Emission Factors & Calculations",
      "Target-Setting: SBTi, Net Zero & NDCs",
    ],
    slug: "ghg-accounting-protocol",
  },
  {
    id: 4,
    emoji: "♻️",
    label: "COURSE 04",
    title: "Life Cycle Assessment (LCA)",
    level: "Advanced",
    headerBg: "#3B1F72",
    overview:
      "Learn to quantify environmental impacts of products and systems from cradle to grave using ISO 14040/44 standards.",
    topics: [
      "LCA Fundamentals & ISO Framework",
      "Life Cycle Inventory & Impact Assessment",
      "Interpretation, Application & EPDs",
    ],
    slug: "life-cycle-assessment",
  },
  {
    id: 5,
    emoji: "🌿",
    label: "COURSE 05",
    title: "Sustainability Fundamentals & ESG",
    level: "Foundational-Intermediate",
    headerBg: "#1A4A38",
    overview:
      "Build a solid foundation in sustainability thinking, ESG frameworks, and the evolving corporate responsibility landscape.",
    topics: [
      "Sustainability Principles & the SDGs",
      "ESG Frameworks: GRI, TCFD, CSRD & CBAM",
      "Sustainable Business Strategy & Reporting",
    ],
    slug: "sustainability-fundamentals-esg",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Register / Apply",
    desc: "Sign up and choose your certification track",
    icon: "📝",
    color: "bg-[#E6F2ED]",
    border: "border-[#A7D7C5]",
  },
  {
    number: "02",
    title: "Learn",
    desc: "Online or hybrid structured learning sessions",
    icon: "📚",
    color: "bg-[#D4EDE4]",
    border: "border-[#A7D7C5]",
  },
  {
    number: "03",
    title: "Assessment",
    desc: "Complete a practical knowledge assessment",
    icon: "✍️",
    color: "bg-[#C5E8D8]",
    border: "border-[#2E7D5B]/40",
  },
  {
    number: "04",
    title: "Get Certified",
    desc: "Receive your official Carbon Clock certificate",
    icon: "🏆",
    color: "bg-[#2E7D5B]",
    border: "border-[#0F3D2E]",
    dark: true,
  },
];

export default function CertificationPage() {
  const router = useRouter();

  const handleRegisterClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/welcome");
    }
  };

  return (
    <main className="bg-[#F4F8F6] text-[#0F3D2E] overflow-hidden">

      {/* ══ HERO ══ */}
      <section className="relative text-center px-6 overflow-hidden h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/certificate.png')" }}
        />
        <div className="absolute inset-0 bg-[#0F3D2E]/60" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#F4F8F6]/40" />

        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
          className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-72 h-72 rounded-full border border-[#A7D7C5]/30 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.15, 0, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          className="absolute w-72 h-72 rounded-full border border-[#A7D7C5]/20 pointer-events-none"
        />

        <motion.div initial={{ opacity: 0, x: -20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#A7D7C5]/60 pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#A7D7C5]/60 pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#A7D7C5]/60 pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#A7D7C5]/60 pointer-events-none" />

        {[
          { size: 5, top: "20%", left: "6%", delay: 0, dur: 5 },
          { size: 3, top: "55%", left: "4%", delay: 1.5, dur: 7 },
          { size: 4, top: "80%", left: "8%", delay: 0.8, dur: 6 },
          { size: 5, top: "25%", left: "92%", delay: 0.3, dur: 6 },
          { size: 3, top: "60%", left: "94%", delay: 2, dur: 8 },
          { size: 4, top: "78%", left: "90%", delay: 1, dur: 5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            className="absolute rounded-full bg-[#A7D7C5]/70 pointer-events-none"
            style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeUp>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/20 px-4 py-1.5 rounded-full mb-5 tracking-wide border border-white/30">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Carbon Clock Certified
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-[#A7D7C5]">Certification</span>{" "}Programs
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-5 text-white/80 text-lg leading-relaxed">
              Industry-focused certification programs designed for students, professionals, and sustainability leaders seeking expertise in climate and carbon management.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-white/40 rounded-full" />
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="h-px w-16 bg-white/40 rounded-full" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ WHY CERTIFICATIONS ══ */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { icon: <BookOpen size={26} />, title: "Global Frameworks", text: "Aligned with GHG Protocol, ESG, ISO concepts" },
            { icon: <Award size={26} />, title: "Practical Learning", text: "Industry-focused, real-world approach" },
            { icon: <GraduationCap size={26} />, title: "Beginner to Pro", text: "Clear learning paths for all levels" },
            { icon: <CheckCircle size={26} />, title: "Certified by Carbon Clock", text: "Recognized digital certification" },
          ].map((f, i) => (
            <FadeUp key={i} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(15,61,46,0.12)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 text-center border border-[#A7D7C5]/50 shadow-sm group h-full flex flex-col items-center justify-start"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E6F2ED] flex items-center justify-center text-[#2E7D5B] group-hover:bg-[#2E7D5B] group-hover:text-white transition-colors duration-200 shrink-0">
                    {f.icon}
                  </div>
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-sm mb-2">{f.title}</h3>
                <p className="text-[#355F53] text-xs leading-relaxed">{f.text}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ CERTIFICATION CARDS — Dashboard Style (matching Figma/screenshot exactly) ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-4 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3D2E]">Available Certifications</h2>
          </div>
        </FadeUp>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .cert-font-serif { font-family: 'DM Serif Display', serif; }
        `}</style>

        {/* 3-column on desktop, 2-column on tablet, 1-column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <FadeUp key={index} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(15,61,46,0.14)" }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden bg-white border border-[#E0EDE8] shadow-sm flex flex-col h-full"
              >
                {/* ── Coloured header (matches dashboard exactly) ── */}
                <div
                  className="p-5 pb-6 relative"
                  style={{ backgroundColor: cert.headerBg }}
                >
                  {/* Emoji icon — larger, matches screenshot */}
                  <div className="text-4xl mb-4">{cert.emoji}</div>

                  {/* Course label */}
                  <p className="text-[#A7D7C5]/70 text-xs tracking-[0.14em] uppercase mb-1.5 font-medium">
                    {cert.label}
                  </p>

                  {/* Course title — bold serif, matches screenshot */}
                  <h3 className="cert-font-serif text-xl font-bold text-white leading-snug mb-3">
                    {cert.title}
                  </h3>

                  {/* Level badge */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs text-white/80 border border-white/25 font-medium"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    {cert.level}
                  </span>
                </div>

                {/* ── White body ── */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Overview text */}
                  <p className="text-[#5C7A6E] text-sm leading-relaxed mb-5">
                    {cert.overview}
                  </p>

                  {/* Module list — M1/M2/M3 badges exactly like dashboard */}
                  <ul className="space-y-0 mb-6 flex-grow">
                    {cert.topics.map((topic, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + j * 0.05 }}
                        className="flex items-center gap-3 py-3 border-b border-[#EEF5F1] last:border-0"
                      >
                        {/* M1 / M2 / M3 badge — matches screenshot */}
                        <span className="shrink-0 w-8 h-8 rounded-full bg-[#E6F2ED] text-[#2E7D5B] flex items-center justify-center text-[10px] font-bold border border-[#A7D7C5]/40">
                          M{j + 1}
                        </span>
                        <span className="text-[#3A5C50] text-sm leading-snug">{topic}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Register Now button */}
                  <motion.button
                    onClick={handleRegisterClick}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(15,61,46,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="w-full py-2.5 rounded-xl font-semibold text-white text-sm cursor-pointer transition-all flex items-center justify-center gap-2 mt-auto"
                    style={{ background: "#0F3D2E" }}
                  >
                    Register Now
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS — Visual Workflow ══ */}
      <section className="bg-[#E6F2ED] py-24 px-6 overflow-hidden relative">
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#A7D7C5]/30 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-4 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F3D2E]">How the Certification Works</h2>
              <p className="mt-3 text-[#355F53] max-w-xl mx-auto text-sm">
                From registration to receiving your certificate — a clear, structured journey
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 items-stretch">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center">
                <FadeUp delay={i * 0.15} className="w-full md:flex-1 h-full">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(15,61,46,0.18)" }}
                    transition={{ duration: 0.22 }}
                    className={`relative ${step.dark ? "bg-[#2E7D5B]" : "bg-white"} rounded-2xl p-6 border ${step.dark ? "border-[#0F3D2E]/20" : "border-[#A7D7C5]/60"} text-center shadow-sm flex flex-col items-center justify-start h-full min-h-50`}
                  >
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${step.dark ? "bg-[#0F3D2E] text-[#A7D7C5]" : "bg-[#2E7D5B] text-white"} flex items-center justify-center text-xs font-bold shadow-md`}>
                      {step.number}
                    </div>
                    <div className="mt-4 text-4xl mb-3">{step.icon}</div>
                    <h3 className={`font-bold text-base mb-1.5 ${step.dark ? "text-white" : "text-[#0F3D2E]"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${step.dark ? "text-[#D4EDE4]" : "text-[#355F53]"}`}>
                      {step.desc}
                    </p>
                  </motion.div>
                </FadeUp>

                {i < workflowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="shrink-0 mx-2 my-3 md:my-0"
                  >
                    <div className="hidden md:flex items-center">
                      <div className="w-4 h-0.5 bg-[#2E7D5B]/40" />
                      <ArrowRight size={16} className="text-[#2E7D5B]" />
                    </div>
                    <div className="md:hidden flex flex-col items-center">
                      <div className="h-5 w-0.5 bg-[#2E7D5B]/40" />
                      <svg className="text-[#2E7D5B] rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATION DETAILS ══ */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-5 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
            Program Details
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F3D2E] mb-10">Certification Details</h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: "Mode", value: "Online / Hybrid", icon: "💻" },
            { label: "Duration", value: "Short-term structured", icon: "⏱️" },
            { label: "Includes", value: "Material + Assessment + Certificate", icon: "📦" },
            { label: "Issued By", value: "Carbon Clock", icon: "🏛️" },
          ].map((d, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-[#A7D7C5]/50 shadow-sm text-center h-full min-h-35 flex flex-col justify-center"
              >
                <div className="text-3xl mb-3">{d.icon}</div>
                <p className="text-xs font-semibold text-[#2E7D5B] uppercase tracking-wide mb-1">{d.label}</p>
                <p className="text-[#0F3D2E] font-bold text-sm">{d.value}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

    </main>
  );
}