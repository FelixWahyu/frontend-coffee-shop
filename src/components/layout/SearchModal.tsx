"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Coffee, Loader2 } from "lucide-react";
import useProducts from "@/hooks/products/UseProducts";
import { formatCurrency } from "@/utils/formatCurrency";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = ["Espresso", "Cappuccino", "Latte", "Americano", "Macchiato"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Debounce the query to prevent overloading the database/API on every keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Focus the input when the modal is opened
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

  if (!isOpen) return null;

  return (
    <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-24 px-4 transition-all duration-300 ease-out">
      <div ref={modalRef} className="w-full max-w-4xl bg-[#FDFBF7] border border-stone-200/60 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Header */}
        <div className="relative flex items-center border-b border-stone-200/80 px-4 py-3 shrink-0">
          <Search className="w-5 h-5 text-stone-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for coffee, drinks, or foods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-stone-800 placeholder-stone-400 focus:outline-none text-lg py-1 font-lato"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400 rounded-md transition-all font-lato">
            Esc
          </button>
        </div>

        {/* Results / Content Area */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {/* Skeletons Loading State */}
          {isLoading ? (
            <div className="space-y-3">
              <div className="flex items-center text-stone-400 text-sm font-lato mb-4">
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#C67C4E]" />
                Searching for items...
              </div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex gap-4 p-3 rounded-xl bg-stone-50 animate-pulse border border-stone-100">
                  <div className="w-12 h-12 rounded-lg bg-stone-200 shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-stone-200 rounded w-1/3" />
                    <div className="h-3 bg-stone-200 rounded w-2/3" />
                  </div>
                  <div className="w-16 h-4 bg-stone-200 rounded shrink-0" />
                </div>
              ))}
            </div>
          ) : query === "" ? (
            /* Suggestions & Welcome view */
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-lato">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full bg-stone-100 hover:bg-[#F5EFE6] text-stone-600 hover:text-[#C67C4E] border border-stone-200/50 hover:border-[#C67C4E]/30 transition-all cursor-pointer font-lato"
                  >
                    <Search className="w-3 h-3" />
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center py-10 text-center text-stone-400/80 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                <Coffee className="w-10 h-10 mb-2.5 text-[#C67C4E]/60 animate-bounce duration-1000" />
                <p className="text-sm font-lato">Looking for something delicious?</p>
                <p className="text-xs text-stone-400 mt-1 font-lato">Type above or click a popular search to begin.</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            /* No Results Found */
            <div className="flex flex-col items-center justify-center py-12 text-center text-stone-500">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
                <Coffee className="w-6 h-6 opacity-60" />
              </div>
              <p className="font-semibold text-stone-700 font-playfair text-lg">No matches found</p>
              <p className="text-sm text-stone-400 mt-1 max-w-sm font-lato">We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Check your spelling or try another keyword.</p>
            </div>
          ) : (
            /* Results List */
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-lato">Menu Results ({products.length})</h3>
              </div>
              <div className="space-y-2">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex gap-4 p-3 rounded-xl border border-stone-200/40 bg-white hover:bg-[#F5EFE6]/30 hover:border-[#C67C4E]/30 shadow-sm hover:shadow transition-all group duration-300"
                  >
                    {/* Visual Indicator */}
                    <div className="w-12 h-12 rounded-lg bg-[#F5EFE6] flex items-center justify-center text-[#C67C4E] group-hover:scale-105 transition-transform duration-300 shrink-0 border border-stone-200/20">
                      <Coffee className="w-6 h-6" />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-stone-800 truncate font-playfair group-hover:text-[#C67C4E] transition-colors">{product.name}</h4>
                        <span className="font-bold text-[#C67C4E] shrink-0 font-lato text-sm">{formatCurrency(product.price)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {product.category && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200/50 uppercase tracking-wider font-lato">{product.category.name}</span>}
                        <p className="text-xs text-stone-400 truncate font-lato flex-1">{product.description || "No description available."}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
