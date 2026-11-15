import { useRouter, useSearchParams } from "next/navigation";

export function useUrlPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return {
    currentPage,
    handlePageChange,
  };
}

export default useUrlPagination;
