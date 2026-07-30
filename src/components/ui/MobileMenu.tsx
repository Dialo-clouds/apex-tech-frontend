"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white/60 hover:text-white transition-colors"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-bold text-white">APEX<span className="text-blue-500">TECH</span></Link>
            <Link href="/#products" onClick={() => setIsOpen(false)} className="text-xl text-white/70 hover:text-white transition-colors">Collection</Link>
            <Link href="/features" onClick={() => setIsOpen(false)} className="text-xl text-white/70 hover:text-white transition-colors">Features</Link>
            <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-xl text-white/70 hover:text-white transition-colors">Account</Link>
            <Link href="/account/orders" onClick={() => setIsOpen(false)} className="text-xl text-white/70 hover:text-white transition-colors">Orders</Link>
            <Link href="/admin" onClick={() => setIsOpen(false)} className="text-xl text-white/70 hover:text-white transition-colors">Admin</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}