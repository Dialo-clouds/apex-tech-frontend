"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickActions({ productName, productUrl }: { productName: string; productUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex flex-col gap-2"
          >
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/20 transition-all">📋 Copy Link</button>
            <button onClick={() => { window.open('https://twitter.com/intent/tweet?text=Check out ' + encodeURIComponent(productName) + ' on ApexTech!'); }} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/20 transition-all">𝕏 Share</button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg"
      >
        {isOpen ? "✕" : "•••"}
      </button>
    </div>
  );
}