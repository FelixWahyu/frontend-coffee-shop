interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function usePagination({ currentPage, totalPages, onPageChange }: UsePaginationProps) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const siblingPages = 1;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const startSibling = Math.max(2, currentPage - siblingPages);
    const endSibling = Math.min(totalPages - 1, currentPage + siblingPages);

    if (startSibling > 2) {
      pages.push("...");
    }

    for (let i = startSibling; i <= endSibling; i++) {
      pages.push(i);
    }

    if (endSibling < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handlePrev = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return {
    pages,
    isFirstPage,
    isLastPage,
    handlePrev,
    handleNext,
  };
}

export default usePagination;
