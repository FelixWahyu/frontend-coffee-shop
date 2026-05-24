import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export default function Button({ type = "button", className = "", children = "Click", ...props }: ButtonProps) {
  return (
    <button type={type} className={`${className}`} {...props}>
      {children}
    </button>
  );
}
