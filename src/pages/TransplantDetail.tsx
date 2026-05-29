import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Phone, MessageCircle, CheckCircle2, ChevronDown, ChevronUp,
  Award, TrendingDown, Zap, Users, Globe, Star, ShieldCheck, Building2,
  Activity, Droplet, Clock, HeartPulse, Microscope, FlaskConical,
  Stethoscope, AlertCircle, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";

interface TransplantDetailProps {
  type: "liver" | "bone-marrow";
}

/* ─── DATA ──────────────────────────────────────────────────────── */
const config = {
  liver: {
    title: "Liver Transplant",
    tagline: "Life-saving liver transplant surgery with India's top hepato-biliary surgeons.",
    heroImage: "/liver-transplant-hero.png",
    aboutImage: "/liver-transplant-about.png",
    icon: <Droplet className="h-10 w-10 text-white" />,
    heroStats: [
      { value: "95%", label: "1-year survival rate" },
      { value: "500+", label: "Transplants annually" },
      { value: "$18K–25K", label: "All-inclusive cost" },
      { value: "24 hrs", label: "Free estimate" },
    ],
    about: `India has emerged as one of the world's leading destinations for liver transplant surgery, combining world-class surgical expertise with costs that are 70–90% lower than the USA or UK. Our partner hospitals in Delhi NCR, Mumbai, and Chennai house dedicated Hepato-Biliary transplant centres staffed by surgeons trained at top institutions in the US, UK, and Europe.

Both living donor and deceased donor transplants are performed here with outcomes comparable to the best global centres. From the moment you contact us, HealthQuest India manages your entire journey — medical evaluation, visa letters, travel, accommodation, and long-term follow-up care.`,
    procedures: [
      {
        name: "Living Donor Liver Transplant (LDLT)",
        desc: "A healthy living relative donates a portion of their liver. The donor's liver regenerates within 6–8 weeks. This is the most common transplant pathway in India.",
        duration: "8–12 hours",
        cost: "$18,000–$25,000",
        recovery: "3–4 weeks hospital stay",
      },
      {
        name: "Deceased Donor Liver Transplant (DDLT)",
        desc: "A full liver from a brain-dead donor is transplanted. HealthQuest coordinates with India's national organ allocation registry (NOTTO) for international patients.",
        duration: "6–10 hours",
        cost: "$20,000–$28,000",
        recovery: "4–5 weeks hospital stay",
      },
      {
        name: "Paediatric Liver Transplant",
        desc: "Specialised transplant for infants and children with biliary atresia, Wilson's disease, or metabolic liver disorders. India leads Asia in paediatric transplant outcomes.",
        duration: "6–10 hours",
        cost: "$16,000–$22,000",
        recovery: "4–6 weeks",
      },
      {
        name: "Re-do Liver Transplant",
        desc: "For patients whose prior graft has failed. Requires advanced surgical skill; our partner centres have experienced re-do transplant teams with successful outcome histories.",
        duration: "10–14 hours",
        cost: "$25,000–$35,000",
        recovery: "5–7 weeks",
      },
    ],
    conditions: [
      "End-stage Liver Disease (ESLD)",
      "Cirrhosis (alcoholic / viral / autoimmune)",
      "Hepatocellular Carcinoma (HCC)",
      "Biliary Atresia",
      "Wilson's Disease",
      "Primary Sclerosing Cholangitis",
      "Acute Liver Failure",
      "Budd-Chiari Syndrome",
      "Metabolic Liver Disorders",
      "Non-alcoholic Fatty Liver Disease (NAFLD)",
    ],
    costs: { india: 10, uk: 55, usa: 100, indiaLabel: "$18,000–$25,000", ukLabel: "£120,000–£160,000", usaLabel: "$200,000–$300,000" },
    whyIndia: [
      "Surgeons with 20+ years dedicated transplant experience and US/UK fellowship training",
      "Costs up to 90% lower than the USA with no compromise in outcomes or safety",
      "JCI & NABH accredited hospitals with dedicated transplant ICUs",
      "Robust living donor programs with streamlined legal and documentation support",
      "Comprehensive aftercare — immunosuppression management and telemedicine follow-up",
      "Multilingual international patient coordinators available 24/7",
    ],
    faqs: [
      { q: "How do I know if I'm eligible for a liver transplant?", a: "Eligibility is determined through a detailed evaluation including liver function tests, imaging (CT/MRI), and scoring systems like MELD. Share your medical records with us for a free specialist review within 24 hours." },
      { q: "Can a family member donate part of their liver?", a: "Yes. A healthy first-degree relative (parent, sibling, child, spouse) can donate a segment of their liver. The donor is evaluated thoroughly and the donated portion regenerates fully within 6–8 weeks." },
      { q: "How long do I need to stay in India?", a: "The patient typically needs to stay for 6–8 weeks: 3–4 weeks in hospital and 2–4 weeks nearby for follow-up. For living donor transplants, the donor may return after 3–4 weeks." },
      { q: "Is a medical visa required?", a: "Yes. HealthQuest India provides all documentation for an Indian Medical Visa, including the hospital invitation letter, estimated cost certificate, and appointment letters." },
      { q: "What are the survival rates in Indian hospitals?", a: "Our partner centres report 1-year survival rates of 90–95% and 5-year survival rates of 70–80%, which are on par with leading global transplant centres." },
    ],
    testimonial: {
      text: "I was told I needed a liver transplant and couldn't afford it in the UK — the wait list alone was 2 years. HealthQuest arranged everything in 3 weeks. My surgeon was incredibly skilled and the ICU team was world-class. I'm now 14 months post-transplant and feeling better than I have in a decade.",
      name: "Emmanuel O.",
      location: "Lagos, Nigeria",
      initial: "E",
    },
    gallery: [
      "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&q=75&fit=crop",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&q=75&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=75&fit=crop",
    ],
  },

  "bone-marrow": {
    title: "Bone Marrow Transplant",
    tagline: "Advanced BMT for blood cancers and disorders — expert haematology teams, sterile BMT units.",
    heroImage: "/bone-marrow-hero.png",
    aboutImage: "/bone-marrow-about.png",
    icon: <Activity className="h-10 w-10 text-white" />,
    heroStats: [
      { value: "85%", label: "Allogeneic success rate" },
      { value: "300+", label: "BMTs per year" },
      { value: "$15K–30K", label: "All-inclusive cost" },
      { value: "24 hrs", label: "Free estimate" },
    ],
    about: `Bone Marrow Transplant (BMT), also known as Haematopoietic Stem Cell Transplant (HSCT), is a life-saving procedure for patients with blood cancers and haematological disorders. India's BMT centres are equipped with HEPA-filtered, positive-pressure sterile rooms and led by haematologists with international training.

HealthQuest India works with the top BMT units in Delhi, Mumbai, and Chennai — centres that perform over 300 transplants per year with outcome rates comparable to international standards. From donor search and HLA typing to long-term graft monitoring, we coordinate every aspect of your BMT journey.`,
    procedures: [
      {
        name: "Allogeneic BMT (Matched Related Donor)",
        desc: "Stem cells are sourced from a matched sibling or related donor. This is the gold standard for leukaemia and other blood cancers, offering a curative graft-versus-tumour effect.",
        duration: "Infusion: 1–2 hrs (preceded by 1–2 weeks conditioning)",
        cost: "$25,000–$35,000",
        recovery: "4–6 weeks inpatient + 3 months nearby",
      },
      {
        name: "Allogeneic BMT (Matched Unrelated Donor – MUD)",
        desc: "When no related donor is available, stem cells are sourced from international registries (DKMS, NMDP). Our team coordinates global donor searches and procurement.",
        duration: "Conditioning + infusion: 2–3 weeks",
        cost: "$28,000–$40,000",
        recovery: "4–6 weeks inpatient + 3 months nearby",
      },
      {
        name: "Autologous BMT (Self-Donor)",
        desc: "The patient's own stem cells are collected, stored during high-dose chemotherapy, and re-infused. Most commonly used for Multiple Myeloma and Lymphoma.",
        duration: "Collection + conditioning: 3–4 weeks",
        cost: "$15,000–$22,000",
        recovery: "3–4 weeks inpatient + 6 weeks nearby",
      },
      {
        name: "Haploidentical (Half-matched) BMT",
        desc: "A half-matched parent, child, or sibling can donate stem cells. Advanced T-cell depletion techniques have made this a viable option for patients without a fully matched donor.",
        duration: "3–4 weeks total conditioning and infusion",
        cost: "$26,000–$36,000",
        recovery: "4–6 weeks inpatient + 3 months follow-up",
      },
    ],
    conditions: [
      "Acute Myeloid Leukaemia (AML)",
      "Acute Lymphoblastic Leukaemia (ALL)",
      "Chronic Myeloid Leukaemia (CML)",
      "Multiple Myeloma",
      "Hodgkin's Lymphoma",
      "Non-Hodgkin's Lymphoma",
      "Aplastic Anaemia",
      "Thalassaemia Major",
      "Sickle Cell Disease",
      "Myelodysplastic Syndrome (MDS)",
    ],
    costs: { india: 12, uk: 52, usa: 100, indiaLabel: "$15,000–$35,000", ukLabel: "£80,000–£120,000", usaLabel: "$150,000–$300,000" },
    whyIndia: [
      "Haematologists trained at MD Anderson, Royal Marsden and other top global centres",
      "Costs 85–90% lower than the US with equivalent outcome data",
      "HEPA-filtered positive-pressure BMT rooms with stringent infection-control protocols",
      "Access to international donor registries (DKMS, NMDP) through our network",
      "Dedicated nutritional support, physiotherapy, and psychology during recovery",
      "24/7 critical care backup with BMT-specialist intensivists",
    ],
    faqs: [
      { q: "How do I know which type of BMT I need?", a: "The type of BMT depends on your diagnosis, disease stage, age, and donor availability. Share your latest bone marrow biopsy, karyotype report, and blood counts with us for a free expert opinion within 24 hours." },
      { q: "How long does the entire BMT process take?", a: "The full process — pre-transplant workup, conditioning chemotherapy, stem cell infusion, and initial recovery — takes 6–10 weeks in hospital. Patients are advised to stay in India for an additional 2–3 months for monitoring." },
      { q: "What if I don't have a matched sibling donor?", a: "We coordinate searches in international registries (DKMS has 10+ million donors). Haploidentical (half-match) transplants are also available at our centres, offering curative potential without a full match." },
      { q: "Is the BMT unit truly sterile?", a: "Yes. Our partner BMT units have HEPA-filtered positive-pressure rooms with strict visitor protocols, laminar airflow, and regular microbiological audits — the same standards as top US and European centres." },
      { q: "What long-term follow-up is provided?", a: "Our centres provide structured follow-up at 30 days, 60 days, 6 months, and 1 year post-BMT. Chimerism studies, GVHD monitoring, and immunosuppression management are conducted. Telemedicine follow-up is available for patients who return home." },
    ],
    testimonial: {
      text: "My son was diagnosed with ALL and we were quoted over $200,000 in the US. HealthQuest got us to India in 10 days. The BMT unit was spotlessly clean, the doctors were brilliant, and the nurse coordinators were with us every step of the way. My son is now in complete remission, 18 months post-transplant.",
      name: "Amara K.",
      location: "Accra, Ghana",
      initial: "A",
    },
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=75&fit=crop",
      "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&q=75&fit=crop",
      "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500&q=75&fit=crop",
    ],
  },
} as const;

