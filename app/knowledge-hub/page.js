"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

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

const categories = [
  {
    title: "Climate Science",
    desc: "Understand global warming, carbon cycles, and environmental impact through simplified explanations.",
    icon: "🌍",
  },
  {
    title: "Sustainable Living",
    desc: "Discover everyday actions that reduce your carbon footprint and build eco‑friendly habits.",
    icon: "🌱",
  },
  {
    title: "Green Technology",
    desc: "Explore renewable energy, smart innovations, and future solutions for a cleaner planet.",
    icon: "⚡",
  },
  {
    title: "Case Studies",
    desc: "Learn from real‑world examples of cities, organizations, and individuals driving change.",
    icon: "📋",
  },
  {
    title: "Guides & Toolkits",
    desc: "Step‑by‑step resources to help you take climate action in your school, home, or workplace.",
    icon: "🧰",
  },
  {
    title: "Community Voices",
    desc: "Read stories and insights from people contributing to sustainability movements.",
    icon: "🤝",
  },
];

const KnowledgeHubPage = () => {
  return (
    <div className="bg-[#F4F8F6] min-h-screen overflow-hidden">

      {/* ── Floating background orbs ── */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-16 -right-20 w-72 h-72 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-10 -left-15 w-60 h-60 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none z-0"
      />

      {/* ── Header Section ── */}
      <section className="relative z-10 text-center pt-28 pb-16 px-6">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-5 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
            Resources
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-5 leading-tight">
            Explore Full{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2E7D5B]">Knowledge Hub</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-1 left-0 w-full h-0.75 bg-[#2E7D5B]/40 origin-left rounded-full"
              />
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="max-w-2xl mx-auto text-lg text-[#355F53] leading-relaxed">
            Learn, understand, and act on climate change through curated
            resources, educational content, and practical sustainability guides.
          </p>
        </FadeUp>
      </section>

      {/* ── Categories Grid ── */}
      <section className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-20 pb-16">
        {categories.map((item, index) => (
          <FadeUp key={index} delay={index * 0.07}>
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(15,61,46,0.13)" }}
              transition={{ duration: 0.22 }}
              className="group relative bg-white rounded-2xl shadow-sm border border-[#A7D7C5]/50 p-7 overflow-hidden h-full cursor-pointer"
            >
              {/* Top accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.06, duration: 0.4 }}
                className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5] origin-left rounded-t-2xl"
              />

              {/* Hover bloom */}
              <div className="absolute inset-0 bg-linear-to-br from-[#E6F2ED]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                <span className="text-3xl mb-4 inline-block">{item.icon}</span>
                <h3 className="text-lg font-bold text-[#0F3D2E] mb-3 group-hover:text-[#2E7D5B] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[#355F53] text-sm leading-relaxed">{item.desc}</p>

                {/* Learn more on hover */}
                <div className="mt-4 text-[#2E7D5B] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </section>

      {/* ── Call To Action ── */}
      <section className="relative z-10 text-center pb-24 px-6">
        <FadeUp>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D2E] mb-3">
            Knowledge Drives Climate Action
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[#355F53] mb-8 max-w-xl mx-auto">
            The more we understand, the better we can protect our planet for future
            generations.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(15,61,46,0.28)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="px-8 py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-[15px] hover:bg-[#2E7D5B] transition-colors inline-flex items-center gap-2"
          >
            Start Learning
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </FadeUp>
      </section>

    </div>
  );
};

export default KnowledgeHubPage;