import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
      <span className="uppercase tracking-[0.18em] text-xs text-ink-700">{label}</span>
      <input
        {...props}
        className={`rounded-[1.5rem] border border-brand-200 bg-[#fcfdf8] px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-accent-400 focus:bg-white ${className}`}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}

export function Textarea({
  label,
  error,
  className = '',
  ...props
}: TextareaFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
      <span className="uppercase tracking-[0.18em] text-xs text-ink-700">{label}</span>
      <textarea
        {...props}
        className={`min-h-28 rounded-[1.5rem] border border-brand-200 bg-[#fcfdf8] px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-accent-400 focus:bg-white ${className}`}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}
