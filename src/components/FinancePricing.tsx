import type { Package, AddOn } from "@/lib/siteData";
import { CheckList } from "@/components/ui";
import CtaButtons from "@/components/CtaButtons";

// LLC + BIR registration is only offered in Trinidad and Tobago. Since this
// section only ever renders on the Trinidad island page (see the isTrinidad
// gate in finance/[island]/page.tsx), the Trinidad-specific line is always
// the right one.
const REGISTRATION_FEATURE =
  "Limited Liability Company registration (Articles of Incorporation, BIR registration, NIS employer number)";

export default function FinancePricing({ packages, addOns }: { packages: Package[]; addOns: AddOn[] }) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((p) => {
          const features = p.name === "Professional" ? [p.features[0], REGISTRATION_FEATURE, ...p.features.slice(1)] : p.features;
          return (
            <div
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-xl ${
                p.featured ? "border-brand shadow-md" : "border-slate-200"
              }`}
            >
              <div className={`relative p-7 ${p.featured ? "bg-brand text-white" : "bg-brand-soft"}`}>
                {p.featured ? (
                  <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ring-white/30">
                    Most popular
                  </span>
                ) : null}
                <h3 className={`text-lg font-semibold ${p.featured ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <CheckList items={features} className="text-sm" />
                <div className="mt-auto pt-6">
                  <CtaButtons message={`Hi Jo, I'd like to book a $10 consultation about the ${p.name} business package.`} showContact={false} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 sm:p-8">
        <h3 className="text-lg font-semibold text-slate-900">Also available</h3>
        <ul className="mt-4 grid gap-2.5 text-sm text-slate-600">
          {addOns.map((a) => (
            <li key={a.title} className="border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
              {a.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
