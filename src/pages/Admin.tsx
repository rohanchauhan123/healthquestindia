import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Lock, LogOut, Users, Building2, Stethoscope, RefreshCcw,
  Plus, Pencil, Trash2, Save, X, Download, Upload, ExternalLink, AlertTriangle, DollarSign, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/hooks/useStore";
import {
  addDoctor, updateDoctor, deleteDoctor,
  addHospital, updateHospital, deleteHospital,
  addService, updateService, deleteService,
  addCostItem, updateCostItem, deleteCostItem,
  addBlogPost, updateBlogPost, deleteBlogPost,
  resetStore, slugify, updateStore,
} from "@/data/store";
import type { Doctor, Hospital, Service, SubService } from "@/data/services";
import type { CostItem } from "@/data/costs";
import type { BlogPost } from "@/data/blogs";

// SHA-256 hash of the admin password (never store plaintext in source)
// Hash of: HealthQuest@2025
const ADMIN_HASH = "a74afaa353dde1aeea769e6ecf02ac647bf7a00e11d3d7ff646f0b58e0b41b04";
const AUTH_KEY = "healthquest-admin-auth";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

type Tab = "dashboard" | "services" | "doctors" | "hospitals" | "costs" | "blogs";

export function Admin() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  });
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (pw: string) => {
    const hash = await sha256(pw);
    if (hash === ADMIN_HASH) {
      window.sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };
  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginPage onLogin={handleLogin} error={loginError} />;

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-sans">
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-[#b8962a]" />
            <h1 className="font-bold text-lg">HealthQuest India · Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </a>
            <button onClick={handleLogout} className="text-sm text-white/70 hover:text-white flex items-center gap-1">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
        <nav className="bg-primary/90 border-t border-white/10">
          <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
            {([
              { id: "dashboard", label: "Dashboard", icon: <RefreshCcw className="h-4 w-4" /> },
              { id: "services", label: "Services", icon: <Stethoscope className="h-4 w-4" /> },
              { id: "doctors", label: "Doctors", icon: <Users className="h-4 w-4" /> },
              { id: "hospitals", label: "Hospitals", icon: <Building2 className="h-4 w-4" /> },
              { id: "costs", label: "Costs", icon: <DollarSign className="h-4 w-4" /> },
              { id: "blogs", label: "Blogs", icon: <FileText className="h-4 w-4" /> },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id ? "border-[#b8962a] text-white" : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tab === "dashboard" && <Dashboard onTab={setTab} />}
        {tab === "services" && <ServicesAdmin />}
        {tab === "doctors" && <DoctorsAdmin />}
        {tab === "hospitals" && <HospitalsAdmin />}
        {tab === "costs" && <CostsAdmin />}
        {tab === "blogs" && <BlogsAdmin />}
      </main>
    </div>
  );
}

/* ────────────  LOGIN  ──────────── */
function LoginPage({ onLogin, error }: { onLogin: (pw: string) => void; error: string }) {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onLogin(pw);
    setLoading(false);
    setPw("");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
          <Lock className="h-7 w-7 text-[#b8962a]" />
        </div>
        <h1 className="text-2xl font-bold text-primary text-center mb-1">Admin Access</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Sign in to manage HealthQuest India content</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-pw">Password</Label>
            <Input
              id="admin-pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1"
              autoFocus
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={loading || !pw}
            className="w-full bg-[#b8962a] hover:bg-[#a07d20] text-white font-bold h-11"
          >
            {loading ? "Verifying…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ────────────  DASHBOARD  ──────────── */
function Dashboard({ onTab }: { onTab: (t: Tab) => void }) {
  const { services, doctors, hospitals, costItems, blogPosts } = useStore();

  const exportData = () => {
    const data = JSON.stringify({ services, doctors, hospitals, costItems, blogPosts }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healthquest-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result));
        updateStore(() => ({
          services: parsed.services || services,
          doctors: parsed.doctors || doctors,
          hospitals: parsed.hospitals || hospitals,
          costItems: Array.isArray(parsed.costItems) ? parsed.costItems : costItems,
          blogPosts: Array.isArray(parsed.blogPosts) ? parsed.blogPosts : blogPosts,
        }));
        alert("Data imported successfully");
      } catch {
        alert("Invalid backup file");
      }
    };
    reader.readAsText(file);
  };

  const subCount = services.reduce((s, sv) => s + sv.subServices.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-1">Dashboard</h2>
        <p className="text-gray-500 text-sm">Manage your medical tourism content</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Specialties", value: services.length, icon: <Stethoscope className="h-5 w-5" />, tab: "services" as const },
          { label: "Sub-procedures", value: subCount, icon: <Stethoscope className="h-5 w-5" />, tab: "services" as const },
          { label: "Doctors", value: doctors.length, icon: <Users className="h-5 w-5" />, tab: "doctors" as const },
          { label: "Hospitals", value: hospitals.length, icon: <Building2 className="h-5 w-5" />, tab: "hospitals" as const },
          { label: "Cost rows", value: costItems.length, icon: <DollarSign className="h-5 w-5" />, tab: "costs" as const },
          { label: "Blogs", value: blogPosts.length, icon: <FileText className="h-5 w-5" />, tab: "blogs" as const },
        ].map((s, i) => (
          <button key={i} onClick={() => onTab(s.tab)}
            className="bg-white border border-gray-100 rounded-2xl p-5 text-left hover:shadow-md hover:border-[#b8962a]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-4">{s.icon}</div>
            <div className="text-3xl font-black text-primary">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h3 className="font-bold text-primary mb-2">Backup & Restore</h3>
        <p className="text-sm text-gray-500 mb-4">All data is stored in your browser. Export a backup to save it, or import from a backup file.</p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={exportData} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Download className="h-4 w-4 mr-2" /> Export backup (JSON)
          </Button>
          <label className="cursor-pointer">
            <input type="file" accept=".json,application/json" className="hidden" onChange={importData} />
            <span className="inline-flex items-center justify-center text-sm font-medium border border-primary text-primary hover:bg-primary hover:text-white h-9 px-3 rounded-md transition-colors">
              <Upload className="h-4 w-4 mr-2" /> Import backup
            </span>
          </label>
          <Button
            onClick={() => { if (confirm("Reset everything to default seed data? This cannot be undone.")) resetStore(); }}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <RefreshCcw className="h-4 w-4 mr-2" /> Reset to defaults
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────  DOCTORS ADMIN  ──────────── */
function DoctorsAdmin() {
  const { doctors } = useStore();
  const [editing, setEditing] = useState<Doctor | "new" | null>(null);

  const newDoctor = (): Doctor => ({
    slug: "",
    name: "",
    specialty: "",
    experience: "",
    hospital: "",
    qualifications: "",
    patientsFromAbroad: "",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop",
    bio: "",
    expertise: [],
    languages: [],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Doctors</h2>
          <p className="text-gray-500 text-sm">{doctors.length} doctors in your directory</p>
        </div>
        <Button onClick={() => setEditing("new")} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
          <Plus className="h-4 w-4 mr-1" /> Add Doctor
        </Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Doctor</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Specialty</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Hospital</th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(d => (
              <tr key={d.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={d.photo} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-100" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                    <div>
                      <div className="font-bold text-primary text-sm">{d.name}</div>
                      <div className="text-xs text-gray-400">{d.experience}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{d.specialty}</td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{d.hospital}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(d)} className="p-1.5 text-gray-400 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm(`Delete ${d.name}?`)) deleteDoctor(d.slug); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <DoctorForm
          initial={editing === "new" ? newDoctor() : editing}
          isNew={editing === "new"}
          onClose={() => setEditing(null)}
          onSave={(d) => {
            const finalSlug = d.slug || slugify(d.name);
            const final = { ...d, slug: finalSlug };
            if (editing === "new") {
              if (doctors.some(x => x.slug === finalSlug)) { alert("A doctor with this slug already exists"); return; }
              addDoctor(final);
            } else {
              updateDoctor((editing as Doctor).slug, final);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function DoctorForm({ initial, isNew, onClose, onSave }: { initial: Doctor; isNew: boolean; onClose: () => void; onSave: (d: Doctor) => void }) {
  const [d, setD] = useState<Doctor>(initial);
  const set = <K extends keyof Doctor>(k: K, v: Doctor[K]) => setD({ ...d, [k]: v });

  return (
    <Modal onClose={onClose} title={isNew ? "Add Doctor" : `Edit ${initial.name}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *"><Input value={d.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Slug (URL)"><Input value={d.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name" /></Field>
        <Field label="Specialty *"><Input value={d.specialty} onChange={(e) => set("specialty", e.target.value)} /></Field>
        <Field label="Experience"><Input value={d.experience} onChange={(e) => set("experience", e.target.value)} placeholder="e.g. 22 years" /></Field>
        <Field label="Hospital"><Input value={d.hospital} onChange={(e) => set("hospital", e.target.value)} /></Field>
        <Field label="Intl. patients"><Input value={d.patientsFromAbroad} onChange={(e) => set("patientsFromAbroad", e.target.value)} placeholder="e.g. 500+" /></Field>
        <Field label="Qualifications" className="sm:col-span-2"><Input value={d.qualifications} onChange={(e) => set("qualifications", e.target.value)} /></Field>
        <div className="sm:col-span-2">
          <ImageUpload value={d.photo} onChange={(val) => set("photo", val)} label="Doctor Photo" />
        </div>
        <Field label="Bio" className="sm:col-span-2">
          <textarea value={d.bio} onChange={(e) => set("bio", e.target.value)} rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="Areas of expertise (comma separated)" className="sm:col-span-2">
          <Input value={d.expertise.join(", ")} onChange={(e) => set("expertise", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </Field>
        <Field label="Languages (comma separated)" className="sm:col-span-2">
          <Input value={d.languages.join(", ")} onChange={(e) => set("languages", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </Field>
      </div>
      <FormActions onCancel={onClose} onSave={() => { if (!d.name || !d.specialty) { alert("Name and Specialty are required"); return; } onSave(d); }} />
    </Modal>
  );
}

/* ────────────  HOSPITALS ADMIN  ──────────── */
function HospitalsAdmin() {
  const { hospitals } = useStore();
  const [editing, setEditing] = useState<Hospital | "new" | null>(null);

  const newHospital = (): Hospital => ({
    slug: "",
    name: "",
    city: "",
    established: "",
    beds: 0,
    accreditation: ["JCI", "NABH"],
    specialties: [],
    photo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80&fit=crop",
    description: "",
    facilities: [],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Hospitals</h2>
          <p className="text-gray-500 text-sm">{hospitals.length} hospitals in your directory</p>
        </div>
        <Button onClick={() => setEditing("new")} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
          <Plus className="h-4 w-4 mr-1" /> Add Hospital
        </Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Hospital</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">City</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Beds</th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(h => (
              <tr key={h.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={h.photo} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
                    <div>
                      <div className="font-bold text-primary text-sm">{h.name}</div>
                      <div className="text-xs text-gray-400">{h.accreditation.join(", ")}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{h.city}</td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{h.beds}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(h)} className="p-1.5 text-gray-400 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm(`Delete ${h.name}?`)) deleteHospital(h.slug); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <HospitalForm
          initial={editing === "new" ? newHospital() : editing}
          isNew={editing === "new"}
          onClose={() => setEditing(null)}
          onSave={(h) => {
            const finalSlug = h.slug || slugify(h.name);
            const final = { ...h, slug: finalSlug };
            if (editing === "new") {
              if (hospitals.some(x => x.slug === finalSlug)) { alert("A hospital with this slug already exists"); return; }
              addHospital(final);
            } else {
              updateHospital((editing as Hospital).slug, final);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function HospitalForm({ initial, isNew, onClose, onSave }: { initial: Hospital; isNew: boolean; onClose: () => void; onSave: (h: Hospital) => void }) {
  const [h, setH] = useState<Hospital>(initial);
  const set = <K extends keyof Hospital>(k: K, v: Hospital[K]) => setH({ ...h, [k]: v });
  return (
    <Modal onClose={onClose} title={isNew ? "Add Hospital" : `Edit ${initial.name}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *"><Input value={h.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Slug"><Input value={h.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from name" /></Field>
        <Field label="City *"><Input value={h.city} onChange={(e) => set("city", e.target.value)} /></Field>
        <Field label="Established"><Input value={h.established} onChange={(e) => set("established", e.target.value)} placeholder="e.g. 1983" /></Field>
        <Field label="Beds"><Input type="number" value={h.beds || ""} onChange={(e) => set("beds", Number(e.target.value) || 0)} /></Field>
        <Field label="Accreditation (comma)"><Input value={h.accreditation.join(", ")} onChange={(e) => set("accreditation", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></Field>
        <div className="sm:col-span-2">
          <ImageUpload value={h.photo} onChange={(val) => set("photo", val)} label="Hospital Photo" />
        </div>
        <Field label="Description" className="sm:col-span-2">
          <textarea value={h.description} onChange={(e) => set("description", e.target.value)} rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="Specialties (comma)" className="sm:col-span-2">
          <Input value={h.specialties.join(", ")} onChange={(e) => set("specialties", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </Field>
        <Field label="Facilities (comma)" className="sm:col-span-2">
          <Input value={h.facilities.join(", ")} onChange={(e) => set("facilities", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </Field>
      </div>
      <FormActions onCancel={onClose} onSave={() => { if (!h.name || !h.city) { alert("Name and City are required"); return; } onSave(h); }} />
    </Modal>
  );
}

/* ────────────  COSTS ADMIN  ──────────── */
function CostsAdmin() {
  const { costItems } = useStore();
  const [editing, setEditing] = useState<CostItem | "new" | null>(null);

  const newCost = (): CostItem => ({
    id: "",
    title: "",
    category: "",
    description: "",
    priceMinUsd: 0,
    priceMaxUsd: 0,
    notes: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Costs &amp; pricing</h2>
          <p className="text-gray-500 text-sm">
            All amounts are stored in <strong>USD</strong>. Visitors choose display currency on the public{" "}
            <a href="/costs" className="text-primary underline" target="_blank" rel="noreferrer">
              /costs
            </a>{" "}
            page.
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
          <Plus className="h-4 w-4 mr-1" /> Add row
        </Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Title</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">USD range</th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {costItems.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-bold text-primary text-sm">{c.title || "—"}</div>
                  <div className="text-xs text-gray-400 line-clamp-2 md:hidden">{c.category}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{c.category}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-[#b8962a] whitespace-nowrap">
                  ${c.priceMinUsd.toLocaleString()} – ${c.priceMaxUsd.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(c)} className="p-1.5 text-gray-400 hover:text-primary">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete “${c.title}”?`)) deleteCostItem(c.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <CostItemForm
          initial={editing === "new" ? newCost() : editing}
          isNew={editing === "new"}
          onClose={() => setEditing(null)}
          onSave={(row) => {
            const min = Number(row.priceMinUsd);
            const max = Number(row.priceMaxUsd);
            if (!row.title.trim() || !row.category.trim()) {
              alert("Title and category are required");
              return;
            }
            if (Number.isNaN(min) || Number.isNaN(max) || min < 0 || max < 0) {
              alert("Prices must be valid non-negative numbers");
              return;
            }
            if (min > max) {
              alert("Minimum USD cannot be greater than maximum USD");
              return;
            }
            const normalized: CostItem = {
              ...row,
              title: row.title.trim(),
              category: row.category.trim(),
              description: row.description.trim(),
              priceMinUsd: min,
              priceMaxUsd: max,
              notes: row.notes?.trim() || undefined,
            };
            if (editing === "new") {
              addCostItem(normalized);
            } else {
              updateCostItem((editing as CostItem).id, normalized);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function CostItemForm({
  initial,
  isNew,
  onClose,
  onSave,
}: {
  initial: CostItem;
  isNew: boolean;
  onClose: () => void;
  onSave: (c: CostItem) => void;
}) {
  const [c, setC] = useState<CostItem>(initial);
  const set = <K extends keyof CostItem>(k: K, v: CostItem[K]) => setC({ ...c, [k]: v });

  return (
    <Modal onClose={onClose} title={isNew ? "Add cost row" : `Edit ${initial.title}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *" className="sm:col-span-2">
          <Input value={c.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Total hip replacement" />
        </Field>
        <Field label="Category *">
          <Input value={c.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Orthopedics" />
        </Field>
        <Field label="Notes">
          <Input value={c.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Optional" />
        </Field>
        <Field label="Min price (USD) *">
          <Input
            type="number"
            min={0}
            step={1}
            value={c.priceMinUsd}
            onChange={(e) => set("priceMinUsd", Number(e.target.value) || 0)}
          />
        </Field>
        <Field label="Max price (USD) *">
          <Input
            type="number"
            min={0}
            step={1}
            value={c.priceMaxUsd}
            onChange={(e) => set("priceMaxUsd", Number(e.target.value) || 0)}
          />
        </Field>
        <Field label="Description *" className="sm:col-span-2">
          <textarea
            value={c.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="What the package typically includes"
          />
        </Field>
      </div>
      <FormActions
        onCancel={onClose}
        onSave={() => {
          onSave(c);
        }}
      />
    </Modal>
  );
}

/* ────────────  BLOGS ADMIN  ──────────── */
function BlogsAdmin() {
  const { blogPosts } = useStore();
  const [editing, setEditing] = useState<BlogPost | "new" | null>(null);

  const newBlog = (): BlogPost => ({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80&fit=crop",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],
    publishedAt: new Date().toISOString().slice(0, 10),
  });

  const sorted = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Blogs</h2>
          <p className="text-gray-500 text-sm">{blogPosts.length} blog posts with SEO metadata</p>
        </div>
        <Button onClick={() => setEditing("new")} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
          <Plus className="h-4 w-4 mr-1" /> Add Blog
        </Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Title</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Slug</th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b) => (
              <tr key={b.slug} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-bold text-primary text-sm">{b.title}</div>
                  <div className="text-xs text-gray-400 line-clamp-1">{b.excerpt}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{b.slug}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{b.publishedAt}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(b)} className="p-1.5 text-gray-400 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm(`Delete "${b.title}"?`)) deleteBlogPost(b.slug); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <BlogForm
          initial={editing === "new" ? newBlog() : editing}
          isNew={editing === "new"}
          onClose={() => setEditing(null)}
          onSave={(blog) => {
            const finalSlug = blog.slug || slugify(blog.title);
            const final = { ...blog, slug: finalSlug };
            if (editing === "new") {
              if (blogPosts.some((x) => x.slug === finalSlug)) { alert("A blog with this slug already exists"); return; }
              addBlogPost(final);
            } else {
              updateBlogPost((editing as BlogPost).slug, final);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function BlogForm({ initial, isNew, onClose, onSave }: { initial: BlogPost; isNew: boolean; onClose: () => void; onSave: (b: BlogPost) => void }) {
  const [b, setB] = useState<BlogPost>(initial);
  const set = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) => setB({ ...b, [k]: v });

  return (
    <Modal onClose={onClose} title={isNew ? "Add Blog" : `Edit ${initial.title}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *" className="sm:col-span-2"><Input value={b.title} onChange={(e) => set("title", e.target.value)} /></Field>
        <Field label="Slug"><Input value={b.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" /></Field>
        <Field label="Published date"><Input type="date" value={b.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} /></Field>
        <Field label="Excerpt *" className="sm:col-span-2">
          <textarea value={b.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="Cover image URL *" className="sm:col-span-2">
          <Input value={b.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} />
        </Field>
        <Field label="Content *" className="sm:col-span-2">
          <textarea value={b.content} onChange={(e) => set("content", e.target.value)} rows={6}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="SEO title" className="sm:col-span-2"><Input value={b.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} /></Field>
        <Field label="SEO description" className="sm:col-span-2">
          <textarea value={b.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="SEO keywords (comma separated)" className="sm:col-span-2">
          <Input value={b.seoKeywords.join(", ")} onChange={(e) => set("seoKeywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </Field>
      </div>
      <FormActions onCancel={onClose} onSave={() => {
        if (!b.title.trim() || !b.excerpt.trim() || !b.content.trim() || !b.imageUrl.trim()) { alert("Title, excerpt, content, and image URL are required"); return; }
        onSave({
          ...b,
          title: b.title.trim(),
          excerpt: b.excerpt.trim(),
          content: b.content.trim(),
          imageUrl: b.imageUrl.trim(),
          seoTitle: (b.seoTitle || b.title).trim(),
          seoDescription: (b.seoDescription || b.excerpt).trim(),
        });
      }} />
    </Modal>
  );
}

/* ────────────  SERVICES ADMIN  ──────────── */
function ServicesAdmin() {
  const { services } = useStore();
  const [editing, setEditing] = useState<Service | "new" | null>(null);
  const [editingSubFor, setEditingSubFor] = useState<{ service: Service; sub: SubService | "new" } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const newService = (): Service => ({
    slug: "",
    name: "",
    shortDesc: "",
    fullDesc: "",
    heroStat: "70%",
    heroStatLabel: "Lower cost",
    subServices: [],
    conditions: [],
    whyIndia: [],
  });

  const newSub = (): SubService => ({ slug: "", name: "", description: "", duration: "", costRange: "" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Services</h2>
          <p className="text-gray-500 text-sm">{services.length} specialties · click any to manage its sub-procedures</p>
        </div>
        <Button onClick={() => setEditing("new")} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.slug} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpanded(expanded === s.slug ? null : s.slug)}>
              <div>
                <div className="font-bold text-primary">{s.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.subServices.length} procedures · {s.heroStat} {s.heroStatLabel}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setEditing(s); }} className="p-1.5 text-gray-400 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={(e) => { e.stopPropagation(); if (confirm(`Delete ${s.name}?`)) deleteService(s.slug); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            {expanded === s.slug && (
              <div className="border-t border-gray-100 p-5 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-primary">Sub-procedures</h4>
                  <Button size="sm" onClick={() => setEditingSubFor({ service: s, sub: "new" })} className="bg-[#b8962a] hover:bg-[#a07d20] text-white h-8">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {s.subServices.map(sub => (
                    <div key={sub.slug} className="bg-white border border-gray-100 rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-primary text-sm">{sub.name}</div>
                        <div className="text-xs text-gray-400">{sub.costRange} · {sub.duration}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingSubFor({ service: s, sub })} className="p-1 text-gray-400 hover:text-primary"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => {
                          if (confirm(`Delete ${sub.name}?`)) {
                            updateService(s.slug, { ...s, subServices: s.subServices.filter(x => x.slug !== sub.slug) });
                          }
                        }} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  ))}
                  {s.subServices.length === 0 && <div className="text-sm text-gray-400 text-center py-3">No sub-procedures yet</div>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <ServiceForm
          initial={editing === "new" ? newService() : editing}
          isNew={editing === "new"}
          onClose={() => setEditing(null)}
          onSave={(svc) => {
            const finalSlug = svc.slug || slugify(svc.name);
            const final = { ...svc, slug: finalSlug };
            if (editing === "new") {
              if (services.some(x => x.slug === finalSlug)) { alert("Slug exists"); return; }
              addService(final);
            } else {
              updateService((editing as Service).slug, final);
            }
            setEditing(null);
          }}
        />
      )}

      {editingSubFor && (
        <SubServiceForm
          initial={editingSubFor.sub === "new" ? newSub() : editingSubFor.sub}
          isNew={editingSubFor.sub === "new"}
          onClose={() => setEditingSubFor(null)}
          onSave={(sub) => {
            const svc = editingSubFor.service;
            const finalSlug = sub.slug || slugify(sub.name);
            const final = { ...sub, slug: finalSlug };
            const updated: Service = editingSubFor.sub === "new"
              ? { ...svc, subServices: [...svc.subServices, final] }
              : { ...svc, subServices: svc.subServices.map(x => x.slug === (editingSubFor.sub as SubService).slug ? final : x) };
            updateService(svc.slug, updated);
            setEditingSubFor(null);
          }}
        />
      )}
    </div>
  );
}

function ServiceForm({ initial, isNew, onClose, onSave }: { initial: Service; isNew: boolean; onClose: () => void; onSave: (s: Service) => void }) {
  const [s, setS] = useState<Service>(initial);
  const set = <K extends keyof Service>(k: K, v: Service[K]) => setS({ ...s, [k]: v });
  return (
    <Modal onClose={onClose} title={isNew ? "Add Service" : `Edit ${initial.name}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *"><Input value={s.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Slug"><Input value={s.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto" /></Field>
        <Field label="Hero stat (e.g. 70%)"><Input value={s.heroStat} onChange={(e) => set("heroStat", e.target.value)} /></Field>
        <Field label="Hero stat label"><Input value={s.heroStatLabel} onChange={(e) => set("heroStatLabel", e.target.value)} /></Field>
        <Field label="Short description *" className="sm:col-span-2">
          <textarea value={s.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} rows={2}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="Full description" className="sm:col-span-2">
          <textarea value={s.fullDesc} onChange={(e) => set("fullDesc", e.target.value)} rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
        <Field label="Conditions treated (comma)" className="sm:col-span-2">
          <Input value={s.conditions.join(", ")} onChange={(e) => set("conditions", e.target.value.split(",").map(x => x.trim()).filter(Boolean))} />
        </Field>
        <Field label="Why India (one per line)" className="sm:col-span-2">
          <textarea value={s.whyIndia.join("\n")} onChange={(e) => set("whyIndia", e.target.value.split("\n").map(x => x.trim()).filter(Boolean))} rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
      </div>
      <FormActions onCancel={onClose} onSave={() => { if (!s.name || !s.shortDesc) { alert("Name and Short description are required"); return; } onSave(s); }} />
    </Modal>
  );
}

function SubServiceForm({ initial, isNew, onClose, onSave }: { initial: SubService; isNew: boolean; onClose: () => void; onSave: (s: SubService) => void }) {
  const [s, setS] = useState<SubService>(initial);
  const set = <K extends keyof SubService>(k: K, v: SubService[K]) => setS({ ...s, [k]: v });
  return (
    <Modal onClose={onClose} title={isNew ? "Add Procedure" : `Edit ${initial.name}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *" className="sm:col-span-2"><Input value={s.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Slug"><Input value={s.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto" /></Field>
        <Field label="Cost range *"><Input value={s.costRange} onChange={(e) => set("costRange", e.target.value)} placeholder="$5,000 – $8,000" /></Field>
        <Field label="Duration *" className="sm:col-span-2"><Input value={s.duration} onChange={(e) => set("duration", e.target.value)} placeholder="7–10 days hospital stay" /></Field>
        <Field label="Description *" className="sm:col-span-2">
          <textarea value={s.description} onChange={(e) => set("description", e.target.value)} rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </Field>
      </div>
      <FormActions onCancel={onClose} onSave={() => { if (!s.name) { alert("Name is required"); return; } onSave(s); }} />
    </Modal>
  );
}

function compressImage(file: File, maxWidth = 800, maxHeight = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [preview, setPreview] = useState(value);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      onChange(compressed);
      setPreview(compressed);
    } catch (err) {
      console.error(err);
      alert("Failed to process image file.");
    }
  };

  return (
    <div className="space-y-2 border border-gray-200 rounded-xl p-4 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <div className="flex gap-1 bg-gray-200/60 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "upload" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "url" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"
            }`}
          >
            URL
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {preview ? (
          <div className="relative group shrink-0">
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border border-gray-200 bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <button
              type="button"
              onClick={() => {
                onChange("");
                setPreview("");
              }}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 transition-colors shadow-sm"
              title="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 shrink-0 text-xs text-center p-2">
            No image
          </div>
        )}

        <div className="flex-1 w-full">
          {mode === "upload" ? (
            <div className="relative flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50/80 hover:border-[#b8962a]/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <Upload className="h-5 w-5 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500 font-medium">Click to upload photo</p>
                  <p className="text-[10px] text-gray-400">PNG, JPG, WEBP (auto-compressed)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            <Input
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setPreview(e.target.value);
              }}
              placeholder="https://example.com/photo.jpg"
              className="bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────  SHARED  ──────────── */
function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-12">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="font-bold text-primary text-lg">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  );
}

function FormActions({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  return (
    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onSave} className="bg-[#b8962a] hover:bg-[#a07d20] text-white">
        <Save className="h-4 w-4 mr-1.5" /> Save
      </Button>
    </div>
  );
}
