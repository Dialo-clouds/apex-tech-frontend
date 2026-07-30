"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "@/lib/auth";

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  created_at: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10';
      case 'processing': return 'border-blue-500/30 text-blue-400 bg-blue-500/10';
      case 'shipped': return 'border-green-500/30 text-green-400 bg-green-500/10';
      case 'delivered': return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10';
      default: return 'border-gray-500/30 text-gray-400 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white/40">Loading your orders...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white px-4 md:px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-[var(--font-playfair)]">My Orders</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">← Back to Store</Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-2xl font-light">No orders yet</p>
            <Link href="/" className="mt-4 inline-block text-blue-400 hover:text-blue-300">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                  <div>
                    <p className="text-sm text-white/40">Order #{order.id}</p>
                    <p className="text-sm text-white/60">{new Date(order.created_at).toLocaleDateString()}</p>
                    {order.tracking_number && (
                      <p className="text-xs text-white/40 mt-1">Tracking: {order.tracking_number}</p>
                    )}
                  </div>
                  <div className="text-left sm:text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-lg font-bold text-blue-400 mt-1">${order.total_amount}</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/70">{item.product_name} × {item.quantity}</span>
                      <span className="text-white/50">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}