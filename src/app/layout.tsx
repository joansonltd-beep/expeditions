import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";
import { currentFlagTheme } from "@/lib/independenceData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// One display face, one body face. Fraunces carries warmth without tipping
// into decorative; the soft optical axis keeps it friendly at large sizes.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
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
    "Help for CARICOM citizens working out how to visit, work or study in another CARICOM country: what each destination asks for, which office handles it, and getting the papers and travel organised.",
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
      "Tell Jo where you are starting and where you want to go. We work out what your destination asks for and organise the papers, flights and arrival around it.",
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
      "Working out how to visit, work or study in another CARICOM country, and getting it organised once you know.",
    images: ["/og.png"],
  },
};

// Minimal root layout: just html/body. The site chrome lives in (site)/layout
// so the embedded Studio at /studio renders without the site header/footer.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Around a CARICOM country's independence day the site wears that country's
  // flag colours. The palette swap lives in globals.css under
  // [data-theme="..."]; this only decides whether one is on. Pages revalidate
  // every 60s (the Sanity fetch in the site layout sets that), so the skin
  // appears and clears on its own without a redeploy.
  const flagTheme = currentFlagTheme();

  return (
    <html
      lang="en"
      data-theme={flagTheme ?? undefined}
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-900">{children}</body>
    </html>
  );
}
