import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-md bg-gray-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#C67C4E] hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md font-semibold transition-all cursor-pointer ${
            page === currentPage
              ? "bg-[#C67C4E] text-white shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-gray-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#C67C4E] hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-md bg-gray-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#C67C4E] hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
