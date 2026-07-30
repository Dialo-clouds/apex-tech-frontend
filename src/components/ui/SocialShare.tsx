export default function SocialShare({ url, title }: { url: string; title: string }) {
  return (
    <div className="flex gap-4 text-white/40">
      <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)} className="hover:text-white transition-colors">𝕏</button>
      <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)} className="hover:text-white transition-colors">f</button>
    </div>
  );
}