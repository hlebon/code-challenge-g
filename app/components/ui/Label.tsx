type LabelProps = { children: React.ReactNode };

export function Label({ children }: LabelProps) {
  return (
    <div className="bg-gray-200 p-1 text-gray-500 text-sm rounded-md">
      {children}
    </div>
  );
}
