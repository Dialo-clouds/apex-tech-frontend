export default function CheckoutProgress({ step }: { step: number }) {
  return (
    <div className="flex justify-between items-center mb-8 px-4">
      {['Cart', 'Details', 'Payment', 'Done'].map((label, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ">{i + 1}</div>
          <span className="text-[10px] uppercase tracking-widest ">{label}</span>
        </div>
      ))}
    </div>
  );
}
