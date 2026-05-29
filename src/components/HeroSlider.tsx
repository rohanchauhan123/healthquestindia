import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, MessageCircle, Phone, ArrowRight } from "lucide-react";

const slides = [
  {
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85&fit=crop",
    tag: "World-Class Healthcare",
    headline: "Advanced Medical",
    headline2: "Treatment in India",
    highlight: "50–70% Lower Cost Than USA or UK",
    body: "Trusted by patients from Nigeria, Ghana, Kenya & across Africa. JCI-accredited hospitals. Internationally trained specialist doctors. End-to-end coordination from first call to safe return home.",
    stats: [
      { value: "50-70%", label: "Cost savings vs USA/UK" },
      { value: "15,000+", label: "International patients" },
      { value: "98%", label: "Success rate" },
    ],
    primaryCta: "Get Free Consultation",
    secondaryCta: "Chat on WhatsApp",
    primaryAction: "contact",
    secondaryAction: "whatsapp",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1920&q=85&fit=crop",
    tag: "Cardiac Care Excellence",
    headline: "World-Class",
    headline2: "Heart Surgery",
    highlight: "Save up to $113,500 vs USA Prices",
    body: "India's top cardiac surgeons perform over 100,000 open-heart surgeries annually. 98%+ success rates. Robotic cardiac surgery, cutting-edge catheterization labs, and dedicated cardiac ICUs.",
    stats: [
      { value: "$6,500", label: "Heart bypass in India" },
      { value: "$120,000", label: "Same in USA" },
      { value: "100K+", label: "Surgeries/year" },
    ],
    primaryCta: "Explore Cardiology",
    secondaryCta: "Get Free Estimate",
    primaryAction: "/services/cardiology",
    secondaryAction: "contact",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=85&fit=crop",
    tag: "Cancer Treatment",
    headline: "Fight Cancer with",
    headline2: "India's Best Oncologists",
    highlight: "80% Lower Cost — Proton Therapy Available",
    body: "Proton Beam Therapy, CyberKnife, latest immunotherapy and targeted therapy — at 80% lower cost than the USA. Every patient reviewed by a multidisciplinary tumor board.",
    stats: [
      { value: "80%", label: "Cost savings vs USA" },
      { value: "JCI", label: "Accredited cancer centres" },
      { value: "100+", label: "Oncology specialists" },
    ],
    primaryCta: "Explore Oncology",
    secondaryCta: "Share Your Reports",
    primaryAction: "/services/oncology",
    secondaryAction: "contact",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=85&fit=crop",
    tag: "Joint Replacement",
    headline: "Walk Pain-Free",
    headline2: "Again with Robotic Surgery",
    highlight: "Knee & Hip Replacement from $4,500",
    body: "Robotic-assisted joint replacement with latest Stryker and Zimmer Biomet implants. Dedicated physiotherapy. Return home walking comfortably — for a fraction of what it costs in the UK or USA.",
    stats: [
      { value: "$5,000", label: "Knee replacement in India" },
      { value: "$45,000", label: "Same in USA" },
      { value: "2,000+", label: "Joints replaced/year" },
    ],
    primaryCta: "Explore Orthopedics",
    secondaryCta: "Get Free Consultation",
    primaryAction: "/services/orthopedics",
    secondaryAction: "contact",
  }
];

const DURATION = 7000;

interface HeroSliderProps {
  onScrollTo: (id: string) => void;
}

export function HeroSlider({ onScrollTo }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [, navigate] = useLocation();

  const goTo = useCallback((index: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  }, [fading]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, DURATION);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const handleAction = (action: string) => {
    if (action === "whatsapp") {
      window.open("https://wa.me/918527264675", "_blank");
    } else if (action === "contact") {
      onScrollTo("contact");
    } else if (action.startsWith("/")) {
      navigate(action);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background images - all preloaded, crossfade on transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `url(${s.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      ))}

      {/* Deep overlay: navy gradient from left */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(105deg, rgba(15,30,65,0.93) 0%, rgba(15,30,65,0.82) 55%, rgba(15,30,65,0.45) 100%)"
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, rgba(15,30,65,0.6) 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1 container mx-auto px-4 sm:px-6">
        {/* Top spacing */}
        <div className="flex-1 flex items-center py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Tag */}
            <div
              className={`transition-all duration-500 ${fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
            >
              <span className="inline-flex items-center gap-2 border border-[#b8962a] text-[#b8962a] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8962a] inline-block" />
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <div
              className={`transition-all duration-500 delay-75 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-2 tracking-tight">
                {slide.headline}
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5 tracking-tight">
                {slide.headline2}
              </h1>
              <div className="inline-block bg-[#b8962a] text-white font-bold text-base md:text-lg px-5 py-2 rounded-lg mb-7">
                {slide.highlight}
              </div>
            </div>

            {/* Body */}
            <div
              className={`transition-all duration-500 delay-100 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                {slide.body}
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`transition-all duration-500 delay-150 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => handleAction(slide.primaryAction)}
                  className="inline-flex items-center justify-center gap-2 bg-[#b8962a] hover:bg-[#a07d20] text-white font-bold text-base px-8 h-14 rounded-xl transition-colors shadow-lg"
                >
                  {slide.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleAction(slide.secondaryAction)}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold text-base px-8 h-14 rounded-xl transition-colors backdrop-blur-sm"
                >
                  {slide.secondaryCta === "Chat on WhatsApp"
                    ? <MessageCircle className="h-5 w-5" />
                    : <Phone className="h-5 w-5" />
                  }
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pb-8">
          {/* Stats row */}
          <div
            className={`flex flex-wrap gap-6 md:gap-10 mb-8 transition-all duration-500 delay-200 ${fading ? "opacity-0" : "opacity-100"}`}
          >
            {slide.stats.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl md:text-3xl font-black text-[#b8962a] leading-none">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
            <div className="hidden md:block w-px bg-white/20 mx-2 self-stretch" />
            <div className="flex flex-wrap gap-2 items-center">
              {["JCI Accredited", "NABH Certified", "FICCI Empanelled"].map(badge => (
                <span key={badge} className="border border-white/20 text-white/70 text-xs px-3 py-1 rounded-full font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? "w-8 h-2.5 bg-[#b8962a]" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2 ml-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slide counter */}
            <span className="ml-auto text-white/40 text-sm font-medium">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div
          key={current}
          className="h-full bg-[#b8962a]"
          style={{ animation: `progress-bar ${DURATION}ms linear forwards` }}
        />
      </div>

      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
