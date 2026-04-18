"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    review: "",
    rating: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review || !formData.role || formData.rating === 0) {
      alert("Please fill all fields and provide a star rating.");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", role: "", company: "", review: "", rating: 0 });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F3D2E]/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#2E7D5B] to-[#A7D7C5]" />
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F3D2E]">Add Your Review</h2>
                  <p className="text-[#355F53] text-sm mt-1">Share your experience with Carbon Clock</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[#E6F2ED] rounded-full transition-colors text-[#355F53]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-2">Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F6] border border-[#A7D7C5]/30 rounded-xl focus:outline-none focus:border-[#2E7D5B] text-[#0F3D2E] text-sm transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-2">Role</label>
                    <input
                      required
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F6] border border-[#A7D7C5]/30 rounded-xl focus:outline-none focus:border-[#2E7D5B] text-[#0F3D2E] text-sm transition-all"
                      placeholder="e.g. CSR Manager"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-2">Company</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F6] border border-[#A7D7C5]/30 rounded-xl focus:outline-none focus:border-[#2E7D5B] text-[#0F3D2E] text-sm transition-all"
                    placeholder="e.g. Green Ventures"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={24} 
                          className={star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-[#A7D7C5]/40"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E7D5B] uppercase tracking-wider mb-2">Review</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F6] border border-[#A7D7C5]/30 rounded-xl focus:outline-none focus:border-[#2E7D5B] text-[#0F3D2E] text-sm transition-all resize-none"
                    placeholder="Tell us about your journey..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0F3D2E] text-white font-bold rounded-xl hover:bg-[#1A4D3B] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
