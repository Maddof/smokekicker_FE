import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold">Betalning avbruten</h1>
      <p className="mb-4">Det verkar som om du har avbrutit kassa processen.</p>
      <Link href={ROUTES.SHOP.INDEX}>Återgå till butiken</Link>
    </div>
  );
}
