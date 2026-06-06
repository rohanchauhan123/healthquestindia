import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// If env vars are missing (e.g. local dev without Supabase), return null
// The store will gracefully fall back to localStorage
export const supabase =
  url && key ? createClient(url, key) : null;
