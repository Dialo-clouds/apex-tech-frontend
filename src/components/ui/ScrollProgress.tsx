"use client";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((scroll / height) * 100);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-blue-500 z-[60] transition-all duration-100" style={{ width: `${width}%` }} />;
}