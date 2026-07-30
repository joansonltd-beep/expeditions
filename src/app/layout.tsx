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
    default: "CARICOM Relocation Services | Expeditions With Jo",
    template: "%s · Expeditions With Jo",
  },
  description:
    "Moving from one CARICOM island to another? Step-by-step CSME Skills Certificate help, bank accounts, business setup and settling-in support, with flights and stays arranged when you need them.",
  keywords: [
    "CARICOM relocation",
    "move to another Caribbean island",
    "CSME Skills Certificate",
    "CSME free movement",
    "CARICOM Skills Certificate application",
    "relocate to Trinidad and Tobago",
    "relocate to Grenada",
    "open bank account Trinidad",
    "register business Trinidad and Tobago",
    "living and working in CARICOM",
    "Caribbean relocation services",
  ],
  openGraph: {
    type: "website",
    locale: "en_TT",
    siteName: "Expeditions With Jo",
    url: SITE_URL,
    title: "CARICOM Relocation Services | Expeditions With Jo",
    description:
      "Move between CARICOM islands with confidence: CSME Skills Certificates, bank accounts, business setup and settling-in support, plus travel when you need it.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Expeditions With Jo — CARICOM relocation services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARICOM Relocation Services | Expeditions With Jo",
    description: "CSME Skills Certificates, banking, business setup and settling-in support for moves between CARICOM islands.",
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
