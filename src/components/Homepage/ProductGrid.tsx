"use client";
import Link from "next/link";
import TiltCard from "./TiltCard";

export default function ProductGrid({ onCardClick }: { onCardClick: (href: string) => void }) {
  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => onCardClick("/product?id=iphone16")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$1,199</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=iphone15")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$999</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=samsung-s24")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$1,299</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=macbook-m5")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$2,499</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=macbook-air")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$1,099</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=macbook-m5-black")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$2,699</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=xbox")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$499</span>
            </div>
          </div>

        <div onClick={() => onCardClick("/product?id=cool-keyboard")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$420</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=aura-mouse")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$89</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=wireless-mouse")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$69</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=gaming-mouse")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$99</span>
          </div>
        </div>

        <div onClick={() => onCardClick("/product?id=earbuds-pro")} className="product-card block group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/20">
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
            <span className="text-lg font-bold text-blue-400">$79</span>
          </div>
        </div>
      </div>
    </section>
  );
}