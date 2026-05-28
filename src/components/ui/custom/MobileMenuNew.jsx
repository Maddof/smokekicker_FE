"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu as HambIcon,
  X,
  Home,
  Package,
  Info,
  Mail,
  User,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const MAIN_ITEMS = [
  {
    href: ROUTES.HOME,
    label: "Hem",
    icon: Home,
  },
];

const MENU_SECTIONS = [
  {
    id: "shop",
    title: "Produkter",
    icon: Package,
    items: [
      { href: ROUTES.SHOP.INDEX, label: "Alla produkter" },
      {
        href: ROUTES.SHOP.CATEGORY("start-kit-forfyllda-podsystem"),
        label: "Start-kit Förfyllda Podsystem",
      },
      { href: ROUTES.SHOP.CATEGORY("start-kit-vape"), label: "Start-kit Vape" },
      {
        href: ROUTES.SHOP.CATEGORY("forfyllda-poddar"),
        label: "Förfyllda poddar",
      },
      { href: ROUTES.SHOP.CATEGORY("e-juice"), label: "E-Juice" },
      { href: ROUTES.SHOP.CATEGORY("vitt-snus"), label: "Vitt snus" },
      {
        href: ROUTES.SHOP.CATEGORY("nikotinavvanjning"),
        label: "Nikotinavvänjning",
      },
      { href: ROUTES.SHOP.CATEGORY("konfektyr"), label: "Konfektyr" },
      { href: ROUTES.SHOP.CATEGORY("tillbehor"), label: "Tillbehor" },
    ],
  },
  {
    id: "info",
    title: "Information",
    icon: Info,
    items: [
      { href: ROUTES.ABOUT, label: "Om oss" },
      { href: ROUTES.TERMS, label: "Köpvillkor" },
    ],
  },
  {
    id: "account",
    title: "Mitt konto",
    icon: User,
    items: [
      {
        href: ROUTES.DASHBOARD.INDEX,
        label: "Mina sidor",
        icon: User,
      },
      {
        href: ROUTES.DASHBOARD.ORDERS.INDEX,
        label: "Mina beställningar",
        icon: ShoppingCart,
      },
    ],
  },
];

function MenuSection({ id, title, icon, isOpen, onToggle, children }) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <li>
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(id)}
        className="hover:bg-secondary flex w-full items-center justify-between rounded-md px-3 py-2 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary h-5 w-5" aria-hidden="true">
            {icon}
          </span>
          <span>{title}</span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>
      <ul
        id={panelId}
        aria-labelledby={buttonId}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
        {...(!isOpen && { inert: true })}
        className={cn(
          "border-primary mt-2 ml-5.75 space-y-2 overflow-hidden border-l pl-4 transition-[max-height,opacity] duration-200",
          isOpen ? "max-h-200 opacity-100" : "max-h-0 opacity-60",
        )}
      >
        {children}
      </ul>
    </li>
  );
}

function MenuItem({ href, children, icon, isSubmenuItem = false, onSelect }) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onSelect}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "hover:bg-secondary flex items-center rounded-md px-3 py-2 transition-colors",
          isSubmenuItem ? "" : "gap-3",
          isCurrent ? "bg-secondary-foreground/15" : "",
        )}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </Link>
    </li>
  );
}

export default function MobileMenuNew() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState("shop");
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;

    const getFocusableElements = () => {
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.closest("[inert]"));
    };

    const initialFocusable = getFocusableElements();
    if (initialFocusable.length > 0) {
      initialFocusable[0].focus({ preventScroll: true });
    } else if (panel) {
      panel.focus({ preventScroll: true });
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);

      if (triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true });
      } else if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={isOpen ? "Stäng huvudmenyn" : "Öppna huvudmenyn"}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="mobile-menu-new-panel"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md p-1"
      >
        <HambIcon className="h-8 w-8" aria-hidden="true" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-70 transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        {...(!isOpen && { inert: true })}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Stäng meny"
          onClick={closeMenu}
          className="absolute inset-0 bg-black/50"
        />

        <aside
          ref={panelRef}
          id="mobile-menu-new-panel"
          role="dialog"
          aria-modal={isOpen ? "true" : undefined}
          aria-label="MENY"
          tabIndex={-1}
          className={cn(
            "minicart-bg-radial-vertical text-secondary-foreground border-primary absolute top-0 right-0 z-10 flex h-full w-75 flex-col overflow-y-auto border-l p-4 transition-transform duration-200 sm:w-87.5",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <div>
              <p className="mb-1 text-sm font-semibold tracking-wide">MENY</p>
              <p className="text-muted-foreground text-[80%]">
                Navigera genom vår webbplats
              </p>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Stäng meny"
              className="hover:bg-secondary rounded-md p-1"
            >
              <X className="text-destructive h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="py-2" aria-label="Huvudmeny">
            <ul className="space-y-3">
              {MAIN_ITEMS.map((item) => {
                const MainIcon = item.icon;

                return (
                  <MenuItem
                    key={item.href}
                    href={item.href}
                    icon={<MainIcon className="h-5 w-5" />}
                    onSelect={closeMenu}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}

              {MENU_SECTIONS.map((section) => {
                const SectionIcon = section.icon;

                return (
                  <MenuSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    icon={<SectionIcon aria-hidden="true" />}
                    isOpen={openSection === section.id}
                    onToggle={toggleSection}
                  >
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <MenuItem
                          key={item.href}
                          href={item.href}
                          isSubmenuItem
                          onSelect={closeMenu}
                        >
                          {ItemIcon ? (
                            <div className="flex items-center gap-2">
                              <ItemIcon
                                className="text-destructive h-4 w-4"
                                aria-hidden="true"
                              />
                              <span>{item.label}</span>
                            </div>
                          ) : (
                            item.label
                          )}
                        </MenuItem>
                      );
                    })}
                  </MenuSection>
                );
              })}
            </ul>
          </nav>

          <div className="border-primary mt-auto border-t pt-4">
            <Link
              href={ROUTES.CONTACT}
              onClick={closeMenu}
              className="hover:bg-secondary flex items-center gap-3 rounded-md px-3 py-2 transition-colors"
            >
              <Mail className="text-primary h-5 w-5" aria-hidden="true" />
              Kontakta oss
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
