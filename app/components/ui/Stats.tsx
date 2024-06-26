type StatsProps = {
  label: string;
  value: string;
  className?: string;
};

export function Stats({ label, value, className }: StatsProps) {
  return (
    <div className={`p-3 w-1/4 text-center text-sm ${className}`}>
      <div className="text-black font-semibold">{value}</div>
      <div className="text-gray-500">{label}</div>
    </div>
  );
}
