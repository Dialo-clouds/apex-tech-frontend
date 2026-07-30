"use client";
import { useState, useEffect } from "react";

export default function Toast({ message, type, duration = 3000 }: { message: string; type: 'success' | 'error'; duration?: number }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);
  if (!visible) return null;
  return (
    <div className="fixed top-24 right-6 z-[150] px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border backdrop-blur-md ">
      {message}
    </div>
  );
}
