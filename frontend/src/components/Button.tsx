import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

const styles = {
  primary: 'bg-ink-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-600',
  secondary: 'border border-brand-200 bg-white text-ink-900 hover:border-brand-400 hover:bg-brand-50',
  ghost: 'bg-transparent text-ink-700 hover:bg-brand-50',
  danger: 'bg-accent-500 text-white hover:bg-accent-400',
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
