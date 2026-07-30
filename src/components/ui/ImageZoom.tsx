"use client";
import { useState } from "react";

export default function ImageZoom({ src }: { src: string }) {
  const [zoom, setZoom] = useState(false);

  // ✅ ULTIMATE FIX: Handle both local /media/ paths AND external CDN URLs
  let fixedSrc = src;
  
  // If it's a local path starting with /images/, swap to /media/
  if (src.startsWith('/images/')) {
    fixedSrc = src.replace('/images/', '/media/');
  }
  
  // If it's the Samsung CDN URL (or any external URL), leave it exactly as is
  // No changes needed because it's already a full URL.

  return (
    <div 
      className="relative overflow-hidden rounded-2xl cursor-zoom-in" 
      onMouseEnter={() => setZoom(true)} 
      onMouseLeave={() => setZoom(false)}
    >
      <img 
        src={fixedSrc} 
        alt="Product" 
        className={`w-full h-auto transition-transform duration-500 ${zoom ? 'scale-150' : 'scale-100'}`} 
      />
    </div>
  );
}