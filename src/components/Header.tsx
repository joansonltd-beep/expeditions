"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteClient } from "@/components/SiteSettingsProvider";
import { track } from "@/lib/analytics";

// Header height in px at rest. The announcement strip above it is separate and
// is not sticky, so it scrolls away while the header itself stays.
export const HEADER_HEIGHT = 72;

type NavItem = { href: string; label: string; title?: string; static?: boolean };

const COME_SEE_ME: NavItem = { href: "/getting-there", label: "Go Visit,", title: "Travel within CARICOM" };
const COME_LIVE_WITH_ME: NavItem = { href: "/getting-started", label: "Go Work", title: "Relocating within CARICOM" };
const STUDY: NavItem = { href: "/study", label: "Go Study", title: "Studying within CARICOM" };

// Relabeled "CARICOM" so the whole row reads as one sentence:
// "Let's Go Visit,  Go Work  or  Go Study  In  a  CARICOM  Country!".
const DESTINATIONS: NavItem = { href: "/destinations", label: "CARICOM" };

// Plain, unclickable words sitting in the nav so it reads as a sentence.
// Not links — just there.
const LETS: NavItem = { href: "#lets", label: "Let's", static: true };
const OR: NavItem = { href: "#or", label: "or", static: true };
const IN: NavItem = { href: "#in", label: "In", static: true };
const A: NavItem = { href: "#a", label: "a", static: true };
const COUNTRY: NavItem = { href: "#country", label: "Country!", static: true };

// "Reports" is no longer its own nav link: it lives under the CARICOM
// (destinations) page instead, but /survey itself is still a normal,
// directly shareable page — just not in the top nav.
const AFTER: NavItem[] = [{ href: "/about", label: "About Us" }];

// No "Home" link: the logo itself goes home, same as most sites.
const MOBILE_LINKS: NavItem[] = Array.from(
  new Map(
    [LETS, COME_SEE_ME, COME_LIVE_WITH_ME, OR, STUDY, IN, A, DESTINATIONS, COUNTRY, ...AFTER].map((l) => [l.href, l])
  ).values()
);

// One of the plain, unclickable sentence words (LETS, OR, IN, A, COUNTRY).
function StaticWord({ item }: { item: NavItem }) {
  return (
    <span aria-hidden="true" className="select-none text-sm font-medium text-navy/45">
      {item.label}
    </span>
  );
}

export default function Header({ businessName, logoUrl }: { businessName: string; logoUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { whatsappNumber } = useSiteClient();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const waHeader = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Jo, I have a question about moving within CARICOM."
  )}`;

  // Only used to tighten the header slightly once you start scrolling. The
  // header is always solid now, so nothing depends on this for legibility.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and let Escape close it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition hover:text-brand ${isActive(href) ? "text-accent" : "text-navy/80"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/95 backdrop-blur-md">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 transition-[height] duration-200 ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[1.02rem] font-extrabold tracking-tight text-navy transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {logoUrl ? (
            <Image src={logoUrl} alt={businessName} width={150} height={40} className="h-8 w-auto" priority />
          ) : (
            <>
              <Image
                src="/mark.png"
                alt=""
                width={36}
                height={36}
                className={`w-auto object-contain transition-[height] ${scrolled ? "h-7" : "h-8"}`}
                priority
              />
              <span className="hidden sm:inline">{businessName}</span>
            </>
          )}
        </Link>

        {/* desktop nav: the sentence, unchanged in wording and order */}
        <div className="hidden items-center gap-6 lg:flex">
          <StaticWord item={LETS} />
          <Link href={COME_SEE_ME.href} title={COME_SEE_ME.title} className={linkClass(COME_SEE_ME.href)}>
            {COME_SEE_ME.label}
          </Link>
          <Link href={COME_LIVE_WITH_ME.href} title={COME_LIVE_WITH_ME.title} className={linkClass(COME_LIVE_WITH_ME.href)}>
            {COME_LIVE_WITH_ME.label}
          </Link>
          <StaticWord item={OR} />
          <Link href={STUDY.href} title={STUDY.title} className={linkClass(STUDY.href)}>
            {STUDY.label}
          </Link>
          <StaticWord item={IN} />
          <StaticWord item={A} />
          <Link href={DESTINATIONS.href} className={linkClass(DESTINATIONS.href)}>
            {DESTINATIONS.label}
          </Link>
          <StaticWord item={COUNTRY} />
          {AFTER.map((l) => (
            <Link key={l.href} href={l.href} title={l.title} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+18687236644"
            onClick={() => track("phone_click", { location: "header" })}
            className="hidden text-sm font-medium text-navy/70 transition hover:text-brand md:inline"
          >
            868-723-6644
          </a>
          <a
            href={waHeader}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "header" })}
            className="hidden rounded-full bg-[#ce1126] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ce1126] focus-visible:ring-offset-2 sm:inline-flex"
          >
            WhatsApp Jo
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center text-navy lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block space-y-[5px]">
              <span className={`block h-0.5 w-6 rounded bg-navy transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 rounded bg-navy transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 rounded bg-navy transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu: same sentence, same order, same wording */}
      {open ? (
        <div id="mobile-menu" className="border-t border-navy/10 bg-cream px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col">
            {MOBILE_LINKS.map((l) =>
              l.static ? (
                <span key={l.href} aria-hidden="true" className="select-none px-2 py-2 text-sm font-medium text-navy/45">
                  {l.label}
                </span>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded px-2 py-2.5 text-base font-medium transition hover:bg-sand ${
                    isActive(l.href) ? "text-accent" : "text-navy"
                  }`}
                >
                  {l.label}
                  {l.title ? <span className="ml-1.5 text-sm font-normal text-navy/50">({l.title})</span> : null}
                </Link>
              )
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-navy/10 pt-4">
            <a
              href={waHeader}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "header-mobile" })}
              className="inline-flex items-center justify-center rounded-full bg-[#ce1126] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              WhatsApp Jo
            </a>
            <a
              href="tel:+18687236644"
              onClick={() => track("phone_click", { location: "header-mobile" })}
              className="text-center text-sm font-medium text-navy/70 hover:text-brand"
            >
              Call 868-723-6644
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
