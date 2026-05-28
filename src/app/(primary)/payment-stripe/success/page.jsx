"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SuccessUI from "./successUI";
import { ROUTES } from "@/config/routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SuccessPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    fetch(`${API_BASE_URL}/stripe/session-status?session_id=${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);
      });
  }, []);

  if (status === null) {
    return (
      <section className="py-12">
        <div className="container text-center">
          <div className="border-t-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200"></div>
          <p>Laddar orderinformation...</p>
        </div>
      </section>
    );
  }

  if (status === "open") {
    return (
      <section className="neon-bg-radial-top-right flex min-h-[72vh] items-center justify-center py-12">
        <div className="text-secondary-foreground container">
          <h1 className="mb-4 text-2xl font-bold">Betalning pågår</h1>
          <p className="mb-4">Din betalning behandlas fortfarande.</p>
          <p className="mb-4">
            Vänligen kontrollera senare eller kontakta support om du har frågor.
          </p>
          <Link href={ROUTES.CHECKOUT}>Återgå till kassan</Link>
        </div>
      </section>
    );
  }

  if (status === "complete") {
    return <SuccessUI status={status} customerEmail={customerEmail} />;
  }

  // Fallback för andra statusar (t.ex. "failed")
  return (
    <section>
      <div className="container">
        <h1 className="mb-4 text-2xl font-bold">Orderstatus: {status}</h1>
        <p className="mb-4">
          Det verkar som att något gick fel med din order. Kontakta gärna vår
          kundtjänst för mer information.
        </p>
        <Link href={ROUTES.CHECKOUT}>Tillbaka till kassan</Link>
        <Link href={ROUTES.SHOP.INDEX}>Fortsätt handla</Link>
      </div>
    </section>
  );
}
