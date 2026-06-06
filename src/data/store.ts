import {
  services as seedServices,
  doctors as seedDoctors,
  hospitals as seedHospitals,
  type Service,
  type Doctor,
  type Hospital,
} from "@/data/services";
import { seedCostItems, type CostItem } from "@/data/costs";
import { seedBlogPosts, type BlogPost } from "@/data/blogs";
import { supabase } from "@/lib/supabase";

export interface StoreState {
  services: Service[];
  doctors: Doctor[];
  hospitals: Hospital[];
  costItems: CostItem[];
  blogPosts: BlogPost[];
}

// ── Supabase table name ─────────────────────────────────
const TABLE = "cms_store";
const ROW_ID = 1; // single-row pattern: all CMS data in one JSON column

// ── Defaults (seed data from code) ─────────────────────
const DEFAULTS: StoreState = {
  services: seedServices,
  doctors: seedDoctors,
  hospitals: seedHospitals,
  costItems: seedCostItems,
  blogPosts: seedBlogPosts,
};

// ── Local fallback key (used when Supabase not configured) ──
const LOCAL_KEY = "healthquest-store-v3";

// ── In-memory cache ─────────────────────────────────────
const listeners = new Set<() => void>();
let cached: StoreState = loadFromLocalStorage();
let cachedRev = 0;

function loadFromLocalStorage(): StoreState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return merge(parsed);
  } catch {
    return DEFAULTS;
  }
}

function merge(parsed: Partial<StoreState>): StoreState {
  return {
    services: parsed.services?.length ? parsed.services : DEFAULTS.services,
    doctors: parsed.doctors?.length ? parsed.doctors : DEFAULTS.doctors,
    hospitals: parsed.hospitals?.length ? parsed.hospitals : DEFAULTS.hospitals,
    costItems: Array.isArray(parsed.costItems) ? parsed.costItems : DEFAULTS.costItems,
    blogPosts: Array.isArray(parsed.blogPosts) ? parsed.blogPosts : DEFAULTS.blogPosts,
  };
}

function notify() {
  cachedRev++;
  listeners.forEach((fn) => fn());
}

// ── Load from Supabase on startup ───────────────────────
export async function initStore(): Promise<void> {
  if (!supabase) return; // no Supabase → stay on localStorage

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("id", ROW_ID)
      .maybeSingle(); // maybeSingle returns null instead of throwing 406/PGRST116 when row is missing

    if (error) {
      console.error("Supabase load error:", error);
      return;
    }

    if (!data) {
      // Row doesn't exist yet: insert seed/default data into Supabase
      console.log("Supabase table empty. Seeding defaults...");
      const { error: seedError } = await supabase
        .from(TABLE)
        .insert({ id: ROW_ID, data: DEFAULTS, updated_at: new Date().toISOString() });
      
      if (seedError) {
        console.error("Failed to seed Supabase table:", seedError);
      }
      return; // Defaults are already loaded in cached
    }

    const remote = data.data as Partial<StoreState>;
    cached = merge(remote);
    notify();
  } catch (err) {
    console.error("Failed to initialize store:", err);
    // silently fall back to localStorage
  }
}

// ── Persist to Supabase (upsert) + localStorage ────────
async function persist(next: StoreState) {
  cached = next;

  // Always write to localStorage as a backup
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  } catch { /* noop */ }

  // Write to Supabase if configured
  if (supabase) {
    try {
      await supabase
        .from(TABLE)
        .upsert({ id: ROW_ID, data: next, updated_at: new Date().toISOString() });
    } catch (e) {
      console.error("Supabase write failed — changes saved locally only:", e);
    }
  }

  notify();
}

// ── Public API (unchanged interface) ────────────────────
export function getStoreSnapshot(): StoreState { return cached; }
export function getStoreRev(): number { return cachedRev; }
export function subscribeStore(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function updateStore(updater: (s: StoreState) => StoreState): void {
  persist(updater(cached));
}

export function resetStore(): void {
  try { window.localStorage.removeItem(LOCAL_KEY); } catch { /* noop */ }
  cached = DEFAULTS;
  if (supabase) {
    supabase.from(TABLE).upsert({ id: ROW_ID, data: DEFAULTS, updated_at: new Date().toISOString() }).then();
  }
  notify();
}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ── Doctor CRUD ──────────────────────────────────────────
export function addDoctor(doctor: Doctor) {
  updateStore((s) => ({ ...s, doctors: [...s.doctors, doctor] }));
}
export function updateDoctor(slug: string, doctor: Doctor) {
  updateStore((s) => ({ ...s, doctors: s.doctors.map((d) => (d.slug === slug ? doctor : d)) }));
}
export function deleteDoctor(slug: string) {
  updateStore((s) => ({ ...s, doctors: s.doctors.filter((d) => d.slug !== slug) }));
}

// ── Hospital CRUD ────────────────────────────────────────
export function addHospital(hospital: Hospital) {
  updateStore((s) => ({ ...s, hospitals: [...s.hospitals, hospital] }));
}
export function updateHospital(slug: string, hospital: Hospital) {
  updateStore((s) => ({ ...s, hospitals: s.hospitals.map((h) => (h.slug === slug ? hospital : h)) }));
}
export function deleteHospital(slug: string) {
  updateStore((s) => ({ ...s, hospitals: s.hospitals.filter((h) => h.slug !== slug) }));
}

// ── Service CRUD ─────────────────────────────────────────
export function addService(service: Service) {
  updateStore((s) => ({ ...s, services: [...s.services, service] }));
}
export function updateService(slug: string, service: Service) {
  updateStore((s) => ({ ...s, services: s.services.map((sv) => (sv.slug === slug ? service : sv)) }));
}
export function deleteService(slug: string) {
  updateStore((s) => ({ ...s, services: s.services.filter((sv) => sv.slug !== slug) }));
}

// ── Cost CRUD ────────────────────────────────────────────
function newCostId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `cost-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
export function addCostItem(item: CostItem) {
  const id = item.id || newCostId();
  updateStore((s) => ({ ...s, costItems: [...s.costItems, { ...item, id }] }));
}
export function updateCostItem(id: string, item: CostItem) {
  updateStore((s) => ({ ...s, costItems: s.costItems.map((c) => (c.id === id ? { ...item, id } : c)) }));
}
export function deleteCostItem(id: string) {
  updateStore((s) => ({ ...s, costItems: s.costItems.filter((c) => c.id !== id) }));
}

// ── Blog CRUD ────────────────────────────────────────────
export function addBlogPost(post: BlogPost) {
  updateStore((s) => ({ ...s, blogPosts: [...s.blogPosts, post] }));
}
export function updateBlogPost(slug: string, post: BlogPost) {
  updateStore((s) => ({ ...s, blogPosts: s.blogPosts.map((b) => (b.slug === slug ? post : b)) }));
}
export function deleteBlogPost(slug: string) {
  updateStore((s) => ({ ...s, blogPosts: s.blogPosts.filter((b) => b.slug !== slug) }));
}
