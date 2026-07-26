import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

// Body copy — quiet, high-legibility workhorse.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display face — geometric, slightly technical. Carries the headlines.
export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Utility face — eyebrows, step numbers, data-like labels.
// Evokes the "programmable money" / ledger register of the product.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
