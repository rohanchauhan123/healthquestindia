import { useLocation } from "wouter";
import {
  ArrowLeft, CheckCircle2, Clock, DollarSign, Phone, MessageCircle,
  ChevronRight, HeartPulse, Bone, Activity, Brain, Baby, Droplet, Sparkles,
  ShieldCheck, Building2, Star, FileText, Stethoscope, Home, TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useServices } from "@/hooks/useStore";

const serviceHeroPhotos: Record<string, string> = {
  "cardiology":        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&q=80&fit=crop",
  "orthopedics":       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80&fit=crop",
  "oncology":          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&fit=crop",
  "neurology":         "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80&fit=crop",
  "ivf-fertility":     "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=80&fit=crop",
  "kidney-transplant": "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=1600&q=80&fit=crop",
  "cosmetic-surgery":  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&fit=crop",
};

const serviceIcons: Record<string, React.ReactNode> = {
  "cardiology":        <HeartPulse className="h-8 w-8 text-white" />,
  "orthopedics":       <Bone className="h-8 w-8 text-white" />,
  "oncology":          <Activity className="h-8 w-8 text-white" />,
  "neurology":         <Brain className="h-8 w-8 text-white" />,
  "ivf-fertility":     <Baby className="h-8 w-8 text-white" />,
  "kidney-transplant": <Droplet className="h-8 w-8 text-white" />,
  "cosmetic-surgery":  <Sparkles className="h-8 w-8 text-white" />,
};

const journeySteps: Record<string, { pre: string[]; during: string[]; post: string[] }> = {
  "cardiology": {
    pre: ["Medical records review & cardiologist consultation", "ECG, echocardiogram & angiography as needed", "Blood tests, chest X-ray & pre-anaesthesia workup", "Medication adjustments & diet preparation"],
    during: ["Admission to cardiac centre's international patient unit", "Procedure under specialist anaesthetic team", "Cardiac monitoring in dedicated cardiac ICU / HDU", "Daily visits from senior consultant cardiologist"],
    post: ["Physiotherapy & cardiac rehabilitation begins", "Dietary counselling & lifestyle guidance", "Discharge with detailed care plan & medications", "Telemedicine follow-up after returning home"]
  },
  "orthopedics": {
    pre: ["X-rays, MRI scans & blood tests reviewed", "Orthopaedic surgeon consultation & implant selection", "Physiotherapy assessment & pre-habilitation exercises", "Anaesthesia assessment & fitness for surgery"],
    during: ["Admission to orthopaedic ward", "Surgery under regional or general anaesthesia", "Post-op pain management in recovery unit", "Early mobilisation within 24 hours of surgery"],
    post: ["Intensive inpatient physiotherapy program", "Gait training & range-of-motion exercises", "Discharge with home exercise program", "Tele-physio follow-up after returning home"]
  },
  "oncology": {
    pre: ["Biopsy reports & imaging reviewed by tumor board", "Multidisciplinary team meeting & treatment planning", "Genetic & molecular profiling of tumor if needed", "Baseline blood tests & organ function assessment"],
    during: ["Treatment administered at dedicated oncology centre", "Real-time imaging guidance during procedures", "Daily monitoring by oncology nursing team", "Supportive care including anti-nausea & pain management"],
    post: ["Response assessment scans & tumor markers", "Nutrition & recovery support program", "Detailed treatment summary for your home oncologist", "Follow-up telemedicine consultations available"]
  },
  "neurology": {
    pre: ["MRI / CT brain scans & neurophysiology tests reviewed", "Neurosurgeon or neurologist consultation", "Detailed pre-operative neurological assessment", "Anaesthesia workup & seizure precautions if relevant"],
    during: ["Admission to specialist neurology or neurosurgery unit", "Procedure with intraoperative neuromonitoring", "Post-procedure monitoring in neurological ICU / HDU", "Daily neurology ward rounds by consultant"],
    post: ["Neurological rehabilitation commences", "Speech, physiotherapy & occupational therapy as needed", "Detailed discharge summary & medication plan", "Tele-neurology follow-up after you return home"]
  },
  "ivf-fertility": {
    pre: ["Detailed fertility investigation of both partners", "AMH, AFC scan, semen analysis & blood tests", "Treatment protocol designed by reproductive endocrinologist", "Medication teaching & monitoring schedule given"],
    during: ["Regular monitoring scans & blood hormone tests", "Egg retrieval under sedation on trigger day", "Embryo culture in state-of-the-art embryology lab", "Fresh or frozen embryo transfer procedure"],
    post: ["Progesterone support & beta-hCG pregnancy test at 14 days", "Early pregnancy scan if test is positive", "Detailed medical summary for your gynaecologist at home", "Ongoing remote support from fertility coordinator"]
  },
  "kidney-transplant": {
    pre: ["Tissue typing, crossmatch & immunological workup", "Cardiac, pulmonary & infectious disease evaluation", "Dialysis optimisation before surgery", "Legal & ethical clearance documentation"],
    during: ["Surgery for donor nephrectomy & recipient transplant", "24-hour post-operative monitoring in transplant ICU", "Immunosuppression started immediately post-transplant", "Daily graft function monitoring (creatinine, urine output)"],
    post: ["Close outpatient monitoring for first 2–3 weeks", "Immunosuppression adjustment by transplant nephrologist", "Discharge with full medication guide & diet plan", "Telemedicine follow-up with transplant team after returning home"]
  },
  "cosmetic-surgery": {
    pre: ["Pre-operative consultation & photo analysis", "Medical fitness evaluation & blood tests", "Anaesthesia assessment & consent process", "Pre-op skin preparation & medication instructions"],
    during: ["Procedure under expert anaesthetic team", "Surgery performed in JCI-accredited operating theatre", "Recovery in dedicated post-anaesthesia care unit", "Pain management & anti-nausea medication administered"],
    post: ["Wound care & compression garment instructions", "Post-op photos at day 3, 7 & 14 checks", "Scar management therapy as required", "Tele-consultation for follow-up after returning home"]
  }
};

