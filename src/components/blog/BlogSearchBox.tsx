"use client";

import { Search } from "lucide-react";
import useBlogSearch from "@/hooks/blog/useBlogSearch";

export default function BlogSearchBox() {
  const { defaultValue, handleSearch } = useBlogSearch();

  return (
    <div className="bg-gray-50 mt-6 border border-gray-200 px-4 py-1.5 flex outline-0 gap-2 items-center rounded-lg w-full md:w-lg focus:border-[#C67C4E] focus:outline-1 focus:outline-[#C67C4E]">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="Cari artikel..."
        onChange={handleSearch}
        defaultValue={defaultValue}
        className="rounded-lg w-full bg-transparent border-none focus:outline-none text-stone-800"
      />
    </div>
  );
}
