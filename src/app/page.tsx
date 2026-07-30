"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThreeScene from "@/components/3d/ThreeScene";
import { useCart } from "@/store/useCart";
import CartDrawer from "@/components/ui/CartDrawer";
import SearchBar from "@/components/ui/SearchBar";
import BackToTop from "@/components/ui/BackToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MobileMenu from "@/components/ui/MobileMenu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const itemCount = useCart((state) => state.getItemCount());
  const triggerAnimation = useCart((state) => state.triggerAnimation);

  useEffect(() => {
    setMounted(true);

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

    gsap.fromTo(".hero-text", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2 });
    if (gridRef.current) {
      gsap.fromTo(".product-card", { y: 100, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" } });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden relative">
      <ScrollProgress />
      <BackToTop />
      
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ThreeScene />
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-[0.5px] text-white min-w-[120px]">
          APEX<span className="text-blue-500">TECH</span>
        </Link>
        
        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
          <div className="relative group">
            <button className="text-white/70 hover:text-white transition-colors text-sm tracking-wide py-2">Shop</button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-3">
                <Link href="/product?id=iphone16" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm">Phones</Link>
                <Link href="/product?id=macbook-m5" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm">Laptops</Link>
                <Link href="/product?id=aura-mouse" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm">Accessories</Link>
                <Link href="/product?id=earbuds-pro" className="text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-sm">Audio</Link>
              </div>
            </div>
          </div>
          <Link href="#products" className="text-white/70 hover:text-white transition-colors text-sm tracking-wide">Collection</Link>
          <Link href="/features" className="text-white/70 hover:text-white transition-colors text-sm tracking-wide">Features</Link>

          {mounted && document.cookie.includes('apex_token') ? (
            <button 
              onClick={() => {
                document.cookie = 'apex_token=; path=/; max-age=0';
                document.cookie = 'apex_email=; path=/; max-age=0';
                window.location.reload();
              }}
              className="text-white/70 hover:text-red-400 transition-colors text-sm tracking-wide"
            >
              Log Out
            </button>
          ) : (
            <Link href="/auth/login" className="text-white/70 hover:text-white transition-colors text-sm tracking-wide">
              Sign In
            </Link>
          )}

          {mounted && typeof window !== 'undefined' && document.cookie.includes('apex_email=nasirahmadb29@gmail.com') && (
            <Link href="/admin" className="text-white/70 hover:text-white transition-colors text-sm tracking-wide">Admin</Link>
          )}
          
          <SearchBar />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <MobileMenu />
          <button onClick={() => setIsCartOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
            Cart <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{mounted ? itemCount : 0}</span>
          </button>
        </div>

        <div className="hidden md:flex items-center justify-end min-w-[120px]">
          <button onClick={() => setIsCartOpen(true)} className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
            Cart <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{mounted ? itemCount : 0}</span>
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 px-4 text-center">
        <div className="relative w-full max-w-4xl">
          <h1 className="hero-text-container text-6xl md:text-[7rem] font-black tracking-tight leading-[0.9] text-white mb-6 blue-glow"></h1>
          <h2 className="hero-text text-6xl md:text-[7rem] font-black tracking-tight leading-[0.9] text-white mb-6 blue-glow">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">IS HERE.</span>
          </h2>
        </div>
      </section>

      <section id="products" ref={gridRef} className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/product?id=iphone16" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/iphone16.jpg" alt="iPhone 16" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">iPhone 16 Pro</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">A18 Chip</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦1,199</span>
            </div>
          </Link>

          <Link href="/product?id=iphone15" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/iphone15.jpg" alt="iPhone 15" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-red-500/20 text-red-400 border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-400"></span>
                Out of Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">iPhone 15 Pro</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Dynamic Island</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦999</span>
            </div>
          </Link>

          <Link href="/product?id=samsung-s24" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/samsung-s24.jpg" alt="Samsung" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Samsung S24 Ultra</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">200MP Camera</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦1,299</span>
            </div>
          </Link>

          <Link href="/product?id=macbook-m5" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/macbook-m5.jpg" alt="MacBook" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">MacBook Pro M5</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Liquid Retina</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦2,499</span>
            </div>
          </Link>

          <Link href="/product?id=macbook-air" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/macbook-air.jpg" alt="MacBook" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-red-500/20 text-red-400 border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-400"></span>
                Out of Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">MacBook Air</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">M3 Power</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦1,099</span>
            </div>
          </Link>

          <Link href="/product?id=macbook-m5-black" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/macbookm5-black.jpg" alt="MacBook" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">MacBook Pro M5 Black</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Space Black</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦2,699</span>
            </div>
          </Link>

          <Link href="/product?id=xbox" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/xbox1.jpg" alt="Xbox" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-red-500/20 text-red-400 border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-400"></span>
                Out of Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Xbox Series X</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Most Powerful</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦499</span>
            </div>
          </Link>

          <Link href="/product?id=cool-keyboard" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/cool-keyboard.jpg" alt="Keyboard" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">ApexKeys Ultra</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Mechanical RGB</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦420</span>
            </div>
          </Link>

          <Link href="/product?id=aura-mouse" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/aura-mouse.jpg" alt="Mouse" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Aura Wireless</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Ergonomic Design</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦89</span>
            </div>
          </Link>

          <Link href="/product?id=wireless-mouse" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/wireless-mouse.jpg" alt="Mouse" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Pro Wireless</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">Lightweight</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦69</span>
            </div>
          </Link>

          <Link href="/product?id=gaming-mouse" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/gaming-mouse.jpg" alt="Mouse" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-red-500/20 text-red-400 border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-400"></span>
                Out of Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Gaming Mouse Pro</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">8K DPI</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦99</span>
            </div>
          </Link>

          <Link href="/product?id=earbuds-pro" className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
            <div className="relative">
              <img src="/media/earbuds.jpg" alt="Earbuds" className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 bg-green-500/20 text-green-400 border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400"></span>
                In Stock
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-[0.5px] text-white">Astrum ET340</h3>
            <p className="text-sm text-white/60 tracking-[0.5px] mt-1">True Wireless</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">₦79</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}