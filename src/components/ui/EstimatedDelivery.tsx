export default function EstimatedDelivery() {
  // Force a consistent locale format so Server and Client match
  const date = new Date();
  date.setDate(date.getDate() + 5);
  
  // Use en-US format (Month/Day/Year) to match server-side behavior
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  return <p className="text-white/50 text-sm">🚚 Arrives by <span className="text-white/80 font-bold">{formattedDate}</span></p>;
}