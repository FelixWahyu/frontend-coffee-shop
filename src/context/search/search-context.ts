import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchBox() {
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

  return {
    handleSearchBox,
    params,
  };
}
