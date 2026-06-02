import { Suspense } from "react";
import { searchProducts } from "@/lib/data/api/fetchProducts";
import { AlertCircle, Search } from "lucide-react";
import SearchBox from "@/components/header/search";
import Spinner from "@/components/ui/custom/spinner";
import ProductCard from "@/components/shop/ProductCard";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params?.query?.trim() || "";
  const title = query
    ? `Search result for "${query}" | Smokekicker`
    : "Explore nicotine pouches online at Smokekicker";
  const description = query
    ? `Showing search results for "${query}". Find your favorite products at Smokekicker.`
    : "Use the search function to find products such as nicotine pouches. Enter keywords and discover our range.";
  const pageUrl = query
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/search?query=${encodeURIComponent(query)}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/search`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Smokekicker",
    },
  };
}

// Loading component for Suspense
function SearchResultsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner />
      <p className="text-muted-foreground mt-4">
        Searching for products...
      </p>
    </div>
  );
}

// No results component
function NoResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12">
      <AlertCircle className="mb-4 h-12 w-12 text-red-700" />
      <h2 className="mb-2 text-xl font-medium">
        No products found
      </h2>
      <p className="text-center">
        We couldn't find any products matching "{query}".
      </p>
      <p className="mt-4 text-center">
        Try different keywords or browse our categories.
      </p>
      {query.length <= 2 && (
        <p className="mt-4 text-center text-red-700">
          Tips: Use at least 3 characters for better search
          results.
        </p>
      )}
    </div>
  );
}

// Search results component
async function SearchResults({ query }) {
  // artificial delay for demonstration (remove in production)
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  const products = await searchProducts(query);

  if (!products || products.length === 0) {
    return <NoResults query={query} />;
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Showing {products.length} results for "{query}"
      </p>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Search Results
          </h1>
          <Suspense
            fallback={
              <div className="w-full sm:w-64">
                <Spinner />
              </div>
            }
          >
            <SearchBox defaultValue={query} />
          </Suspense>
        </div>

        {query ? (
          <Suspense
            key={query}
            fallback={<SearchResultsLoading />}
          >
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="rounded-lg border p-6 text-center">
            <Search className="text-muted-foreground/60 mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-medium">
              Search among our products
            </h2>
            <p className="text-muted-foreground mx-auto max-w-md">
              Enter keywords in the search field above to
              find products.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
