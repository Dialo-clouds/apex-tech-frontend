"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/store/useCart";
import dynamic from "next/dynamic";
import ProductReviews from "@/components/ui/ProductReviews";
import RelatedCarousel from "@/components/ui/RelatedCarousel";
import EstimatedDelivery from "@/components/ui/EstimatedDelivery";
import LiveCounter from "@/components/ui/LiveCounter";
import ImageZoom from "@/components/ui/ImageZoom";
import WishlistButton from "@/components/ui/WishlistButton";
import { getToken } from "@/lib/auth";

const QuickActions = dynamic(
  () => import("@/components/ui/QuickActions"),
  { ssr: false }
);

const products: Record<string, any> = {
  "iphone16": { id: "iphone16", db_id: 1, name: "iPhone 16 Pro", price: 1199, inStock: true, desc: "The ultimate smartphone. Powered by the new A18 Pro chip.", desc2: "ProMotion technology adapts from 1Hz to 120Hz for fluid scrolling, gaming, and video.", image: "/media/iphone16.jpg", video: "/videos/iphone16.mp4" },
  "iphone15": { id: "iphone15", db_id: 2, name: "iPhone 15 Pro", price: 999, inStock: false, desc: "Dynamic Island makes its debut, transforming notifications into a live activity.", desc2: "The USB-C port opens up a world of connectivity.", image: "/media/iphone15.jpg", video: "/videos/iphone15-pro.mp4" },
  "samsung-s24": { id: "samsung-s24", db_id: 3, name: "Samsung S24 Ultra", price: 1299, inStock: true, desc: "Galaxy AI is here. Circle to Search, Live Translate.", desc2: "The built-in S Pen offers precision drawing.", image: "/media/samsung-s24.jpg", video: "/videos/samsung-s24-ultra.mp4" },
  "macbook-m5": { id: "macbook-m5", db_id: 4, name: "MacBook Pro M5", price: 2499, inStock: true, desc: "The ultimate pro laptop. The new M5 chip brings unprecedented speed.", desc2: "The 16.2-inch Liquid Retina XDR display features ProMotion.", image: "/media/macbook-m5.jpg", video: "/videos/macbook-pro-m3.mp4" },
  "macbook-air": { id: "macbook-air", db_id: 5, name: "MacBook Air", price: 1099, inStock: false, desc: "The world's most popular laptop, now supercharged by the M3 chip.", desc2: "The 15.3-inch Liquid Retina display makes everything you do look stunning.", image: "/media/macbook-air.jpg", video: "/videos/macbook-pro-m3.mp4" },
  "macbook-m5-black": { id: "macbook-m5-black", db_id: 6, name: "MacBook Pro M5 Black", price: 2699, inStock: true, desc: "The ultimate pro laptop in stunning Space Black.", desc2: "Featuring a 16.2-inch Liquid Retina XDR display.", image: "/media/macbookm5-black.jpg", video: "/videos/macbook-pro-m3.mp4" },
  "xbox": { id: "xbox", db_id: 7, name: "Xbox Series X", price: 499, inStock: false, desc: "The fastest, most powerful Xbox ever. Experience true 4K gaming.", desc2: "Powered by the custom-designed Xbox Velocity Architecture.", image: "/media/xbox1.jpg", video: "/videos/oraimo-headphone.mp4" },
  "cool-keyboard": { id: "cool-keyboard", db_id: 8, name: "ApexKeys Ultra", price: 420, inStock: true, desc: "The ultimate typing experience.", desc2: "The aircraft-grade aluminum frame ensures durability.", image: "/media/cool-keyboard.jpg", video: "/videos/premium-keyboard.mp4" },
  "aura-mouse": { id: "aura-mouse", db_id: 9, name: "Aura Wireless Mouse", price: 89, inStock: true, desc: "Designed for all-day productivity.", desc2: "The ergonomic, contoured design fits perfectly in your palm.", image: "/media/aura-mouse.jpg", video: "/videos/wireless-earbud.mp4" },
  "wireless-mouse": { id: "wireless-mouse", db_id: 10, name: "Pro Wireless Mouse", price: 69, inStock: true, desc: "Ultra-lightweight, highly responsive.", desc2: "Featuring a precision optical sensor.", image: "/media/wireless-mouse.jpg", video: "/videos/wireless-earbud.mp4" },
  "gaming-mouse": { id: "gaming-mouse", db_id: 11, name: "Gaming Mouse Pro", price: 99, inStock: false, desc: "Engineered for competitive esports.", desc2: "The honeycomb shell design keeps it ultra-lightweight.", image: "/media/gaming-mouse.jpg", video: "/videos/premium-keyboard.mp4" },
  "earbuds-pro": { id: "earbuds-pro", db_id: 12, name: "Astrum ET340 Earbuds", price: 79, inStock: true, desc: "Immerse yourself in premium sound.", desc2: "Transparency Mode lets you stay connected to your surroundings.", image: "/media/earbuds.jpg", video: "/videos/astrum-et340-earbuds.mp4" },
};

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "macbook-m5-black";
  const product = products[id];
  
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [email, setEmail] = useState("");
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [show3DQuickLook, setShow3DQuickLook] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hoveringCart, setHoveringCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [fbtItems, setFbtItems] = useState<any[]>([]);
  const [fbtSelected, setFbtSelected] = useState<number[]>([]);

  const addItem = useCart((state) => state.addItem);
  const itemCount = useCart((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFBT = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${product.db_id}/frequently-bought`);
        const data = await res.json();
        setFbtItems(data);
      } catch (error) {
        console.error('Failed to fetch FBT');
      }
    };
    fetchFBT();
  }, [product.db_id]);

  const [visitorCount, setVisitorCount] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [showPriceDrop, setShowPriceDrop] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setShowPriceDrop(true);
        setTimeout(() => setShowPriceDrop(false), 4000);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const [relatedRotation, setRelatedRotation] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRelatedRotation(prev => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hoveringCart) {
      timer = setTimeout(() => {
        if (product.inStock) {
          const alertEl = document.getElementById('low-stock-alert');
          if (alertEl) {
            alertEl.style.display = 'block';
            setTimeout(() => { if (alertEl) alertEl.style.display = 'none'; }, 3000);
          }
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [hoveringCart, product.inStock]);

  if (!product) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Product not found</div>;

  const handleAddToCart = async () => {
    if (!product.inStock) { setShowWaitlist(true); return; }
    const token = getToken();
    if (!token) {
      alert('Please log in to add items to your cart.');
      window.location.href = '/auth/login';
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ product_id: product.db_id, quantity: quantity })
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      
      // ✅ ABSOLUTE URL FIX: Forces the Cart Drawer to load the image immediately
      addItem({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: window.location.origin + product.image 
      });
      
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      alert('Error adding to cart. Please try again.');
    }
  };

  const handleAddFBT = async () => {
    const token = getToken();
    if (!token) {
      alert('Please log in to add items to your cart.');
      window.location.href = '/auth/login';
      return;
    }
    if (fbtSelected.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    try {
      for (const id of fbtSelected) {
        await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ product_id: id, quantity: 1 })
        });
      }
      alert('All selected items added to cart!');
      window.location.reload();
    } catch (error) {
      alert('Error adding items. Please try again.');
    }
  };

  const handleReviewSubmit = () => {
    alert(`Thanks for your review! (${rating} stars: ${reviewText})`);
    setShowReviewForm(false);
    setReviewText("");
  };

  const relatedProducts = Object.values(products).filter(p => p.name !== product.name).slice(0, 4);
  const rotatedRelated = [...relatedProducts.slice(relatedRotation), ...relatedProducts.slice(0, relatedRotation)];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white px-6 md:px-16 py-24 relative">
      
      <div className="mb-8 text-xs tracking-widest text-white/40 uppercase">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#products" className="hover:text-white transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">{product.name}</span>
      </div>

      <QuickActions productName={product.name} productUrl={typeof window !== 'undefined' ? window.location.href : ''} />

      <div className={`fixed top-6 right-6 z-50 bg-[#0A0A0A] border border-blue-500/30 rounded-xl p-4 shadow-[0_10px_40px_rgba(30,144,255,0.2)] transform transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}>
        <p className="text-sm tracking-wide text-white">✨ <span className="text-blue-400 font-bold">{quantity}</span> × {product.name} added to cart</p>
        <p className="text-xs text-white/40 mt-1">Total items in cart: {mounted ? itemCount : 0}</p>
      </div>

      {showPriceDrop && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0A0A0A] border border-blue-500/30 rounded-xl p-4 shadow-[0_10px_40px_rgba(30,144,255,0.2)] transform transition-all duration-500 animate-slide-up">
          <p className="text-sm tracking-wide text-white">💰 <span className="text-blue-400 font-bold">Price dropped!</span> You saved ₦50 on this item.</p>
        </div>
      )}

      <div id="low-stock-alert" className="fixed top-32 right-6 z-50 bg-[#0A0A0A] border border-red-500/30 rounded-xl p-4 shadow-[0_10px_40px_rgba(255,0,0,0.1)] hidden transform transition-all duration-500">
        <p className="text-sm tracking-wide text-red-400">🔥 <span className="font-bold">Hurry!</span> 5 others have this in their cart right now.</p>
      </div>

      {showWaitlist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
            <h3 className="text-2xl font-bold text-white font-[var(--font-playfair)] mb-2">Out of Stock</h3>
            <p className="text-white/60 text-sm mb-6">Be the first to know when {product.name} is back.</p>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors mb-4" />
            <div className="flex gap-3">
              <button onClick={() => { alert("You've been added to the waitlist!"); setShowWaitlist(false); setEmail(""); }} className="flex-1 bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">Notify Me</button>
              <button onClick={() => setShowWaitlist(false)} className="flex-1 bg-white/5 text-white/60 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {show3DQuickLook && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShow3DQuickLook(false)} className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl">✕</button>
            <div className="flex flex-col items-center justify-center py-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-[var(--font-playfair)]">Experience {product.name} in 3D</h3>
              <div className="w-full h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl flex items-center justify-center border border-white/5">
                <div className="text-center text-white/60">
                  <div className="text-6xl mb-4">🔄</div>
                  <p>Drag to rotate the product</p>
                  <img src={product.image} alt={product.name} className="w-64 h-auto mx-auto mt-4 drop-shadow-[0_20px_40px_rgba(30,144,255,0.2)] cursor-grab active:cursor-grabbing" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="context-menu" className="fixed z-[200] hidden bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <button onClick={() => { navigator.clipboard.writeText(window.getSelection()?.toString() || ''); }} className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">📋 Copy</button>
        <button onClick={() => { window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(window.getSelection()?.toString() || '')); }} className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">𝕏 Tweet</button>
        <button onClick={() => { if (navigator.share) { navigator.share({ text: window.getSelection()?.toString() || '' }); } }} className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">📤 Share</button>
      </div>

      {showReviewForm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-lg">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white font-[var(--font-playfair)]">Write a Review</h3>
              <button onClick={() => setShowReviewForm(false)} className="text-white/60 hover:text-white text-2xl">✕</button>
            </div>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5].map(r => (
                <button key={r} onClick={() => setRating(r)} className={`text-2xl ${r <= rating ? 'text-yellow-500' : 'text-white/20'}`}>★</button>
              ))}
            </div>
            <textarea placeholder="Share your experience..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors h-24 resize-none mb-4" />
            <button onClick={handleReviewSubmit} className="w-full bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600 transition-all">Submit Review</button>
          </div>
        </div>
      )}

      <Link href="/" className="inline-block mb-16 text-white/40 hover:text-blue-400 text-sm tracking-[0.15em] uppercase transition-colors font-[var(--font-inter)]">← Back to Collection</Link>

      <div className="w-full max-w-5xl mx-auto mb-20 flex flex-col items-center relative">
        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(30,144,255,0.1)] border border-white/5">
          <video width="100%" controls autoPlay loop muted={isMuted} playsInline className="w-full max-h-[80vh] object-contain" poster={product.image}>
            <source src={product.video} type="video/mp4" />
          </video>
          <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/70 hover:text-white transition-colors border border-white/10">
            {isMuted ? "🔇 Muted" : "🔊 Unmuted"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        <div className="md:col-span-4 space-y-8 border-l-2 border-blue-500/50 pl-8 sticky top-24 h-fit">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.05em] leading-[0.9] text-white font-[var(--font-playfair)]">{product.name}</h1>
            <WishlistButton productId={product.id} />
          </div>
          <div className="text-4xl font-bold text-blue-400 font-[var(--font-inter)] tracking-tight">₦{product.price}</div>
          
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{visitorCount} people viewing this right now</span>
            </span>
          </div>

          <EstimatedDelivery />
          <LiveCounter />
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-white/10 rounded-full bg-white/5 overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-white/10 transition-colors text-white/60">−</button>
              <span className="px-4 py-2 text-white font-[var(--font-inter)]">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-white/10 transition-colors text-white/60">+</button>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full border ${product.inStock ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
              {product.inStock ? '● In Stock' : '● Out of Stock'}
            </span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShow3DQuickLook(true)} className="bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-white/20 transition-all flex items-center gap-2">
              🚀 3D View
            </button>
            <button 
              onMouseEnter={() => setHoveringCart(true)} 
              onMouseLeave={() => setHoveringCart(false)}
              onClick={handleAddToCart} 
              className={`flex-1 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_10px_40px_rgba(30,144,255,0.1)] font-[var(--font-inter)] tracking-wide ${product.inStock ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white' : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'}`}>
              {product.inStock ? 'Add to Cart' : 'Notify Me When Available'}
            </button>
          </div>

          {fbtItems.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">Frequently Bought Together</h4>
              <div className="space-y-3">
                {fbtItems.map((item) => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={fbtSelected.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFbtSelected([...fbtSelected, item.id]);
                        } else {
                          setFbtSelected(fbtSelected.filter(id => id !== item.id));
                        }
                      }}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <span className="text-white/80 text-sm">{item.name} - ₦{item.price}</span>
                  </label>
                ))}
              </div>
              <button 
                onClick={handleAddFBT}
                className="mt-3 w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all"
              >
                Add all selected to cart
              </button>
            </div>
          )}
        </div>
        <div className="hidden md:block md:col-span-2"></div>
        <div className="md:col-span-6 space-y-16 border-t border-white/10 pt-12 md:border-t-0 md:pt-0">
          <div className="space-y-6 text-xl md:text-2xl leading-[2] text-white/70 font-light tracking-wide font-[var(--font-playfair)]">
            <p className="first-letter:text-6xl first-letter:font-black first-letter:text-blue-400 first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8]">{product.desc}</p>
          </div>
          <div className="h-[1px] w-32 bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="space-y-6 text-lg leading-[2.2] text-white/50 font-light max-w-2xl ml-auto tracking-[0.02em] font-[var(--font-playfair)]">{product.desc2}</div>
          
          <div className="mt-8 border-t border-white/10 pt-8">
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">Zoom to explore</h4>
            <ImageZoom src={product.image} />
          </div>
        </div>
      </div>

      <ProductReviews />
      
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h2 className="text-3xl font-bold text-white mb-12 font-[var(--font-playfair)] tracking-wide">People also bought</h2>
        <RelatedCarousel products={rotatedRelated} />
        <p className="text-white/40 text-xs text-center mt-4">Live recommendations refresh every 10 seconds</p>
      </div>

      <button 
        onClick={() => setShowReviewForm(true)}
        className="fixed bottom-8 left-8 z-40 bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-white/20 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-2"
      >
        ✍️ Write a Review
      </button>
    </main>
  );
}