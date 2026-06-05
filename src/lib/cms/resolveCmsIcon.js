import {
  Package2,
  ChevronsRight,
  Droplet,
  Droplets,
  ShieldCheck,
  Truck,
  CigaretteOff,
  Store,
} from "lucide-react";

const DEFAULT_CMS_ICON = Package2;

const CMS_ICON_MAP = {
  Droplet,
  Droplets,
  Package2,
  ChevronsRight,
  ShieldCheck,
  Truck,
  CigaretteOff,
  Store,
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
