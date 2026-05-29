import { useState } from "react";
import { Building2, MapPin, ChevronRight, X, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { indiaCities } from "@/data/services";

const cityPhotos: Record<string, string> = {
  "New Delhi":   "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80&fit=crop",
  "Chandigarh":  "https://images.unsplash.com/photo-1617483784492-1abb3e4a5a73?w=600&q=80&fit=crop",
  "Ahmedabad":   "https://images.unsplash.com/photo-1588415742213-3baa66f75e7a?w=600&q=80&fit=crop",
  "Mumbai":      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80&fit=crop",
  "Pune":        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80&fit=crop",
  "Kolkata":     "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&q=80&fit=crop",
  "Hyderabad":   "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80&fit=crop",
  "Bangalore":   "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80&fit=crop",
  "Chennai":     "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80&fit=crop",
  "Kochi":       "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80&fit=crop",
};

const fallbackPhoto = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&fit=crop";

export function IndiaPresence() {
  const [active, setActive] = useState<string | null>(null);
  const activeCity = indiaCities.find(c => c.name === active);

  return (
    <section className="py-20 bg-[#f8f9fb]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Pan-India Network</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
              Our Hospital Network Across India
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              40+ JCI and NABH accredited partner hospitals in 10 major medical hubs — so you get world-class treatment in the right city for your condition.
            </p>
          </div>
        </FadeIn>

        {/* Stats bar */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "10", label: "Major Cities" },
              { value: "40+", label: "Partner Hospitals" },
              { value: "200+", label: "Specialists" },
              { value: "JCI", label: "International Accreditation" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-3xl font-black text-primary">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* City photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {indiaCities.map((city, i) => {
            const isActive = active === city.name;
            const photo = cityPhotos[city.name] || fallbackPhoto;
            return (
              <FadeIn key={city.name} delay={i * 40}>
                <button
                  onClick={() => setActive(isActive ? null : city.name)}
                  className={`relative w-full rounded-2xl overflow-hidden group transition-all duration-300 ${isActive ? "ring-2 ring-[#b8962a] shadow-xl" : "hover:shadow-lg"}`}
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Photo */}
                  <img
                    src={photo}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackPhoto; }}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? "bg-[#b8962a]/80" : "bg-primary/70 group-hover:bg-primary/60"}`} />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 text-left">
                    <div className="font-bold text-white text-sm leading-tight">{city.name}</div>
                    <div className="text-white/70 text-xs mt-0.5">{city.region}</div>
                    <div className="mt-2 flex items-center gap-1 text-white/80 text-xs">
                      <Building2 className="h-3 w-3 shrink-0" />
                      {city.hospitals.length} hospitals
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <X className="h-3 w-3 text-[#b8962a]" />
                      </div>
                    </div>
                  )}
                </button>
              </FadeIn>
            );
          })}
        </div>

        {/* Expanded city detail */}
        <div
          className={`transition-all duration-400 overflow-hidden ${activeCity ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {activeCity && (
            <div className="bg-white border border-[#b8962a]/30 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: City info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#b8962a] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-xl">{activeCity.name}</h3>
                      <span className="text-sm text-gray-500">{activeCity.region}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Top Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {activeCity.topSpecialties.map(s => (
                        <span key={s} className="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Hospital list */}
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Partner Hospitals</p>
                  <ul className="space-y-3">
                    {activeCity.hospitals.map(h => (
                      <li key={h} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 shrink-0">
                  <a
                    href="https://wa.me/918527264675"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-[#20b858] transition-colors"
                  >
                    Ask about {activeCity.name}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setActive(null)}
                    className="text-sm text-gray-400 hover:text-gray-600 underline text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Not sure which city is right for your treatment? We'll guide you to the best hospital for your specific condition.
            </p>
            <a
              href="https://wa.me/918527264675"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Get Hospital Recommendation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
