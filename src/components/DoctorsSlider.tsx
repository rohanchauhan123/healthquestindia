import { useRef } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, GraduationCap, Award, Building2, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDoctors } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

export function DoctorsSlider() {
  const doctors = useDoctors();
  const [, navigate] = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="doctors" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div className="max-w-2xl">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Our Specialists</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">Leading Doctors You Can Trust</h2>
              <p className="text-gray-500 text-lg">Internationally trained specialists with decades of experience treating patients from across the world.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => scrollBy(-1)} aria-label="Previous"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => scrollBy(1)} aria-label="Next"
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
              <Button onClick={() => navigate("/doctors")} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
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
          {doctors.map(doc => (
            <div
              key={doc.slug}
              className="snap-start shrink-0 w-[340px] border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
              onClick={() => { navigate(`/doctors/${doc.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
                  <div className="flex items-center gap-2 text-xs text-[#b8962a] font-bold">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{doc.patientsFromAbroad} international patients</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
