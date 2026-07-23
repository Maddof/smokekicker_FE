export const BOT_USER_AGENT_REGEX =
  /bot|googlebot|crawler|spider|robot|crawling/i;

// Detect bots/crawlers based on the browser's user agent.
export const isBot = () => {
  if (typeof navigator === "undefined") return false;
  return BOT_USER_AGENT_REGEX.test(navigator.userAgent);
};
