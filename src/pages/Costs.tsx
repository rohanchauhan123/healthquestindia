import { useMemo, useState } from "react";
import { DollarSign } from "lucide-react";
import { useCostItems } from "@/hooks/useStore";
import {
  CURRENCY_OPTIONS,
  type CurrencyCode,
  formatConvertedRange,
  formatUsdRange,
} from "@/lib/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/FadeIn";

export function Costs() {
  const costItems = useCostItems();
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const grouped = useMemo(() => {
    const map = new Map<string, typeof costItems>();
    for (const item of costItems) {
      const key = item.category.trim() || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [costItems]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">
            Transparent pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-3 flex items-center gap-3">
            <DollarSign className="h-10 w-10 text-[#b8962a] shrink-0" />
            Costs &amp; packages
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mb-6">
            Indicative package ranges you can manage from the admin panel. Amounts are stored in{" "}
            <strong className="text-white">US dollars</strong>; visitors can switch currency for an
            approximate view.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-md">
            <span className="text-sm text-white/80 shrink-0">Show prices in</span>
            <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
              <SelectTrigger className="bg-white/10 border-white/30 text-white h-11 [&>span]:text-white">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((o) => (
                  <SelectItem key={o.code} value={o.code}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <FadeIn>
          <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-950 px-4 py-3 text-sm mb-8">
            <strong>Disclaimer:</strong> Currency conversions use fixed indicative rates for planning
            only — they are not live market prices. Final invoices are always in INR at the hospital,
            converted from USD quotes where applicable.
          </div>
        </FadeIn>

        {costItems.length === 0 ? (
          <p className="text-gray-500 text-center py-16">
            No pricing rows yet. Add them in <strong>Admin → Costs &amp; pricing</strong>.
          </p>
        ) : (
          <div className="space-y-12">
            {grouped.map(([category, items]) => (
              <FadeIn key={category}>
                <h2 className="text-xl font-black text-primary border-b border-gray-100 pb-2 mb-4">
                  {category}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-gray-100 bg-[#f8f9fb] p-6 hover:border-[#b8962a]/40 transition-colors"
                    >
                      <h3 className="font-bold text-primary text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-col gap-1">
                        <div className="text-2xl font-black text-[#b8962a]">
                          {formatConvertedRange(item.priceMinUsd, item.priceMaxUsd, currency)}
                        </div>
                        {currency !== "USD" && (
                          <div className="text-xs text-gray-500">
                            Stored: {formatUsdRange(item.priceMinUsd, item.priceMaxUsd)}
                          </div>
                        )}
                      </div>
                      {item.notes ? (
                        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                          {item.notes}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
