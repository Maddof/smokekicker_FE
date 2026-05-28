import Image from "next/image";
import BankIDBanksignering from "./components/BankID";

export default function LoginPage() {
  return (
    <section className="text-secondary-foreground">
      <div className="container mx-auto flex flex-col items-center text-center">
        <Image
          src="/smokify_logo_orange.svg"
          alt="Smokify Logo"
          width={400}
          height={200}
          className="mb-4 max-w-48"
        />
        <h1 className="mb-2">BankID Autentisering</h1>
        <p className="text-muted-foreground">
          OBS! Om du inte är över 18 år kommer du bli nekad inloggning.
        </p>
        <BankIDBanksignering />
      </div>
    </section>
  );
}
