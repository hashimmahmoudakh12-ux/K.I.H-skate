import { supabase } from "./supabase-client.js";
import {
  signUp,
  signIn,
  sendPasswordReset,
  updatePassword,
  dashboardUrlForRole,
} from "./auth.js";

const roleToggle = document.getElementById("role-toggle");
const tabToggle = document.querySelector(".tab-toggle");
const tabSignin = document.getElementById("tab-signin");
const tabSignup = document.getElementById("tab-signup");

const views = {
  signin: document.getElementById("form-signin"),
  signup: document.getElementById("form-signup"),
  forgot: document.getElementById("form-forgot"),
  reset: document.getElementById("form-reset"),
};

function showView(name) {
  Object.entries(views).forEach(([key, form]) => {
    form.hidden = key !== name;
  });

  const isTabbedView = name === "signin" || name === "signup";
  tabToggle.hidden = !isTabbedView;
  roleToggle.hidden = !isTabbedView;

  tabSignin.classList.toggle("active", name === "signin");
  tabSignin.setAttribute("aria-selected", String(name === "signin"));
  tabSignup.classList.toggle("active", name === "signup");
  tabSignup.setAttribute("aria-selected", String(name === "signup"));
}

tabSignin.addEventListener("click", () => showView("signin"));
tabSignup.addEventListener("click", () => showView("signup"));
document
  .getElementById("link-forgot")
  .addEventListener("click", () => showView("forgot"));
document
  .getElementById("link-back-to-signin")
  .addEventListener("click", () => showView("signin"));

function setStatus(form, message, isError) {
  const status = form.querySelector(".form-status");
  status.textContent = message;
  status.hidden = !message;
  status.style.color = isError ? "#8a2a12" : "#146f5c";
}

function setLoading(form, loading, busyLabel) {
  const btn = form.querySelector(".auth-submit");
  if (loading) {
    btn.dataset.originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = busyLabel;
  } else if (btn.dataset.originalHtml) {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalHtml;
  }
}

async function redirectAfterAuth(userId) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  location.href = dashboardUrlForRole(profile ? profile.role : "student");
}

// ---------------- sign in ----------------

views.signin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  setStatus(form, "", false);
  setLoading(form, true, "SIGNING IN...");

  const email = form.email.value.trim();
  const password = form.password.value;
  const { data, error } = await signIn({ email, password });

  setLoading(form, false);

  if (error) {
    setStatus(form, error.message, true);
    return;
  }

  await redirectAfterAuth(data.user.id);
});

// ---------------- sign up ----------------

views.signup.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  setStatus(form, "", false);
  setLoading(form, true, "SIGNING UP...");

  const fullName = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const role = document.querySelector('input[name="role"]:checked').value;

  const { data, error } = await signUp({ fullName, email, password, role });

  setLoading(form, false);

  if (error) {
    setStatus(form, error.message, true);
    return;
  }

  if (data.session) {
    await redirectAfterAuth(data.user.id);
  } else {
    // Email confirmations are on for this project — no session yet.
    setStatus(
      form,
      "Check your email to confirm your account, then sign in.",
      false
    );
    form.reset();
    showView("signin");
  }
});

// ---------------- forgot password ----------------

views.forgot.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  setStatus(form, "", false);
  setLoading(form, true, "SENDING...");

  const email = form.email.value.trim();
  const { error } = await sendPasswordReset(email);

  setLoading(form, false);

  if (error) {
    setStatus(form, error.message, true);
    return;
  }

  setStatus(form, "Check your email for a reset link.", false);
});

// ---------------- set new password (arrived via emailed link) ----------------

views.reset.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  setStatus(form, "", false);

  const password = form.password.value;
  const confirm = form.password_confirm.value;

  if (password !== confirm) {
    setStatus(form, "Passwords don't match.", true);
    return;
  }

  setLoading(form, true, "SAVING...");
  const { error } = await updatePassword(password);
  setLoading(form, false);

  if (error) {
    setStatus(form, error.message, true);
    return;
  }

  setStatus(form, "Password updated! Redirecting...", false);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  setTimeout(() => redirectAfterAuth(session.user.id), 1200);
});

// ---------------- routing on load ----------------

// Supabase parses a `#type=recovery` token from the URL (if the visitor
// arrived via the emailed reset link) and fires this event once it does.
supabase.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") {
    showView("reset");
  }
});

// If a signed-in visitor lands here directly (and it's not a recovery
// link — that case is handled above), just send them to their dashboard
// instead of showing the sign-in form again.
if (!location.hash.includes("type=recovery")) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) await redirectAfterAuth(session.user.id);
}
