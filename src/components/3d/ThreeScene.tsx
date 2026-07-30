"use client";

// This component has been disabled to fix WebGL errors.
// It now renders a clean, premium black background.
export default function ThreeScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0A0A0A]" />
  );
}