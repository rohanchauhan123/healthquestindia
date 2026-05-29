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

export interface StoreState {
  services: Service[];
  doctors: Doctor[];
  hospitals: Hospital[];
  costItems: CostItem[];
  blogPosts: BlogPost[];
}

const STORAGE_KEY = "healthquest-store-v3";

const DEFAULTS: StoreState = {
  services: seedServices,
  doctors: seedDoctors,
  hospitals: seedHospitals,
  costItems: seedCostItems,
  blogPosts: seedBlogPosts,
};

const listeners = new Set<() => void>();
let cached: StoreState = loadFromStorage();
let cachedRev = 0;

function loadFromStorage(): StoreState {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      services: parsed.services && parsed.services.length ? parsed.services : DEFAULTS.services,
      doctors: parsed.doctors && parsed.doctors.length ? parsed.doctors : DEFAULTS.doctors,
      hospitals: parsed.hospitals && parsed.hospitals.length ? parsed.hospitals : DEFAULTS.hospitals,
      costItems: Array.isArray(parsed.costItems) ? parsed.costItems : DEFAULTS.costItems,
      blogPosts: Array.isArray(parsed.blogPosts) ? parsed.blogPosts : DEFAULTS.blogPosts,
    };
  } catch {
    return DEFAULTS;
  }
}

function persist(next: StoreState) {
  cached = next;
  cachedRev++;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error("Failed to persist store", e);
  }
  listeners.forEach((fn) => fn());
}

export function getStoreSnapshot(): StoreState {
  return cached;
}

export function getStoreRev(): number {
  return cachedRev;
}

export function subscribeStore(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function updateStore(updater: (s: StoreState) => StoreState): void {
  persist(updater(cached));
}

export function resetStore(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  cached = DEFAULTS;
  cachedRev++;
  listeners.forEach((fn) => fn());
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Doctor CRUD
export function addDoctor(doctor: Doctor) {
  updateStore((s) => ({ ...s, doctors: [...s.doctors, doctor] }));
}

export function updateDoctor(slug: string, doctor: Doctor) {
  updateStore((s) => ({
    ...s,
    doctors: s.doctors.map((d) => (d.slug === slug ? doctor : d)),
  }));
}

export function deleteDoctor(slug: string) {
  updateStore((s) => ({ ...s, doctors: s.doctors.filter((d) => d.slug !== slug) }));
}

// Hospital CRUD
export function addHospital(hospital: Hospital) {
  updateStore((s) => ({ ...s, hospitals: [...s.hospitals, hospital] }));
}

export function updateHospital(slug: string, hospital: Hospital) {
  updateStore((s) => ({
    ...s,
    hospitals: s.hospitals.map((h) => (h.slug === slug ? hospital : h)),
  }));
}

export function deleteHospital(slug: string) {
  updateStore((s) => ({ ...s, hospitals: s.hospitals.filter((h) => h.slug !== slug) }));
}

// Service CRUD
export function addService(service: Service) {
  updateStore((s) => ({ ...s, services: [...s.services, service] }));
}

export function updateService(slug: string, service: Service) {
  updateStore((s) => ({
    ...s,
    services: s.services.map((sv) => (sv.slug === slug ? service : sv)),
  }));
}

export function deleteService(slug: string) {
  updateStore((s) => ({ ...s, services: s.services.filter((sv) => sv.slug !== slug) }));
}

function newCostId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `cost-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function addCostItem(item: CostItem) {
  const id = item.id || newCostId();
  updateStore((s) => ({ ...s, costItems: [...s.costItems, { ...item, id }] }));
}

export function updateCostItem(id: string, item: CostItem) {
  updateStore((s) => ({
    ...s,
    costItems: s.costItems.map((c) => (c.id === id ? { ...item, id } : c)),
  }));
}

export function deleteCostItem(id: string) {
  updateStore((s) => ({ ...s, costItems: s.costItems.filter((c) => c.id !== id) }));
}

// Blog CRUD
export function addBlogPost(post: BlogPost) {
  updateStore((s) => ({ ...s, blogPosts: [...s.blogPosts, post] }));
}

export function updateBlogPost(slug: string, post: BlogPost) {
  updateStore((s) => ({
    ...s,
    blogPosts: s.blogPosts.map((b) => (b.slug === slug ? post : b)),
  }));
}

export function deleteBlogPost(slug: string) {
  updateStore((s) => ({ ...s, blogPosts: s.blogPosts.filter((b) => b.slug !== slug) }));
}
