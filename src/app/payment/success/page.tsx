"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    // Verify the payment with the backend
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const transaction_id = urlParams.get('transaction_id');
      const tx_ref = urlParams.get('tx_ref');

      if (!transaction_id) {
        setMessage("Payment verification failed. Please contact support.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction_id, tx_ref }),
        });
        const data = await res.json();

        if (data.data.status === 'successful') {
          // ✅ Place the actual order now that payment is verified
          const token = document.cookie.match(/apex_token=([^;]+)/)?.[1];
          if (token) {
            await fetch('http://localhost:5000/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });
          }
          setMessage("Payment successful! Your order is being processed.");
        } else {
          setMessage("Payment failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-4">{loading ? "⏳" : "✅"}</div>
      <h1 className="text-4xl font-bold text-white font-[var(--font-playfair)] mb-4">
        {loading ? "Verifying..." : "Payment Status"}
      </h1>
      <p className="text-white/60 text-lg mb-8 max-w-md">{message}</p>
      <Link href="/" className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">
        Return to Store
      </Link>
    </div>
  );
}