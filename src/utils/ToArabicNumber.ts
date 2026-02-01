// Convert English digits → Arabic digits when needed
export function toArabicNumber(num: number | string) {
  const map = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  return num.toString().replace(/[0-9]/g, (d) => map[parseInt(d)]);
}