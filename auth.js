// Shared auth helpers used by signin.html, dashboard.html, and
// instructor.html. Keeps all the Supabase auth calls in one place so the
// three pages don't each reinvent sign-out, session-guarding, etc.

import { supabase } from "./supabase-client.js";

export function dashboardUrlForRole(role) {
  return role === "instructor" ? "instructor.html" : "dashboard.html";
}

export async function signUp({ fullName, email, password, role }) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  });
}

export async function signIn({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  await supabase.auth.signOut();
  location.href = "signin.html";
}

export async function sendPasswordReset(email) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: new URL("signin.html", location.href).href,
  });
}

export async function updatePassword(newPassword) {
  return supabase.auth.updateUser({ password: newPassword });
}

// Fetches the signed-in user's profile row, retrying once — the profile
// is created by a DB trigger on signup and is normally already there by
// the time this runs, but a retry avoids a rare race on a slow trigger.
async function fetchProfile(userId) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .maybeSingle();

    if (data) return data;
    if (error) throw error;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  return null;
}

// Call at the top of every gated page. Redirects to sign-in if there's no
// session, redirects to the correct dashboard if the signed-in user has
// the wrong role for this page, and otherwise returns { user, profile }.
export async function requireSession(expectedRole) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    location.replace("signin.html");
    return null;
  }

  const profile = await fetchProfile(session.user.id);

  if (!profile) {
    // Extremely unlikely (trigger failed) — send back to sign-in rather
    // than show a broken dashboard with no name/role to work with.
    location.replace("signin.html");
    return null;
  }

  if (profile.role !== expectedRole) {
    location.replace(dashboardUrlForRole(profile.role));
    return null;
  }

  return { user: session.user, profile };
}
