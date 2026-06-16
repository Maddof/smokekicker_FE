import { ROUTES } from "@/config/routes";

export default async function SuccessPage() {
  return (
    <section className="neon-bg-radial-top-right text-secondary-foreground flex min-h-[72vh] items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">
          Thank you for your order!
        </h1>
        <p className="text-lg">
          Your order has been successfully placed. We will
          send you a confirmation email shortly.
        </p>
        <a
          href={ROUTES.SHOP.CATEGORY("nicotine-pouches")}
          className="bg-primary inline-block rounded-md px-6 py-2 text-white"
        >
          Continue Shopping
        </a>
      </div>
    </section>
  );
}
