import { COUNTRY_GUIDES } from "@/lib/countryGuideData";
import {
  HOME_HERO_PHOTOS,
  TT_HERO_PHOTOS,
  BUSINESS_CENTER_PHOTOS,
  SCHOOL_PHOTOS,
  WEDDING_HERO_PHOTOS,
  GUEST_HERO_PHOTOS,
  ABOUT_PHOTOS,
  SURVEY_PHOTOS,
  VISIT_PHOTOS,
  AIRPORT_PHOTOS,
} from "@/lib/sitePhotos";

/**
 * Every credited image on the site, gathered into one list for /credits.
 *
 * Most of the photographs here were taken by other people and shared under a
 * Creative Commons licence. Those licences permit reuse, commercial use
 * included, on the condition that the photographer is named, the licence is
 * named, and the original is linked. That used to be printed under each photo.
 * It is collected here instead, which the licences allow: attribution may be
 * given "in any reasonable manner based on the medium", and for a website that
 * means a credits page every photo’s page links to.
 *
 * The list is DERIVED, never hand-maintained. Add a photo anywhere in
 * sitePhotos.ts or countryGuideData.ts and it appears here on the next build.
 * Nothing can be credited on the site and missing from this page.
 */

export type Attribution = {
  /** The file on our side. Doubles as the dedupe key. */
  src: string;
  /** What the photograph shows, taken from its alt text. */
  subject: string;
  author: string;
  /** "CC BY-SA 4.0", "Public domain", or "" for Jo’s own work. */
  licence: string;
  licenceUrl?: string;
  sourceUrl?: string;
  /** True when Jo took it himself, which needs no licence. */
  own: boolean;
  /** The sections of the site it appears in. */
  where: string[];
};

/**
 * Credit strings are written as "Author, Licence, via Source".
 *
 * The licence is found by pattern rather than by position, because a
 * photographer’s own name can contain a comma: "Jerrye and Roy Klotz, MD"
 * splits into two parts and the second is not a licence. Anything with no
 * licence and no source is Jo’s own photograph.
 */
function parseCredit(credit: string): { author: string; licence: string; own: boolean } {
  const parts = credit.split(",").map((p) => p.trim());
  const viaAt = parts.findIndex((p) => /^via /i.test(p));
  const named = viaAt === -1 ? parts : parts.slice(0, viaAt);
  const licenceAt = named.findIndex((p) => /^(cc[ 0-]|public domain)/i.test(p));
  if (licenceAt === -1) {
    return { author: named.join(", "), licence: "", own: viaAt === -1 };
  }
  return {
    author: named.slice(0, licenceAt).join(", "),
    licence: named.slice(licenceAt).join(", "),
    own: false,
  };
}

/** Creative Commons deeds, so the licence name is not a dead end. */
function licenceUrl(licence: string): string | undefined {
  const l = licence.toLowerCase();
  if (l.includes("cc0")) return "https://creativecommons.org/publicdomain/zero/1.0/";
  // The IGO variants are separate licences with their own deeds, so the suffix
  // has to travel with the version number rather than being dropped.
  const m = l.match(/cc by(-sa)? (\d\.\d)(\s+igo)?/);
  if (m) return `https://creativecommons.org/licenses/by${m[1] ?? ""}/${m[2]}/${m[3] ? "igo/" : ""}`;
  return undefined;
}

/** Title case for display, so "public domain" does not start a row lowercase. */
function tidyLicence(licence: string): string {
  if (!licence) return "";
  if (/^public domain/i.test(licence)) return licence.replace(/^public domain/i, "Public domain");
  return licence;
}

type RawPhoto = { src: string; alt: string; credit: string; creditUrl?: string };

function collect(): Attribution[] {
  const bySrc = new Map<string, Attribution>();

  const add = (photo: RawPhoto | undefined, where: string) => {
    if (!photo?.credit) return;
    const existing = bySrc.get(photo.src);
    if (existing) {
      if (!existing.where.includes(where)) existing.where.push(where);
      return;
    }
    const { author, licence, own } = parseCredit(photo.credit);
    bySrc.set(photo.src, {
      src: photo.src,
      subject: photo.alt,
      author,
      licence: tidyLicence(licence),
      licenceUrl: licenceUrl(licence),
      sourceUrl: photo.creditUrl,
      own,
      where: [where],
    });
  };

  for (const [photos, where] of [
    [HOME_HERO_PHOTOS, "Home page"],
    [TT_HERO_PHOTOS, "Home page"],
    [VISIT_PHOTOS, "Visit"],
    [AIRPORT_PHOTOS, "Visit"],
    [BUSINESS_CENTER_PHOTOS, "Work"],
    [SCHOOL_PHOTOS, "Study"],
    [WEDDING_HERO_PHOTOS, "Marry"],
    [GUEST_HERO_PHOTOS, "Marry"],
    [ABOUT_PHOTOS, "About Us"],
    [SURVEY_PHOTOS, "Cost of living survey"],
  ] as const) {
    for (const p of photos) add(p, where);
  }

  for (const guide of COUNTRY_GUIDES) {
    const where = guide.name;
    add(guide.photo, where);
    for (const place of guide.placesToSee ?? []) {
      add(place.photo, where);
      if (place.video) {
        add({ src: place.video.src, alt: place.video.label, credit: place.video.credit }, where);
      }
    }
  }

  return [...bySrc.values()].sort((a, b) => a.subject.localeCompare(b.subject));
}

export const PHOTO_CREDITS: Attribution[] = collect();

/** Jo’s own work first, since it is the part that is not a licence obligation. */
export const OWN_CREDITS = PHOTO_CREDITS.filter((c) => c.own);
export const LICENSED_CREDITS = PHOTO_CREDITS.filter((c) => !c.own);

/** Grouped for display: the standalone pages first, then country by country. */
export const CREDIT_GROUPS: { title: string; items: Attribution[] }[] = (() => {
  const pageOrder = ["Home page", "Visit", "Work", "Study", "Marry", "About Us", "Cost of living survey"];
  const groups = new Map<string, Attribution[]>();
  for (const c of LICENSED_CREDITS) {
    const key = c.where[0];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c);
  }
  const pages = pageOrder.filter((t) => groups.has(t)).map((title) => ({ title, items: groups.get(title)! }));
  const countries = [...groups.keys()]
    .filter((k) => !pageOrder.includes(k))
    .sort((a, b) => a.localeCompare(b))
    .map((title) => ({ title, items: groups.get(title)! }));
  return [...pages, ...countries];
})();

/**
 * True when a credit names a photographer with no licence behind it, which on
 * this site means Jo took it. Those stay credited on the photo itself: "I was
 * there" is worth saying, and it is not a licence obligation being discharged.
 */
export function isOwnWork(credit?: string): boolean {
  return !!credit && parseCredit(credit).own;
}
