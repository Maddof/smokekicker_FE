/**
 * Check if a person is of legal age (18 years or older) based on their Swedish personal number
 * @param {string} personalNumber - Swedish personal number (format: YYYYMMDDXXXX)
 * @returns {boolean} - true if user is 18 or older, false otherwise
 */
export function isOfLegalAge(personalNumber) {
  if (!personalNumber || typeof personalNumber !== "string") {
    return false;
  }

  // Extract the YYYYMMDD portion
  const pn = personalNumber.slice(0, 8); // e.g. "19910316"

  // Validate the format
  if (pn.length !== 8 || !/^\d{8}$/.test(pn)) {
    return false;
  }

  // 1) Parse into numeric year, month, day
  const year = parseInt(pn.slice(0, 4), 10);
  const month = parseInt(pn.slice(4, 6), 10) - 1; // JS Date months are 0–11
  const day = parseInt(pn.slice(6, 8), 10);

  // 2) Build a proper Date object
  const birthDate = new Date(year, month, day);

  // 3) Compute the "18th birthday" moment
  const eighteenthBirthday = new Date(birthDate);
  eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);

  // 4) Compare to "now" - return true if user is 18 or older
  return eighteenthBirthday <= new Date();
}
