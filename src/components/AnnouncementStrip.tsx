import Link from "next/link";
import { currentIndependence, formatDayMonth } from "@/lib/independenceData";

/**
 * The slim strip above the header.
 *
 * Deliberately generic. Right now the only thing that fills it is a CARICOM
 * independence day, which switches itself on ten days beforehand and off at
 * midnight after, so nothing has to be remembered or taken down. Trinidad and
 * Tobago's clears itself at the end of 31 August.
 *
 * To run something else here later (a closure, a deadline, an offer), return a
 * message from `announcement()` below. Return null and the strip disappears
 * along with the space it occupies.
 */
type Announcement = { text: string; href: string; label: string };

function announcement(): Announcement | null {
  const current = currentIndependence();
  if (current) {
    const { day } = current;
    return {
      text: `Celebrating ${day.name}'s Independence · ${formatDayMonth(day)}`,
      href: `/destinations/${day.slug}`,
      label: "Read the country guide",
    };
  }

  // Nothing running. Add a manual announcement here when one is needed:
  //   return { text: "...", href: "/...", label: "..." };
  return null;
}

export default function AnnouncementStrip() {
  const item = announcement();
  if (!item) return null;

  return (
    <div className="bg-[#ce1126] text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center">
        <p className="text-[0.8rem] font-medium leading-snug sm:text-sm">
          {item.text}
          <Link
            href={item.href}
            className="ml-2 hidden font-semibold underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#ce1126] sm:inline"
          >
            {item.label}
          </Link>
        </p>
      </div>
    </div>
  );
}
