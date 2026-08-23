"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteClient } from "@/components/SiteSettingsProvider";

type NavItem = { href: string; label: string; title?: string };

const COME_SEE_ME: NavItem = { href: "/getting-there", label: "Come See Me", title: "Travel within CARICOM" };
const COME_LIVE_WITH_ME: NavItem = { href: "/getting-started", label: "Come Live with Me", title: "Relocating within CARICOM" };
const STUDY: NavItem = { href: "/study", label: "Study" };

const MAIN: NavItem[] = [{ href: "/", label: "Home" }];

const DESTINATIONS: NavItem = { href: "/destinations", label: "Destinations" };

const AFTER: NavItem[] = [
  { href: "/survey", label: "SRU", title: "Salaries, Rent and Utilities" },
  { href: "/about", label: "About" },
];

const MOBILE_LINKS: NavItem[] = Array.from(
  new Map([...MAIN, DESTINATIONS, COME_SEE_ME, COME_LIVE_WITH_ME, STUDY, ...AFTER].map((l) => [l.href, l])).values()
);

export default function Header({ businessName, logoUrl }: { businessName: string; logoUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const { chatbotUrl } = useSiteClient();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const linkClass = (href: string) =>
    `text-sm font-medium transition hover:text-brand ${isActive(href) ? "text-brand" : "text-slate-600"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex h-[70px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[1.05rem] font-extrabold tracking-tight text-slate-900">
          {logoUrl ? (
            <Image src={logoUrl} alt={businessName} width={150} height={40} className="h-9 w-auto" priority />
          ) : (
            <>
              <Image src="/mark.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
              {businessName}
            </>
          )}
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {MAIN.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link href={DESTINATIONS.href} className={linkClass(DESTINATIONS.href)}>
            {DESTINATIONS.label}
          </Link>
          <Link href={COME_SEE_ME.href} title={COME_SEE_ME.title} className={linkClass(COME_SEE_ME.href)}>
            {COME_SEE_ME.label}
          </Link>
          <Link href={COME_LIVE_WITH_ME.href} title={COME_LIVE_WITH_ME.title} className={linkClass(COME_LIVE_WITH_ME.href)}>
            {COME_LIVE_WITH_ME.label}
          </Link>
          <Link href={STUDY.href} className={linkClass(STUDY.href)}>
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
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark sm:inline-flex"
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
              <span className="block h-0.5 w-6 rounded bg-slate-900" />
              <span className="block h-0.5 w-6 rounded bg-slate-900" />
              <span className="block h-0.5 w-6 rounded bg-slate-900" />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open ? (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {MOBILE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
                {l.title ? <span className="ml-1.5 font-normal text-slate-400">({l.title})</span> : null}
              </Link>
            ))}
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
