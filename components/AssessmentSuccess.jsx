"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssessmentSuccess({ score, totalQuestions, courseTitle }) {
  const router = useRouter();

  return (
    <div className="max-w-2xl w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] p-6 md:p-10 text-center border border-[#E0EDE8] relative overflow-hidden"
        style={{ boxShadow: "0 24px 48px -12px rgba(15,61,46,0.12)" }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2E7D5B]/5 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl -ml-24 -mb-24" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-[#E6F2ED] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white shadow-md"
          >
            <CheckCircle size={32} className="text-[#2E7D5B]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-[#0F3D2E] mb-3">
              Congratulations!
            </h2>
            <p className="text-[#5C7A6E] text-base mb-8 max-w-xl mx-auto leading-relaxed">
              You have cleared the assessment for <br />
              <span className="font-bold text-[#0F3D2E] text-lg">{courseTitle}</span>! <br />
              <span className="text-sm">Your certificate will be issued shortly. You can monitor its status on your certifications page.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-10"
          >
            <div className="bg-[#F5F0E8] rounded-2xl p-4 border border-[#E0EDE8]">
              <p className="text-2xl font-bold text-[#D4AF37] mb-0.5">{score.toFixed(1)}%</p>
              <p className="text-[10px] font-bold text-[#5C7A6E] uppercase tracking-wider">Final Score</p>
            </div>
            <div className="bg-[#F5F0E8] rounded-2xl p-4 border border-[#E0EDE8]">
              <p className="text-2xl font-bold text-[#2D4A3E] mb-0.5">
                {Math.round((score / 100) * totalQuestions)}/{totalQuestions}
              </p>
              <p className="text-[10px] font-bold text-[#5C7A6E] uppercase tracking-wider">Correct Answers</p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              onClick={() => router.push("/dashboard/my-certifications")}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0F3D2E] text-white font-bold text-sm hover:bg-[#1A4A38] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Award size={16} />
              <span>My Certifications</span>
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => router.push("/dashboard")}
              whileHover={{ scale: 1.05, y: -1, backgroundColor: "#E6F2ED" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-[#0F3D2E] font-bold text-sm border-2 border-[#0F3D2E] transition-all flex items-center justify-center gap-2"
            >
              <Home size={16} />
              <span>Back to Home</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
