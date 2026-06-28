import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

const styles = {
  primary: 'bg-brand-600 text-white hover:bg-brand-500',
  secondary: 'bg-white text-slate-700 border border-brand-100 hover:border-brand-300',
  ghost: 'bg-transparent text-slate-600 hover:bg-brand-50',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
