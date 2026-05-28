"use client";

import { Info } from "lucide-react";
import { TooltipHover } from "../../../ui/custom/tooltip";

const FreeStarterKitSelector = ({ starterKits, selectedKit, onSelectKit }) => {
  return (
    <>
      <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
        {starterKits.map((kit) => (
          <button
            key={kit.id}
            onClick={() => onSelectKit(kit)}
            className={`"grid-item md:basis-[calc(50%-0.5rem)]" flex grow basis-full items-stretch gap-2 ${
              selectedKit === kit
                ? "[&>div]:border-primary"
                : "[&>div]:hover:border-primary"
            } `}
          >
            <div
              className="border-muted flex grow items-center rounded-r-md border border-l-[1rem] px-3 py-2 text-left"
              style={{
                borderLeftColor: kit.details?.color
                  ? `${kit.details.color}`
                  : "#888888",
              }}
            >
              <span className="mr-2">{kit.name}</span>
              <TooltipHover
                message={kit.details?.shortDesc || ""}
                className="-mt-3 ml-auto"
              >
                <Info className="text-muted-foreground h-4 w-4" />
              </TooltipHover>
            </div>
          </button>
        ))}
      </div>

      <p className="text-muted-foreground my-4">
        Valt kit:{" "}
        {selectedKit && (
          <span className="font-medium">{selectedKit?.name}</span>
        )}
      </p>
    </>
  );
};

export default FreeStarterKitSelector;
