export const RESULT_GENERATION_MESSAGES = [
  "AI finjusterar din smakpersonlighet med kirurgisk precision och en nypa magi...",
  "AI kalibrerar din smakprofil, väger nyanserna och strösslar på lite briljans...",
  "Vi destillerar dina svar till en träffsäker smakpersonlighet. Nästan klart...",
  "AI läser mellan smakraderna och bygger din perfekta profil...",
  "Din smakpersonlighet är i ugnen. Krispig analys, mjukt resultat...",
  "Ett ögonblick, vi mappar dina preferenser till din unika smak-DNA...",
  "AI kokar ihop din smakpersonlighet med en dash av genialitet och en nypa humor...",
];

export function pickRandomResultGenerationMessage() {
  const randomIndex = Math.floor(
    Math.random() * RESULT_GENERATION_MESSAGES.length,
  );

  return RESULT_GENERATION_MESSAGES[randomIndex];
}
