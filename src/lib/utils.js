// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format numbers in English digits (0-9) for display in RTL/Arabic UI */
export function toEnglishNumber(value) {
  if (value == null || value === "") return "—";
  if (typeof value === "number") {
    return value.toLocaleString("en-US", { useGrouping: false });
  }
  const str = String(value);
  const arabicToEn = "٠١٢٣٤٥٦٧٨٩";
  return str.replace(/[٠-٩]/g, (d) => String(arabicToEn.indexOf(d)));
}