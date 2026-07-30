"use client";
import { useState } from "react";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative hidden md:block">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white/70 hover:text-white transition-colors text-sm tracking-wide">🔍</button>
      <input 
        type="text" 
        placeholder="Search products..." 
        className={`absolute right-0 top-full mt-2 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500 transition-all duration-300 ${isOpen ? 'opacity-100 visible w-64' : 'opacity-0 invisible w-0'}`} 
      />
    </div>
  );
}