"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

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

const blogs = [
  {
    slug: "blog-1",
    image: "/blog1.png",
    title: "Carbon Border Adjustment Mechanism (CBAM)",
    date: "March 05, 2026",
  },
  // Add more blog objects here as you publish:
  // {
  //   slug: "blog-2",
  //   image: "/blog2.png",
  //   title: "Your Next Blog Title Here",
  //   date: "March 10, 2026",
  // },
];

const BlogCard = ({ blog, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(15,61,46,0.14)" }}
        transition={{ duration: 0.22 }}
        className="group relative bg-white rounded-2xl border border-[#A7D7C5]/50 overflow-hidden shadow-sm flex flex-col h-full"
      >
        {/* Top accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2E7D5B] to-[#A7D7C5] origin-left z-10"
        />

        {/* Image */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#E6F2ED] flex-shrink-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#0F3D2E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-4">
          <h3 className="text-[#0F3D2E] font-bold text-sm sm:text-base md:text-[17px] leading-snug group-hover:text-[#2E7D5B] transition-colors duration-200 flex-1">
            {blog.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/blog/${blog.slug}`}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center px-4 py-1.5 bg-[#2E7D5B] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#0F3D2E] transition-colors cursor-pointer shadow-sm"
              >
                Read More
              </motion.span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-[#A7D7C5]/30 text-[#2E7D5B] text-xs sm:text-sm font-medium rounded-full border border-[#A7D7C5]/60">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Published on: {blog.date}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F4F8F6] text-[#0F3D2E] overflow-hidden">

      {/* Background orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-16 -right-16 w-80 h-80 rounded-full bg-[#A7D7C5]/20 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-10 -left-16 w-64 h-64 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none z-0"
      />

      {/* Header */}
      <section className="relative z-10 text-center pt-12 sm:pt-16 pb-10 sm:pb-12 px-6">
        <FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F3D2E] leading-tight mb-4 sm:mb-5">
            Our <span className="text-[#2E7D5B]">Blog</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#355F53] leading-relaxed">
            Explore our latest articles on sustainability, carbon accounting, climate science,
            and the journey toward a net-zero future.
          </p>
        </FadeUp>
      </section>

      {/* Blog Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} />
          ))}
        </div>
      </section>

    </main>
  );
}