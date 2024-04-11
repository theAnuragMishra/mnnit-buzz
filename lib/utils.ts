import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hour}:${minute}`;
}

export function sliceString(text: string) {
  if (text.length <= 1000) {
    return text;
  } else {
    let spaceIndex = text.indexOf(" ", 1000);
    if (spaceIndex !== -1) {
      return text.substring(0, spaceIndex);
    } else {
      return text.substring(0, 1000);
    }
  }
}
