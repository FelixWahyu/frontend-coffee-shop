"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./pagination";

interface UrlPaginationProps {
  totalPages: number;
}

export default function UrlPagination({ totalPages }: UrlPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
