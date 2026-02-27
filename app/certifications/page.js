"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Award, GraduationCap, CheckCircle, ArrowRight } from "lucide-react";

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
    title: "Sustainability Basics Certification",
    overview: "An introductory program covering core environmental and sustainability principles.",
    topics: [
      "Climate Change & Global Warming",
      "ESG Fundamentals",
      "Life Cycle Assessment (LCA) Basics",
      "Product Carbon Footprint (PCF)",
      "Scope 1, 2 & 3 Emissions",
      "Net Zero & Carbon Neutrality",
    ],
    audience: "Students, graduates, early-career professionals, and sustainability beginners.",
    outcome: "Strong foundational understanding of sustainability concepts and global climate frameworks.",
    level: "Beginner",
    badge: "🌱",
  },
  {
    title: "GHG Accounting Certification",
    overview: "A practical certification focused on organizational greenhouse gas accounting and reporting.",
    topics: [
      "GHG Protocol Framework",
      "Scope 1, 2 & 3 Accounting",
      "Emission Factors & Data Collection",
      "Activity vs Spend-Based Methods",
      "ISO 14064 Introduction",
      "Carbon Reporting & Disclosure",
    ],
    audience: "Engineers, sustainability professionals, consultants, and ESG teams.",
    outcome: "Ability to quantify, calculate, and report organizational emissions accurately.",
    level: "Intermediate",
    badge: "📊",
  },
  {
    title: "Carbon Accounting Basics Certification",
    overview: "A structured program focused on product and corporate carbon footprint calculation.",
    topics: [
      "Product Carbon Footprint (PCF)",
      "Corporate Carbon Footprint (CCF)",
      "Life Cycle Thinking",
      "Emission Allocation Principles",
      "Basic Reporting & Documentation",
    ],
    audience: "Environmental engineers, LCA enthusiasts, and sustainability analysts.",
    outcome: "Practical understanding of carbon measurement methodologies.",
    level: "Advanced",
    badge: "♻️",
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
  return (
    <main className="bg-[#F4F8F6] text-[#0F3D2E] overflow-hidden">

      {/* ══ HERO ══ */}
      <section className="relative text-center px-6 overflow-hidden h-screen flex items-center justify-center">

        {/* Ken Burns zoom on background image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/certificate.png')" }}
        />
        {/* Green tint overlay */}
        <div className="absolute inset-0 bg-[#0F3D2E]/60" />
        {/* Bottom fade out */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F4F8F6]/40" />

        {/* Animated shimmer bands */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Glowing pulsing ring — center */}
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

        {/* Corner accent lines */}
        {/* Top-left */}
        <motion.div initial={{ opacity: 0, x: -20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#A7D7C5]/60 pointer-events-none" />
        {/* Top-right */}
        <motion.div initial={{ opacity: 0, x: 20, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#A7D7C5]/60 pointer-events-none" />
        {/* Bottom-left */}
        <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#A7D7C5]/60 pointer-events-none" />
        {/* Bottom-right */}
        <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#A7D7C5]/60 pointer-events-none" />

        {/* Floating dots — left and right sides only */}
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
              <span className="h-[1px] w-16 bg-white/40 rounded-full" />
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="h-[1px] w-16 bg-white/40 rounded-full" />
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
                  <div className="w-14 h-14 rounded-2xl bg-[#E6F2ED] flex items-center justify-center text-[#2E7D5B] group-hover:bg-[#2E7D5B] group-hover:text-white transition-colors duration-200 flex-shrink-0">
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

      {/* ══ CERTIFICATION CARDS ══ */}
      <section className="max-w-6xl mx-auto px-6 pb-24 space-y-8">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-4 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3D2E]">Available Certifications</h2>
          </div>
        </FadeUp>

        {certifications.map((cert, index) => (
          <FadeUp key={index} delay={index * 0.1}>
            <motion.div
              whileHover={{ boxShadow: "0 20px 52px rgba(15,61,46,0.12)" }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-[#A7D7C5]/50 shadow-sm overflow-hidden"
            >
              {/* Card top accent */}
              <div className="h-[3px] bg-gradient-to-r from-[#2E7D5B] to-[#A7D7C5]" />

              <div className="p-7 md:p-10">
                {/* Title row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <span className="text-3xl">{cert.badge}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl md:text-2xl font-bold text-[#0F3D2E]">{cert.title}</h2>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E6F2ED] text-[#2E7D5B] border border-[#A7D7C5]/50">
                        {cert.level}
                      </span>
                    </div>
                    <p className="text-[#355F53] text-sm mt-1">{cert.overview}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  {/* Topics */}
                  <div>
                    <h3 className="font-bold text-[#0F3D2E] mb-3 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#2E7D5B] inline-block" />
                      Key Topics
                    </h3>
                    <ul className="space-y-2">
                      {cert.topics.map((topic, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-2 text-[#355F53] text-sm"
                        >
                          <CheckCircle size={14} className="text-[#2E7D5B] mt-0.5 flex-shrink-0" />
                          {topic}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Audience + Outcome */}
                  <div className="space-y-5">
                    <div className="bg-[#F4F8F6] rounded-xl p-4 border border-[#A7D7C5]/40">
                      <h3 className="font-bold text-[#0F3D2E] text-sm mb-1">👥 Who Should Join?</h3>
                      <p className="text-[#355F53] text-sm">{cert.audience}</p>
                    </div>
                    <div className="bg-[#E6F2ED] rounded-xl p-4 border border-[#A7D7C5]/40">
                      <h3 className="font-bold text-[#0F3D2E] text-sm mb-1">🎯 Outcome</h3>
                      <p className="text-[#355F53] text-sm">{cert.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(15,61,46,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="px-7 py-3 bg-[#0F3D2E] text-white rounded-xl font-semibold text-sm hover:bg-[#2E7D5B] transition-colors inline-flex items-center gap-2"
                  >
                    Register Now
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </section>

      {/* ══ HOW IT WORKS — Visual Workflow ══ */}
      <section className="bg-[#E6F2ED] py-24 px-6 overflow-hidden relative">
        {/* Orb */}
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

          {/* Workflow diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 items-stretch">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center">

                {/* Step card — equal size via flex */}
                <FadeUp delay={i * 0.15} className="w-full md:flex-1 h-full">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(15,61,46,0.18)" }}
                    transition={{ duration: 0.22 }}
                    className={`relative ${step.dark ? "bg-[#2E7D5B]" : "bg-white"} rounded-2xl p-6 border ${step.dark ? "border-[#0F3D2E]/20" : "border-[#A7D7C5]/60"} text-center shadow-sm flex flex-col items-center justify-start h-full min-h-[200px]`}
                  >
                    {/* Number badge */}
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

                {/* Arrow connector (not after last) */}
                {i < workflowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex-shrink-0 mx-2 my-3 md:my-0"
                  >
                    <div className="hidden md:flex items-center">
                      <div className="w-4 h-[2px] bg-[#2E7D5B]/40" />
                      <ArrowRight size={16} className="text-[#2E7D5B]" />
                    </div>
                    <div className="md:hidden flex flex-col items-center">
                      <div className="h-5 w-[2px] bg-[#2E7D5B]/40" />
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
                className="bg-white rounded-2xl p-6 border border-[#A7D7C5]/50 shadow-sm text-center h-full min-h-[140px] flex flex-col justify-center"
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