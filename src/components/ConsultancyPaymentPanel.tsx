import FygaroPaymentButton from "@/components/FygaroPaymentButton";

// Shown in place of a form after it's submitted: the answers are already
// saved (see pendingConsultation.ts), and this is the only thing left to do.
// Nothing is sent to Jo until the visitor lands back on /consultation-paid
// after paying — that page is what actually fires captureLead()/mailto.
export default function ConsultancyPaymentPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Pay to send your request</h2>
      <p className="mt-2 text-sm text-slate-600">
        Your answers are saved. Pay the $10 consultation fee below and your request goes to Jo the moment payment
        goes through.
      </p>

      <div className="mt-6 rounded-2xl border border-brand/25 bg-brand-soft p-6 text-center">
        <p className="font-semibold text-slate-900">$10 Move Planning Consultation</p>
        <div className="mt-4">
          <FygaroPaymentButton />
        </div>
      </div>

      <button type="button" onClick={onBack} className="mt-5 text-sm font-semibold text-brand hover:underline">
        ← Back to the form
      </button>
    </div>
  );
}
