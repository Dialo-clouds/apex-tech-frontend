export default function ProductReviews() {
  return (
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-16 mb-24">
      <h2 className="text-3xl font-bold text-white mb-12 font-[var(--font-playfair)] tracking-wide">What our customers say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
          <div className="flex text-yellow-500 text-sm mb-4">★★★★★</div>
          <p className="text-white/80 text-lg leading-relaxed font-[var(--font-playfair)]">"This is hands down the best tech purchase I've made. The quality and design are absolutely stunning."</p>
          <p className="mt-4 text-blue-400 font-bold text-sm tracking-wide">— Alex M.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
          <div className="flex text-yellow-500 text-sm mb-4">★★★★★</div>
          <p className="text-white/80 text-lg leading-relaxed font-[var(--font-playfair)]">"The video reviews were incredibly helpful. I felt like I was holding the product before I even bought it."</p>
          <p className="mt-4 text-blue-400 font-bold text-sm tracking-wide">— Sarah K.</p>
        </div>
      </div>
    </div>
  );
}