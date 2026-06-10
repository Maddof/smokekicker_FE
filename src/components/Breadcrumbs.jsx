"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ROUTES } from "@/config/routes";

export default function Breadcrumbs({
  customLabels = {},
  className = "",
  homeHref = ROUTES.HOME,
}) {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const listRef = useRef(null);
  const lastItemRef = useRef(null);

  const separatorElement = useMemo(
    () => (
      <ChevronRight className="text-primary/50 mx-1 h-4 w-4 flex-shrink-0" />
    ),
    [],
  );

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    const items = segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const isBrandCrumb =
        segments[0] === "products" && index === 2;

      const resolvedPath = isBrandCrumb
        ? ROUTES.BRANDS.DETAIL(segment)
        : path;

      const defaultLabel = segment
        .replace(/-/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      return {
        label: customLabels[path] || defaultLabel,
        path: resolvedPath,
      };
    });

    setBreadcrumbs(items);
  }, [pathname, customLabels]);

  // Auto-scroll the container so the last crumb (current page) is visible
  useEffect(() => {
    if (lastItemRef.current && listRef.current) {
      // Prefer scrollIntoView for better RTL/LTR handling
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "nearest",
      });
    }
  }, [breadcrumbs.length]);

  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Breadcrumbs"
      className={`flex min-h-9 w-full py-2 ${className}`}
    >
      <ul
        ref={listRef}
        className="no-scrollbar flex min-w-full snap-x snap-mandatory scroll-pl-2 items-center gap-0 overflow-x-auto pr-2 text-xs sm:text-sm"
      >
        {/* Home */}
        <li className="flex shrink-0 snap-start items-center">
          <Link
            href={homeHref}
            className="flex items-center"
            aria-label="Home"
            prefetch={false}
          >
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbs.length > 0 && separatorElement}
        </li>

        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li
              key={breadcrumb.path}
              ref={isLast ? lastItemRef : undefined}
              className="flex shrink-0 snap-start items-center"
            >
              {isLast ? (
                <span
                  className="text-secondary-foreground font-medium"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={breadcrumb.path}
                    className="max-w-30 truncate sm:max-w-none"
                  >
                    {breadcrumb.label}
                  </Link>
                  {separatorElement}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
