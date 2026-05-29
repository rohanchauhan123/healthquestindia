import { useLocation } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { services } from "@/data/services";

export function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="HealthQuest India" className="h-14 w-auto object-contain bg-white rounded-lg p-1" />
            </div>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-5">
              Your trusted partner for world-class medical treatment in India. Serving patients from Nigeria, Ghana, Kenya, and across Africa.
            </p>
            <a
              href="https://wa.me/918527264675"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#20b858] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-[#b8962a] uppercase tracking-wider text-xs mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", action: () => navigate("/") },
                { label: "Costs & pricing", action: () => navigate("/costs") },
                { label: "How It Works", action: () => { navigate("/"); setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }), 200); } },
                { label: "Cost Comparison", action: () => { navigate("/"); setTimeout(() => document.getElementById("cost-comparison")?.scrollIntoView({ behavior: "smooth" }), 200); } },
                { label: "Our Doctors", action: () => { navigate("/"); setTimeout(() => document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" }), 200); } },
                { label: "Hospital Partners", action: () => { navigate("/"); setTimeout(() => document.getElementById("hospitals")?.scrollIntoView({ behavior: "smooth" }), 200); } },
                { label: "Get Free Consultation", action: () => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 200); } },
              ].map(link => (
                <li key={link.label}>
                  <button onClick={link.action} className="text-sm text-primary-foreground/70 hover:text-white transition-colors text-left">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-[#b8962a] uppercase tracking-wider text-xs mb-5">Our Services</h3>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s.slug}>
                  <button onClick={() => navigate(`/services/${s.slug}`)} className="text-sm text-primary-foreground/70 hover:text-white transition-colors text-left">
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[#b8962a] uppercase tracking-wider text-xs mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@healthquestindia.com" className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#b8962a]" />
                  info@healthquestindia.com
                </a>
              </li>
              <li>
                <a href="tel:+918527264675" className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#b8962a]" />
                  +91-8527264675
                </a>
              </li>
              <li>
                <a href="https://wa.me/918527264675" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors">
                  <MessageCircle className="h-4 w-4 mt-0.5 shrink-0 text-[#b8962a]" />
                  WhatsApp: +91-8527264675
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#b8962a]" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} HealthQuest India. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50 text-center">
            Medical tourism facilitator — not a medical provider. Always consult a physician.
          </p>
        </div>
      </div>
    </footer>
  );
}
