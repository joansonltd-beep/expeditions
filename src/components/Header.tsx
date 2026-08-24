"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteClient } from "@/components/SiteSettingsProvider";
import { useHeaderTransparentCapable } from "@/components/HeaderTheme";

// Header height in px, kept in sync with the h-[70px] nav row below. Used to
// pull the homepage hero up underneath the header so it can go transparent.
export const HEADER_HEIGHT = 70;

type NavItem = { href: string; label: string; title?: string; static?: boolean };

const COME_SEE_ME: NavItem = { href: "/getting-there", label: "Go Visit", title: "Travel within CARICOM" };
const COME_LIVE_WITH_ME: NavItem = { href: "/getting-started", label: "Go Work", title: "Relocating within CARICOM" };
const STUDY: NavItem = { href: "/study", label: "Go Study", title: "Studying within CARICOM" };

const DESTINATIONS: NavItem = { href: "/destinations", label: "Where are we Going?" };

// A plain, unclickable word sitting in the nav so "Let's" reads straight into
// "Go Visit / Go Work / Go Study" beside it. Not a link — just there.
const LETS: NavItem = { href: "#lets", label: "Let's:", static: true };

const AFTER: NavItem[] = [
  { href: "/survey", label: "Reports", title: "Salaries, Rent and Utilities" },
  { href: "/about", label: "About" },
];

// No "Home" link: the logo itself goes home, same as most sites.
const MOBILE_LINKS: NavItem[] = Array.from(
  new Map(
    [DESTINATIONS, LETS, COME_SEE_ME, COME_LIVE_WITH_ME, STUDY, ...AFTER].map((l) => [l.href, l])
  ).values()
);

export default function Header({ businessName, logoUrl }: { businessName: string; logoUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { chatbotUrl } = useSiteClient();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Pages that render a full-bleed dark photo behind the header declare it
  // via useDeclarePhotoHero(); only those pages get a transparent header.
  const photoHero = useHeaderTransparentCapable();
  const transparent = photoHero && !scrolled;

  // Reset scroll state on navigation so a page loaded already-scrolled (or a
  // client-side route change) doesn't leave a stale transparent/solid state.
  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, [pathname]);

  useEffect(() => {
    if (!photoHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [photoHero]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition ${
      transparent
        ? `hover:text-white ${isActive(href) ? "text-white" : "text-white/70"}`
        : `hover:text-brand ${isActive(href) ? "text-brand" : "text-slate-600"}`
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent ? "bg-transparent shadow-none" : "bg-white/90 shadow-md backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[70px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2.5 text-[1.05rem] font-extrabold tracking-tight transition-colors ${
            transparent ? "text-white" : "text-slate-900"
          }`}
        >
          {logoUrl ? (
            <Image src={logoUrl} alt={businessName} width={150} height={40} className="h-9 w-auto" priority />
          ) : (
            <>
              <Image
                src="/mark.png"
                alt=""
                width={36}
                height={36}
                className={`h-9 w-9 object-contain transition-[filter] ${transparent ? "invert" : ""}`}
                priority
              />
              {businessName}
            </>
          )}
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link href={DESTINATIONS.href} className={linkClass(DESTINATIONS.href)}>
            {DESTINATIONS.label}
          </Link>
          <span
            aria-hidden="true"
            className={`select-none text-sm font-medium ${transparent ? "text-white/50" : "text-slate-400"}`}
          >
            {LETS.label}
          </span>
          <Link href={COME_SEE_ME.href} title={COME_SEE_ME.title} className={linkClass(COME_SEE_ME.href)}>
            {COME_SEE_ME.label}
          </Link>
          <Link href={COME_LIVE_WITH_ME.href} title={COME_LIVE_WITH_ME.title} className={linkClass(COME_LIVE_WITH_ME.href)}>
            {COME_LIVE_WITH_ME.label}
          </Link>
          <Link href={STUDY.href} title={STUDY.title} className={linkClass(STUDY.href)}>
            {STUDY.label}
          </Link>
          {AFTER.map((l) => (
            <Link key={l.href} href={l.href} title={l.title} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition sm:inline-flex ${
              transparent ? "bg-white text-brand-dark hover:bg-white/90" : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            Plan My Move
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block space-y-[5px]">
              <span className={`block h-0.5 w-6 rounded transition-colors ${transparent ? "bg-white" : "bg-slate-900"}`} />
              <span className={`block h-0.5 w-6 rounded transition-colors ${transparent ? "bg-white" : "bg-slate-900"}`} />
              <span className={`block h-0.5 w-6 rounded transition-colors ${transparent ? "bg-white" : "bg-slate-900"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open ? (
        <div className="border-t border-slate-200/70 bg-white/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {MOBILE_LINKS.map((l) =>
              l.static ? (
                <span key={l.href} aria-hidden="true" className="select-none px-2 py-2.5 text-sm font-medium text-slate-400">
                  {l.label}
                </span>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                  {l.title ? <span className="ml-1.5 font-normal text-slate-400">({l.title})</span> : null}
                </Link>
              )
            )}
            {chatbotUrl ? (
              <a
                href={chatbotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-brand hover:bg-slate-50"
              >
                Chat with us
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
