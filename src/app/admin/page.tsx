"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "@/lib/auth";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editTracking, setEditTracking] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const orderRes = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!orderRes.ok) {
          if (orderRes.status === 403) {
            setError('Access Denied. You are not an admin.');
            setIsAdmin(false);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch orders');
        }

        setIsAdmin(true);
        const orderData = await orderRes.json();
        setOrders(orderData);

        const prodRes = await fetch('http://localhost:5000/api/products');
        const prodData = await prodRes.json();
        setProducts(prodData);
      } catch (error) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateOrder = async (orderId: number) => {
    const token = getToken();
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: editStatus, tracking_number: editTracking })
      });
      if (res.ok) {
        setEditingOrderId(null);
        setEditStatus("");
        setEditTracking("");
        // Refresh orders
        const orderRes = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const orderData = await orderRes.json();
        setOrders(orderData);
      }
    } catch (error) {
      alert('Failed to update order.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white/40">Loading admin panel...</div>
      </div>
    );
  }

  if (error || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-3xl font-bold text-white font-[var(--font-playfair)] mb-4">Access Denied</h1>
          <p className="text-white/60 mb-8">{error || "You do not have permission to view this page."}</p>
          <Link href="/" className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white font-[var(--font-playfair)]">Admin Dashboard</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">← Back to Store</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Live Products ({products.length})</h2>
            <div className="space-y-3">
              {products.map((p: any) => (
                <div key={p.id} className="flex justify-between items-center text-sm border-b border-white/5 py-3">
                  <span>{p.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400">${p.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${p.in_stock > 0 ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                      {p.in_stock > 0 ? `${p.in_stock} left` : 'Out'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Orders ({orders.length})</h2>
            <div className="space-y-3">
              {orders.map((o: any) => (
                <div key={o.id} className="flex flex-col sm:flex-row justify-between items-start text-sm border-b border-white/5 py-3 gap-2">
                  <div>
                    <span className="text-white/70">Order #{o.id}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs border ${o.status === 'pending' ? 'border-yellow-500/30 text-yellow-400' : 'border-green-500/30 text-green-400'}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">${o.total_amount}</span>
                    {editingOrderId === o.id ? (
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none">
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <input type="text" placeholder="Tracking #" value={editTracking} onChange={(e) => setEditTracking(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none w-24" />
                        <button onClick={() => handleUpdateOrder(o.id)} className="text-blue-400 hover:text-blue-300 text-xs">Save</button>
                        <button onClick={() => setEditingOrderId(null)} className="text-white/40 hover:text-white text-xs">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditingOrderId(o.id); setEditStatus(o.status); setEditTracking(o.tracking_number || ''); }} className="text-white/40 hover:text-white text-xs">Edit</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}