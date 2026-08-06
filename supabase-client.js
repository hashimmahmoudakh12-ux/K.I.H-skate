// Single shared Supabase client, reused by every page that needs it.
// Importing this module twice on the same page returns the same instance
// (ES modules are cached), so we never end up with two GoTrue clients
// fighting over the same localStorage session key.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
