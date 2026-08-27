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
  // NOTE: deliberately no `alternates.canonical` here. Next.js merges metadata
  // from parent to child, so a canonical set on the root layout is inherited by
  // every page that does not set its own, telling Google those pages are
  // duplicates of the homepage. Each page sets its own canonical instead.
  title: {
    default: "CARICOM Mobility Support | Visit, Work or Study | Expeditions With Jo",
    template: "%s · Expeditions With Jo",
  },
  description:
    "Practical support for CARICOM citizens who want to visit, work, or study in another CARICOM country, including document guidance, travel planning, accommodation, transfers, and settling-in assistance.",
  keywords: [
    "CARICOM",
    "CARICOM mobility",
    "visit another CARICOM country",
    "work in another CARICOM country",
    "study in another CARICOM country",
    "CARICOM Skills Certificate",
    "CSME Skills Certificate",
    "CSME free movement",
    "CARICOM Skills Certificate application",
    "work in CARICOM without a work permit",
    "jobs in the Caribbean",
    "studying in the Caribbean",
    "CARICOM student visa",
    "University of the West Indies regional students",
    "Caribbean travel planning",
    "open bank account Trinidad",
    "register business Trinidad and Tobago",
  ],
  openGraph: {
    type: "website",
    locale: "en_TT",
    siteName: "Expeditions With Jo",
    url: SITE_URL,
    title: "CARICOM Mobility Support | Visit, Work or Study | Expeditions With Jo",
    description:
      "Expeditions With Jo helps CARICOM citizens visit, work, or study across the Caribbean by making the requirements, documents, travel, and practical arrangements easier to understand.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Expeditions With Jo, CARICOM mobility support for visiting, working and studying",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARICOM Mobility Support | Visit, Work or Study | Expeditions With Jo",
    description:
      "Support for CARICOM citizens visiting, working or studying in another CARICOM country: requirements, documents, travel and practical arrangements.",
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
