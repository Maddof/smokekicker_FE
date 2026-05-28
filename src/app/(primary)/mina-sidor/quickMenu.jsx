"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PackageIcon, RefreshCcw, UserIcon, Zap } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function QuickMenu() {
  const currentPath = usePathname();
  const menuItems = [
    {
      label: "Start",
      href: ROUTES.DASHBOARD.INDEX,
      icon: <HomeIcon className="mr-2 h-4 w-4" />,
    },
    {
      label: "Beställningar",
      href: ROUTES.DASHBOARD.ORDERS.INDEX,
      icon: <PackageIcon className="mr-2 h-4 w-4" />,
    },
    {
      label: "Prenumerationer",
      href: ROUTES.DASHBOARD.SUBSCRIPTIONS.ACTIVE,
      icon: <RefreshCcw className="mr-2 h-4 w-4" />,
    },
    {
      label: "Reservdelar",
      href: ROUTES.DASHBOARD.PERKS,
      icon: <Zap className="mr-2 h-4 w-4" />,
    },
    {
      label: "Konto",
      href: ROUTES.DASHBOARD.PROFILE,
      icon: <UserIcon className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex w-full">
      <ul className="flex flex-wrap gap-3 sm:gap-4">
        {menuItems.map((item, index) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== ROUTES.DASHBOARD.INDEX &&
              currentPath?.startsWith(item.href));

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`border-primary text-primary-foreground flex items-center rounded-lg border px-2 py-1 uppercase transition-colors hover:no-underline sm:px-4 sm:py-2 ${
                  isActive
                    ? "bg-primary"
                    : "text-muted-foreground hover:bg-primary/20 hover:text-primary-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
