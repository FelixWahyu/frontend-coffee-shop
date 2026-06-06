import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

export default function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={`p-6 border-3 border-gray-900 rounded-md shadow-[6px_6px_0px_#000000]/60 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full text-gray-800">{icon}</div>
      </div>
    </div>
  );
}
