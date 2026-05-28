import { connection } from "next/server";

export default async function BankIDAuthLayout({ children }) {
  await connection();
  return (
    <main className="neon-bg-radial-top-right" style={{ minHeight: "100vh" }}>
      {children}
    </main>
  );
}
