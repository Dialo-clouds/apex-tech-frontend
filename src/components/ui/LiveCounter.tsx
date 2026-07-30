"use client";
import { useState, useEffect } from "react";

export default function LiveCounter() {
  const [count, setCount] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + Math.floor(Math.random() * 3)), 10000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-white/40 text-xs border border-white/10 rounded-full px-3 py-1 bg-white/5">??? {count} viewing</span>;
}