const costBars: Record<string, { india: number; uk: number; usa: number; indiaLabel: string; ukLabel: string; usaLabel: string; saving: number }> = {
  "cardiology":        { india: 9,  uk: 58, usa: 100, indiaLabel: "$5,500–$12,000",  ukLabel: "£50,000–£90,000",  usaLabel: "$80,000–$150,000",  saving: 91 },
  "orthopedics":       { india: 12, uk: 57, usa: 100, indiaLabel: "$4,000–$7,000",   ukLabel: "£20,000–£40,000",  usaLabel: "$35,000–$60,000",   saving: 88 },
  "oncology":          { india: 8,  uk: 40, usa: 100, indiaLabel: "$4,000–$15,000",  ukLabel: "£30,000–£80,000",  usaLabel: "$50,000–$200,000",  saving: 92 },
  "neurology":         { india: 10, uk: 55, usa: 100, indiaLabel: "$5,000–$22,000",  ukLabel: "£40,000–£100,000", usaLabel: "$60,000–$150,000",  saving: 90 },
  "ivf-fertility":     { india: 15, uk: 55, usa: 100, indiaLabel: "$1,200–$6,500",   ukLabel: "£8,000–£18,000",   usaLabel: "$12,000–$25,000",   saving: 85 },
  "kidney-transplant": { india: 11, uk: 55, usa: 100, indiaLabel: "$13,000–$20,000", ukLabel: "£60,000–£100,000", usaLabel: "$100,000–$200,000", saving: 89 },
  "cosmetic-surgery":  { india: 17, uk: 55, usa: 100, indiaLabel: "$1,500–$8,000",   ukLabel: "£6,000–£18,000",   usaLabel: "$8,000–$25,000",    saving: 83 },
};

interface SubServiceDetailProps {
  serviceSlug: string;
  subSlug: string;
}

