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
