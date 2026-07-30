export default function Newsletter() {
  return (
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-16 pb-8">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white font-[var(--font-playfair)]">Get the latest drops</h3>
          <p className="text-white/60 text-sm mt-1">Sign up for exclusive access and early releases.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-full px-4 py-3 text-white outline-none focus:border-blue-500 transition-colors min-w-[250px]" />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
