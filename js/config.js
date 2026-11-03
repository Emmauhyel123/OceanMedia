/* ===== DATABASE SETTINGS: the only place you edit keys =====
   Uses a Supabase table via its REST API.
   1. Create a table (e.g. "contact_messages") with text columns: name, email, details.
   2. Turn on Row Level Security with an INSERT-only policy for the "anon" role.
   3. Paste your Project URL and the public "anon" key below (never the service_role key). */
const OCEAN_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_PUBLIC_ANON_KEY",
  TABLE: "contact_messages"
};
