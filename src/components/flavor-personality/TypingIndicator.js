import { cn } from "@/lib/utils";

export function TypingIndicator({ className }) {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70" />
      </div>
    </div>
  );
}
