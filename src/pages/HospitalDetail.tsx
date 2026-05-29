import { useLocation } from "wouter";
import { ArrowLeft, MapPin, BedDouble, ShieldCheck, CheckCircle2, Phone, MessageCircle, ChevronRight, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHospitals, useDoctors } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

interface Props { slug: string; }

export function HospitalDetail({ slug }: Props) {
  const hospitals = useHospitals();
  const doctors = useDoctors();
  const [, navigate] = useLocation();
  const hospital = hospitals.find(h => h.slug === slug);

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Hospital not found</h1>
        <Button onClick={() => navigate("/hospitals")} variant="outline">View all hospitals</Button>
      </div>
    );
  }

  const associatedDoctors = doctors.filter(d => d.hospital.toLowerCase().includes(hospital.name.toLowerCase().split(" ")[0]));
  const otherHospitals = hospitals.filter(h => h.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${hospital.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-4 pt-28 pb-12">
          <button onClick={() => navigate("/hospitals")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to hospitals
          </button>

          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.accreditation.map(a => (
              <span key={a} className="bg-white/15 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {a}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight">{hospital.name}</h1>
          <div className="flex items-center gap-2 text-[#b8962a] text-lg mb-6">
            <MapPin className="h-5 w-5" /> {hospital.city}
          </div>
          <p className="text-white/80 text-lg max-w-3xl leading-relaxed mb-8">{hospital.description}</p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#b8962a]">{hospital.beds}</div>
              <div className="text-white/60 text-xs mt-0.5">Patient beds</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#b8962a]">{hospital.specialties.length}+</div>
              <div className="text-white/60 text-xs mt-0.5">Specialties</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#b8962a]">{hospital.established}</div>
              <div className="text-white/60 text-xs mt-0.5">Established</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#b8962a]">JCI</div>
              <div className="text-white/60 text-xs mt-0.5">Accreditation</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            {/* Specialties */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Centres of Excellence</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {hospital.specialties.map((sp, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 hover:border-[#b8962a]/40 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-[#b8962a]" />
                      </div>
                      <span className="font-semibold text-primary">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Facilities */}
            <FadeIn>
              <div className="bg-[#f8f9fb] border border-gray-100 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Facilities & Services</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {hospital.facilities.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-[#b8962a] shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Associated Doctors */}
            {associatedDoctors.length > 0 && (
              <FadeIn>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                    <h2 className="text-xl font-bold text-primary">Associated Doctors</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {associatedDoctors.map(d => (
                      <button
                        key={d.slug}
                        onClick={() => { navigate(`/doctors/${d.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="border border-gray-100 rounded-xl bg-white hover:shadow-md transition-shadow text-left flex items-center gap-4 p-3 group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-primary/5 shrink-0">
                          <img src={d.photo} alt={d.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-primary text-sm group-hover:text-[#b8962a] transition-colors line-clamp-1">{d.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{d.specialty}</div>
                          <div className="text-xs text-[#b8962a] font-semibold mt-1">{d.experience}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Other hospitals */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Other Partner Hospitals</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {otherHospitals.map(h => (
                    <button
                      key={h.slug}
                      onClick={() => { navigate(`/hospitals/${h.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow text-left group"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={h.photo} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div className="p-3">
                        <div className="font-bold text-primary text-xs leading-tight line-clamp-2 group-hover:text-[#b8962a] transition-colors">{h.name}</div>
                        <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{h.city}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-[#b8962a] rounded-2xl p-7 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-3">Get Treated at {hospital.name.split(" ").slice(0, 2).join(" ")}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Receive a free quote and treatment plan from this hospital within 24 hours.
              </p>
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-white text-[#b8962a] hover:bg-gray-50 font-bold h-12"
                  onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}
                >
                  Get Free Estimate
                </Button>
                <a href="https://wa.me/918527264675" target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg h-12 font-bold text-sm hover:bg-[#20b858] transition-colors">
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </a>
                <a href="tel:+918527264675"
                  className="flex items-center justify-center gap-2 w-full bg-white/15 text-white rounded-lg h-11 font-semibold text-sm hover:bg-white/25 transition-colors">
                  <Phone className="h-4 w-4" /> Call Us Now
                </a>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-bold text-primary mb-4">Hospital Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><Building2 className="h-4 w-4 text-[#b8962a] mt-0.5 shrink-0" /><div><div className="text-gray-500 text-xs">Location</div><div className="font-semibold text-primary">{hospital.city}</div></div></div>
                <div className="flex items-start gap-3"><Calendar className="h-4 w-4 text-[#b8962a] mt-0.5 shrink-0" /><div><div className="text-gray-500 text-xs">Established</div><div className="font-semibold text-primary">{hospital.established}</div></div></div>
                <div className="flex items-start gap-3"><BedDouble className="h-4 w-4 text-[#b8962a] mt-0.5 shrink-0" /><div><div className="text-gray-500 text-xs">Capacity</div><div className="font-semibold text-primary">{hospital.beds} beds</div></div></div>
                <div className="flex items-start gap-3"><ShieldCheck className="h-4 w-4 text-[#b8962a] mt-0.5 shrink-0" /><div><div className="text-gray-500 text-xs">Accreditation</div><div className="font-semibold text-primary">{hospital.accreditation.join(", ")}</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
