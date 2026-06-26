import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return <textarea className={`w-full rounded-lg border border-gray-300 px-4 py-1.5 outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E] ${className}`} {...props} />;
}
