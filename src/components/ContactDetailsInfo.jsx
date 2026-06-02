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
      <h2 className="mb-4 font-semibold">
        Contact Information
      </h2>
      <div className="space-y-1">
        <p>Smokify AB</p>
        <p>
          Organization Number: {STORE_REGISTRATION_NUMBER}
        </p>
        <p>
          Address: {STORE_ADDRESS_LINE1}, {STORE_CITY},{" "}
          {STORE_POSTAL_CODE}
        </p>
        <p>
          Email: <MailtoLink className="text-primary" />
        </p>
        <p>
          Phone:{" "}
          <a href={`tel:${STORE_PHONE_NUMBER}`}>
            {STORE_PHONE_NUMBER}
          </a>
        </p>
        <p>
          If you have any questions,{" "}
          <a href={ROUTES.CONTACT}>contact us</a>.
        </p>
      </div>
    </div>
  );
}
