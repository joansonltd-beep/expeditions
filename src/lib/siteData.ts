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
  DEFAULT_ADDONS,
  DEFAULT_STAY,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_POLICIES,
  type SiteSettings,
  type Service,
  type ServiceCategory,
  type Package,
  type AddOn,
  type Stay,
  type Testimonial,
  type AboutData,
  type PoliciesData,
} from "@/lib/defaults";
import {
  DEFAULT_HOME,
  DEFAULT_INSURANCE,
  type HomeContent,
  type InsurancePage,
} from "@/lib/homeDefaults";
import { DEFAULT_ARTICLES, type Article } from "@/lib/articleDefaults";
import { DEFAULT_BUSINESS_SETUP, type BusinessSetupPage } from "@/lib/businessSetupDefaults";

export type {
  SiteSettings,
  Service,
  ServiceCategory,
  Package,
  AddOn,
  Stay,
  Testimonial,
  AboutData,
  PoliciesData,
  HomeContent,
  InsurancePage,
  Article,
  BusinessSetupPage,
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
const PACKAGES_QUERY = `*[_type == "package"]|order(order asc){ name, priceUsd, features, featured, order }`;
const ADDONS_QUERY = `*[_type == "addOn"]|order(order asc){ title, usdPrice, amountText, trinidadOnly, order }`;
const STAY_QUERY = `*[_type == "stay"][0]{ name, tagline, description, tags, features }`;
const TESTIMONIALS_QUERY = `*[_type == "testimonial"]|order(order asc){ quote, person, context }`;
const ABOUT_QUERY = `*[_type == "aboutContent"][0]{ intro, sections }`;
const POLICIES_QUERY = `*[_type == "policiesContent"][0]{ intro, sections }`;
const HOME_QUERY = `*[_type == "homeContent"][0]{
  heroStats, pillarsEyebrow, pillarsTitle, pillarsIntro, pillars,
  travelEyebrow, travelTitle, travelIntro, notSureTitle, notSureText,
  bundleEyebrow, bundleTitle, bundleText,
  localEyebrow, localTitle, localIntro, localMoved,
  howEyebrow, howTitle, howIntro, steps,
  whyEyebrow, whyTitle, why,
  testimonialsEyebrow, testimonialsTitle,
  contactEyebrow, contactTitle, contactIntro, gallery
}`;
const INSURANCE_QUERY = `*[_type == "insurancePage"][0]{ title, intro, body, bookNote, bookLabel, visitLabel }`;
const BUSINESS_SETUP_QUERY = `*[_type == "businessSetupPage"][0]{
  eyebrow, title, intro, services, eligibilityTitle, eligibilityIntro, ineligibleMessage
}`;
const ARTICLES_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  "slug": slug.current, title, excerpt, publishedAt, body
}`;

// Cache CMS reads for a minute; edits show up shortly after publishing.
const fetchOpts = { next: { revalidate: 60 } } as const;

function stripNulls<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v != null && v !== "" && !(Array.isArray(v) && v.length === 0)
    )
  ) as Partial<T>;
}

async function query<T>(groq: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  // Race the fetch against an 8s timeout so a slow/unreachable Sanity response
  // can never hang the build or a request; we just fall back to bundled content.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      getClient().fetch<T>(groq, {}, fetchOpts),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), 8000);
      }),
    ]);
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
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

export async function getAddOns(): Promise<AddOn[]> {
  const res = await query<AddOn[]>(ADDONS_QUERY);
  return res?.length ? res : DEFAULT_ADDONS;
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

export async function getHomeContent(): Promise<HomeContent> {
  const res = await query<Partial<HomeContent>>(HOME_QUERY);
  if (!res) return DEFAULT_HOME;
  const merged = { ...DEFAULT_HOME, ...stripNulls(res) };
  // Keep the moved-card sub-fields filled in even if only some are edited.
  merged.localMoved = { ...DEFAULT_HOME.localMoved, ...(res.localMoved ? stripNulls(res.localMoved) : {}) };
  return merged;
}

export async function getInsurancePage(): Promise<InsurancePage> {
  const res = await query<Partial<InsurancePage>>(INSURANCE_QUERY);
  return res ? { ...DEFAULT_INSURANCE, ...stripNulls(res) } : DEFAULT_INSURANCE;
}

export async function getBusinessSetupPage(): Promise<BusinessSetupPage> {
  const res = await query<Partial<BusinessSetupPage>>(BUSINESS_SETUP_QUERY);
  return res?.services?.length ? { ...DEFAULT_BUSINESS_SETUP, ...stripNulls(res) } : DEFAULT_BUSINESS_SETUP;
}

export async function getArticles(): Promise<Article[]> {
  const res = await query<Article[]>(ARTICLES_QUERY);
  return res?.length ? res : DEFAULT_ARTICLES;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}
