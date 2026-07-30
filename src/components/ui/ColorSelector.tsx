export default function ColorSelector({ colors, selected, setSelected }: { colors: string[]; selected: string; setSelected: (c: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/60 text-sm tracking-wide">Color:</span>
      {colors.map(c => (
        <button key={c} onClick={() => setSelected(c)} className="w-6 h-6 rounded-full border-2 transition-all " style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}
