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
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        {...props}
        className={`rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 ${className}`}
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
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <textarea
        {...props}
        className={`min-h-28 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-400 ${className}`}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}
