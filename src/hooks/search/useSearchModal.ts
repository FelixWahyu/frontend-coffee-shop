import { useState, useEffect, useRef } from "react";
import useProducts from "@/hooks/products/UseProducts";

interface UseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SUGGESTIONS = ["Espresso", "Cappuccino", "Latte", "Americano", "Macchiato"];

export function useSearchModal({ isOpen, onClose }: UseSearchModalProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Set mounted flag on client side to prevent SSR issues with Portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Debounce the query to prevent overloading the database/API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Focus the input when the modal is opened & lock body scroll
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal

      return () => {
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Hook to fetch products based on debounced search query
  const { products, isLoading } = useProducts({ search: debouncedQuery });

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    mounted,
    query,
    setQuery,
    handleQueryChange,
    handleClearQuery,
    handleSelectSuggestion,
    inputRef,
    modalRef,
    handleBackdropClick,
    products,
    isLoading,
    suggestions: SUGGESTIONS,
  };
}

export default useSearchModal;
