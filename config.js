// KIH Skateboarding — public runtime config.
//
// This is a plain HTML/CSS/JS site with no build step, so there's no
// bundler to inject environment variables into the browser. The Supabase
// ANON key below is meant to be public — it's the same key Supabase's own
// docs tell you to ship in client-side code. Row Level Security (see
// supabase-schema.sql) is what actually keeps data locked down, not this
// key being secret.
//
// TODO: replace these two values with your real project's — find them in
// the Supabase dashboard under Project Settings → API.

export const SUPABASE_URL = "https://fwdxekcdaoslizmxngni.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_I00P53Pj0lRK6VAqs13r7g_WX7PoN44";
