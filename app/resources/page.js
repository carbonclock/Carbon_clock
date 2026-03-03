"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const topics = [
  {
    title: "Climate Change",
    desc: "Long-term shifts in global temperature driven by greenhouse gas emissions.",
    icon: "🌡️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `Climate change refers to long-term shifts in global temperatures and weather patterns. While some changes are natural, since the 1800s, human activities — especially burning fossil fuels like coal, oil, and gas — have been the main driver. These activities release greenhouse gases such as CO₂ and methane, which trap heat in the atmosphere and cause global warming. The consequences include rising sea levels, more frequent extreme weather events, loss of biodiversity, and disruption to food and water systems. Addressing climate change requires urgent action across energy, transport, agriculture, and industry to reduce emissions and build resilience.`,
  },
  {
    title: "Carbon Footprint",
    desc: "Total emissions caused directly or indirectly by activities or products.",
    icon: "👣",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `A carbon footprint measures the total greenhouse gas emissions — expressed as CO₂ equivalent — caused directly or indirectly by a person, organization, event, or product. It covers everything from the energy you use at home to the food you eat and the flights you take. Understanding your carbon footprint is the first step toward reducing it. Strategies include switching to renewable energy, eating less meat, reducing air travel, and choosing sustainable products. Businesses calculate carbon footprints to identify emission hotspots and set science-based reduction targets aligned with global climate goals.`,
  },
  {
    title: "Scope 1, 2 & 3",
    desc: "Classification of emissions across operations, energy use, and value chains.",
    icon: "📊",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `Scope 1 emissions are direct greenhouse gas emissions from sources owned or controlled by a company — such as company vehicles or on-site combustion. Scope 2 covers indirect emissions from purchased electricity, heat, or steam. Scope 3 is the broadest category, encompassing all other indirect emissions across a company's value chain — from raw material extraction and supplier activities to product use and end-of-life disposal. For most companies, Scope 3 represents the largest share of their footprint. Reporting across all three scopes is essential for a complete and credible emissions picture and is increasingly required by global sustainability frameworks.`,
  },
  {
    title: "Life Cycle Assessment",
    desc: "Measuring environmental impact across a product's full lifecycle.",
    icon: "♻️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `Life Cycle Assessment (LCA) is a systematic method for evaluating the environmental impact of a product, process, or service throughout its entire life — from raw material extraction ("cradle") to disposal or recycling ("grave"). LCA examines impacts such as energy use, water consumption, greenhouse gas emissions, land use, and pollution across every phase. It helps businesses make informed decisions about product design, material sourcing, and end-of-life strategies. LCA is guided by international standards (ISO 14040/14044) and is increasingly used to substantiate environmental claims, drive eco-design innovation, and support sustainability reporting.`,
  },
  {
    title: "Net Zero",
    desc: "Balancing emitted and removed greenhouse gases to stabilize climate impact.",
    icon: "⚖️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `Net zero means achieving a balance between the greenhouse gases emitted into and removed from the atmosphere. To reach net zero, emissions must be reduced as close to zero as possible, with remaining unavoidable emissions offset by carbon removal — through natural solutions like reforestation or technological approaches like carbon capture and storage. The Paris Agreement calls for global net zero CO₂ emissions by mid-century to limit warming to 1.5°C. For organizations, credible net zero commitments require deep emissions cuts (at least 90%), transparent reporting, and science-based targets — not reliance on cheap offsets as a substitute for real reduction.`,
  },
  {
    title: "Renewable Energy",
    desc: "Energy from natural replenishing sources like solar and wind.",
    icon: "☀️",
    color: "from-[#E6F2ED] to-[#F4F8F6]",
    border: "border-[#A7D7C5]",
    detail: `Renewable energy comes from natural sources that are constantly replenished — including solar, wind, hydro, geothermal, and biomass. Unlike fossil fuels, renewables produce little to no greenhouse gas emissions during operation, making them central to decarbonizing the global energy system. Solar and wind power are now the cheapest sources of electricity in history and are being deployed at record scale. For businesses, transitioning to renewable energy is one of the most impactful steps toward reducing Scope 2 emissions. Options include on-site generation, power purchase agreements (PPAs), and renewable energy certificates (RECs).`,
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
  const [activeIndex, setActiveIndex] = useState(null);

  const activeTopic = activeIndex !== null ? topics[activeIndex] : null;

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

                  {/* Learn more button */}
                  <motion.button
                    onClick={() => setActiveIndex(index)}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 text-[#2E7D5B] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:gap-2"
                  >
                    Learn more
                    <svg className="w-4 h-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
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

      {/* ── Detail Panel Overlay ── */}
      <AnimatePresence>
        {activeTopic && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 bg-[#0F3D2E]/30 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl w-full z-50 px-4 pb-6 md:pb-0 md:px-0"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#A7D7C5]/60">

                {/* Top accent gradient bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#2E7D5B] via-[#A7D7C5] to-[#2E7D5B]" />

                {/* Inner content */}
                <div className="p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <motion.span
                        initial={{ rotate: -20, scale: 0.6 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                        className="text-4xl leading-none"
                      >
                        {activeTopic.icon}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18, duration: 0.35 }}
                        className="text-xl font-bold text-[#0F3D2E]"
                      >
                        {activeTopic.title}
                      </motion.h3>
                    </div>

                    {/* Close button */}
                    <motion.button
                      onClick={() => setActiveIndex(null)}
                      whileHover={{ scale: 1.12, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4F8F6] hover:bg-[#E6F2ED] border border-[#A7D7C5]/50 flex items-center justify-center text-[#2E7D5B] transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.22, duration: 0.4, ease: "easeOut" }}
                    className="h-px bg-gradient-to-r from-[#A7D7C5] to-transparent mb-5 origin-left"
                  />

                  {/* Detail paragraph */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.45, ease: "easeOut" }}
                    className="text-[#355F53] text-[15px] leading-relaxed"
                  >
                    {activeTopic.detail}
                  </motion.p>

                  {/* Footer tag */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42 }}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-3 py-1 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B] animate-pulse" />
                    Sustainability Insight
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default KnowledgePreview;