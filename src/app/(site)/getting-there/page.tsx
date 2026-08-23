import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Getting There",
  description:
    "Flights, accommodations, transfers and travel visas, arranged whenever your CARICOM move calls for them.",
  keywords: ["flights to the Caribbean", "Caribbean travel visas", "airport transfers Trinidad", "Caribbean accommodations"],
  alternates: { canonical: "/getting-there" },
};

const ITEMS = [
  {
    href: "/flights",
    icon: "plane" as const,
    title: "Flights",
    text: "Affordable one-way or round-trip options for your move or a scouting trip beforehand.",
  },
  {
    href: "/accommodations",
    icon: "home" as const,
    title: "Accommodations",
    text: "Comfortable, safe places to stay while you get settled.",
  },
  {
    href: "/transfers",
    icon: "car" as const,
    title: "Transfers",
    text: "Reliable rides for airports and getting around a new city.",
  },
  {
    href: "/travel-visas",
    icon: "passport" as const,
    title: "Travel Visas",
    text: "Step-by-step support for CARICOM citizens applying from Trinidad.",
  },
];

export default function GettingTherePage() {
  return (
    <>
      <PageHeader
        icon={<Icon name="plane" className="h-12 w-12 text-brand" />}
        title="Getting There"
        crumb="Getting There"
        intro="When your move calls for travel, we can arrange it, in one place."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
