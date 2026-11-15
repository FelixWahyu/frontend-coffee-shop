import { ChevronLeft, ChevronRight } from "lucide-react";
import usePagination from "@/hooks/ui/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "modern" | "brutalism";
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "modern",
}: PaginationProps) {
  const { pages, isFirstPage, isLastPage, handlePrev, handleNext } = usePagination({
    currentPage,
    totalPages,
    onPageChange,
  });

  if (totalPages <= 1) return null;

  const isBrutalist = variant === "brutalism";

  // Classes for Prev/Next buttons
  const btnClasses = isBrutalist
    ? "flex items-center justify-center w-10 h-10 border-2 border-black rounded-md bg-gray-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#C67C4E] hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
    : "flex items-center justify-center w-10 h-10 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-[#C67C4E] hover:text-white hover:border-[#C67C4E] transition-all duration-300 shadow-sm disabled:opacity-40 disabled:pointer-events-none cursor-pointer";

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirstPage}
        className={btnClasses}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className={`flex items-center justify-center w-10 h-10 font-bold select-none ${
                isBrutalist ? "text-gray-500" : "text-stone-400"
              }`}
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;
        let pageBtnClasses = "";

        if (isBrutalist) {
          pageBtnClasses = isCurrent
            ? "flex items-center justify-center w-10 h-10 border-2 border-black rounded-md font-semibold bg-[#C67C4E] text-white shadow-none translate-x-0.5 translate-y-0.5 cursor-pointer"
            : "flex items-center justify-center w-10 h-10 border-2 border-black rounded-md font-semibold bg-gray-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#C67C4E] hover:text-white cursor-pointer transition-all";
        } else {
          pageBtnClasses = isCurrent
            ? "flex items-center justify-center w-10 h-10 rounded-xl border border-[#C67C4E] font-bold bg-[#C67C4E] text-white shadow-sm cursor-pointer"
            : "flex items-center justify-center w-10 h-10 rounded-xl border border-stone-200 font-semibold bg-white text-stone-600 hover:bg-[#C67C4E]/10 hover:text-[#C67C4E] hover:border-[#C67C4E]/30 cursor-pointer shadow-sm transition-all duration-300";
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            className={pageBtnClasses}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isLastPage}
        className={btnClasses}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
