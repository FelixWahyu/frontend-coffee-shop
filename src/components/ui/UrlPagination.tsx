"use client";

import Pagination from "./pagination";
import useUrlPagination from "@/hooks/ui/useUrlPagination";

interface UrlPaginationProps {
  totalPages: number;
  variant?: "modern" | "brutalism";
}

export default function UrlPagination({ totalPages, variant = "modern" }: UrlPaginationProps) {
  const { currentPage, handlePageChange } = useUrlPagination();

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      variant={variant}
    />
  );
}
