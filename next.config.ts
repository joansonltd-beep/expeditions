import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow optimizing images served from the Sanity asset CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Transfers go straight to the Welcome Pickups booking site (it can't be
  // embedded, so /transfers redirects there in the same tab). Every link to
  // /transfers — nav tab, home card, footer — follows this.
  async redirects() {
    return [
      {
        source: "/transfers",
        destination: "https://www.book-online-transfers.com/en/expeditionswithjo",
        permanent: false,
      },
      {
        source: "/csme-skills-certificate",
        destination: "/caricom-skills-certificate",
        permanent: true,
      },
      // The three cost-of-living surveys became one form on /survey. These
      // paths were indexed and linked, so they redirect rather than 404.
      { source: "/survey/salary", destination: "/survey", permanent: true },
      { source: "/survey/rent", destination: "/survey", permanent: true },
      { source: "/survey/utilities", destination: "/survey", permanent: true },
      // Canadian and US visa work is no longer offered. The service page and
      // its five guides were indexed, so they point at the nearest live page
      // instead of 404ing.
      { source: "/travel-visas", destination: "/getting-there", permanent: true },
      { source: "/guides/canadian-visa-from-trinidad", destination: "/guides", permanent: true },
      { source: "/guides/canadian-visa-help-for-grenadians", destination: "/guides", permanent: true },
      { source: "/guides/biometrics-appointment-port-of-spain", destination: "/guides", permanent: true },
      { source: "/guides/documents-for-canadian-visitor-visa", destination: "/guides", permanent: true },
      { source: "/guides/where-to-stay-for-visa-appointment-trinidad", destination: "/guides", permanent: true },
    ];
  },
};

export default nextConfig;
