import {
  Package2,
  Repeat,
  Leaf,
  ChevronsRight,
  Candy,
  Zap,
  Droplet,
  Droplets,
  ShieldCheck,
  PackageCheck,
  Calendar,
} from "lucide-react";

const DEFAULT_CMS_ICON = Package2;

const CMS_ICON_MAP = {
  Repeat,
  Zap,
  Droplet,
  Droplets,
  Package2,
  Leaf,
  ChevronsRight,
  Candy,
  ShieldCheck,
  PackageCheck,
  Calendar,
};

/**
 * Resolves a CMS icon name string to a lucide-react component.
 * Falls back to Package2 for unknown names.
 * @param {string} iconName
 * @returns {React.ComponentType}
 */
export function resolveCmsIcon(iconName) {
  return CMS_ICON_MAP[iconName] || DEFAULT_CMS_ICON;
}
