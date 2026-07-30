"use client";
import { useRef } from "react";
import Link from "next/link";

export default function RelatedCarousel({ products }: { products: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };
  return (
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
      <h2 className="text-3xl font-bold text-white mb-12 font-[var(--font-playfair)] tracking-wide">You may also like</h2>
      <div className="relative">
        <div ref={carouselRef} className="flex overflow-x-auto gap-6 scroll-smooth no-scrollbar pb-4">
          {products.map((p, idx) => (
            <Link key={idx} href={`/product?id=${p.id}`} className="flex-none w-[280px] group bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
              
              {/* ✅ FIX: Replaces '/images/' with '/media/' in the image path */}
              <img 
                src={p.image.replace('/images/', '/media/')} 
                alt={p.name} 
                className="w-full h-40 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300" 
              />
              
              <h4 className="text-white font-bold text-sm tracking-[0.5px]">{p.name}</h4>
              <p className="text-blue-400 text-sm mt-1">${p.price}</p>
            </Link>
          ))}
        </div>
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0A0A0A]/80 border border-white/10 rounded-full p-2 hover:bg-white/10 transition-colors">‹</button>
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0A0A0A]/80 border border-white/10 rounded-full p-2 hover:bg-white/10 transition-colors">›</button>
      </div>
    </div>
  );
}