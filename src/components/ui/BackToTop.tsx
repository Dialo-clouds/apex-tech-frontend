"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className={`fixed bottom-8 right-8 z-50 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-blue-600 transition-all shadow-lg ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      ↑
    </button>
  );
}