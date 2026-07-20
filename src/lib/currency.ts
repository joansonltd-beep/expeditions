// Currency conversion for the country-priced Finance packages and add-ons.
// XCD is fixed at a hard peg of 2.70 to the US dollar. TTD floats but is
// commonly quoted by banks around 6.75; adjust USD_RATES here if it moves.

export type SetupCountry = "tt" | "gd";

export const COUNTRY_LABELS: Record<SetupCountry, string> = {
  tt: "Trinidad and Tobago",
  gd: "Grenada",
};

export const CURRENCY_CODES: Record<SetupCountry, string> = {
  tt: "TTD",
  gd: "XCD",
};

const USD_RATES: Record<SetupCountry, number> = {
  tt: 6.75,
  gd: 2.7,
};

// Converts a USD amount into the local currency, always rounding up to the
// nearest 100.
export function convertUsd(usd: number, country: SetupCountry): number {
  return Math.ceil((usd * USD_RATES[country]) / 100) * 100;
}

export function formatLocal(amount: number, country: SetupCountry): string {
  return `${CURRENCY_CODES[country]}$${amount.toLocaleString()}`;
}

// Converts and formats a USD figure in one step (packages, Website, Business Stamp).
export function formatUsdConverted(usd: number, country: SetupCountry): string {
  return formatLocal(convertUsd(usd, country), country);
}

// For figures that already work fine as-is in either currency: just label
// them with the local currency code, without changing the number.
export function currencyTag(country: SetupCountry): string {
  return CURRENCY_CODES[country];
}
