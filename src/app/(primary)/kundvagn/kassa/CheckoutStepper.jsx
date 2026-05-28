"use client";

import { CheckIcon } from "lucide-react";

export default function CheckoutStepper({ currentStep = 1 }) {
  const steps = [
    { id: 1, name: "Adressuppgifter" },
    { id: 2, name: "Frakt & betalning" },
  ];

  return (
    <nav aria-label="Checkout Progress" className="my-8">
      <ol className="flex w-full items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`flex items-center ${
              index !== steps.length - 1
                ? "after:border-primary w-full after:-mt-8 after:inline-block after:h-0.5 after:w-full after:border-b"
                : ""
            }`}
          >
            <div className={`flex min-w-36 flex-col items-center`}>
              {currentStep > step.id ? (
                <span className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon className="h-4 w-4 text-white" />
                </span>
              ) : currentStep === step.id ? (
                <span className="border-primary bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium text-white">
                  {step.id}
                </span>
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-medium text-gray-500">
                  {step.id}
                </span>
              )}
              <span
                className={`mt-2 text-center text-xs font-medium sm:text-sm ${
                  currentStep >= step.id ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
