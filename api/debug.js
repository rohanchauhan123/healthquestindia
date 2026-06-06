// Debug endpoint — visit /api/debug on your live site to check Supabase connection
// REMOVE THIS FILE after confirming everything works
const { createClient } = require("@supabase/supabase-js");

module.exports = async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  // 1. Check env vars exist
  if (!url || !key) {
    return res.status(200).json({
      status: "❌ FAIL",
      problem: "Env vars missing in Vercel",
      VITE_SUPABASE_URL: url ? "✅ set" : "❌ NOT SET",
      VITE_SUPABASE_ANON_KEY: key ? "✅ set" : "❌ NOT SET",
      fix: "Go to Vercel → Settings → Environment Variables and verify both vars are added, then Redeploy",
    });
  }

  // 2. Try to connect and query the table
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("cms_store")
      .select("id, updated_at")
      .limit(1);

    if (error) {
      return res.status(200).json({
        status: "❌ FAIL",
        problem: "Connected to Supabase but table query failed",
        error: error.message,
        hint: error.hint || null,
        fix: error.message.includes("does not exist")
          ? "Table 'cms_store' not found. Run the SQL in Supabase SQL Editor to create it."
          : "Check RLS policies — run the CREATE POLICY statements in Supabase SQL Editor",
        VITE_SUPABASE_URL: "✅ set",
        VITE_SUPABASE_ANON_KEY: "✅ set",
      });
    }

    return res.status(200).json({
      status: "✅ SUCCESS — Supabase is connected!",
      table: "cms_store exists and is readable",
      rows: data?.length ?? 0,
      note: data?.length === 0
        ? "Table is empty — data will be written here the next time admin saves something"
        : "Data found in table",
      row_info: data,
    });
  } catch (err) {
    return res.status(200).json({
      status: "❌ FAIL",
      problem: "Could not reach Supabase",
      error: err.message,
      fix: "Check that VITE_SUPABASE_URL is correct (should start with https://)",
    });
  }
};
