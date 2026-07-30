"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      document.cookie = `apex_token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `apex_email=nasirahmadb29@gmail.com; path=/; max-age=604800; SameSite=Lax`;

      // ✅ Professional redirect – No ugly alert popup!
      window.location.href = "/";
    } catch (error) {
      alert("Network error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors text-sm mb-8">
          ← Back to Store
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <div className="text-3xl font-black tracking-tight text-white mb-2">APEX<span className="text-blue-500">TECH</span></div>
            <h1 className="text-3xl font-bold text-white font-[var(--font-playfair)]">Welcome back</h1>
            <p className="text-white/50 text-sm mt-2">Sign in to your account to access your orders.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors placeholder:text-white/30"
                required 
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors placeholder:text-white/30"
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3.5 rounded-full font-bold hover:bg-blue-600 transition-all shadow-[0_10px_40px_rgba(30,144,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}