import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/scn/button";

export default function QuickHeaderLink({
  children,
  className,
  variant = "outline",
  ...props
}) {
  return (
    <Link
      className={clsx(
        buttonVariants({ variant }),
        "text-secondary-foreground hover:text-secondary-foreground h-auto min-w-0 text-center text-xs whitespace-normal",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
