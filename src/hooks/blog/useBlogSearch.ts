import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useBlogSearch(debounceMs = 300) {
  const router = useRouter();
  const params = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      router.replace(`/blog?${newParams.toString()}`, { scroll: false });
    }, debounceMs);
  };

  const defaultValue = params.get("search") || "";

  return {
    defaultValue,
    handleSearch,
  };
}

export default useBlogSearch;
