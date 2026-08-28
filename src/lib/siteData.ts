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
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_POLICIES,
  type SiteSettings,
  type Service,
  type ServiceCategory,
  type Package,
  type AddOn,
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
  shortBlurb, cardFeatures, intro, body, primaryLink, detail
}`;
const PACKAGES_QUERY = `*[_type == "package"]|order(order asc){ name, priceUsd, features, featured, order }`;
const ADDONS_QUERY = `*[_type == "addOn"]|order(order asc){ title, usdPrice, amountText, trinidadOnly, order }`;
const TESTIMONIALS_QUERY = `*[_type == "testimonial"]|order(order asc){ quote, person, context }`;
const ABOUT_QUERY = `*[_type == "aboutContent"][0]{ intro, sections }`;
const POLICIES_QUERY = `*[_type == "policiesContent"][0]{ intro, sections }`;
const HOME_QUERY = `*[_type == "homeContent"][0]{
  heroStats, heroTrustNote,
  journeysEyebrow, journeysTitle, journeysIntro, journeys, journeysNote,
  ladderEyebrow, ladderTitle, ladderIntro,
  howEyebrow, howTitle, howIntro, steps, howNote,
  csmeEyebrow, csmeTitle, csmeText,
  studyEyebrow, studyTitle, studyText,
  supportEyebrow, supportTitle, supportIntro, pillars,
  notSureTitle, notSureText, localMoved,
  whyEyebrow, whyTitle, why,
  testimonialsEyebrow, testimonialsTitle,
  faqEyebrow, faqTitle, faqs,
  contactEyebrow, contactTitle, contactIntro, gallery
}`;
const INSURANCE_QUERY = `*[_type == "insurancePage"][0]{ title, intro, body, bookNote, bookLabel, visitLabel }`;
const BUSINESS_SETUP_QUERY = `*[_type == "businessSetupPage"][0]{
  eyebrow, title, intro, services,
  establishmentTitle, establishmentParagraphs, establishmentNote,
  comingSoonTitle, comingSoonText,
  eligibilityTitle, eligibilityIntro, ineligibleMessage
}`;
const ARTICLES_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  "slug": slug.current, title, excerpt, publishedAt, body, keywords
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
  // The "detail" blocks (who it's for, what we don't control, FAQs) were added
  // to the code before Sanity had them. Fall back to the bundled detail for a
  // service whose CMS document has none, so the disclaimers and expectations
  // still render rather than silently disappearing.
  const all = res?.length
    ? res.map((s) => (s.detail ? s : { ...s, detail: DEFAULT_SERVICES.find((d) => d.slug === s.slug)?.detail }))
    : DEFAULT_SERVICES;
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

// Placeholder attributions that must never reach a visitor. The home page
// renders testimonials whenever any exist, so a stray seed document left in the
// CMS would otherwise publish an invented client quote. Filtering here means
// the site cannot show a fake testimonial even if one is sitting in Sanity.
const PLACEHOLDER_PERSON = /\b(sample|placeholder|example|test|lorem|anon|client name|your name)\b/i;

function isRealTestimonial(t: Testimonial): boolean {
  return Boolean(t?.quote?.trim()) && Boolean(t?.person?.trim()) && !PLACEHOLDER_PERSON.test(t.person);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await query<Testimonial[]>(TESTIMONIALS_QUERY);
  const all = res?.length ? res : DEFAULT_TESTIMONIALS;
  return all.filter(isRealTestimonial);
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
