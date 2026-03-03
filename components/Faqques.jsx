"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

const faqs = [
  {
    question: "What certification programs does Carbon Clock offer?",
    answer:
      "Carbon Clock offers industry-focused certifications in Sustainability Basics, GHG Accounting, and Carbon Accounting. These programs are aligned with global sustainability frameworks and practical industry standards.",
  },
  {
    question: "Who should enroll in Carbon Clock certifications?",
    answer:
      "Our programs are suitable for students, graduates, sustainability professionals, engineers, ESG consultants, and corporate teams looking to build structured knowledge in climate and carbon management.",
  },
  {
    question: "Are the certification programs beginner-friendly?",
    answer:
      "Yes. The Sustainability Basics Certification is designed for beginners, while the GHG and Carbon Accounting programs are ideal for professionals seeking deeper technical expertise.",
  },
  {
    question: "What will I gain after completing a certification?",
    answer:
      "Participants gain practical understanding of emission calculations, carbon accounting methodologies, reporting frameworks, and sustainability principles. A certification is awarded upon successful completion.",
  },
  {
    question: "Are the programs delivered online?",
    answer:
      "Yes. Carbon Clock certifications are offered in Online and Hybrid formats, ensuring flexible access while maintaining structured learning and assessment standards.",
  },
  {
    question: "How do I register or get started?",
    answer:
      "You can register your interest directly through our website. Our team will contact you with batch details, schedules, and enrollment guidance.",
  },
];

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className={`relative bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 ${
          isOpen
            ? "border-[#2E7D5B]/40 shadow-md"
            : "border-[#A7D7C5]/50 hover:border-[#2E7D5B]/30 hover:shadow-md"
        }`}
      >
        {/* Top accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.06, duration: 0.45 }}
          className={`absolute top-0 left-0 right-0 h-0.5 origin-left rounded-t-2xl transition-all duration-300 ${
            isOpen
              ? "bg-linear-to-r from-[#2E7D5B] via-[#A7D7C5] to-[#2E7D5B]"
              : "bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5]"
          }`}
        />

        {/* Hover bloom */}
        <div className="absolute inset-0 bg-linear-to-br from-[#E6F2ED]/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

        {/* Question button */}
        <button
          onClick={onToggle}
          className="relative z-10 w-full flex items-center gap-4 px-5 md:px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D5B]/50 rounded-2xl"
          aria-expanded={isOpen}
        >
          {/* Question text */}
          <span
            className={`flex-1 text-sm md:text-[15px] font-semibold leading-snug transition-colors duration-200 ${
              isOpen ? "text-[#2E7D5B]" : "text-[#0F3D2E]"
            }`}
          >
            {item.question}
          </span>

          {/* Chevron */}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen
                ? "bg-[#2E7D5B] text-white"
                : "bg-[#F4F8F6] text-[#2E7D5B] hover:bg-[#E6F2ED]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>

        {/* Answer panel */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-5 md:mx-6 h-px bg-linear-to-r from-[#A7D7C5] to-transparent origin-left"
              />
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative z-10 px-5 md:px-6 pt-4 pb-6"
              >
                <div className="flex gap-3 md:gap-4">
                  <div className="shrink-0 w-0.5 bg-linear-to-b from-[#2E7D5B] to-[#A7D7C5] rounded-full self-stretch" />
                  <p className="text-[#355F53] text-sm md:text-[15px] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const FAQques = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative bg-[#F4F8F6] py-20 px-4 md:px-6 overflow-hidden">

      {/* ── Background orbs ── */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -right-16 w-80 h-80 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-8 -left-16 w-64 h-64 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 -left-8 w-44 h-44 rounded-full bg-[#A7D7C5]/15 blur-2xl pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Heading only ── */}
        <div className="text-center mb-12">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] leading-tight">
              Frequently{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2E7D5B]">Asked Questions</span>
              </span>
            </h2>
          </FadeUp>
        </div>

        {/* ── FAQ Accordion ── */}
        <div className="flex flex-col gap-3 md:gap-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQques;