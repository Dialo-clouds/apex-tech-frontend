"use client";
export default function QuickView({ product, onClose }: { product: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-white font-[var(--font-playfair)]">{product.name}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">?</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl" />
          <div className="space-y-4">
            <p className="text-blue-400 text-2xl font-bold"></p>
            <p className="text-white/70 leading-relaxed">{product.desc}</p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
