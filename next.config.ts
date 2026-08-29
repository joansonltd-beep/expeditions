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
    ];
  },
};

export default nextConfig;
