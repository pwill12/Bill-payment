// Minimal phone normalizer for NG numbers; returns undefined if unusable.
export function normalizePhonenum(input) {
  if (!input || typeof input !== 'string') return undefined;
  // Strip non-digits and leading +
  let digits = input.replace(/[^\d]/g, '');
  // Handle local NG formats
  if (digits.startsWith('0') && digits.length === 11) {
    // 0XXXXXXXXXX -> 234XXXXXXXXXX
    digits = '234' + digits.slice(1);
  } else if (digits.length === 10) {
    // XXXXXXXXXX -> assume NG without leading 0
    digits = '234' + digits;
  }
  // Accept 234XXXXXXXXXX (13 digits) or other reasonable 11-15 digit E.164-like numbers
  if (digits.length >= 11 && digits.length <= 15) return digits;
  return undefined;
}