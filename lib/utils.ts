import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clubs = [
  "chess",
  "dance",
  "media",
  "programming",
  "literary",
  "robotics",
];
