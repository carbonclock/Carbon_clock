"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Sustainability Analyst",
    company: "GreenCore Solutions",
    review:
      "Earning the Carbon Literacy Certificate from Carbon Clock was a turning point in my career. The curriculum was practical, well-structured, and grounded in real-world frameworks. I now confidently lead carbon accounting projects at my organisation — something I couldn't have done without this certification.",
    rating: 5,
    initials: "PS",
    color: "bg-[#2E7D5B]",
  },
  {
    name: "Arjun Mehta",
    role: "Environmental Engineer",
    company: "EcoTech Ventures",
    review:
      "The certification gave me a deep understanding of Scope 1, 2, and 3 emissions and lifecycle assessment. The content was accessible yet thorough. Carbon Clock's approach of making complex sustainability concepts simple is exactly what the industry needs. Highly recommended for any young professional.",
    rating: 5,
    initials: "AM",
    color: "bg-[#0F3D2E]",
  },
  {
    name: "Sneha Patel",
    role: "CSR Manager",
    company: "Horizon Industries",
    review:
      "I was impressed by how Carbon Clock bridges the gap between theory and action. The certificate program pushed me to think critically about our supply chain emissions and helped me design our company's first net-zero roadmap. This is more than a certificate — it's a commitment to the planet.",
    rating: 5,
    initials: "SP",
    color: "bg-[#355F53]",
  },
];

/* Triple the cards so loop is seamless */
const loopCards = [...testimonials, ...testimonials, ...testimonials];

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.35 2.438c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

function TestimonialCard({ t }) {
  return (
    <div className="group relative bg-white rounded-2xl p-7 border border-[#A7D7C5]/50 shadow-sm overflow-hidden flex flex-col shrink-0 w-[320px] md:w-100 h-auto">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5]" />
      {/* Hover bloom */}
      <div className="absolute inset-0 bg-linear-to-br from-[#E6F2ED]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      {/* Big quote */}
      <div className="absolute top-4 right-5 text-[68px] leading-none text-[#A7D7C5]/25 font-serif select-none pointer-events-none">"</div>

      <div className="relative z-10 flex flex-col flex-1">
        <StarRating count={t.rating} />
        <p className="text-[#355F53] text-sm leading-relaxed flex-1 italic">"{t.review}"</p>

        <div className="mt-5 mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-3 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Carbon Clock Certified
          </span>
        </div>

        <div className="h-px bg-[#E6F2ED] mb-4" />

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md`}>
            {t.initials}
          </div>
          <div>
            <p className="text-[#0F3D2E] font-bold text-sm">{t.name}</p>
            <p className="text-[#355F53] text-xs">{t.role} · {t.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-[#F4F8F6] py-24 overflow-hidden">

      {/* Keyframes for infinite scroll */}
      <style>{`
        @keyframes infiniteScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .scroll-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: infiniteScroll 30s linear infinite;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background orbs */}
      <motion.div
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -right-20 w-80 h-80 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-0 -left-15 w-64 h-64 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none"
      />

      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-16">
          <FadeUp>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-5 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
              Certified & Verified
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] leading-tight">
              What Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2E7D5B]">Clients Say</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 w-full h-0.75 bg-[#2E7D5B]/40 origin-left rounded-full"
                />
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-4 text-[#355F53] text-lg max-w-xl mx-auto leading-relaxed">
              Hear from professionals who earned their Carbon Clock certificate
              and transformed how they approach sustainability.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-[#A7D7C5] rounded-full" />
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
              <span className="h-px w-16 bg-[#A7D7C5] rounded-full" />
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Infinite scroll strip — full bleed ── */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#F4F8F6] to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#F4F8F6] to-transparent z-10 pointer-events-none" />

        <div className="scroll-track px-6">
          {loopCards.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Stats strip */}
     

    </section>
  );
}