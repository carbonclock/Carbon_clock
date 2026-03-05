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
  title: "Life Cycle Assessment (LCA)",
  desc: "A method to evaluate environmental impacts of a product across its life cycle.",
  icon: "🔄",
  color: "from-[#E8F5E9] to-[#F6FBF7]",
  border: "border-[#A5D6A7]",
  detail: `Life Cycle Assessment (LCA) is a scientific methodology used to evaluate the environmental impacts associated with all stages of a product’s life. This includes raw material extraction, manufacturing, distribution, use, and final disposal or recycling. LCA helps organizations understand the environmental footprint of products and identify opportunities to reduce resource consumption, emissions, and waste.`
},
{
  title: "Cradle-to-Grave",
  desc: "Life cycle assessment covering all stages from raw materials to disposal.",
  icon: "⚙️",
  color: "from-[#E3F2FD] to-[#F5FAFF]",
  border: "border-[#90CAF9]",
  detail: `Cradle-to-Grave is an approach used in life cycle assessment that evaluates environmental impacts from the extraction of raw materials (the cradle) to the product’s end-of-life disposal (the grave). It considers manufacturing, transportation, usage, and waste management stages to understand the full environmental footprint of a product or system.`
},
{
  title: "Cradle-to-Gate",
  desc: "Assessment from raw material extraction to the factory gate.",
  icon: "🏭",
  color: "from-[#E1F5FE] to-[#F4FAFF]",
  border: "border-[#81D4FA]",
  detail: `Cradle-to-Gate is a type of life cycle assessment that evaluates environmental impacts from the extraction of raw materials up to the point where the product leaves the manufacturing facility. It excludes distribution, usage, and disposal phases, focusing mainly on production-related impacts.`
},
{
  title: "Net Zero",
  desc: "Balancing greenhouse gas emissions with removal from the atmosphere.",
  icon: "🌍",
  color: "from-[#F1F8E9] to-[#F7FDF3]",
  border: "border-[#AED581]",
  detail: `Net Zero refers to achieving a balance between the greenhouse gases emitted into the atmosphere and those removed from it. Organizations and countries aim to reduce emissions as much as possible and offset remaining emissions through carbon removal methods such as reforestation or carbon capture technologies.`
},
{
  title: "Carbon Neutrality",
  desc: "Offsetting emitted carbon through verified environmental projects.",
  icon: "⚖️",
  color: "from-[#E0F7FA] to-[#F2FCFD]",
  border: "border-[#80DEEA]",
  detail: `Carbon neutrality is achieved when the amount of carbon dioxide emitted is balanced by an equivalent amount removed or offset. This is typically done by supporting certified carbon offset projects such as renewable energy initiatives, forest conservation, or methane capture programs.`
},
{
  title: "Carbon Offsetting",
  desc: "Investing in environmental projects to compensate emissions.",
  icon: "🌳",
  color: "from-[#E8F5E9] to-[#F5FBF6]",
  border: "border-[#A5D6A7]",
  detail: `Carbon offsetting involves compensating for greenhouse gas emissions by investing in environmental projects that reduce or remove emissions elsewhere. Examples include renewable energy projects, reforestation, and methane capture initiatives that help balance the overall carbon footprint.`
},
{
  title: "Emission Factor",
  desc: "Coefficient used to estimate emissions from activity data.",
  icon: "📊",
  color: "from-[#F3E5F5] to-[#FAF5FB]",
  border: "border-[#CE93D8]",
  detail: `An emission factor is a coefficient that quantifies the emissions released per unit of activity. It is commonly used in environmental calculations to estimate greenhouse gas emissions based on measurable data such as fuel consumption, electricity usage, or industrial processes.`
},
{
  title: "Activity Data",
  desc: "Quantitative measure of activities that generate emissions.",
  icon: "📈",
  color: "from-[#FFF3E0] to-[#FFF8F3]",
  border: "border-[#FFB74D]",
  detail: `Activity data refers to measurable information about activities that produce greenhouse gas emissions. Examples include the amount of fuel consumed, electricity used, or distance traveled by vehicles. This data is combined with emission factors to calculate total emissions.`
},
{
  title: "ESG (Environmental, Social, Governance)",
  desc: "Framework for evaluating sustainability and ethical impact of companies.",
  icon: "🏢",
  color: "from-[#EDE7F6] to-[#F7F4FD]",
  border: "border-[#B39DDB]",
  detail: `ESG stands for Environmental, Social, and Governance, a framework used to assess the sustainability and ethical impact of companies. It evaluates how organizations manage environmental responsibilities, social relationships, and governance practices. ESG metrics are widely used by investors to evaluate long-term corporate sustainability performance.`
},
{
  title: "Environmental Product Declaration (EPD)",
  desc: "Verified document reporting environmental data of a product.",
  icon: "📄",
  color: "from-[#E1F5FE] to-[#F4FAFF]",
  border: "border-[#81D4FA]",
  detail: `An Environmental Product Declaration (EPD) is a standardized and independently verified document that provides transparent information about the environmental impact of a product throughout its life cycle. EPDs are based on life cycle assessments and help organizations communicate sustainability performance to stakeholders.`
},
{
  title: "Circular Economy",
  desc: "Economic model focused on reuse, recycling, and waste reduction.",
  icon: "♻️",
  color: "from-[#E8F5E9] to-[#F6FBF7]",
  border: "border-[#A5D6A7]",
  detail: `A circular economy is an economic system designed to eliminate waste and promote the continual use of resources. It emphasizes recycling, reusing materials, repairing products, and designing goods for longer life cycles to minimize environmental impact.`
},
{
  title: "Linear Economy",
  desc: "Traditional model of take, make, and dispose production.",
  icon: "➡️",
  color: "from-[#FFFDE7] to-[#FFFDF4]",
  border: "border-[#FFF59D]",
  detail: `A linear economy follows the traditional production model of extracting raw materials, manufacturing products, using them, and eventually disposing of them as waste. This approach often leads to resource depletion and environmental degradation.`
},
{
  title: "Renewable Energy",
  desc: "Energy from sources that naturally replenish such as solar and wind.",
  icon: "☀️",
  color: "from-[#FFF9C4] to-[#FFFDF3]",
  border: "border-[#FFF176]",
  detail: `Renewable energy comes from natural sources that are continuously replenished, such as solar, wind, hydro, and geothermal energy. These sources produce little or no greenhouse gas emissions and are essential for reducing dependence on fossil fuels.`
},
{
  title: "Non-Renewable Energy",
  desc: "Energy from finite sources like coal, oil, and gas.",
  icon: "🛢️",
  color: "from-[#ECEFF1] to-[#F6F8F9]",
  border: "border-[#B0BEC5]",
  detail: `Non-renewable energy comes from finite natural resources such as coal, oil, and natural gas. These resources take millions of years to form and cannot be replenished quickly. Their use is a major contributor to greenhouse gas emissions.`
},
{
  title: "Decarbonization",
  desc: "Reducing carbon emissions in energy, transport, and industry.",
  icon: "🌱",
  color: "from-[#E8F5E9] to-[#F4FBF6]",
  border: "border-[#A5D6A7]",
  detail: `Decarbonization refers to the process of reducing carbon dioxide emissions across sectors such as energy production, transportation, and industry. This is achieved through renewable energy adoption, energy efficiency improvements, and sustainable technologies.`
}
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
            onClick={() => window.location.href = '/certifications'}
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