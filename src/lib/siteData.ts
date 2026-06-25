// Server-side data layer. Every page fetches content through these functions.
// When Sanity is configured they return CMS content; otherwise (or on error, or
// before seeding) they return the bundled defaults, so the site always renders.

import "server-only";
import { getClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  DEFAULT_SETTINGS,
  DEFAULT_SERVICES,
  DEFAULT_PACKAGES,
  DEFAULT_STAY,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_POLICIES,
  type SiteSettings,
  type Service,
  type ServiceCategory,
  type Package,
  type Stay,
  type Testimonial,
  type AboutData,
  type PoliciesData,
} from "@/lib/defaults";

export type {
  SiteSettings,
  Service,
  ServiceCategory,
  Package,
  Stay,
  Testimonial,
  AboutData,
  PoliciesData,
};

// --- GROQ ---------------------------------------------------------------
const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  businessName, tagline, whatsappNumber, chatbotUrl,
  generalEmail, staysEmail, flightsEmail, supportEmail, queriesEmail,
  facebookUrl, instagramUrl, linkedinUrl, tiktokUrl, youtubeUrl, xUrl,
  heroEyebrow, heroHeadline, heroSubcopy, paymentNote, footerBlurb,
  "logoUrl": logo.asset->url
}`;
const SERVICES_QUERY = `*[_type == "service"]|order(order asc){
  "slug": slug.current, title, icon, scope, category, order,
  shortBlurb, cardFeatures, intro, body, primaryLink
}`;
const PACKAGES_QUERY = `*[_type == "package"]|order(order asc){ name, price, terms, features, featured, order }`;
const STAY_QUERY = `*[_type == "stay"][0]{ name, tagline, description, tags, features }`;
const TESTIMONIALS_QUERY = `*[_type == "testimonial"]|order(order asc){ quote, person, context }`;
const ABOUT_QUERY = `*[_type == "aboutContent"][0]{ intro, sections }`;
const POLICIES_QUERY = `*[_type == "policiesContent"][0]{ intro, sections }`;

// Cache CMS reads for a minute; edits show up shortly after publishing.
const fetchOpts = { next: { revalidate: 60 } } as const;

function stripNulls<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && v !== "")
  ) as Partial<T>;
}

async function query<T>(groq: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await getClient().fetch<T>(groq, {}, fetchOpts);
  } catch {
    return null;
  }
}

// --- public fetchers ----------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await query<Partial<SiteSettings>>(SETTINGS_QUERY);
  return res ? { ...DEFAULT_SETTINGS, ...stripNulls(res) } : DEFAULT_SETTINGS;
}

export async function getServices(category?: ServiceCategory): Promise<Service[]> {
  const res = await query<Service[]>(SERVICES_QUERY);
  const all = res?.length ? res : DEFAULT_SERVICES;
  return category ? all.filter((s) => s.category === category) : all;
}

export async function getService(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getPackages(): Promise<Package[]> {
  const res = await query<Package[]>(PACKAGES_QUERY);
  return res?.length ? res : DEFAULT_PACKAGES;
}

export async function getStay(): Promise<Stay> {
  const res = await query<Partial<Stay>>(STAY_QUERY);
  return res ? { ...DEFAULT_STAY, ...stripNulls(res) } : DEFAULT_STAY;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await query<Testimonial[]>(TESTIMONIALS_QUERY);
  return res?.length ? res : DEFAULT_TESTIMONIALS;
}

export async function getAbout(): Promise<AboutData> {
  const res = await query<Partial<AboutData>>(ABOUT_QUERY);
  return res?.sections?.length ? { ...DEFAULT_ABOUT, ...stripNulls(res) } : DEFAULT_ABOUT;
}

export async function getPolicies(): Promise<PoliciesData> {
  const res = await query<Partial<PoliciesData>>(POLICIES_QUERY);
  return res?.sections?.length ? { ...DEFAULT_POLICIES, ...stripNulls(res) } : DEFAULT_POLICIES;
}
