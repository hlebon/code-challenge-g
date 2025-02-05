export function PageHeader({ description }: { description: string }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-6">Library</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
