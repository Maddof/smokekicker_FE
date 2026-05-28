import MailtoLink from "@/components/footer/mailToLink";
import {
  STORE_ADDRESS_LINE1,
  STORE_CITY,
  STORE_PHONE_NUMBER,
  STORE_POSTAL_CODE,
  STORE_REGISTRATION_NUMBER,
} from "@/config/general";
import { ROUTES } from "@/config/routes";

export function ContactDetailsInfo({ className = "" }) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-semibold">Kontaktuppgifter</h2>
      <div className="space-y-1">
        <p>Smokify AB</p>
        <p>Organisationsnummer: {STORE_REGISTRATION_NUMBER}</p>
        <p>
          Adress: {STORE_ADDRESS_LINE1}, {STORE_CITY}, {STORE_POSTAL_CODE}
        </p>
        <p>
          E-post: <MailtoLink className="text-primary" />
        </p>
        <p>
          Telefon:{" "}
          <a href={`tel:${STORE_PHONE_NUMBER}`}>{STORE_PHONE_NUMBER}</a>
        </p>
        <p>
          Har du frågor, <a href={ROUTES.CONTACT}>kontakta oss</a> gärna.
        </p>
      </div>
    </div>
  );
}
