"use client";

import { Plus, Minus } from "lucide-react";
import { Input } from "../ui/scn/input";
import { Button } from "../ui/scn/button";

function SubscriptionItemQuantitySelector({ children, count, setCount }) {
  const increment = () => setCount((prev) => Math.min(8, prev + 1));
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  const handleInputChange = (e) => {
    const newValue =
      e.target.value === "" ? 1 : Number.parseInt(e.target.value, 10);
    setCount(isNaN(newValue) ? 1 : Math.max(1, Math.min(8, newValue)));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-muted-foreground text-sm">Antal olika smaker:</p>
      <div className="mb-4 flex items-center gap-4 md:mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          aria-label="Decrease value"
          disabled={count <= 1}
          className="hover:bg-primary hover:text-secondary-foreground scale-150"
        >
          <Minus className="h-4 w-4 scale-150" />
        </Button>
        <Input
          inputMode="numeric"
          pattern="[0-9]*"
          value={count}
          onChange={handleInputChange}
          className="min-h-20 w-20 [appearance:textfield] border-0 bg-transparent text-center text-6xl font-bold md:text-7xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          min={1}
          max={8}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          aria-label="Increase value"
          disabled={count >= 8}
          className="hover:bg-primary hover:text-secondary-foreground scale-150"
        >
          <Plus className="h-4 w-4 scale-150" />
        </Button>
      </div>
      {children}
    </div>
  );
}

export default SubscriptionItemQuantitySelector;
