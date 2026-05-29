import { useLocation } from "wouter";
import { ArrowLeft, GraduationCap, Award, Building2, Users, Languages, CheckCircle2, Phone, MessageCircle, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDoctors } from "@/hooks/useStore";
import { FadeIn } from "@/components/FadeIn";

interface Props { slug: string; }

export function DoctorDetail({ slug }: Props) {
  const doctors = useDoctors();
  const [, navigate] = useLocation();
  const doctor = doctors.find(d => d.slug === slug);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Doctor not found</h1>
        <Button onClick={() => navigate("/doctors")} variant="outline">View all doctors</Button>
      </div>
    );
  }

  const otherDoctors = doctors.filter(d => d.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <section className="bg-primary text-white pt-12 pb-10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <button onClick={() => navigate("/doctors")} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to doctors
          </button>
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/10 border-2 border-[#b8962a]/30">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">{doctor.specialty}</span>
              <h1 className="text-4xl md:text-5xl font-black mt-4 mb-3 leading-tight">{doctor.name}</h1>
              <p className="text-white/75 text-lg leading-relaxed mb-6">{doctor.bio}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: doctor.experience.split(" ")[0], l: "Years experience" },
                  { v: doctor.patientsFromAbroad, l: "Intl. patients" },
                  { v: doctor.expertise.length, l: "Specializations" },
                  { v: doctor.languages.length, l: "Languages" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center">
                    <div className="text-xl font-bold text-[#b8962a]">{s.v}</div>
                    <div className="text-white/60 text-[11px] mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-10">
            <FadeIn>
              <div className="bg-[#f8f9fb] border border-gray-100 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Qualifications & Training</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{doctor.experience} of clinical experience</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">Currently practicing at {doctor.hospital}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{doctor.patientsFromAbroad} international patients treated</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Languages className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">Speaks: {doctor.languages.join(", ")}</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Areas of Expertise</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {doctor.expertise.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-[#b8962a]/40 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-[#b8962a] mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-primary rounded-2xl p-7 text-white">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 text-[#b8962a] fill-[#b8962a]" />)}
                </div>
                <p className="italic text-lg mb-5 leading-relaxed text-white/90">
                  "{doctor.name} treated my father with such expertise and kindness. The whole experience exceeded our expectations. We are forever grateful."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#b8962a] flex items-center justify-center font-bold">A</div>
                  <div>
                    <div className="font-bold">Adaeze N.</div>
                    <div className="text-sm text-white/60">Lagos, Nigeria</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Other doctors */}
            {otherDoctors.length > 0 && (
              <FadeIn>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                    <h2 className="text-xl font-bold text-primary">Other Specialists</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {otherDoctors.map(d => (
                      <button
                        key={d.slug}
                        onClick={() => { navigate(`/doctors/${d.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow text-left group"
                      >
                        <div className="aspect-square bg-primary/5 overflow-hidden">
                          <img src={d.photo} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div className="p-3">
                          <div className="font-bold text-primary text-xs leading-tight line-clamp-2 group-hover:text-[#b8962a] transition-colors">{d.name}</div>
                          <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{d.specialty}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-[#b8962a] rounded-2xl p-7 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-3">Consult {doctor.name.split(" ")[1]}</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Get a free second opinion and personalized treatment plan from {doctor.name} within 24 hours.
              </p>
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-white text-[#b8962a] hover:bg-gray-50 font-bold h-12"
                  onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}
                >
                  Request Consultation
                </Button>
                <a href="https://wa.me/918527264675" target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg h-12 font-bold text-sm hover:bg-[#20b858] transition-colors">
                  <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                </a>
                <a href="tel:+918527264675"
                  className="flex items-center justify-center gap-2 w-full bg-white/15 text-white rounded-lg h-11 font-semibold text-sm hover:bg-white/25 transition-colors">
                  <Phone className="h-4 w-4" /> Call Us Now
                </a>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-bold text-primary mb-4">At a Glance</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Specialty</span><span className="font-semibold text-primary text-right">{doctor.specialty}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Experience</span><span className="font-semibold text-primary">{doctor.experience}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Hospital</span><span className="font-semibold text-primary text-right">{doctor.hospital}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Intl. patients</span><span className="font-semibold text-[#b8962a]">{doctor.patientsFromAbroad}</span></div>
              </div>
            </div>

            <button
              onClick={() => { navigate("/doctors"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full border border-gray-200 rounded-2xl p-4 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-between font-medium"
            >
              <span>All specialist doctors</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
