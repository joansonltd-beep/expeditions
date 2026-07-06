"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSiteClient } from "@/components/SiteSettingsProvider";

type NavItem = { href: string; label: string };

const TRAVEL: NavItem[] = [
  { href: "/flights", label: "Flights" },
  { href: "/accommodations", label: "Accommodations" },
  { href: "/cruises", label: "Cruises" },
  { href: "/transfers", label: "Transfers" },
  { href: "/travel-visas", label: "Travel Visas" },
  { href: "/guides", label: "Guides" },
];

const FINANCE: NavItem[] = [
  { href: "/insurance", label: "Insurance" },
  { href: "/finance", label: "Finance" },
];

const MAIN: NavItem[] = [{ href: "/", label: "Home" }];

const AFTER: NavItem[] = [{ href: "/about", label: "About" }];

export default function Header({ businessName, logoUrl }: { businessName: string; logoUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const { chatbotUrl } = useSiteClient();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const linkClass = (href: string) =>
    `text-sm font-medium transition hover:text-brand ${isActive(href) ? "text-brand" : "text-slate-600"}`;

  const Dropdown = ({ label, items }: { label: string; items: NavItem[] }) => {
    const anyActive = items.some((l) => isActive(l.href));
    return (
      <div className="group relative">
        <button
          className={`flex items-center gap-1 text-sm font-medium transition hover:text-brand ${anyActive ? "text-brand" : "text-slate-600"}`}
        >
          {label}
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
        <div className="invisible absolute left-1/2 top-full z-10 w-56 -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
          {items.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-lg px-3.5 py-2.5 text-sm transition hover:bg-brand-soft hover:text-brand ${
                isActive(l.href) ? "text-brand" : "text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

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
          <Dropdown label="Travel" items={TRAVEL} />
          <Dropdown label="Finance" items={FINANCE} />
          {AFTER.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark sm:inline-flex"
          >
            Get started
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
            {[...MAIN, ...TRAVEL, ...FINANCE, ...AFTER].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
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
