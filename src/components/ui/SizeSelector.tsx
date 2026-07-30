export default function SizeSelector({ sizes, selected, setSelected }: { sizes: string[]; selected: string; setSelected: (s: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-sm tracking-wide">Size:</span>
      {sizes.map(s => (
        <button key={s} onClick={() => setSelected(s)} className={`px-4 py-1 rounded-full border text-sm transition-all ${selected === s ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-white/10 text-white/60 hover:border-white/30'}`}>
          {s}
        </button>
      ))}
    </div>
  );
}