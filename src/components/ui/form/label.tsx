import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`mb-4 text-sm font-semibold text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
}
