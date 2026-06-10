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
  STORE_COUNTRY,
} from "@/config/general";
import { getOrderedSections } from "@/lib/cms/getSection";
import { ContactFormInner } from "@/components/contact/ContactFormInner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

async function getContactPage() {
  const page = await getPageByKey("contact");
  return page;
}

export async function generateMetadata() {
  const page = await getContactPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Contact | ${SITE_NAME}`,
    fallbackDescription:
      "Get help with orders, shipping, nicotine pouch products, returns, and general inquiries. Contact our support team today.",
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
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
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
              : "Contact"}
          </h1>

          <div className="text-center">
            <p className="text-muted/80 mx-auto mb-12 max-w-3xl">
              {orderedSections.length > 0
                ? orderedSections[0].description
                : "Do you have questions, feedback, or need support? Contact us and we will be happy to help you!"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {/* <ContactForm /> */}
              <ContactFormInner />
            </div>

            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-1 font-semibold">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-4">
                Contact us via any of these channels.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Address
                    </h3>
                    <address className="text-muted-foreground">
                      {STORE_ADDRESS_LINE1}
                      <br />
                      {STORE_POSTAL_CODE} {STORE_CITY}
                      <br />
                      {STORE_COUNTRY}
                    </address>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
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
                      Opening Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 - 18:00
                      <br />
                      Saturday: 10:00 - 16:00
                      <br />
                      Sunday: Closed
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
