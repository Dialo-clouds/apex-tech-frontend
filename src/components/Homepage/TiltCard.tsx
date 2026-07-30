"use client";
import { useRef, useState } from "react";

export default function TiltCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    cardRef.current.style.transform = perspective(1000px) rotateX(deg) rotateY(deg) scale3d(1.05, 1.05, 1.05);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className={elative overflow-hidden rounded-2xl transition-all duration-300 ease-out cursor-pointer }
    >
      {children}
      <div className={bsolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none } />
    </div>
  );
}
