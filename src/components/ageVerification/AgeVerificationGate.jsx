// Server component that checks if the user has verified their age. If not, it renders the AgeVerificationDialog component.
// If the user is a bot/crawler, it does not render the dialog to avoid unnecessary interactions.
// The component uses the cookies and headers APIs from Next.js to check for the age verification cookie and the user agent string.
// Currently not in use, as the client-side AgeVerificationDialog is rendered directly in the layout for better user experience.

import { cookies, headers } from "next/headers";
import { AgeVerificationDialog } from "./AgeVerificationDialog";
import { BOT_USER_AGENT_REGEX } from "@/lib/utils/botChecker";

const AGE_VERIFICATION_COOKIE = "smokekicker_age_verified";

export async function AgeVerificationGate() {
  const cookieStore = await cookies();

  const isVerified =
    cookieStore.get(AGE_VERIFICATION_COOKIE)?.value ===
    "true";

  if (isVerified) {
    return null;
  }

  const userAgent =
    (await headers()).get("user-agent") ?? "";

  const isBot = BOT_USER_AGENT_REGEX.test(userAgent);

  if (isBot) {
    return null;
  }

  return <AgeVerificationDialog minimumAge={18} />;
}