const whyIndiaIcons = [
  <Award className="h-6 w-6 text-[#b8962a]" />,
  <TrendingDown className="h-6 w-6 text-[#b8962a]" />,
  <Zap className="h-6 w-6 text-[#b8962a]" />,
  <Users className="h-6 w-6 text-[#b8962a]" />,
  <Globe className="h-6 w-6 text-[#b8962a]" />,
  <Stethoscope className="h-6 w-6 text-[#b8962a]" />,
];

/* ─── COMPONENT ─────────────────────────────────────────────────── */
export function TransplantDetail({ type }: TransplantDetailProps) {
  const [, navigate] = useLocation();
  const data = config[type];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToConsult = () => {
    navigate("/");
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${data.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/40" />

        <div className="relative z-10 container mx-auto px-4 pb-12 pt-28 max-w-6xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          <div className="flex items-start gap-6 mb-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
              {data.icon}
            </div>
            <div>
              <span className="text-[#b8962a] text-xs font-bold uppercase tracking-widest border border-[#b8962a]/40 px-3 py-1 rounded-full">
                Transplants · India
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-3 leading-tight">
                {data.title}
              </h1>
              <p className="text-white/75 text-lg max-w-2xl leading-relaxed">{data.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {data.heroStats.map((s, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#b8962a]">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTION BAR ─────────────────────────────────── */}
      <div className="bg-[#b8962a] text-white py-4">
        <div className="container mx-auto px-4 max-w-6xl flex flex-wrap items-center justify-between gap-4">
          <p className="font-semibold text-sm md:text-base">
            📋 Share your medical reports — get a free treatment plan within 24 hours
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button
              size="sm"
              className="bg-white text-[#b8962a] hover:bg-gray-100 font-bold h-9"
              onClick={scrollToConsult}
            >
              Get Free Estimate
            </Button>
            <a
              href="https://wa.me/918527264675"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] text-white rounded-md h-9 px-3 font-semibold text-sm hover:bg-[#20b858] transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ─────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-14 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── LEFT / MAIN ── */}
          <div className="lg:col-span-2 space-y-14">

            {/* About */}
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                    <h2 className="text-2xl font-bold text-primary">About {data.title} in India</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.about}</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img
                    src={data.aboutImage}
                    alt={`${data.title} consultation in India`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </div>
            </FadeIn>

            {/* Cost Comparison */}
            <FadeIn>
              <div className="bg-[#f8f9fb] rounded-3xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Cost Savings Infographic</h2>
                </div>
                <p className="text-gray-500 text-sm mb-8 ml-4">
                  Typical cost for {data.title} — India vs the world
                </p>

                <div className="space-y-6">
                  {[
                    { flag: "🇺🇸", country: "United States", label: data.costs.usaLabel, pct: data.costs.usa, color: "#ef4444" },
                    { flag: "🇬🇧", country: "United Kingdom", label: data.costs.ukLabel, pct: data.costs.uk, color: "#f97316" },
                    { flag: "🇮🇳", country: "India (HealthQuest)", label: data.costs.indiaLabel, pct: data.costs.india, color: "#b8962a" },
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
                    <div className="font-bold text-primary">You save up to {100 - data.costs.india}% vs USA prices</div>
                    <div className="text-sm text-gray-500">That's real money staying in your pocket — with the same quality of care.</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Photo Gallery */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Our Facilities &amp; Team</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {data.gallery.map((src, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                      <img
                        src={src}
                        alt={`${data.title} facility ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Procedures */}
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Types of {data.title}</h2>
                </div>
              </FadeIn>

              <div className="space-y-4">
                {data.procedures.map((proc, i) => (
                  <FadeIn key={i} delay={i * 50}>
                    <div className="border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[#b8962a]/30 transition-all overflow-hidden group">
                      <div className="flex items-stretch">
                        <div className="w-14 bg-primary/5 border-r border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                          <span className="text-xl font-black text-primary/30 group-hover:text-white transition-colors">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex-1 p-5">
                          <h3 className="text-base font-bold text-primary group-hover:text-[#b8962a] transition-colors mb-2">{proc.name}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-4">{proc.desc}</p>
                          <div className="flex flex-wrap gap-3 items-center">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
                              <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span>{proc.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#b8962a] bg-[#b8962a]/8 rounded-lg px-3 py-1.5 border border-[#b8962a]/20">
                              <span>💰 {proc.cost}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-blue-50 rounded-lg px-3 py-1.5">
                              <HeartPulse className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                              <span>{proc.recovery}</span>
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
                  {data.conditions.map(condition => (
                    <span
                      key={condition}
                      className="flex items-center gap-2 border border-gray-200 text-gray-700 bg-white text-sm px-4 py-2 rounded-full font-medium hover:border-[#b8962a] hover:text-[#b8962a] transition-colors cursor-default"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#b8962a]" />
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Why India */}
            <FadeIn>
              <div className="bg-primary rounded-3xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-white">Why India for {data.title}?</h2>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.whyIndia.map((point, i) => (
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

            {/* Step-by-step process */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">How HealthQuest India Helps You</h2>
                </div>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#b8962a] to-primary/20 hidden md:block" />
                  <div className="space-y-6">
                    {[
                      { step: "01", icon: <Stethoscope className="h-5 w-5 text-[#b8962a]" />, title: "Share Medical Reports", desc: "Send us your reports via WhatsApp, email, or our form. Our specialist reviews them within 24 hours — completely free." },
                      { step: "02", icon: <FlaskConical className="h-5 w-5 text-[#b8962a]" />, title: "Receive Treatment Plan & Quote", desc: "You get a detailed treatment plan, hospital recommendation, and an all-inclusive cost estimate with no hidden charges." },
                      { step: "03", icon: <Globe className="h-5 w-5 text-[#b8962a]" />, title: "Visa & Travel Assistance", desc: "We issue the hospital invitation letter and guide you through the Indian Medical Visa process. We arrange airport pickup and accommodation." },
                      { step: "04", icon: <Building2 className="h-5 w-5 text-[#b8962a]" />, title: "Treatment at Partner Hospital", desc: "Your personal coordinator accompanies you throughout. Real-time updates are shared with your family back home." },
                      { step: "05", icon: <HeartPulse className="h-5 w-5 text-[#b8962a]" />, title: "Recovery & Follow-up", desc: "Structured recovery plan, discharge summary, and telemedicine follow-up after you return home. We remain your point of contact." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 md:ml-0">
                        <div className="w-12 h-12 rounded-full bg-[#b8962a]/10 border-2 border-[#b8962a] flex items-center justify-center shrink-0 z-10 relative">
                          {item.icon}
                        </div>
                        <div className="flex-1 bg-[#f8f9fb] border border-gray-100 rounded-2xl p-5">
                          <div className="text-xs font-black text-[#b8962a] uppercase tracking-widest mb-1">Step {item.step}</div>
                          <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* FAQ */}
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-[#b8962a] rounded-full" />
                  <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <button
                        id={`faq-${type}-${i}`}
                        className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-[#b8962a] shrink-0 mt-0.5" />
                          <span className="font-semibold text-primary text-sm">{faq.q}</span>
                        </div>
                        {openFaq === i
                          ? <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                          : <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />}
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                          {faq.a}
                        </div>
                      )}
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
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 text-[#b8962a] fill-[#b8962a]" />)}
                  </div>
                  <p className="text-gray-700 text-xl italic leading-relaxed mb-6">
                    "{data.testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {data.testimonial.initial}
                    </div>
                    <div>
                      <div className="font-bold text-primary">{data.testimonial.name}</div>
                      <div className="text-sm text-gray-500">{data.testimonial.location} · {data.title} patient</div>
                    </div>
                    <div className="ml-auto text-4xl font-serif text-gray-100">"</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="space-y-6">
            <FadeIn>
              <div className="bg-[#b8962a] rounded-2xl p-7 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-3">Get a Free {data.title} Quote</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Share your medical reports — receive a detailed treatment plan and cost estimate within 24 hours, at no charge.
                </p>
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-white text-[#b8962a] hover:bg-gray-50 font-bold h-12"
                    onClick={scrollToConsult}
                  >
                    Get Free Estimate
                  </Button>
                  <a
                    href="https://wa.me/918527264675"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg h-12 font-bold text-sm hover:bg-[#20b858] transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+918527264675"
                    className="flex items-center justify-center gap-2 w-full bg-white/15 text-white rounded-lg h-11 font-semibold text-sm hover:bg-white/25 transition-colors"
                  >
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
                <h3 className="font-bold text-primary mb-4">Other Transplant</h3>
                <ul className="space-y-2">
                  {type === "liver" ? (
                    <li>
                      <button
                        onClick={() => { navigate("/transplants/bone-marrow-transplant"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg px-3 py-2.5 transition-colors text-left"
                      >
                        Bone Marrow Transplant
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        onClick={() => { navigate("/transplants/liver-transplant"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg px-3 py-2.5 transition-colors text-left"
                      >
                        Liver Transplant
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </FadeIn>

            {/* Urgency notice */}
            <FadeIn delay={200}>
              <div className="border border-amber-200 bg-amber-50 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-800 text-sm mb-1">Need urgent evaluation?</div>
                    <p className="text-amber-700 text-xs leading-relaxed">
                      For urgent cases we can fast-track the evaluation and hospital admission process. Contact us immediately on WhatsApp for priority handling.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-primary py-16 mt-8">
        <FadeIn>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to take the next step?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Share your medical reports today — our transplant specialists will get back to you within 24 hours with a personalised treatment plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#b8962a] hover:bg-[#a07d20] text-white font-bold h-14 px-8 text-base"
                onClick={scrollToConsult}
              >
                Get Free Consultation
              </Button>
              <a
                href="https://wa.me/918527264675"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white rounded-xl h-14 px-8 font-bold text-base hover:bg-[#20b858] transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
