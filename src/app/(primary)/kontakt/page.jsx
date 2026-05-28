// import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { getPageByKey } from "@/lib/cms/getPage";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import MailtoLink from "@/components/footer/mailToLink";
import {
  STORE_ADDRESS_LINE1,
  STORE_CITY,
  STORE_PHONE_NUMBER,
  STORE_POSTAL_CODE,
} from "@/config/general";
import { getOrderedSections } from "@/lib/cms/getSection";
import { ContactFormInner } from "@/components/contact/ContactFormInner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se";

async function getContactPage() {
  const page = await getPageByKey("contact");
  return page;
}

export async function generateMetadata() {
  const page = await getContactPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Kontakta oss | ${SITE_NAME}`,
    fallbackDescription:
      "Kontakta Smokify för frågor, support eller feedback.",
    defaultPath: ROUTES.CONTACT,
  });
}

export default async function ContactPage() {
  const page = await getContactPage();

  const orderedSections = getOrderedSections(page);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kontakta oss",
        item: `${SITE_URL}${ROUTES.CONTACT}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <section>
        <div className="container">
          <h1 className="mb-8 text-center">
            {orderedSections.length > 0
              ? orderedSections[0].headline
              : "Kontakta oss"}
          </h1>

          <div className="text-center">
            <p className="text-muted/80 mx-auto mb-12 max-w-3xl">
              {orderedSections.length > 0
                ? orderedSections[0].description
                : "Har du frågor, feedback eller behöver support? Kontakta oss så hjälper vi dig gärna!"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {/* <ContactForm /> */}
              <ContactFormInner />
            </div>

            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-1 font-semibold">
                Kontaktinformation
              </h2>
              <p className="text-muted-foreground mb-4">
                Kontakta oss via någon av dessa kanaler.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Adress
                    </h3>
                    <address className="text-muted-foreground">
                      {STORE_ADDRESS_LINE1}
                      <br />
                      {STORE_POSTAL_CODE} {STORE_CITY}
                    </address>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Telefon
                    </h3>
                    <p className="text-muted-foreground">
                      {STORE_PHONE_NUMBER}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <MailtoLink />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Öppettider
                    </h3>
                    <p className="text-muted-foreground">
                      Måndag - Fredag: 9:00 - 18:00
                      <br />
                      Lördag: 10:00 - 16:00
                      <br />
                      Söndag: Stängt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
