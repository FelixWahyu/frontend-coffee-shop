"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function SearchParams() {
  const router = useRouter();
  const params = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newParams = new URLSearchParams(params.toString());

      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      router.replace(`/products?${newParams.toString()}`, { scroll: false });
    }, 300);
  };

  return (
    <div className="bg-gray-50 mt-6 border border-gray-200 px-4 py-1.5 flex outline-0 gap-2 items-center rounded-lg w-full md:w-lg focus:border-[#C67C4E] focus:outline-1 focus:outline-[#C67C4E]">
      <Search size={18} className="text-gray-500" />
      <input type="text" name="search" placeholder="Cari..." onChange={handleSearchBox} defaultValue={params.get("search") || ""} className="rounded-lg w-full bg-transparent border-none focus:outline-none" />
    </div>
  );
}
