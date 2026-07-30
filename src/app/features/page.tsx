"use client";
import { useState } from "react";
import Link from "next/link";
import CartDrawer from "@/components/ui/CartDrawer";
import WishlistButton from "@/components/ui/WishlistButton";
import QuickView from "@/components/ui/QuickView";
import ProductReviews from "@/components/ui/ProductReviews";
import RelatedCarousel from "@/components/ui/RelatedCarousel";
import SearchBar from "@/components/ui/SearchBar";
import Newsletter from "@/components/ui/Newsletter";
import ColorSelector from "@/components/ui/ColorSelector";
import SizeSelector from "@/components/ui/SizeSelector";
import BackToTop from "@/components/ui/BackToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import LiveCounter from "@/components/ui/LiveCounter";
import Toast from "@/components/ui/Toast";
import ScrollProgress from "@/components/ui/ScrollProgress";
import EstimatedDelivery from "@/components/ui/EstimatedDelivery";
import DiscountInput from "@/components/ui/DiscountInput";
import SocialShare from "@/components/ui/SocialShare";
import CheckoutProgress from "@/components/ui/CheckoutProgress";
import ImageZoom from "@/components/ui/ImageZoom";
import OrderConfirmation from "@/components/ui/OrderConfirmation";

const mockProduct = { id: "showcase-1", name: "ApexTech Premium Showcase", price: 999, image: "/images/iphone16.jpg", desc: "Experience the full power of the ApexTech ecosystem." };

export default function FeaturesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("M");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-20 relative">
      <ScrollProgress />
      <BackToTop />
      <CookieConsent />
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-2xl font-bold tracking-[0.5px] text-white">APEX<span className="text-blue-500">TECH</span></Link>
        <div className="flex items-center gap-6">
          <SearchBar />
          <button onClick={() => setIsCartOpen(true)} className="bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">Open Cart</button>
        </div>
      </nav>
      <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto space-y-24">
        <section className="text-center">
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tight leading-[0.9] text-white mb-6 blue-glow font-[var(--font-playfair)]">20 FEATURES <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">LIVE.</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">The complete ApexTech ecosystem. Every component built, modularized, and ready for scale.</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
          <div className="space-y-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Wishlist & Social</h3>
              <div className="flex items-center gap-6"><WishlistButton productId="showcase-1" /><SocialShare url="https://apextech.com" title="ApexTech Premium" /></div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold mb-4">Selectors</h3>
              <ColorSelector colors={["#000000", "#1E90FF", "#FF4500"]} selected={color} setSelected={setColor} />
              <SizeSelector sizes={["S", "M", "L", "XL"]} selected={size} setSelected={setSize} />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold mb-4">Delivery & Discounts</h3>
              <EstimatedDelivery /><DiscountInput />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8"><h3 className="text-xl font-bold mb-4">Live Data</h3><LiveCounter /></div>
          </div>
          <div className="space-y-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4"><h3 className="text-xl font-bold mb-4">Image Zoom</h3><ImageZoom src="/images/iphone16.jpg" /></div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold mb-4">Checkout Flow</h3>
              <CheckoutProgress step={1} />
              <button onClick={() => setShowOrderConfirm(true)} className="w-full bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600 transition-all">Place Test Order</button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 flex gap-4">
              <button onClick={() => setShowQuickView(true)} className="flex-1 bg-white/10 text-white py-3 rounded-full font-bold hover:bg-white/20 transition-all">Quick View</button>
              <button onClick={() => setToastVisible(!toastVisible)} className="flex-1 bg-white/10 text-white py-3 rounded-full font-bold hover:bg-white/20 transition-all">Toggle Toast</button>
            </div>
          </div>
        </section>
        <ProductReviews />
        <RelatedCarousel products={[mockProduct, mockProduct, mockProduct, mockProduct]} />
        <Newsletter />
      </div>
      {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      {showQuickView && <QuickView product={mockProduct} onClose={() => setShowQuickView(false)} />}
      {showOrderConfirm && <OrderConfirmation onClose={() => setShowOrderConfirm(false)} />}
      {toastVisible && <Toast message="? Welcome to the Feature Showcase!" type="success" duration={5000} />}
    </main>
  );
}
