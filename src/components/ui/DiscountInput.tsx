"use client";
import { useState } from "react";

export default function DiscountInput() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  return (
    <div className="flex gap-2">
      <input type="text" placeholder="Discount code" value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white outline-none focus:border-blue-500 transition-colors text-sm" />
      <button onClick={() => { if (code) { setApplied(true); setCode(""); } }} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">{applied ? '? Applied' : 'Apply'}</button>
    </div>
  );
}
