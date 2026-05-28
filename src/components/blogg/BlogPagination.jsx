import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/scn/button";

export default function BlogPagination({ pagination, basePath = "/blogg" }) {
  if (!pagination) return null;

  const {
    page: currentPage,
    totalPages,
    total,
    limit,
    hasPrevPage,
    hasNextPage,
  } = pagination;

  const createPageURL = (pageNumber) => {
    if (pageNumber <= 1) return basePath;
    return `${basePath}?page=${pageNumber}`;
  };

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  // Build page number list with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) pages.push("...");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label="Sidonavigering för blogginlägg"
      className="mt-10 flex flex-col items-center gap-4"
    >
      <p className="text-muted-foreground text-sm">
        Visar {startItem}–{endItem} av {total} inlägg
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <Button
          variant="outline"
          size="icon"
          disabled={!hasPrevPage}
          aria-label="Föregående sida"
          asChild={hasPrevPage}
        >
          {hasPrevPage ? (
            <Link href={createPageURL(currentPage - 1)} rel="prev">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="text-muted-foreground w-9 text-center text-sm"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              aria-label={`Gå till sida ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              asChild={page !== currentPage}
            >
              {page !== currentPage ? (
                <Link href={createPageURL(page)}>{page}</Link>
              ) : (
                <span>{page}</span>
              )}
            </Button>
          ),
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          disabled={!hasNextPage}
          aria-label="Nästa sida"
          asChild={hasNextPage}
        >
          {hasNextPage ? (
            <Link href={createPageURL(currentPage + 1)} rel="next">
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </nav>
  );
}
