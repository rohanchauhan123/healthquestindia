import { useState } from "react";
import { useLocation } from "wouter";
import { GraduationCap, Award, Building2, Users, Search, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDoctors } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

export function Doctors() {
  const doctors = useDoctors();
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const specialties = Array.from(new Set(doctors.map(d => d.specialty.split("&")[0].trim())));

  const filtered = doctors.filter(d => {
    const matchesQuery = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase()) || d.hospital.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || d.specialty.startsWith(filter);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&fit=crop)",
            backgroundSize: "cover", backgroundPosition: "center"
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">Meet Our Specialists</span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-3">India's Top Medical Doctors</h1>
          <p className="text-white/75 text-lg max-w-2xl mb-8">
            Internationally trained specialists from JCI-accredited hospitals — bringing decades of experience to every patient from Africa.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">{doctors.length}+</div>
              <div className="text-white/60 text-xs mt-0.5">Specialist doctors</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">25 yrs</div>
              <div className="text-white/60 text-xs mt-0.5">Avg experience</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-bold text-[#b8962a]">3,000+</div>
              <div className="text-white/60 text-xs mt-0.5">International patients</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, specialty or hospital..."
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
              All
            </button>
            {specialties.map(sp => (
              <button
                key={sp}
                onClick={() => setFilter(sp)}
                className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === sp ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-700 hover:border-primary"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No doctors matched your search.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, i) => (
              <FadeIn key={doc.slug} delay={i * 50}>
                <div
                  onClick={() => { navigate(`/doctors/${doc.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-56 bg-primary/5 overflow-hidden">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#b8962a] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {doc.specialty.split("&")[0].trim()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-primary text-lg leading-tight group-hover:text-[#b8962a] transition-colors">{doc.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{doc.specialty}</p>
                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{doc.qualifications.split("|")[0].trim()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{doc.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{doc.hospital}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Languages className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{doc.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#b8962a] font-bold">
                        <Users className="h-3.5 w-3.5 shrink-0" />
                        <span>{doc.patientsFromAbroad} international patients</span>
                      </div>
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