export function SubServiceDetail({ serviceSlug, subSlug }: SubServiceDetailProps) {
  const [, navigate] = useLocation();
  const services = useServices();
  const _service = services.find(s => s.slug === serviceSlug);
  const _sub = _service?.subServices.find(s => s.slug === subSlug);
  const result = _service && _sub ? { service: _service, sub: _sub } : undefined;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Procedure not found</h1>
        <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
      </div>
    );
  }

  const { service, sub } = result;
  const journey = journeySteps[service.slug] || journeySteps["cardiology"];
  const costs = costBars[service.slug] || costBars["cardiology"];
  const heroPhoto = serviceHeroPhotos[service.slug];
  const otherSubs = service.subServices.filter(s => s.slug !== subSlug).slice(0, 5);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO with photo background ─── */}
      <section className="relative min-h-[68vh] flex items-end overflow-hidden">
        {heroPhoto && (
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${heroPhoto})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-4 pb-10 pt-28">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-white/40 text-xs mb-6">
            <button onClick={() => navigate("/")} className="hover:text-white transition-colors">Home</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => navigate(`/services/${service.slug}`)} className="hover:text-white transition-colors">{service.name}</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">{sub.name}</span>
          </div>

          <button
            onClick={() => navigate(`/services/${service.slug}`)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {service.name}
          </button>

          <div className="flex items-start gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              {serviceIcons[service.slug]}
            </div>
            <div>
              <span className="inline-block text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">{service.name}</span>
              <h1 className="text-3xl md:text-5xl font-black text-white mt-3 mb-2 leading-tight">{sub.name}</h1>
              <p className="text-white/70 text-base max-w-2xl leading-relaxed">{sub.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm text-center">
              <div className="text-xl font-bold text-[#b8962a]">{sub.costRange}</div>
              <div className="text-white/60 text-xs mt-0.5">Estimated cost in India</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm text-center">
              <div className="text-xl font-bold text-[#b8962a]">{sub.duration.split(",")[0]}</div>
              <div className="text-white/60 text-xs mt-0.5">Hospital stay</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm text-center">
              <div className="text-xl font-bold text-[#b8962a]">JCI</div>
              <div className="text-white/60 text-xs mt-0.5">Accredited hospitals</div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm text-center">
              <div className="text-xl font-bold text-[#b8962a]">Free</div>
              <div className="text-white/60 text-xs mt-0.5">Medical estimate</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── MAIN ─── */}
          <div className="lg:col-span-2 space-y-14">

            {/* About */}
            <FadeIn>
              <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">What is {sub.name}?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{sub.description}</p>
                <p className="text-gray-600 leading-relaxed">
                  At HealthQuest India's partner hospitals, this procedure is performed by internationally trained specialists using cutting-edge technology. All facilities are JCI and NABH accredited. As an international patient, you receive a dedicated coordinator, language support, and end-to-end assistance from your first enquiry until you are safely home.
                </p>
              </div>
            </FadeIn>

            {/* Duration & Cost quick cards */}
            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Treatment Duration</p>
                    <p className="font-semibold text-primary">{sub.duration}</p>
                  </div>
                </div>
                <div className="border border-[#b8962a]/30 rounded-2xl p-6 bg-[#b8962a]/5 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#b8962a]/20 flex items-center justify-center shrink-0">
                    <DollarSign className="h-5 w-5 text-[#b8962a]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cost in India</p>
                    <p className="text-2xl font-black text-[#b8962a]">{sub.costRange}</p>
                    <p className="text-xs text-gray-500 mt-0.5">All-inclusive. Exact quote is free.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Visual Cost Comparison Bars */}
            <FadeIn>
              <div className="bg-[#f8f9fb] rounded-3xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Cost Comparison</h2>
                </div>
                <p className="text-gray-500 text-sm mb-8 ml-4">What does {sub.name} typically cost around the world?</p>

                <div className="space-y-6">
                  {[
                    { flag: "🇺🇸", country: "United States", label: costs.usaLabel, pct: costs.usa, color: "#ef4444" },
                    { flag: "🇬🇧", country: "United Kingdom", label: costs.ukLabel,  pct: costs.uk,  color: "#f97316" },
                    { flag: "🇮🇳", country: "India (HealthQuest)", label: costs.indiaLabel, pct: costs.india, color: "#b8962a" },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{row.flag}</span>
                          <span className={`text-sm font-semibold ${i === 2 ? "text-[#b8962a]" : "text-gray-700"}`}>{row.country}</span>
                          {i === 2 && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">BEST VALUE</span>}
                        </div>
                        <span className={`text-sm font-bold ${i === 2 ? "text-[#b8962a]" : "text-gray-600"}`}>{row.label}</span>
                      </div>
                      <div className="h-9 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center justify-end pr-3"
                          style={{ width: `${Math.max(row.pct, 5)}%`, backgroundColor: row.color }}
                        >
                          {row.pct >= 20 && <span className="text-white text-xs font-bold">{row.pct}%</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-white rounded-2xl border border-[#b8962a]/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#b8962a] flex items-center justify-center shrink-0">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">You save up to {costs.saving}% compared to USA prices</p>
                    <p className="text-sm text-gray-500">Same world-class procedure. Same quality. A fraction of the cost.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Treatment Journey — Visual stepper */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Your Treatment Journey</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      num: "01", icon: <FileText className="h-7 w-7" />, title: "Before You Arrive",
                      bg: "bg-[#b8962a]", lightBg: "bg-[#b8962a]/8 border-[#b8962a]/20",
                      items: journey.pre
                    },
                    {
                      num: "02", icon: <Stethoscope className="h-7 w-7" />, title: "During Treatment",
                      bg: "bg-primary", lightBg: "bg-primary/5 border-primary/15",
                      items: journey.during
                    },
                    {
                      num: "03", icon: <Home className="h-7 w-7" />, title: "Recovery & Home",
                      bg: "bg-green-600", lightBg: "bg-green-50 border-green-200",
                      items: journey.post
                    },
                  ].map((phase, i) => (
                    <div key={i} className={`border rounded-2xl overflow-hidden ${phase.lightBg}`}>
                      <div className={`${phase.bg} text-white p-5`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-4xl font-black opacity-30">{phase.num}</span>
                          {phase.icon}
                        </div>
                        <h3 className="font-bold text-lg">{phase.title}</h3>
                      </div>
                      <ul className="p-5 space-y-3">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-[#b8962a] shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Why India */}
            <FadeIn>
              <div className="bg-primary rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Why India for {sub.name}?</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.whyIndia.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/8 border border-white/15 rounded-xl p-4">
                      <CheckCircle2 className="h-5 w-5 text-[#b8962a] shrink-0 mt-0.5" />
                      <span className="text-white/85 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Conditions */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                  <h2 className="text-xl font-bold text-primary">Conditions Treated under {service.name}</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {service.conditions.map(c => (
                    <span key={c} className="flex items-center gap-2 border border-gray-200 text-gray-600 bg-white text-sm px-4 py-2 rounded-full hover:border-[#b8962a] hover:text-[#b8962a] transition-colors">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#b8962a]" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Testimonial */}
            <FadeIn>
              <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#b8962a] rounded-l-2xl" />
                <div className="pl-4">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 text-[#b8962a] fill-[#b8962a]" />)}
                  </div>
                  <p className="text-gray-700 text-xl italic leading-relaxed mb-6">
                    "I had tried to get this procedure done locally for years. HealthQuest India made it happen within 6 weeks. The hospital was first-class, my doctor spoke perfect English, and I saved over $40,000. I cannot recommend them enough."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">A</div>
                    <div>
                      <div className="font-bold text-primary">Amara O.</div>
                      <div className="text-sm text-gray-500">Lagos, Nigeria · {service.name} patient</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Other procedures in specialty */}
            {otherSubs.length > 0 && (
              <FadeIn>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-7 bg-[#b8962a] rounded-full" />
                    <h2 className="text-xl font-bold text-primary">Other {service.name} Procedures</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {otherSubs.map(s => (
                      <button
                        key={s.slug}
                        onClick={() => { navigate(`/services/${service.slug}/${s.slug}`); scrollToTop(); }}
                        className="border border-gray-100 rounded-xl p-4 text-left bg-white hover:border-[#b8962a]/40 hover:shadow-md transition-all group flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-[#b8962a] transition-colors">
                          <ChevronRight className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary text-sm group-hover:text-[#b8962a] transition-colors truncate">{s.name}</p>
                          <p className="text-[#b8962a] text-xs font-bold mt-0.5">{s.costRange}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* ── SIDEBAR ─── */}
          <div className="space-y-6">
            <FadeIn>
              <div className="bg-[#b8962a] rounded-2xl p-7 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-2">Free Quote for {sub.name}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Share your medical reports — receive a cost estimate and treatment plan from our specialist within 24 hours, at no charge.
                </p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-white text-[#b8962a] hover:bg-gray-50 font-bold h-12"
                    onClick={() => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}>
                    Get Free Estimate
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
            </FadeIn>

            <FadeIn delay={80}>
              <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold text-primary mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    "Free specialist second opinion",
                    "Doctor & hospital selection",
                    "Medical visa invitation letter",
                    "Airport pickup & local transport",
                    "Accommodation assistance",
                    "Personal coordinator (English)",
                    "Post-treatment telemedicine follow-up"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-[#b8962a] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold text-primary mb-4">Hospital Standards</h3>
                <div className="space-y-3">
                  {[
                    { icon: <ShieldCheck className="h-5 w-5 text-[#b8962a]" />, text: "JCI International Accreditation" },
                    { icon: <ShieldCheck className="h-5 w-5 text-[#b8962a]" />, text: "NABH National Accreditation" },
                    { icon: <Building2 className="h-5 w-5 text-[#b8962a]" />, text: "Dedicated International Patient Units" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      {item.icon} {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <button
                onClick={() => navigate(`/services/${service.slug}`)}
                className="w-full border border-gray-200 rounded-2xl p-4 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-between font-medium"
              >
                <span>All {service.name} procedures</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
