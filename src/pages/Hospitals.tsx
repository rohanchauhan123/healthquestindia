import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, BedDouble, Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useHospitals } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

export function Hospitals() {
  const hospitals = useHospitals();
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const cities = Array.from(new Set(
    hospitals.flatMap(h => h.city.split(/[·,]/).map(c => c.trim()))
  )).filter(Boolean);

  const filtered = hospitals.filter(h => {
    const matchesQuery = !query || h.name.toLowerCase().includes(query.toLowerCase()) || h.city.toLowerCase().includes(query.toLowerCase()) || h.specialties.some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = filter === "all" || h.city.includes(filter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=80&fit=crop)",
            backgroundSize: "cover", backgroundPosition: "center"
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">Our Partner Hospitals</span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-3">Partner Hospitals in Delhi NCR</h1>
          <p className="text-white/75 text-lg max-w-2xl mb-8">
            We currently operate in Delhi NCR and work with trusted accredited hospitals in New Delhi and Gurugram.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">{hospitals.length}+</div>
              <div className="text-white/60 text-xs mt-0.5">Partner hospitals</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">{hospitals.reduce((sum, h) => sum + h.beds, 0).toLocaleString()}</div>
              <div className="text-white/60 text-xs mt-0.5">Total beds</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">JCI</div>
              <div className="text-white/60 text-xs mt-0.5">Internationally accredited</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by hospital, city or specialty..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                filter === "all" ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-700 hover:border-primary"
              }`}
            >
              All cities
            </button>
            {cities.slice(0, 6).map(city => (
              <button
                key={city}
                onClick={() => setFilter(city)}
                className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === city ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-700 hover:border-primary"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No hospitals matched your search.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hosp, i) => (
              <FadeIn key={hosp.slug} delay={i * 50}>
                <div
                  onClick={() => { navigate(`/hospitals/${hosp.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={hosp.photo}
                      alt={hosp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {hosp.accreditation.slice(0, 2).map(a => (
                          <span key={a} className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                      <span className="bg-[#b8962a] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <BedDouble className="h-3 w-3" /> {hosp.beds}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-primary text-lg group-hover:text-[#b8962a] transition-colors line-clamp-1">{hosp.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 text-[#b8962a] shrink-0" />
                      <span className="line-clamp-1">{hosp.city}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-2">{hosp.description}</p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <ShieldCheck className="h-4 w-4 text-[#b8962a] shrink-0" />
                      <span className="text-xs text-gray-500">Established {hosp.established}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
