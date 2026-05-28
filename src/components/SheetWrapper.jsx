import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/scn/sheet";

export default function SheetWrapper({
  trigger,
  title,
  description,
  children,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        className="minicart-bg-radial-vertical text-secondary-foreground"
        onCloseAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus to trigger element on close, can trigger scroll to top if trigger is near top of page
      >
        <SheetHeader>
          {title && (
            <SheetTitle className="text-secondary-foreground">
              {title}
            </SheetTitle>
          )}
          {description && (
            <SheetDescription className="text-secondary-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
