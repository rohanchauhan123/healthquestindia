import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { ServiceDetail } from "@/pages/ServiceDetail";
import { SubServiceDetail } from "@/pages/SubServiceDetail";
import { Doctors } from "@/pages/Doctors";
import { DoctorDetail } from "@/pages/DoctorDetail";
import { Hospitals } from "@/pages/Hospitals";
import { HospitalDetail } from "@/pages/HospitalDetail";
import { Costs } from "@/pages/Costs";
import { Blogs } from "@/pages/Blogs";
import { BlogDetail } from "@/pages/BlogDetail";
import { TransplantDetail } from "@/pages/TransplantDetail";
import { Admin } from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/918527264675"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href="tel:+918527264675"
        aria-label="Call us"
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

function AppRoutes() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <Switch>
        <Route path="/admin" component={Admin} />
      </Switch>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/costs" component={Costs} />
          <Route path="/services/:slug">
            {(params: { slug: string }) => <ServiceDetail slug={params.slug} />}
          </Route>
          <Route path="/services/:serviceSlug/:subSlug">
            {(params: { serviceSlug: string; subSlug: string }) => (
              <SubServiceDetail serviceSlug={params.serviceSlug} subSlug={params.subSlug} />
            )}
          </Route>
          <Route path="/doctors" component={Doctors} />
          <Route path="/doctors/:slug">
            {(params: { slug: string }) => <DoctorDetail slug={params.slug} />}
          </Route>
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/hospitals/:slug">
            {(params: { slug: string }) => <HospitalDetail slug={params.slug} />}
          </Route>
          <Route path="/blogs" component={Blogs} />
          <Route path="/blogs/:slug">
            {(params: { slug: string }) => <BlogDetail slug={params.slug} />}
          </Route>
          <Route path="/transplants/liver-transplant">
            {() => <TransplantDetail type="liver" />}
          </Route>
          <Route path="/transplants/bone-marrow-transplant">
            {() => <TransplantDetail type="bone-marrow" />}
          </Route>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRoutes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
