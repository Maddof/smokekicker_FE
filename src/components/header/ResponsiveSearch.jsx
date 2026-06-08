"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import SearchBox from "./search";

export default function ResponsiveSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target,
        ) &&
        isExpanded
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isExpanded]);

  return (
    <div
      ref={searchContainerRef}
      className="flex w-auto items-center sm:w-full"
    >
      {/* Full SearchBox (visible on larger screens) */}
      <div className="hidden w-auto sm:block sm:w-full">
        <SearchBox />
      </div>

      {/* Toggle button (visible on mobile) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-foreground/10 text-foreground flex h-9 w-9 items-center justify-center rounded-full sm:hidden"
        aria-label={
          isExpanded ? "Close search" : "Open search"
        }
      >
        {isExpanded ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </button>

      {/* Expanded search box for mobile */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-5 bg-primary absolute top-(--header-height) right-1 left-0 z-100 w-full rounded-lg sm:hidden">
          <SearchBox
            onSearch={() => setIsExpanded(false)}
            onSelectProduct={() => setIsExpanded(false)}
            isExpanded={isExpanded}
          />
        </div>
      )}
    </div>
  );
}
