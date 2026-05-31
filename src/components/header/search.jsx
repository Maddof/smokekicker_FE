"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/scn/input";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { fetchLiveSearchSuggestions } from "@/lib/data/api/fetchProducts";
import Link from "next/link";
import { X } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function SearchBox({
  defaultValue = "",
  onSearch,
  onSelectProduct,
  isExpanded,
}) {
  const [query, setQuery] = useState("");
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(
    [],
  );
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestionsLoaded, setSuggestionsLoaded] =
    useState(false);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Load suggestions when input is focused
  const loadSuggestions = async () => {
    // Only load suggestions if they haven't been loaded yet
    if (suggestionsLoaded) return;

    setIsLoading(true);
    try {
      const suggestions =
        await fetchLiveSearchSuggestions();
      setAllSuggestions(suggestions);
      setSuggestionsLoaded(true);
    } catch (error) {
      console.error(
        "Error fetching live search suggestions:",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update query when defaultValue changes (for initial state)
  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  // Filter products based on query
  useEffect(() => {
    if (!query || query.length < 2) {
      setFilteredProducts([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = allSuggestions.filter(
      (suggestion) =>
        suggestion.name
          .toLowerCase()
          .includes(lowerQuery) ||
        suggestion.brand.name
          .toLowerCase()
          .includes(lowerQuery),
    );

    // Limit to top 5 results for dropdown
    setFilteredProducts(matches.slice(0, 5));
  }, [query, allSuggestions]);

  //Filter brands based on query
  useEffect(() => {
    if (!query || query.length < 2) {
      setFilteredBrands([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const brandMatches = allSuggestions
      .map((suggestion) => suggestion.brand)
      .filter(
        (brand, index, self) =>
          brand.name.toLowerCase().includes(lowerQuery) &&
          index ===
            self.findIndex((b) => b.id === brand.id), // Ensure uniqueness
      );

    // Limit to top 5 brand results for dropdown
    setFilteredBrands(brandMatches.slice(0, 5));
  }, [query, allSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
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
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);

    if (e.target.value.length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`/search?${params.toString()}`);
    setShowDropdown(false);
    // Clear the input after navigating to search results
    setQuery("");

    // Call callback if provided
    if (onSearch) {
      onSearch();
    }
  };

  const handleInputFocus = () => {
    // Load suggestions when input is focused
    loadSuggestions();

    // Show dropdown if query is long enough
    if (query.length >= 2) {
      setShowDropdown(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (
        selectedIndex >= 0 &&
        selectedIndex < filteredProducts.length
      ) {
        // Navigate to the selected product
        const product = filteredProducts[selectedIndex];
        const url = `${ROUTES.SHOP.INDEX}/${product.category.slug}/${product.brand.slug}/${product.slug}`;
        replace(url);
        // Clear the input after navigating to a product
        setQuery("");

        // Call callback if provided
        if (onSelectProduct) {
          onSelectProduct();
        }
      } else {
        // Perform normal search
        handleSearch();
      }
      setShowDropdown(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    }

    // Escape key
    if (e.key === "Escape") {
      // setShowDropdown(false);
      clearSearch();
      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    }

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1
          ? prev + 1
          : prev,
      );
      return;
    }

    // Arrow up
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : -1,
      );
      return;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredProducts([]);
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          // onFocus={() => query.length >= 2 && setShowDropdown(true)}
          onFocus={handleInputFocus}
          placeholder="Search products..."
          className="text-foreground border-foreground border pr-10 placeholder:text-gray-800"
          aria-label="Search products"
          autoFocus={isExpanded}
        />
        {query ? (
          <button
            onClick={clearSearch}
            className="absolute top-1/2 right-10 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X className="text-foreground h-4 w-4" />
          </button>
        ) : null}
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
          aria-label="Search"
        >
          <Search className="text-foreground" />
        </button>
      </div>

      {/* Search results dropdown */}
      {showDropdown && query.length >= 2 && !isLoading && (
        <div className="absolute z-50 mt-1 w-full min-w-56 rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredProducts.length > 0 ? (
            <>
              <ul className="overflow-auto py-1">
                <p className="px-4 py-1 text-sm text-gray-500">
                  Search suggestions for {query}
                </p>
                {filteredProducts.map((product, index) => (
                  <li
                    key={product.id}
                    className={`px-4 py-2 ${selectedIndex === index ? "bg-primary/10" : "hover:bg-gray-100"}`}
                  >
                    <Link
                      href={`${ROUTES.SHOP.INDEX}/${product.category.slug}/${product.brand.slug}/${product.slug}`}
                      className="flex items-center"
                      onClick={() => {
                        setShowDropdown(false);
                        setQuery(""); // Clear input when clicking a product link
                        if (onSelectProduct) {
                          onSelectProduct();
                        }
                      }}
                    >
                      <p className="font-medium">
                        {product.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              {filteredBrands.length > 0 && (
                <ul className="overflow-auto border-b border-gray-200 py-1">
                  <p className="px-4 py-1 text-sm text-gray-500">
                    Brands
                  </p>
                  {filteredBrands.map((brand) => (
                    <li
                      key={brand.id}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link
                        href={ROUTES.BRANDS.DETAIL(
                          brand.slug,
                        )}
                        className="flex items-center justify-between"
                        onClick={() => {
                          setShowDropdown(false);
                          setQuery(""); // Clear input when clicking a brand link
                          if (onSelectProduct) {
                            onSelectProduct();
                          }
                        }}
                      >
                        <p className="font-medium">
                          {brand.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <li
                className="border-t border-gray-100 px-4 py-2"
                id="view-all-results"
              >
                <button
                  onClick={handleSearch}
                  className="text-primary flex w-full items-center justify-center font-medium"
                >
                  <Search className="mr-2 h-4 w-4" />
                  View all results for "{query}"
                </button>
              </li>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No search suggestions for "{query}"</p>
              <br />
              <button
                onClick={handleSearch}
                className="text-primary flex w-full items-center justify-center border-t pt-2 font-medium"
              >
                <Search className="mr-2 h-4 w-4" />
                View all results for "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
