import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronDown, HeartPulse, Bone, Activity, Brain, Baby, Droplet, Sparkles, Stethoscope, ArrowRight } from "lucide-react";
import { useServices } from "@/hooks/useStore";

const serviceIcons: Record<string, React.ReactNode> = {
  "cardiology":        <HeartPulse className="h-5 w-5" />,
  "orthopedics":       <Bone className="h-5 w-5" />,
  "oncology":          <Activity className="h-5 w-5" />,
  "neurology":         <Brain className="h-5 w-5" />,
  "ivf-fertility":     <Baby className="h-5 w-5" />,
  "kidney-transplant": <Droplet className="h-5 w-5" />,
  "cosmetic-surgery":  <Sparkles className="h-5 w-5" />,
};

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const services = useServices();
  const [, navigate] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    if (!hovered && services.length > 0) setHovered(services[0].slug);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const activeService = services.find(s => s.slug === hovered) || services[0];

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
        Services <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="fixed left-0 right-0 top-20 z-50 bg-white border-t border-b border-gray-100 shadow-2xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-0 py-6">
              {/* LEFT: Specialty list */}
              <div className="col-span-4 border-r border-gray-100 pr-4">
                <div className="text-[10px] font-bold text-[#b8962a] uppercase tracking-widest mb-3 px-3">Medical Specialties</div>
                <div className="space-y-1">
                  {services.map(s => (
                    <button
                      key={s.slug}
                      onMouseEnter={() => setHovered(s.slug)}
                      onClick={() => { navigate(`/services/${s.slug}`); setOpen(false); }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${
                        hovered === s.slug ? "bg-primary text-white" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className={hovered === s.slug ? "text-[#b8962a]" : "text-primary"}>
                        {serviceIcons[s.slug] || <Stethoscope className="h-5 w-5" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{s.name}</div>
                        <div className={`text-xs ${hovered === s.slug ? "text-white/70" : "text-gray-400"}`}>
                          {s.subServices.length} procedures
                        </div>
                      </div>
                      <ArrowRight className={`h-4 w-4 ${hovered === s.slug ? "opacity-100" : "opacity-0"} transition-opacity`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT: Sub-procedures of hovered specialty */}
              <div className="col-span-8 pl-8">
                {activeService && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] font-bold text-[#b8962a] uppercase tracking-widest mb-1">Procedures · {activeService.name}</div>
                        <p className="text-sm text-gray-500 max-w-lg">{activeService.shortDesc}</p>
                      </div>
                      <button
                        onClick={() => { navigate(`/services/${activeService.slug}`); setOpen(false); }}
                        className="text-xs font-bold text-[#b8962a] hover:underline whitespace-nowrap flex items-center gap-1"
                      >
                        View all <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeService.subServices.slice(0, 8).map(sub => (
                        <button
                          key={sub.slug}
                          onClick={() => { navigate(`/services/${activeService.slug}/${sub.slug}`); setOpen(false); }}
                          className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                        >
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-primary group-hover:text-[#b8962a] transition-colors">{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#b8962a] font-bold">{sub.costRange}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-500">{sub.duration.split(",")[0]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
