import { useLocation } from "wouter";
import {
  ArrowLeft, CheckCircle2, Clock, DollarSign, Phone, MessageCircle,
  ChevronRight, HeartPulse, Bone, Activity, Brain, Baby, Droplet, Sparkles,
  Building2, ShieldCheck, Star, Award, Zap, Users, TrendingDown, Globe
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

const serviceAboutPhotos: Record<string, string> = {
  "cardiology":        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=80&fit=crop",
  "orthopedics":       "https://images.unsplash.com/photo-1530026186672-2cd00ffc50d7?w=700&q=80&fit=crop",
  "oncology":          "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=700&q=80&fit=crop",
  "neurology":         "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=80&fit=crop",
  "ivf-fertility":     "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80&fit=crop",
  "kidney-transplant": "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=700&q=80&fit=crop",
  "cosmetic-surgery":  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&q=80&fit=crop",
};

const serviceGallery: Record<string, string[]> = {
  "cardiology": [
    "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=75&fit=crop",
  ],
  "orthopedics": [
    "https://images.unsplash.com/photo-1530026186672-2cd00ffc50d7?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=75&fit=crop",
  ],
  "oncology": [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=500&q=75&fit=crop",
  ],
  "neurology": [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=75&fit=crop",
  ],
  "ivf-fertility": [
    "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1576671081837-49000212a370?w=500&q=75&fit=crop",
  ],
  "kidney-transplant": [
    "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=75&fit=crop",
  ],
  "cosmetic-surgery": [
    "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=75&fit=crop",
    "https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=500&q=75&fit=crop",
  ],
};

const costBars: Record<string, { india: number; uk: number; usa: number; indiaLabel: string; ukLabel: string; usaLabel: string }> = {
  "cardiology":        { india: 9,  uk: 58, usa: 100, indiaLabel: "$6,500–$12,000", ukLabel: "£50,000–£90,000", usaLabel: "$80,000–$150,000" },
  "orthopedics":       { india: 12, uk: 57, usa: 100, indiaLabel: "$4,000–$7,000",  ukLabel: "£20,000–£40,000", usaLabel: "$35,000–$60,000" },
  "oncology":          { india: 8,  uk: 40, usa: 100, indiaLabel: "$4,000–$15,000", ukLabel: "£30,000–£80,000", usaLabel: "$50,000–$200,000" },
  "neurology":         { india: 10, uk: 55, usa: 100, indiaLabel: "$5,000–$22,000", ukLabel: "£40,000–£100,000", usaLabel: "$60,000–$150,000" },
  "ivf-fertility":     { india: 15, uk: 55, usa: 100, indiaLabel: "$1,200–$6,500",  ukLabel: "£8,000–£18,000", usaLabel: "$12,000–$25,000" },
  "kidney-transplant": { india: 11, uk: 55, usa: 100, indiaLabel: "$13,000–$20,000",ukLabel: "£60,000–£100,000", usaLabel: "$100,000–$200,000" },
  "cosmetic-surgery":  { india: 17, uk: 55, usa: 100, indiaLabel: "$1,500–$8,000",  ukLabel: "£6,000–£18,000", usaLabel: "$8,000–$25,000" },
};

const whyIndiaIcons = [
  <Award className="h-6 w-6 text-[#b8962a]" />,
  <TrendingDown className="h-6 w-6 text-[#b8962a]" />,
  <Zap className="h-6 w-6 text-[#b8962a]" />,
  <Users className="h-6 w-6 text-[#b8962a]" />,
  <Globe className="h-6 w-6 text-[#b8962a]" />,
];

const serviceIcons: Record<string, React.ReactNode> = {
  "cardiology":        <HeartPulse className="h-10 w-10 text-white" />,
  "orthopedics":       <Bone className="h-10 w-10 text-white" />,
  "oncology":          <Activity className="h-10 w-10 text-white" />,
  "neurology":         <Brain className="h-10 w-10 text-white" />,
  "ivf-fertility":     <Baby className="h-10 w-10 text-white" />,
  "kidney-transplant": <Droplet className="h-10 w-10 text-white" />,
  "cosmetic-surgery":  <Sparkles className="h-10 w-10 text-white" />,
};

interface ServiceDetailProps { slug: string; }

export function ServiceDetail({ slug }: ServiceDetailProps) {
  const [, navigate] = useLocation();
  const services = useServices();
  const service = services.find(s => s.slug === slug);

  const scrollToConsult = () => {
    navigate("/");
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Service not found</h1>
        <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
      </div>
    );
  }

  const otherServices = services.filter(s => s.slug !== slug).slice(0, 4);
  const heroPhoto = serviceHeroPhotos[slug];
  const aboutPhoto = serviceAboutPhotos[slug];
  const gallery = serviceGallery[slug] || [];
  const costs = costBars[slug] || costBars["cardiology"];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO with background photo ─────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        {heroPhoto && (
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url(${heroPhoto})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-4 pb-12 pt-28">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-10 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          <div className="flex items-start gap-6 mb-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
              {serviceIcons[service.slug]}
            </div>
            <div>
              <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">Medical Treatment · India</span>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-3 leading-tight">{service.name}</h1>
              <p className="text-white/75 text-lg max-w-2xl leading-relaxed">{service.shortDesc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { v: service.heroStat, l: service.heroStatLabel },
              { v: `${service.subServices.length}`, l: "Procedures available" },
              { v: "JCI", l: "Accredited hospitals" },
              { v: "24hrs", l: "Free estimate turnaround" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#b8962a]">{s.v}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── MAIN CONTENT ─── */}
          <div className="lg:col-span-2 space-y-14">

            {/* About with photo */}
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                    <h2 className="text-2xl font-bold text-primary">About {service.name} in India</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.fullDesc}</p>
                </div>
                {aboutPhoto && (
                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                    <img
                      src={aboutPhoto}
                      alt={`${service.name} treatment in India`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Cost Savings Infographic */}
            <FadeIn>
              <div className="bg-[#f8f9fb] rounded-3xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Cost Savings Infographic</h2>
                </div>
                <p className="text-gray-500 text-sm mb-8 ml-4">Typical cost for {service.name} treatment — India vs the world</p>

                <div className="space-y-6">
                  {[
                    { flag: "🇺🇸", country: "United States", label: costs.usaLabel, pct: costs.usa, color: "#ef4444" },
                    { flag: "🇬🇧", country: "United Kingdom", label: costs.ukLabel, pct: costs.uk, color: "#f97316" },
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
                      <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                          style={{ width: `${Math.max(row.pct, 5)}%`, backgroundColor: row.color }}
                        >
                          {row.pct >= 20 && <span className="text-white text-xs font-bold">{row.pct}%</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white rounded-2xl p-5 border border-[#b8962a]/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#b8962a] flex items-center justify-center shrink-0">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-primary">You save up to {100 - costs.india}% vs USA prices</div>
                    <div className="text-sm text-gray-500">That's real money staying in your pocket — with the same quality of care.</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Photo Gallery */}
            {gallery.length > 0 && (
              <FadeIn>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                    <h2 className="text-2xl font-bold text-primary">Our Facilities & Team</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {gallery.map((src, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                        <img
                          src={src}
                          alt={`${service.name} facility ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Procedures */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Procedures We Offer</h2>
                </div>
              </FadeIn>

              <div className="space-y-4">
                {service.subServices.map((sub, i) => (
                  <FadeIn key={i} delay={i * 50}>
                    <div
                      className="border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[#b8962a]/30 transition-all cursor-pointer group overflow-hidden"
                      onClick={() => { navigate(`/services/${service.slug}/${sub.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      <div className="flex items-stretch">
                        {/* Step number column */}
                        <div className="w-14 bg-primary/5 border-r border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                          <span className="text-xl font-black text-primary/30 group-hover:text-white transition-colors">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 p-5">
                          <h3 className="text-base font-bold text-primary group-hover:text-[#b8962a] transition-colors mb-2">{sub.name}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-4">{sub.description}</p>
                          <div className="flex flex-wrap gap-3 items-center">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
                              <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{sub.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#b8962a] bg-[#b8962a]/8 rounded-lg px-3 py-1.5 border border-[#b8962a]/20">
                              <DollarSign className="h-3.5 w-3.5 shrink-0" />
                              <span>{sub.costRange}</span>
                            </div>
                            <div className="ml-auto flex items-center gap-1 text-xs font-bold text-primary border border-primary/20 rounded-lg px-3 py-1.5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                              View Details <ChevronRight className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <FadeIn>
              <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Conditions We Treat</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {service.conditions.map(condition => (
                    <span
                      key={condition}
                      className="flex items-center gap-2 border border-gray-200 text-gray-700 bg-white text-sm px-4 py-2 rounded-full font-medium hover:border-[#b8962a] hover:text-[#b8962a] transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#b8962a]" />
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Why India — icon card grid */}
            <FadeIn>
              <div className="bg-primary rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Why India for {service.name}?</h2>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {service.whyIndia.map((point, i) => (
                    <div key={i} className="bg-white/8 border border-white/15 rounded-2xl p-5">
                      <div className="w-10 h-10 rounded-xl bg-[#b8962a]/20 flex items-center justify-center mb-3">
                        {whyIndiaIcons[i % whyIndiaIcons.length]}
                      </div>
                      <p className="text-white/85 text-sm leading-relaxed">{point}</p>
                    </div>
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
                    "Choosing India for my treatment was the best decision of my life. HealthQuest managed everything — from my first WhatsApp message to boarding the flight home. The standard of care was equal to anything in Europe."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">C</div>
                    <div>
                      <div className="font-bold text-primary">Chukwuemeka I.</div>
                      <div className="text-sm text-gray-500">Abuja, Nigeria · {service.name} patient</div>
                    </div>
                    <div className="ml-auto text-4xl font-serif text-gray-100">"</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── SIDEBAR ─── */}
          <div className="space-y-6">
            <FadeIn>
              <div className="bg-[#b8962a] rounded-2xl p-7 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-3">Get a Free {service.name} Quote</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Share your medical reports — receive a detailed treatment plan and cost estimate within 24 hours, at no charge.
                </p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-white text-[#b8962a] hover:bg-gray-50 font-bold h-12" onClick={scrollToConsult}>
                    Get Free Estimate
                  </Button>
                  <a href="https://wa.me/918527264675" target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg h-12 font-bold text-sm hover:bg-[#20b858] transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                  <a href="tel:+918527264675"
                    className="flex items-center justify-center gap-2 w-full bg-white/15 text-white rounded-lg h-11 font-semibold text-sm hover:bg-white/25 transition-colors">
                    <Phone className="h-4 w-4" />
                    Call Us Now
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
                    "Medical visa support letter",
                    "Airport pickup & transport",
                    "Accommodation assistance",
                    "Personal English coordinator",
                    "Post-treatment telemedicine follow-up",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-[#b8962a] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold text-primary mb-4">Hospital Quality Standards</h3>
                <div className="space-y-3">
                  {[
                    { icon: <ShieldCheck className="h-5 w-5 text-[#b8962a]" />, text: "JCI International Accreditation" },
                    { icon: <ShieldCheck className="h-5 w-5 text-[#b8962a]" />, text: "NABH National Accreditation" },
                    { icon: <Building2 className="h-5 w-5 text-[#b8962a]" />, text: "Dedicated International Patient Units" },
                    { icon: <Award className="h-5 w-5 text-[#b8962a]" />, text: "ISO 9001:2015 Certified" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold text-primary mb-4">Other Treatments</h3>
                <ul className="space-y-2">
                  {otherServices.map(s => (
                    <li key={s.slug}>
                      <button
                        onClick={() => { navigate(`/services/${s.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg px-3 py-2.5 transition-colors text-left"
                      >
                        {s.name}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
