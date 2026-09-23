"use client";

import Script from "next/script";

// Fygaro’s payment-button widget replaces its own <script> tag with a
// rendered button once it loads, so this only needs to sit where the button
// should appear. Loaded lazily since it’s only ever shown after someone
// actually reaches the payment step, not on every page view.
export default function FygaroPaymentButton() {
  return (
    <div className="flex justify-center">
      <Script
        src="https://api.fygaro.com/api/v1/payments/payment-button/e4f3abeb-0548-4b2f-8039-b3dea868ee0b/render/"
        strategy="afterInteractive"
      />
    </div>
  );
}
