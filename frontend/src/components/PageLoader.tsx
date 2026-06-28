interface PageLoaderProps {
  fullscreen?: boolean;
  label?: string;
}

export function PageLoader({
  fullscreen = false,
  label = 'Loading next page...',
}: PageLoaderProps) {
  return (
    <div
      className={
        fullscreen
          ? 'page-loader-overlay fixed inset-0 z-50 flex items-center justify-center p-6'
          : 'page-loader-overlay absolute inset-0 z-30 flex items-center justify-center rounded-[2rem] p-6'
      }
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex min-w-64 flex-col items-center gap-4 rounded-[2rem] border border-brand-100 bg-white/88 px-8 py-7 text-center shadow-soft backdrop-blur-xl">
        <div className="page-loader-spinner" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
            ApplyMate
          </p>
          <p className="text-sm font-medium text-slate-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
