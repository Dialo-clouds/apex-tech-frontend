"use client";

import { useCart } from "@/store/useCart";
import Link from "next/link";
import { useState } from "react";
import { getToken } from "@/lib/auth";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const token = getToken();
    if (!token) {
      alert('Please log in to apply a coupon.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders/apply-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ code: couponCode, total_amount: getTotal() })
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || 'Invalid coupon');
        setDiscount(0);
      } else {
        setCouponError("");
        setDiscount(parseFloat(data.discount));
      }
    } catch (error) {
      setCouponError('Failed to apply coupon. Try again.');
    }
  };

  const handleCheckout = async () => {
    const token = getToken();
    if (!token) {
      alert('Please log in to place an order.');
      window.location.href = '/auth/login';
      return;
    }

    setIsCheckingOut(true);
    try {
      // 1. Get user email from the cookie
      const emailMatch = document.cookie.match(/apex_email=([^;]+)/);
      const userEmail = emailMatch ? emailMatch[1] : 'customer@apextech.com';

      // 2. Initiate Flutterwave payment
      const payRes = await fetch('http://localhost:5000/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          amount: total, // ✅ This is now strictly ₦
          email: userEmail,
          full_name: 'ApexTech Customer',
        }),
      });

      const payData = await payRes.json();
      if (!payRes.ok) throw new Error('Payment initiation failed');

      // 3. Redirect user to Flutterwave's hosted checkout page
      window.location.href = payData.link;
    } catch (error) {
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = getTotal();
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-[#0A0A0A] border-l border-white/10 h-full flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-[0.05em] text-white font-[var(--font-playfair)]">Your Cart</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/40">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg font-light">Your cart is empty</p>
              <Link href="/" onClick={onClose} className="mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm">Continue Shopping</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm tracking-[0.5px]">{item.name}</h4>
                  <p className="text-blue-400 text-sm mt-1">₦{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/60">−</button>
                    <span className="text-sm text-white/80">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/60">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-red-400/60 hover:text-red-400 text-xs">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-6 space-y-4">
            {/* Coupon Input */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Coupon code" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                onClick={handleApplyCoupon}
                className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-red-400 text-xs">{couponError}</p>}
            {discount > 0 && <p className="text-green-400 text-xs">-₦{discount.toFixed(2)} applied!</p>}

            <div className="flex justify-between items-center">
              <span className="text-white/60 font-light">Subtotal ({getItemCount()} items)</span>
              <span className="text-xl font-bold text-white">₦{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-400">Discount</span>
                <span className="text-green-400">-₦{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <span className="text-white/60 font-light">Total</span>
              <span className="text-xl font-bold text-blue-400">₦{total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={isCheckingOut}
              className="w-full bg-blue-500 text-white py-4 rounded-full font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(30,144,255,0.2)]"
            >
              {isCheckingOut ? "Processing..." : "Place Order"}
            </button>
          </div>
        )}
      </div>

      {orderSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-10">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 text-center max-w-sm w-full shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white font-[var(--font-playfair)]">Order Placed!</h2>
            <p className="text-white/60 text-sm mt-2">Your ApexTech order is being processed.</p>
          </div>
        </div>
      )}
    </div>
  );
}