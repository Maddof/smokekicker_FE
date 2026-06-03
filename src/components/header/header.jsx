import Link from "next/link";
import Image from "next/image";
import MobileMenuNew from "../ui/custom/MobileMenuNew";
import MiniCart from "../miniCart/miniCart";
import DropdownMenuWrapper from "../ui/custom/profileDropdownToggle/DropdownWrapper";
import { ROUTES } from "@/config/routes";
import ResponsiveSearch from "./ResponsiveSearch";
import { Suspense } from "react";

export default function Header() {
  return (
    <header
      id="main-header"
      className="bg-primary fixed top-0 z-50 flex min-h-(--header-height) w-full items-center shadow-md"
    >
      <div
        className="bg-primary container flex h-full w-full items-center justify-between gap-2 sm:gap-4"
        id="header-inner"
      >
        <div className="flex h-full items-center">
          <Link
            href={ROUTES.HOME}
            className="flex items-center"
          >
            <Image
              className="w-60"
              src="/smokekicker_logo_black.svg"
              fetchPriority="high"
              loading="eager"
              alt="Smokekicker Logo"
              width={192}
              height={64}
            />
          </Link>
        </div>
        <div className="flex h-full grow items-center justify-end gap-3 sm:gap-4">
          {/* <SearchBox /> */}
          <Suspense
            fallback={
              <div className="hidden w-auto sm:block sm:w-full">
                <div className="h-9 w-full animate-pulse rounded bg-gray-200"></div>
              </div>
            }
          >
            <ResponsiveSearch />
          </Suspense>
          <DropdownMenuWrapper />
          <MiniCart />
          <MobileMenuNew />
        </div>
      </div>
    </header>
  );
}
