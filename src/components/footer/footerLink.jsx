import Link from "next/link";

export default function FooterLink({ href, children, icon: Icon }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-primary flex items-center gap-2 transition"
      prefetch={false}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </Link>
  );
}
