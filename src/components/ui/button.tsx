import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export default function Button({ type = "button", className = "", children = "Click", ...props }: ButtonProps) {
  return (
    <button type={type} className={`px-4 py-1.5 rounded-lg shadow-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>
      {children}
    </button>
  );
}
