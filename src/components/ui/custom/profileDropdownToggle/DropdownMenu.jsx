"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { handleLogout } from "@/lib/utils/user/userUtils";
import { LogIn as LogInIcon } from "lucide-react";
import { LogOut as LogOutIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

const TEN_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_TIMECHECK_TOKEN,
);

export default function DropdownMenu() {
  // Get the current pathname for the returnUrl
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    refreshToken,
    sessionTimeleft,
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = async () => {
    if (sessionTimeleft < TEN_MINUTES) {
      await refreshToken(); // refreshes token and fetch new session
    }
    setIsOpen(false);
  };

  useEffect(() => {
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

  // Render menu items
  const MenuItems = ({ items }) => (
    <ul className="w-full border-b border-stone-500">
      {items.map(({ label, href }, index) => (
        <li
          key={index}
          className="hover:text-primary w-full cursor-pointer"
        >
          {
            <Link
              href={href}
              className="block px-4 py-2"
              onClick={handleLinkClick}
            >
              {label}
            </Link>
          }
        </li>
      ))}
    </ul>
  );

  const authenticatedItems = [
    { label: "Mina sidor", href: ROUTES.DASHBOARD.INDEX },
    {
      label: "Beställningar",
      href: ROUTES.DASHBOARD.ORDERS.INDEX,
    },
    { label: "Reservdelar", href: ROUTES.DASHBOARD.PERKS },
    { label: "Konto", href: ROUTES.DASHBOARD.PROFILE },
  ];

  const guestItems = [];

  return (
    <div className="relative flex min-h-6" ref={menuRef}>
      <button
        className="flex rounded-md hover:underline"
        onClick={toggleDropdown}
        aria-label="Toggle dropdown"
        aria-expanded={isOpen}
      >
        <CircleUserRound />
        <span className="ml-1 min-w-10 self-center text-xs">
          Konto
        </span>
      </button>
      {isOpen && (
        <div className="bg-muted absolute top-10 left-1/2 z-100 flex w-48 -translate-x-1/2 transform flex-col items-start rounded-lg pb-2">
          <div className="text-muted-foreground w-full border-b border-stone-500 px-4 py-2 text-xs">
            {isAuthenticated && user?.givenName ? (
              <div>
                <span>Inloggad: </span>
                <span>{user.givenName}</span>
              </div>
            ) : (
              <span>Inte inloggad</span>
            )}
          </div>
          <MenuItems
            items={
              isAuthenticated
                ? authenticatedItems
                : guestItems
            }
          />
          {isAuthenticated ? (
            <button
              className="text-primary mt-3 inline-flex gap-1 px-3 py-1 text-left"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              <LogOutIcon /> Logga ut
            </button>
          ) : (
            <>
              {/* <Link
              href={`${ROUTES.AUTH.BANKID}?returnUrl=${encodeURIComponent(pathname)}`}
              className="text-primary mt-3 inline-flex gap-1 px-3 py-1"
            >
              <LogInIcon /> Logga in
            </Link> */}
              <div
                className="mt-3 inline-flex cursor-not-allowed gap-1 px-3 py-1 text-[85%] text-white opacity-50"
                title="Login is currently disabled"
              >
                <LogInIcon /> Logga in (kommer snart)
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
