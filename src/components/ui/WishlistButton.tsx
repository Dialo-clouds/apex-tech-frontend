"use client";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/orders/wishlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsWishlisted(data.some((item: any) => item.id === parseInt(productId)));
      } catch (error) {
        console.error('Failed to fetch wishlist');
      }
    };
    checkWishlist();
  }, [productId]);

  const toggleWishlist = async () => {
    const token = getToken();
    if (!token) {
      alert('Please log in to save items to your wishlist.');
      window.location.href = '/auth/login';
      return;
    }

    setLoading(true);
    try {
      if (isWishlisted) {
        await fetch(`http://localhost:5000/api/orders/wishlist/${productId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } else {
        await fetch('http://localhost:5000/api/orders/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ product_id: parseInt(productId) })
        });
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleWishlist} 
      disabled={loading}
      className={`text-2xl transition-colors ${loading ? 'opacity-50' : ''} ${isWishlisted ? 'text-red-400' : 'text-white/40 hover:text-red-400'}`}
    >
      {isWishlisted ? "♥" : "♡"}
    </button>
  );
}