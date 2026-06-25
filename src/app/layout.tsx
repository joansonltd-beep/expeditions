import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Expeditions With Jo | Travel, Insurance & Finance",
    template: "%s · Expeditions With Jo",
  },
  description:
    "Your one-stop service for flights, accommodation, transfers, cruises and travel visas worldwide, plus insurance and finance help in Trinidad and Tobago.",
  keywords: [
    "travel agent Trinidad and Tobago",
    "flights Trinidad",
    "Canadian visa Trinidad",
    "airport transfers",
    "cruises Caribbean",
    "insurance consultation Trinidad",
  ],
  openGraph: {
    type: "website",
    locale: "en_TT",
    siteName: "Expeditions With Jo",
    url: SITE_URL,
    title: "Expeditions With Jo | Travel, Insurance & Finance",
    description:
      "Flights, stays, transfers, cruises and travel visas worldwide, plus insurance and finance help in Trinidad and Tobago.",
  },
  twitter: { card: "summary_large_image" },
};

// Minimal root layout: just html/body. The site chrome lives in (site)/layout
// so the embedded Studio at /studio renders without the site header/footer.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-900">{children}</body>
    </html>
  );
}
