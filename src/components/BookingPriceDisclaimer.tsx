/**
 * The small print behind "booking through me costs no more than booking it
 * yourself".
 *
 * That claim is worth making, because it is the first thing anyone asks and
 * the honest answer is usually yes. But it cannot be an absolute promise: a
 * fare shown to a customer on their own device, in their own country, with
 * their own cookies and loyalty account, is not always the fare an agent is
 * shown. This says so plainly rather than leaving it to be discovered.
 *
 * Kept as a component rather than page copy so the same wording can sit on
 * Flights and Accommodation without drifting out of step.
 */
export default function BookingPriceDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 ${className}`}>
      <h3 className="text-sm font-bold text-slate-900">
        <span className="text-accent">*</span> About pricing
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We make every effort to get you a final cost as close as possible to what you would have paid booking it
        yourself, and on group bookings we can often get you below it. What we cannot do is control everything that
        moves a price.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Airlines and hotels change their fares constantly, and they do not show the same fare to everyone. What
        appears on your screen can differ from what appears on ours depending on where you are browsing from, which
        currency you are quoted in, the device you are using and the browsing history stored on it. Promotional
        rates, loyalty discounts and member-only fares are sometimes offered to you personally and cannot be applied
        to a booking made on your behalf. Taxes, fuel surcharges, resort fees and local levies are set by the
        supplier and by the destination, and they change without notice.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        So we quote you the best we can find, we tell you what is included before you pay, and if you find the same
        thing cheaper we will say so rather than talk you out of it. You are always free to book it yourself.
      </p>
    </div>
  );
}
