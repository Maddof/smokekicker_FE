import Image from "next/image";

import { SITE_NAME } from "@/config/metadata";
import { AgeConfirmReturn } from "@/components/ageVerification/AgeConfirmReturn";

export const metadata = {
  title: `Adults Only | ${SITE_NAME}`,
  description: `${SITE_NAME} sells nicotine products and is intended for adults aged 18 and over only.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdultsOnlyPage() {
  return (
    <div className="w-full max-w-md">
      <Image
        className="mx-auto w-full"
        src="/smokekicker_logo_black.svg"
        alt="Smokekicker Logo"
        width={192}
        height={64}
        priority
      />

      <h1 className="mt-4">
        This website is for adults only
      </h1>

      <p className="mt-4">
        {SITE_NAME} sells nicotine pouches and is{" "}
        <b>intended only for adults</b> who meet the legal
        age requirement for purchasing nicotine products in
        their country
      </p>

      <p className="mt-2">
        Nicotine is addictive. Nicotine products are not
        suitable for children, young people, pregnant
        people, or anyone who does not already use nicotine
      </p>

      <p className="mt-2">
        If you <b>reached this page by mistake</b> and you
        are of legal age, you can confirm your age below to
        continue.
      </p>

      <div className="mt-4">
        <AgeConfirmReturn minimumAge={18} />
      </div>
    </div>
  );
}
