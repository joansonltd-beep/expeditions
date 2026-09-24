import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";
import { currentFlagTheme } from "@/lib/independenceData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// One display face, one body face.
//
// Fraunces was here and it drew too much attention to itself: a curled J, an
// odd F terminal, and enough weight at heading sizes that the letterforms read
// before the words did. Source Serif 4 keeps the warmth and the editorial feel
// with conventional shapes, so a headline reads as a headline rather than as a
// typeface.
const displaySerif = Source_Serif_4({
  variable: "--font-display-serif",
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
    default: "Visit, Work, Study or Marry in Another CARICOM Country | Expeditions With Jo",
    template: "%s · Expeditions With Jo",
  },
  description:
    "Help for CARICOM citizens working out how to visit, work, study or marry in another CARICOM country: what each destination asks for, which office handles it, and getting the papers and the travel organised.",
  keywords: [
    "CARICOM",
    "how to move to another CARICOM country",
    "visit another CARICOM country",
    "work in another CARICOM country",
    "study in another CARICOM country",
    "get married in another CARICOM country",
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
    title: "Visit, Work, Study or Marry in Another CARICOM Country | Expeditions With Jo",
    description:
      "Tell Jo where you are starting and where you want to go. We work out what your destination asks for, then organise the papers and the travel around it.",
    images: [
      {
        url: "/og-falls.jpg",
        width: 1200,
        height: 630,
        alt: "The Expeditions With Jo logo over Dunn’s River Falls, Jamaica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit, Work, Study or Marry in Another CARICOM Country | Expeditions With Jo",
    description:
      "Working out how to visit, work, study or marry in another CARICOM country, and getting it organised once you know.",
    images: ["/og-falls.jpg"],
  },
};

// Minimal root layout: just html/body. The site chrome lives in (site)/layout
// so the embedded Studio at /studio renders without the site header/footer.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Around a CARICOM country’s independence day the site wears that country’s
  // flag colours. The palette swap lives in globals.css under
  // [data-theme="..."]; this only decides whether one is on. Pages revalidate
  // every 60s (the Sanity fetch in the site layout sets that), so the skin
  // appears and clears on its own without a redeploy.
  const flagTheme = currentFlagTheme();

  return (
    <html
      lang="en"
      data-theme={flagTheme ?? undefined}
      className={`${geistSans.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-900">{children}</body>
    </html>
  );
}
