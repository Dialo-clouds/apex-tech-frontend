"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const text = "THE FUTURE";
    const heroContainer = document.querySelector(".hero-text-container");
    if (heroContainer) {
      heroContainer.innerHTML = "";
      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "inline-block opacity-0 translate-y-full";
        heroContainer.appendChild(span);
        gsap.to(span, { y: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: "power3.out" });
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 px-4 text-center">
      <div className="relative w-full max-w-4xl">
        <h1 className="hero-text-container text-6xl md:text-[7rem] font-black tracking-tight leading-[0.9] text-white mb-6 blue-glow"></h1>
        <h2 className="hero-text text-6xl md:text-[7rem] font-black tracking-tight leading-[0.9] text-white mb-6 blue-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">IS HERE.</span>
        </h2>
      </div>
    </section>
  );
}
