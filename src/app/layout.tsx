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
    default: "Travel Agent in Trinidad & Tobago | Expeditions With Jo",
    template: "%s · Expeditions With Jo",
  },
  description:
    "Your travel agent in Trinidad and Tobago: book flights, hotels, airport transfers and cruises, plus step-by-step Canadian visa help for Grenadian, Jamaican and CARICOM travellers.",
  keywords: [
    "travel agent Trinidad and Tobago",
    "Caribbean travel agent",
    "Canadian visa from Trinidad",
    "Canadian visa Grenada",
    "Canadian visa Jamaica",
    "Canadian visa appointment Port of Spain",
    "biometrics Port of Spain",
    "book flights Trinidad",
    "airport transfers Trinidad",
    "Caribbean cruises",
    "moving to Canada from the Caribbean",
  ],
  openGraph: {
    type: "website",
    locale: "en_TT",
    siteName: "Expeditions With Jo",
    url: SITE_URL,
    title: "Travel Agent in Trinidad & Tobago | Expeditions With Jo",
    description:
      "Flights, hotels, transfers and cruises, plus step-by-step Canadian visa help for Grenadian, Jamaican and CARICOM travellers.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Expeditions With Jo — travel agent in Trinidad & Tobago" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Agent in Trinidad & Tobago | Expeditions With Jo",
    description: "Flights, hotels, transfers, cruises and Canadian visa help for CARICOM travellers.",
    images: ["/og.png"],
  },
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
