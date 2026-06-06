import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  HeartPulse, Bone, Activity, Brain, Baby, Droplet, Sparkles,
  CheckCircle2, Plane, ShieldCheck, UserCheck, Languages, Award,
  MapPin, Building2, Phone, Mail, MessageCircle, Star, ArrowRight,
  GraduationCap, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeroSlider } from "@/components/HeroSlider";
import { FadeIn } from "@/components/FadeIn";
import { DoctorsSlider } from "@/components/DoctorsSlider";
import { HospitalsSlider } from "@/components/HospitalsSlider";
import { useServices } from "@/hooks/useStore";

const serviceIcons: Record<string, React.ReactNode> = {
  "cardiology": <HeartPulse className="h-8 w-8" />,
  "orthopedics": <Bone className="h-8 w-8" />,
  "oncology": <Activity className="h-8 w-8" />,
  "neurology": <Brain className="h-8 w-8" />,
  "ivf-fertility": <Baby className="h-8 w-8" />,
  "kidney-transplant": <Droplet className="h-8 w-8" />,
  "cosmetic-surgery": <Sparkles className="h-8 w-8" />,
};

export function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [, navigate] = useLocation();
  const services = useServices();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormError("");

    const form = e.currentTarget;
    const data = {
      name: (form.querySelector("#name") as HTMLInputElement)?.value || "",
      country: selectedCountry,
      phone: (form.querySelector("#phone") as HTMLInputElement)?.value || "",
      treatment: selectedTreatment,
      message: (form.querySelector("#message") as HTMLTextAreaElement)?.value || "",
    };

    if (!data.name || !data.phone || !data.treatment) {
      setFormError("Please fill in your name, phone number, and treatment.");
      setFormStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setFormStatus("success");
      } else {
        setFormError(json.error || "Something went wrong. Please try again.");
        setFormStatus("error");
      }
    } catch {
      setFormError("Network error. Please call or WhatsApp us directly.");
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">

      {/* HERO SLIDER */}
      <HeroSlider onScrollTo={scrollTo} />

      {/* TRUST STRIP */}
      <section className="py-10 bg-[#f8f9fb] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: <Activity className="h-6 w-6 text-[#b8962a]" />, title: "50-70% Lower Cost", desc: "vs USA & UK" },
                { icon: <Building2 className="h-6 w-6 text-[#b8962a]" />, title: "JCI Accredited", desc: "World-class hospitals" },
                { icon: <UserCheck className="h-6 w-6 text-[#b8962a]" />, title: "Expert Doctors", desc: "Internationally trained" },
                { icon: <Plane className="h-6 w-6 text-[#b8962a]" />, title: "End-to-End Care", desc: "Travel to recovery" },
                { icon: <ShieldCheck className="h-6 w-6 text-[#b8962a]" />, title: "24/7 Support", desc: "Dedicated coordinators" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="mb-2">{item.icon}</div>
                  <div className="font-bold text-primary text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">What We Treat</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Comprehensive Medical Treatments</h2>
              <p className="text-gray-500 text-lg">Click any specialty to explore detailed treatments, sub-procedures, and costs.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 60}>
                <div
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="group cursor-pointer border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md hover:border-[#b8962a]/40 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-5">
                    {serviceIcons[service.slug]}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-[#b8962a] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                  <div className="flex items-center gap-1 text-[#b8962a] text-sm font-semibold">
                    <span>{service.subServices.length} procedures</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Support Services Card */}
            <FadeIn delay={services.length * 60}>
              <div className="border border-primary rounded-2xl p-6 bg-primary text-white shadow-sm col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-1">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <CheckCircle2 className="h-8 w-8 text-[#b8962a]" />
                </div>
                <h3 className="text-lg font-bold mb-3">Patient Support Services</h3>
                <ul className="space-y-2">
                  {[
                    "Free medical consultation",
                    "Hospital & doctor selection",
                    "Medical visa assistance",
                    "Airport pickup & local transport",
                    "Accommodation arrangement",
                    "Language support",
                    "Post-treatment follow-up"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-[#b8962a] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-[#f8f9fb] border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">The Process</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Your Journey in 5 Simple Steps</h2>
              <p className="text-gray-500 text-lg">From your first enquiry to returning home — we manage everything.</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-px bg-gray-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Share Reports", desc: "Send us your medical records, diagnosis, and reports securely via email or WhatsApp." },
                { step: "02", title: "Expert Opinion", desc: "Our medical team reviews your case and provides a detailed treatment plan with cost estimate." },
                { step: "03", title: "Plan Your Trip", desc: "We arrange visa support, hospital admission, flights, and accommodation on your behalf." },
                { step: "04", title: "Treatment in India", desc: "Arrive in India for your procedure. Our coordinator is with you from the airport to the hospital." },
                { step: "05", title: "Recovery & Home", desc: "Complete your recovery in India, then return home with full follow-up support from our team." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full bg-white border-4 border-[#b8962a] flex flex-col items-center justify-center shadow-lg mb-6">
                    <span className="text-xs font-bold text-[#b8962a] uppercase tracking-widest">Step</span>
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn className="mt-12 text-center">
            <Button size="lg" className="h-12 px-8 font-bold bg-[#b8962a] hover:bg-[#a07d20] text-white" onClick={() => scrollTo("contact")}>
              Start Your Journey Today
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* OUR DOCTORS — slider */}
      <DoctorsSlider />

      {/* HOSPITAL PARTNERS — slider */}
      <HospitalsSlider />

      {/* DELHI NCR FOCUS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Our Primary Focus</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3 mb-5">
                Delhi NCR Based Care Network
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                HealthQuest India currently operates in Delhi NCR only. We coordinate treatment at trusted hospitals in New Delhi and Gurugram with end-to-end local support from admission planning to recovery follow-up.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: <MapPin className="h-5 w-5 text-[#b8962a]" />, text: "Hospitals across New Delhi and Gurugram only" },
                  { icon: <Languages className="h-5 w-5 text-[#b8962a]" />, text: "English and Hindi speaking coordinators available 24/7" },
                  { icon: <Users className="h-5 w-5 text-[#b8962a]" />, text: "Dedicated in-city support for patients and attendants" },
                  { icon: <Award className="h-5 w-5 text-[#b8962a]" />, text: "Care aligned with JCI/NABH accredited facilities" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-gray-700">
                    {item.icon}
                    {item.text}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="h-12 px-8 bg-primary text-white font-bold" onClick={() => scrollTo("contact")}>
                Speak to Our Delhi Care Team
              </Button>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "15,000+", label: "International Patients" },
                  { value: "50+", label: "Countries Served" },
                  { value: "98%", label: "Patient Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                ].map((stat, i) => (
                  <div key={i} className="bg-primary rounded-2xl p-6 text-center text-white">
                    <div className="text-3xl font-bold text-[#b8962a] mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
                <div className="col-span-2 bg-[#f8f9fb] border border-gray-100 rounded-2xl p-6">
                  <blockquote className="text-gray-600 italic text-sm leading-relaxed mb-4">
                    "Our Delhi NCR care coordinators stay with you throughout treatment planning, hospital visits, and post-procedure recovery for a smooth local experience."
                  </blockquote>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-[#b8962a] fill-[#b8962a]" />)}
                    <span className="text-xs text-gray-500 ml-2">Trusted in Delhi NCR</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* COST COMPARISON */}
      <section id="cost-comparison" className="py-20 bg-[#f8f9fb] border-t border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">See How Much You Save</h2>
              <p className="text-gray-500 text-lg">Real cost comparisons — world-class care at a fraction of the price.</p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                  <tr>
                    <th className="py-5 px-6 text-left font-bold text-primary bg-gray-50 border-b border-gray-100">Treatment</th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-600 bg-gray-50 border-b border-gray-100">USA</th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-600 bg-gray-50 border-b border-gray-100">UK</th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-600 bg-gray-50 border-b border-gray-100">Turkey</th>
                    <th className="py-5 px-6 text-center font-bold bg-primary text-white border-b border-primary/20 relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#b8962a] text-white font-bold text-[10px] py-1 px-2.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                        Best Choice
                      </div>
                      India
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Heart Bypass (CABG)", us: "$120,000", uk: "$45,000", tr: "$15,000", in: "$6,500", savings: "Save $113,500 vs USA" },
                    { name: "Knee Replacement", us: "$40,000", uk: "$18,000", tr: "$10,000", in: "$5,000", savings: "Save $35,000 vs USA" },
                    { name: "Cancer Treatment", us: "$90,000", uk: "$40,000", tr: "$20,000", in: "$7,000", savings: "Save $83,000 vs USA" },
                    { name: "IVF Cycle", us: "$15,000", uk: "$10,000", tr: "$5,000", in: "$3,000", savings: "Save $12,000 vs USA" },
                    { name: "Kidney Transplant", us: "$150,000", uk: "$70,000", tr: "$25,000", in: "$16,000", savings: "Save $134,000 vs USA" },
                    { name: "Spinal Surgery", us: "$50,000", uk: "$30,000", tr: "$12,000", in: "$6,000", savings: "Save $44,000 vs USA" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div>{row.name}</div>
                        <div className="text-xs text-green-600 font-semibold mt-0.5">{row.savings}</div>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-400 line-through text-sm">{row.us}</td>
                      <td className="py-4 px-6 text-center text-gray-400 line-through text-sm">{row.uk}</td>
                      <td className="py-4 px-6 text-center text-gray-500 text-sm">{row.tr}</td>
                      <td className="py-4 px-6 text-center font-bold text-[#b8962a] text-lg bg-primary/5 border-x-2 border-[#b8962a]">{row.in}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">* Approximate averages. Actual costs vary by patient condition, hospital, and surgeon.</p>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Patients Who Trusted Us</h2>
              <p className="text-gray-500 text-lg">Real stories from patients treated through our Delhi NCR network.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Emmanuel O.",
                country: "Abuja, Nigeria",
                treatment: "Heart Bypass Surgery",
                quote: "The care I received through HealthQuest was exceptional. From the airport pickup to my successful surgery at Fortis Heart Institute, everything was flawlessly organized. I saved over $80,000 compared to what I was quoted in the UK."
              },
              {
                name: "Grace K.",
                country: "Dhaka, Bangladesh",
                treatment: "Bilateral Knee Replacement",
                quote: "I had not been able to walk properly for three years. The doctors in Delhi were outstanding. HealthQuest's coordinator was with me every single day. I am back home and walking without pain — something I thought would never happen."
              },
              {
                name: "Samuel A.",
                country: "Kathmandu, Nepal",
                treatment: "Oncology — Colon Cancer",
                quote: "Facing cancer abroad is frightening. But HealthQuest made the entire process seamless. The hospital was world-class. The doctors explained everything clearly. I am cancer-free one year later and deeply grateful."
              }
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Card className="border border-gray-100 shadow-sm rounded-2xl h-full">
                  <CardContent className="p-7 flex flex-col h-full">
                    <div className="flex gap-1 mb-5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-[#b8962a] fill-[#b8962a]" />)}
                    </div>
                    <p className="text-gray-600 italic leading-relaxed flex-1 mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-base shrink-0">
                        {testimonial.name.split(" ")[0][0]}{testimonial.name.split(" ")[1]?.[0] ?? ""}
                      </div>
                      <div>
                        <div className="font-bold text-primary">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.country} · {testimonial.treatment}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="contact" className="py-20 bg-[#f8f9fb] border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-5 h-full">
              {/* Info side */}
              <div className="md:col-span-2 bg-primary p-10 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get a Free Treatment Plan</h2>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    Share your details and medical condition. Our medical experts will review your case and send a detailed treatment plan with cost estimate within 24 hours — completely free.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: <CheckCircle2 className="h-5 w-5 text-[#b8962a]" />, text: "100% free and no obligation" },
                      { icon: <CheckCircle2 className="h-5 w-5 text-[#b8962a]" />, text: "Response within 24 hours" },
                      { icon: <CheckCircle2 className="h-5 w-5 text-[#b8962a]" />, text: "Medical expert review" },
                      { icon: <CheckCircle2 className="h-5 w-5 text-[#b8962a]" />, text: "Detailed cost estimate included" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        {item.icon}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 space-y-3">
                  <a href="mailto:info@healthquestindia.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 text-[#b8962a]" />
                    info@healthquestindia.com
                  </a>
                  <a href="tel:+918527264675" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <Phone className="h-4 w-4 text-[#b8962a]" />
                    +91-8527264675
                  </a>
                  <a href="https://wa.me/918527264675" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <MessageCircle className="h-4 w-4 text-[#b8962a]" />
                    WhatsApp us 24/7
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-3 p-10">
                {formStatus === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <CheckCircle2 className="h-20 w-20 text-green-500 mb-5" />
                    <h3 className="text-2xl font-bold text-primary mb-3">Request Received!</h3>
                    <p className="text-gray-500 mb-6">Our medical coordination team will review your case and contact you within 24 hours with a detailed treatment plan.</p>
                    <Button variant="outline" onClick={() => setFormStatus("idle")}>Submit Another Query</Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-primary mb-1">Your Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required placeholder="Your full name" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="country">Country *</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry} required>
                          <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                            <SelectItem value="Kenya">Kenya</SelectItem>
                            <SelectItem value="South Africa">South Africa</SelectItem>
                            <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                            <SelectItem value="Tanzania">Tanzania</SelectItem>
                            <SelectItem value="Uganda">Uganda</SelectItem>
                            <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                            <SelectItem value="Nepal">Nepal</SelectItem>
                            <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input id="phone" required placeholder="+234 800 000 0000" type="tel" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="treatment">Treatment Needed *</Label>
                      <Select value={selectedTreatment} onValueChange={setSelectedTreatment} required>
                        <SelectTrigger><SelectValue placeholder="Select treatment" /></SelectTrigger>
                        <SelectContent>
                          {services.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}
                          <SelectItem value="liver-transplant">Liver Transplant</SelectItem>
                          <SelectItem value="bone-marrow-transplant">Bone Marrow Transplant</SelectItem>
                          <SelectItem value="other">Other / Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Brief Description</Label>
                      <textarea
                        id="message"
                        placeholder="Briefly describe your condition or what you need..."
                        rows={3}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                      />
                    </div>
                    <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
                      📎 To share medical reports, send them directly via <a href="https://wa.me/918527264675" className="text-[#25D366] font-semibold" target="_blank" rel="noreferrer">WhatsApp</a> after submitting.
                    </p>
                    {formError && (
                      <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        ⚠️ {formError}
                      </div>
                    )}
                    <Button type="submit" size="lg" className="w-full h-12 font-bold text-base bg-[#b8962a] hover:bg-[#a07d20] text-white" disabled={formStatus === "submitting"}>
                      {formStatus === "submitting" ? "Sending…" : "Get My Free Treatment Plan"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="text-[#b8962a] text-sm font-bold uppercase tracking-widest">FAQs</span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">Common Questions</h2>
              </div>
            </FadeIn>
            <FadeIn>
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  { q: "How much does treatment cost in India?", a: "Treatment costs in India are typically 50–80% lower than in the USA and UK. A heart bypass surgery that costs $120,000 in the USA costs approximately $6,500 in India at a JCI-accredited hospital. We provide a detailed cost estimate based on your specific condition and chosen hospital — completely free." },
                  { q: "How do I apply for a medical visa for India?", a: "India offers a dedicated Medical Visa (M-Visa) for international patients. We provide you with a hospital invitation letter and guide you through the entire application process. The medical visa allows you, plus up to 2 attendants, to stay in India for the duration of your treatment. Processing typically takes 5–10 business days." },
                  { q: "How long do I need to stay in India?", a: "The duration depends on your treatment. For example, a knee replacement requires approximately 3–4 weeks (1 week hospital, 2–3 weeks physiotherapy). A heart bypass typically requires 4–5 weeks. We provide a personalized stay estimate along with your treatment plan. You should not plan to return home before your doctor clears you for travel." },
                  { q: "Is India safe for international patients?", a: "Yes. Our current operations are focused in New Delhi and Gurugram (Delhi NCR), where our partner hospitals have dedicated international patient facilities. Our coordinators are with you 24/7 throughout your stay." },
                  { q: "Will I face language barriers in India?", a: "No. English is widely spoken in all our partner hospitals. All doctors, nurses, and our coordination team are fully fluent in English. Additionally, we provide personal language support for patients who need it, and your HealthQuest coordinator serves as your advocate and guide throughout the process." },
                  { q: "What happens after I return home?", a: "We provide complete post-treatment follow-up support. Your Indian doctor will send detailed discharge summaries and ongoing care instructions to your local doctor. We arrange telemedicine consultations for remote follow-up and are available 24/7 if you have any post-treatment concerns. Your care does not end when you board the plane home." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border border-gray-100 rounded-xl px-6 shadow-sm bg-white data-[state=open]:border-[#b8962a]/30 data-[state=open]:shadow-md transition-all">
                    <AccordionTrigger className="font-semibold text-primary text-left hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
