export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="school-panel rounded-[2rem] border-dashed p-8 text-center">
      <div className="mx-auto mb-4 h-14 w-14 rounded-[1.4rem] bg-accent-100" />
      <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-700">{description}</p>
    </div>
  );
}
