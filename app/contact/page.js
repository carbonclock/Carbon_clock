"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiSend, FiUser, FiMail, FiPhone, FiSearch, FiMessageSquare } from "react-icons/fi";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn("EmailJS not configured: missing env vars");
      setStatus("Email service not configured.");
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error("EmailJS send error:", err);
        setStatus("Failed to send message.");
      });
  };

  useEffect(() => {
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (PUBLIC_KEY && typeof window !== "undefined") {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn("emailjs.init failed:", err);
      }
    }
  }, []);

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-lg border border-[#c8e6d8] bg-white text-[#0F3D2E] placeholder-[#9fbfb2] text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D5B]/30 focus:border-[#2E7D5B] transition-all duration-200";

  const labelClass = "block text-[#0F3D2E] font-semibold text-sm mb-2";

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <>
      {/* ══════════════════════════════════════
          SECTION 1 — CONTACT FORM
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#E6F2ED] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">

        {/* Background orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-[#A7D7C5]/30 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -left-15 w-64 h-64 rounded-full bg-[#2E7D5B]/10 blur-3xl pointer-events-none"
        />

        {/* Heading above card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2E7D5B] bg-[#2E7D5B]/10 px-4 py-1.5 rounded-full mb-4 tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] animate-pulse" />
            Get In Touch
          </motion.span>

          <h1 className="text-5xl md:text-6xl font-bold text-[#0F3D2E]">
            Connect{" "}
            <span className="text-[#2E7D5B]">Us</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-3 text-[#355F53] text-base"
          >
            We're here and ready to help. Our team is happy to answer any queries you have.
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl border border-[#c8e6d8] shadow-2xl w-full max-w-4xl px-6 py-10 sm:px-12 md:px-16 md:py-14 overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#2E7D5B] to-[#A7D7C5]" />

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Name + Email */}
            <motion.div variants={fieldVariants} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7D5B]" size={16} />
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7D5B]" size={16} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className={inputClass} />
                </div>
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div variants={fieldVariants}>
              <label className={labelClass}>Mobile Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7D5B]" size={16} />
                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" className={inputClass} />
              </div>
            </motion.div>

            {/* Subject */}
            <motion.div variants={fieldVariants}>
              <label className={labelClass}>What Are You Looking For?</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E7D5B]" size={16} />
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter your request..." required className={inputClass} />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fieldVariants}>
              <label className={labelClass}>Message</label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-4 text-[#2E7D5B]" size={16} />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message..." rows="4" className={`${inputClass} resize-none`} />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fieldVariants} className="flex justify-center pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04, boxShadow: "0 10px 32px rgba(15,61,46,0.28)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2.5 px-14 py-3.5 bg-[#0F3D2E] text-white rounded-xl font-semibold text-[15px] hover:bg-[#2E7D5B] transition-colors shadow-md"
              >
                <FiSend size={17} />
                Send Message
              </motion.button>
            </motion.div>

            {/* Status */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center text-sm font-medium ${status === "Message sent successfully!" ? "text-[#2E7D5B]" : "text-red-500"}`}
              >
                {status}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — MAP + GET IN TOUCH
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-20 bg-white w-full"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* LEFT — Google Maps iframe */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full h-105 rounded-2xl overflow-hidden shadow-lg border border-[#A7D7C5]/40"
            >
              <iframe
                src="https://maps.google.com/maps?q=26.7283191,83.4369374&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carbon Clock Location"
              />
            </motion.div>

            {/* RIGHT — Get In Touch */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="py-4"
            >
              <h2 className="text-4xl font-bold text-[#0F3D2E] mb-10">
                Get In Touch
              </h2>

              <div className="space-y-8">

                {/* Email */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#2E7D5B] flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#0F3D2E] text-lg">Email Us</h3>
                    <p className="text-[#355F53] text-sm mt-0.5">carbonclock@gmail.com</p>
                  </div>
                </motion.div>

                {/* Call */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#2E7D5B] flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#0F3D2E] text-lg">Call Us</h3>
                    <p className="text-[#355F53] text-sm mt-0.5">+91 7795715495</p>
                    <p className="text-[#7aab94] text-xs mt-0.5">Mon–Sat, 24/7</p>
                  </div>
                </motion.div>

                {/* Visit */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#2E7D5B] flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#0F3D2E] text-lg">Visit Us</h3>
                    <p className="text-[#355F53] text-sm mt-0.5 leading-relaxed">
                      Mysore, Karnataka India 570018
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>
    </>
  );
}