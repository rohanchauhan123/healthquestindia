import { useRef } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, MapPin, BedDouble, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHospitals } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

export function HospitalsSlider() {
  const hospitals = useHospitals();
  const [, navigate] = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section id="hospitals" className="py-20 bg-[#f8f9fb] border-t border-gray-100">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div className="max-w-2xl">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Our Partners</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">Top Hospital Partners Across India</h2>
              <p className="text-gray-500 text-lg">Exclusively JCI and NABH accredited hospitals — the same standard as the world's best.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => scrollBy(-1)} aria-label="Previous"
                className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => scrollBy(1)} aria-label="Next"
                className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
              <Button onClick={() => navigate("/hospitals")} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold bg-white">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </FadeIn>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {hospitals.map(hosp => (
            <div
              key={hosp.slug}
              onClick={() => { navigate(`/hospitals/${hosp.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="snap-start shrink-0 w-[400px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
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
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
                  {hosp.specialties.slice(0, 4).map(s => (
                    <span key={s} className="text-[10px] text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
