import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-lg border border-[#30261C]/10 bg-[#F1F0EE] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}>{children}</div>;
}
