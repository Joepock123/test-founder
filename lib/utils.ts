import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching data.");
    }
  });
