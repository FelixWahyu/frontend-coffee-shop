import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function TextInput({ type = "text", className = "", ...props }: TextInputProps) {
  return <input type={type} className={`w-full rounded-lg border border-gray-400 px-4 py-1.5 outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E] ${className}`} {...props} />;
}
