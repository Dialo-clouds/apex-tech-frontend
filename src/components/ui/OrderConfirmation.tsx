export default function OrderConfirmation({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-12 text-center max-w-md w-full">
        <div className="text-6xl mb-4">??</div>
        <h2 className="text-3xl font-bold text-white font-[var(--font-playfair)] mb-2">Order Placed!</h2>
        <p className="text-white/60 text-sm mb-6">Your ApexTech order is being processed. You will receive a confirmation email shortly.</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">Continue Shopping</button>
      </div>
    </div>
  );
}
