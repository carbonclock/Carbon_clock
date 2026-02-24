"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const topics = [
  {
    title: "Climate Change",
    desc: "Long-term shifts in global temperature driven by greenhouse gas emissions.",
    icon: "🌡️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
  {
    title: "Carbon Footprint",
    desc: "Total emissions caused directly or indirectly by activities or products.",
    icon: "👣",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
  {
    title: "Scope 1, 2 & 3",
    desc: "Classification of emissions across operations, energy use, and value chains.",
    icon: "📊",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
  {
    title: "Life Cycle Assessment",
    desc: "Measuring environmental impact across a product's full lifecycle.",
    icon: "♻️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
  {
    title: "Net Zero",
    desc: "Balancing emitted and removed greenhouse gases to stabilize climate impact.",
    icon: "⚖️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
  {
    title: "Renewable Energy",
    desc: "Energy from natural replenishing sources like solar and wind.",
    icon: "☀️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
  },
];

/* ── Fade up on scroll ── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const KnowledgePreview = () => {
  return (
    <section className="relative bg-[#F4F8F6] py-24 px-6 md:px-16 overflow-hidden">

      {/* ── Background decorative orbs ── */}
      <motion.div
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -right-15 w-80 h-80 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Heading ── */}
        <div className="mb-16 max-w-2xl mx-auto text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-5 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
              Learn & Grow
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] leading-tight">
              Sustainability{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2E7D5B]">Knowledge Hub</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 w-full h-0.75 bg-[#2E7D5B]/40 origin-left rounded-full"
                />
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-5 text-[#355F53] text-lg leading-relaxed">
              We simplify complex sustainability frameworks into clear, practical
              understanding — enabling individuals to move from awareness to action.
            </p>
          </FadeUp>
        </div>

        {/* ── Topics Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((item, index) => (
            <FadeUp key={index} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(15,61,46,0.13)" }}
                transition={{ duration: 0.22 }}
                className={`group relative bg-white rounded-2xl p-7 border ${item.border} border-opacity-60 shadow-sm cursor-pointer overflow-hidden h-full`}
              >
                {/* Card top accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.07, duration: 0.4 }}
                  className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5] origin-left rounded-t-2xl"
                />

                {/* Hover background bloom */}
                <div className="absolute inset-0 bg-linear-to-br from-[#E6F2ED]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl mb-4 inline-block"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0F3D2E] mb-3 group-hover:text-[#2E7D5B] transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[#355F53] text-sm leading-relaxed">{item.desc}</p>

                  {/* Arrow on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 text-[#2E7D5B] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* ── CTA ── */}
        <FadeUp delay={0.2}>
          <div className="mt-14 flex items-center gap-4 flex-wrap">
            <Link href="/knowledge-hub">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(15,61,46,0.28)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="px-8 py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-[15px] hover:bg-[#2E7D5B] transition-colors flex items-center gap-2"
              >
                Explore Full Knowledge Hub
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm text-[#355F53]"
            >
              6 topics · Free to explore
            </motion.span>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};

export default KnowledgePreview;