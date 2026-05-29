export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "NGN" | "KES" | "GHS";

/** Indicative units of `code` per 1 USD — for visitor estimates only (not live FX). */
export const USD_TO_FOREIGN: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  NGN: 1550,
  KES: 129,
  GHS: 12.4,
};

export const CURRENCY_OPTIONS: { code: CurrencyCode; label: string }[] = [
  { code: "USD", label: "US Dollar (USD)" },
  { code: "EUR", label: "Euro (EUR)" },
  { code: "GBP", label: "British Pound (GBP)" },
  { code: "INR", label: "Indian Rupee (INR)" },
  { code: "NGN", label: "Nigerian Naira (NGN)" },
  { code: "KES", label: "Kenyan Shilling (KES)" },
  { code: "GHS", label: "Ghanaian Cedi (GHS)" },
];

export function convertFromUsd(amountUsd: number, code: CurrencyCode): number {
  return amountUsd * USD_TO_FOREIGN[code];
}

export function formatMoney(amount: number, code: CurrencyCode): string {
  const rounded =
    code === "NGN" || code === "KES" || code === "INR"
      ? Math.round(amount)
      : Math.round(amount * 100) / 100;

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: code,
    maximumFractionDigits: code === "NGN" || code === "KES" || code === "INR" ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(rounded);
}

export function formatUsdRange(minUsd: number, maxUsd: number): string {
  const a = formatMoney(minUsd, "USD");
  const b = formatMoney(maxUsd, "USD");
  return minUsd === maxUsd ? a : `${a} – ${b}`;
}

export function formatConvertedRange(
  minUsd: number,
  maxUsd: number,
  code: CurrencyCode,
): string {
  if (code === "USD") return formatUsdRange(minUsd, maxUsd);
  const lo = convertFromUsd(minUsd, code);
  const hi = convertFromUsd(maxUsd, code);
  const a = formatMoney(lo, code);
  const b = formatMoney(hi, code);
  return lo === hi ? a : `${a} – ${b}`;
}
