import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function tailwindMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
