"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("apex-cookies")) setConsent(true);
  }, []);
  const accept = () => {
    localStorage.setItem("apex-cookies", "true");
    setConsent(true);
  };
  if (consent) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-[#0A0A0A] border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-white/60 text-sm">We use cookies to enhance your experience. By continuing, you agree to our privacy policy.</p>
      <button onClick={accept} className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">Accept</button>
    </div>
  );
}
