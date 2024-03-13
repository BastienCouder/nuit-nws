import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_URL = "https://app-nuit.normandiewebschool.fr/api";
// export const API_URL = "http://localhost:5000/api";
