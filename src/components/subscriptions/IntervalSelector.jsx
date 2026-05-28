"use client";

import { Slider } from "../ui/scn/slider";
import SliderHandIcon from "../icons/SliderHandIcon";
import StepHeading from "./StepHeading";

export default function SubscriptionIntervalSelector({ value, onChange }) {
  return (
    <div className="my-24 flex flex-col items-center gap-4">
      <StepHeading
        title="Ställ in leveransfrekvens"
        description="Justera reglaget för att bestämma hur ofta din prenumerationslåda ska landa hemma hos dig."
      />
      <div className="flex items-center justify-between">
        <label htmlFor="interval-slider" className="text-sm font-medium">
          {value === 1 && "Skickas varje vecka"}
          {value === 2 && "Skickas varannan vecka"}
          {value > 2 && `Skickas var ${value}:e vecka`}
        </label>
      </div>
      <Slider
        id="interval-slider"
        value={[value]}
        onValueChange={(vals) => onChange(parseInt(vals[0], 10))}
        min={1}
        max={12}
        step={1}
        className="w-full"
      />
      <SliderHandIcon className="text-primary w-18" />
    </div>
  );
}
