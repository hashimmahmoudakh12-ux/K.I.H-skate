// Shared profile-lookup helper used by dashboard.js and instructor.js.
//
// lessons/messages only store auth user ids, not names — there's no
// declared foreign key from those tables to `profiles` (they reference
// auth.users directly, same as profiles.id does), so PostgREST can't
// auto-join them. We fetch profiles separately and merge client-side.

import { supabase } from "./supabase-client.js";

export async function fetchProfilesById(ids) {
  const unique = [...new Set(ids)].filter(Boolean);
  if (!unique.length) return new Map();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", unique);

  if (error) throw error;
  return new Map(data.map((p) => [p.id, p]));
}
