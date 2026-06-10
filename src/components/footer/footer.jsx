import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import FooterLink from "./footerLink";
import MailtoLink from "./mailToLink";
import Image from "next/image";
import FooterHeading from "./FooterHeading";
import { ROUTES } from "@/config/routes";
import {
  STORE_ADDRESS_LINE1,
  STORE_CITY,
  STORE_PHONE_NUMBER,
  STORE_POSTAL_CODE,
  STORE_COUNTRY,
} from "@/config/general";

export default function Component() {
  return (
    <footer className="bg-muted text-muted-foreground relative w-full">
      {/* Rest of footer content with adjusted z-index */}
      <aside className="border-primary bg-foreground text-secondary-foreground z-10 w-full border-t border-b py-6">
        <div className="container flex items-center justify-center">
          <div className="flex max-w-96 flex-col items-center gap-2 text-center">
            <Image
              className="w-10"
              src="/images/icons/plus-18_white.svg"
              alt="18 års gräns"
              width={48}
              height={48}
            />
            <p className="font-bold">
              You must be 18 or older to purchase.
            </p>
          </div>
        </div>
      </aside>
      <div className="xsm:grid-cols-2 relative z-10 container mx-auto grid grid-cols-1 gap-6 py-12 md:grid-cols-4 md:justify-between lg:grid-cols-4">
        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <FooterHeading>Help</FooterHeading>

          <FooterLink href={ROUTES.CONTACT}>
            Contact
          </FooterLink>
          <FooterLink href={ROUTES.PERSONALITY}>
            AI Taste Test{" "}
          </FooterLink>
          <FooterLink href={ROUTES.BLOG.INDEX}>
            Blog
          </FooterLink>
        </div>

        {/* Popular Categories */}
        <div className="flex flex-col gap-2">
          <FooterHeading>Shop</FooterHeading>
          <FooterLink
            href={ROUTES.SHOP.CATEGORY("nicotine-pouches")}
          >
            Nicotine Pouches
          </FooterLink>
          <FooterLink href={ROUTES.BRANDS.INDEX}>
            Brands
          </FooterLink>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2">
          <FooterHeading>Information</FooterHeading>
          <FooterLink href={ROUTES.ABOUT}>
            About Us
          </FooterLink>
          <FooterLink href={ROUTES.TERMS}>
            Terms and Conditions
          </FooterLink>
          <FooterLink href={ROUTES.PRIVACY}>
            Privacy Policy
          </FooterLink>
          <FooterLink href={ROUTES.COOKIE_POLICY}>
            Cookie Policy
          </FooterLink>
          {/* <FooterLink href="#">Cookie Policy</FooterLink> */}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-2">
          <FooterHeading>Contact</FooterHeading>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <address className="not-italic">
              {STORE_ADDRESS_LINE1}
              <br />
              {STORE_POSTAL_CODE} {STORE_CITY}
              <br />
              {STORE_COUNTRY}
            </address>
          </div>
          <div className="flex items-center gap-2">
            <FooterLink href="#" icon={Phone}>
              {STORE_PHONE_NUMBER}
            </FooterLink>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" aria-hidden="true" />
            <MailtoLink />
          </div>
        </div>
        <div className="xsm:grid-cols-4 col-span-full grid grid-cols-1 gap-6">
          <div className="col-span-1 flex flex-col items-start gap-4">
            <Image
              className="w-full"
              src="/smokekicker_logo-orange.svg"
              alt="Smokekicker Logo Orange"
              width={288}
              height={96}
            />
            <p className="text-xs">
              This site is owned and operated by Smokify AB,
              a company registered in Sweden (org. number
              559248-0797) with its registered office at
              Centralvägen 3, 194 76 Upplands Väsby, Sweden.
            </p>
            <p className="text-sm">
              © {new Date().getFullYear()} Smokify AB. All
              rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/smokekickershop"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Smokekicker on Facebook (opens in new tab)"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary h-6 w-6"
                >
                  <title>Facebook</title>
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/smokekickershop"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Smokekicker on Instagram (opens in new tab)"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-primary h-6 w-6"
                >
                  <title>Instagram</title>
                  <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="col-span-3 flex">
            <p className="text-xs">
              Nicotine is a highly addictive substance. This
              product is not risk-free and is only
              recommended for people who are already using
              nicotine. Nicotine pouches should not be used
              by pregnant or breastfeeding women and should
              be kept out of the reach of children.
              <br />
              <br />
              Only for adults 18 years and older.
              Smokekicker does not sell to minors. By
              purchasing, you confirm that you are of legal
              age in your country to buy nicotine pouches.
              If you are under 18, please do not attempt to
              purchase from our store. We are committed to
              preventing underage access to nicotine
              pouches.
            </p>
          </div>
        </div>

        <div className="border-muted-foreground/20 col-span-full border-t pt-8">
          <div className="grid grid-cols-1 items-center gap-6">
            {/* Left column  */}

            {/* Right column - Logos */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Image
                src="/images/logos/Klarna_Logo_white_450x100.svg"
                alt="Klarna logo"
                width={450}
                height={100}
                className="h-5 w-auto"
              />
              <Image
                src="/images/logos/Stripe_Logo_white_240x100.svg"
                alt="Stripe logo"
                width={240}
                height={100}
                className="h-5 w-auto"
              />
              <Image
                src="/images/logos/Visa_Logo_white_320x100.svg"
                alt="Visa logo"
                width={320}
                height={100}
                className="h-5 w-auto"
              />
              <Image
                src="/images/logos/PostNord_Logo_white_450x100.svg"
                alt="PostNord logo"
                width={450}
                height={100}
                className="h-5 w-auto"
              />
              <Image
                src="/images/logos/ups_logo_280_250.svg"
                alt="UPS logo"
                width={280}
                height={250}
                className="h-5 w-auto"
              />
              <Image
                src="/images/logos/DHL_Logo_white_450x100.svg"
                alt="DHL logo"
                width={450}
                height={100}
                className="h-5 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
