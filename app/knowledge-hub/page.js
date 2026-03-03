"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
    detail: `Climate science is the study of Earth's climate system — how the atmosphere, oceans, land, and ice interact to produce our climate. Scientists use observations, computer models, and historical records to understand how and why climate is changing. The overwhelming evidence shows that human activities, particularly burning fossil fuels, are driving rapid warming. Key concepts include the greenhouse effect, feedback loops, tipping points, and carbon budgets. Understanding climate science helps us distinguish natural variability from human-caused change, predict future scenarios, and design effective mitigation and adaptation strategies for a warming world.`,
  },
  {
    title: "Sustainable Living",
    desc: "Discover everyday actions that reduce your carbon footprint and build eco‑friendly habits.",
    icon: "🌱",
    detail: `Sustainable living means making choices that meet our present needs without compromising future generations. It spans diet (eating less meat, reducing food waste), transport (cycling, public transit, EVs), home energy (switching to renewables, insulating homes), shopping (buying less, choosing durable goods), and water use. Small individual actions matter — but so does understanding the systemic changes needed. A sustainable lifestyle also means advocating for better policies and supporting businesses with credible environmental commitments. The goal isn't perfection, but consistent, informed choices that collectively reduce our ecological footprint.`,
  },
  {
    title: "Green Technology",
    desc: "Explore renewable energy, smart innovations, and future solutions for a cleaner planet.",
    icon: "⚡",
    detail: `Green technology encompasses innovations designed to reduce environmental harm and accelerate the transition to a sustainable economy. This includes solar panels, wind turbines, battery storage, green hydrogen, electric vehicles, smart grids, and carbon capture technologies. Advances in materials science are creating biodegradable alternatives to plastics, while precision agriculture is reducing farming's environmental footprint. Green tech is now one of the fastest-growing investment sectors globally. Understanding these technologies helps individuals, businesses, and policymakers make informed decisions about where to direct resources for maximum climate impact.`,
  },
  {
    title: "Case Studies",
    desc: "Learn from real‑world examples of cities, organizations, and individuals driving change.",
    icon: "📋",
    detail: `Case studies bring sustainability to life by showing what's actually working in the real world. From Copenhagen's ambition to become the world's first carbon-neutral capital, to Interface Inc.'s Mission Zero commitment eliminating its environmental footprint, to community-led reforestation in Kenya — these examples prove that bold climate action is possible at every scale. Studying these successes (and failures) reveals what conditions enable change: political will, community engagement, funding models, and measurement frameworks. Case studies are among the most powerful learning tools because they show that transformation isn't theoretical — it's already happening.`,
  },
  {
    title: "Guides & Toolkits",
    desc: "Step‑by‑step resources to help you take climate action in your school, home, or workplace.",
    icon: "🧰",
    detail: `Guides and toolkits translate climate knowledge into actionable steps. Whether you're a student organizing a campus sustainability audit, a business manager setting up a recycling program, or a homeowner planning energy retrofits, structured resources help you move from intention to implementation. Good toolkits include checklists, templates, case examples, measurement frameworks, and links to further support. They lower the barrier to entry by breaking complex challenges into manageable tasks. Our resources are designed to be practical, evidence-based, and adaptable to different contexts — because effective climate action looks different depending on where you are and what you have.`,
  },
  {
    title: "Community Voices",
    desc: "Read stories and insights from people contributing to sustainability movements.",
    icon: "🤝",
    detail: `Community voices remind us that sustainability is fundamentally a human story. Behind every statistic is a person, family, or community whose life is shaped by environmental change — or who is actively working to build something better. From frontline communities experiencing climate impacts first, to grassroots activists, urban farmers, indigenous knowledge holders, and young climate leaders, diverse perspectives enrich our understanding of what's at stake and what's possible. Amplifying these voices isn't just about inclusion — it's about recognizing that the most innovative and enduring solutions often emerge from those closest to the problem.`,
  },
];

const KnowledgeHubPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeTopic = activeIndex !== null ? categories[activeIndex] : null;

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
                <div className="h-1.5 w-full bg-linear-to-r from-[#2E7D5B] via-[#A7D7C5] to-[#2E7D5B]" />

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
                      className="shrink-0 w-8 h-8 rounded-full bg-[#F4F8F6] hover:bg-[#E6F2ED] border border-[#A7D7C5]/50 flex items-center justify-center text-[#2E7D5B] transition-colors"
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
                    className="h-px bg-linear-to-r from-[#A7D7C5] to-transparent mb-5 origin-left"
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

    </div>
  );
};

export default KnowledgeHubPage;