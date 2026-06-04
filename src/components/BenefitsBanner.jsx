import { Ban, Truck } from "lucide-react";

export default function BenefitsBanner() {
  return (
    <section className="bg-secondary text-secondary-foreground p-0">
      <div className="container flex flex-wrap items-center justify-evenly gap-2 px-1 py-2 text-xs md:px-4 md:text-sm">
        <div>
          <Ban className="mr-1.5 inline h-4 w-4 align-top md:h-5 md:w-5" />
          <span>18+</span>
        </div>
        <div>
          <Truck className="mr-1.5 inline h-4 w-4 align-top md:h-5 md:w-5" />
          <span>EU & Worldwide Shipping</span>
        </div>
      </div>
    </section>
  );
}
