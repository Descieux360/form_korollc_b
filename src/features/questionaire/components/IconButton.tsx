import React, { type ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  label?: string;
}

export function IconButton({ icon, variant = 'primary', label, className = '', ...props }: IconButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 disabled:opacity-40 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200 dark:shadow-none",
    secondary: "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700",
    ghost: "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-rose-600 dark:hover:text-rose-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {label && <span>{label}</span>}
      {icon}
    </button>
  );
}
