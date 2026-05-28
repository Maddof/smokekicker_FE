"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function MailtoLink({
  address = "support@smokify.se",
  className,
}) {
  const [encodedEmail, setEncodedEmail] = useState(""); // For display
  const [decodedEmail, setDecodedEmail] = useState(""); // For mailto

  useEffect(() => {
    // Encode each character as an HTML entity
    const encodeToEntities = (str) =>
      str
        .split("")
        .map((char) => `&#${char.charCodeAt(0)};`)
        .join("");

    const encoded = encodeToEntities(address);
    setEncodedEmail(encoded);
    setDecodedEmail(address);
  }, [address]);

  return (
    <a
      href={`mailto:${decodedEmail}`}
      className={cn(
        "text-muted-foreground hover:text-primary transition",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: encodedEmail }}
    ></a>
  );
}
