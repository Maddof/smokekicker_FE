import { Button } from "../ui/scn/button";
import { Input } from "../ui/scn/input";

export function ChatInput() {
  return (
    <form className="flex items-end gap-2 rounded-2xl border border-sky-300/30 bg-linear-to-br from-slate-900/70 via-blue-900/35 to-cyan-900/20 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_rgba(8,145,178,0.18)] backdrop-blur-md">
      <Input
        type="text"
        placeholder="Skriv ditt svar..."
        className="h-11 border-sky-300/35 bg-slate-950/55 text-white transition-colors placeholder:text-sky-100/55 focus-visible:border-cyan-200/70 focus-visible:ring-2 focus-visible:ring-cyan-300/35"
      />
      <Button
        type="submit"
        className="h-11 border border-cyan-200/60 bg-linear-to-br from-cyan-100/95 via-sky-100/90 to-blue-100/85 px-4 text-black transition-all hover:brightness-105"
      >
        Skicka
      </Button>
    </form>
  );
}
