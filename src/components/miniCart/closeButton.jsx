"use client";

import { SheetClose } from "../ui/scn/sheet";
import { X } from "lucide-react";

export default function CloseButton({ className = "", ...props }) {
  return (
    <SheetClose
      className={`text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring absolute top-4 right-4 rounded-full p-2 focus:ring-2 focus:ring-offset-2 focus:outline-hidden ${className}`}
      {...props}
    >
      <X className="h-5 w-5" />
      <span className="sr-only">Stäng</span>
    </SheetClose>
  );
}
