"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function TooltipClick({ message, children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  // Stäng tooltip när användaren klickar utanför
  const handleBlur = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  // Hantera tangentbordshändelser för tillgänglighet
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(e);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsVisible(false);
    }
  };

  return (
    <div
      className={cn("group relative flex", className)}
      onClick={handleToggle}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Gör div:en fokuserbar för tillgänglighet
      role="button"
      aria-expanded={isVisible}
    >
      {children}
      <span
        className={cn(
          "absolute top-6 left-1/2 z-10 max-w-60 min-w-28 origin-center -translate-x-1/2 rounded bg-gray-800 p-2 text-center text-xs text-white normal-case transition-all",
          // Visa tooltip baserat på state (mobil) eller hover (desktop)
          isVisible ? "scale-100" : "scale-0 delay-300 group-hover:scale-100",
        )}
      >
        {message}
      </span>
    </div>
  );
}

function TooltipHover({ message, children, className = "" }) {
  return (
    <div className={cn("group relative flex", className)}>
      {children}
      <span className="bg-muted absolute top-10 right-0 z-10 max-w-60 min-w-28 origin-top-right scale-0 rounded p-2 text-xs whitespace-normal text-white transition-all delay-500 group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

export { TooltipHover };
