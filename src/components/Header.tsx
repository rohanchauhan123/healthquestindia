import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "@/components/MegaMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useServices } from "@/hooks/useStore";

interface HeaderProps {
  onConsultClick?: () => void;
}

export function Header({ onConsultClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();
  const services = useServices();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    } else {
      navigate("/");
      setTimeout(() => {
        const el2 = document.getElementById(id);
        el2?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      setMenuOpen(false);
    }
  };

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow duration-300 bg-white ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => goTo("/")}>
          <img src="/logo.png" alt="HealthQuest India" className="h-12 w-auto object-contain" />
          <div className="hidden sm:block">
            <div className="text-primary font-bold text-base leading-tight">HealthQuest</div>
            <div className="text-[#b8962a] font-semibold text-xs tracking-widest uppercase">India</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <button onClick={() => goTo("/")} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
            Home
          </button>
          <MegaMenu />
          <button onClick={() => goTo("/doctors")} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
            Doctors
          </button>
          <button onClick={() => goTo("/hospitals")} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
            Hospitals
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
                Transplants <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => goTo("/transplants/liver-transplant")} className="cursor-pointer">
                Liver Transplant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => goTo("/transplants/bone-marrow-transplant")} className="cursor-pointer">
                Bone Marrow Transplant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/blogs"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors inline-block"
          >
            Blog
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors">
                More <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuItem onClick={() => goTo("/costs")} className="cursor-pointer">Costs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo("how-it-works")} className="cursor-pointer">How It Works</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo("cost-comparison")} className="cursor-pointer">Savings Chart</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo("contact")} className="cursor-pointer">Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+918527264675" className="flex items-center gap-2 text-sm font-medium text-primary border border-primary/30 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors">
            +91-8527264675
          </a>
          <Button className="font-semibold bg-[#b8962a] hover:bg-[#a07d20] text-white border-none shadow-sm"
            onClick={onConsultClick ?? (() => scrollTo("contact"))}>
            Free Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-primary" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <button onClick={() => goTo("/")} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-md">Home</button>
            <button onClick={() => goTo("/doctors")} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-md">Doctors</button>
            <button onClick={() => goTo("/hospitals")} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-md">Hospitals</button>
            <div className="px-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Transplants</div>
            <button onClick={() => goTo("/transplants/liver-transplant")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Liver Transplant</button>
            <button onClick={() => goTo("/transplants/bone-marrow-transplant")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Bone Marrow Transplant</button>
            <Link
              href="/blogs"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-md"
            >
              Blog
            </Link>
            <div className="px-4 pt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">More</div>
            <button onClick={() => goTo("/costs")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Costs</button>
            <button onClick={() => scrollTo("how-it-works")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">How It Works</button>
            <button onClick={() => scrollTo("cost-comparison")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Savings Chart</button>
            <button onClick={() => scrollTo("contact")} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Contact</button>
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Specialties</div>
            {services.map(s => (
              <button key={s.slug} onClick={() => goTo(`/services/${s.slug}`)} className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                {s.name}
              </button>
            ))}
            <div className="pt-2">
              <Button className="w-full font-semibold bg-[#b8962a] hover:bg-[#a07d20] text-white" onClick={() => scrollTo("contact")}>
                Get Free Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
