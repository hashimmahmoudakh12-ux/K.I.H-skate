import { supabase } from "./supabase-client.js";
import { requireSession, signOut } from "./auth.js";
import {
  fetchThread,
  sendMessage,
  markThreadRead,
  renderMessageBubbles,
} from "./messages.js";
import { fetchProfilesById } from "./profiles.js";

const dashMain = document.getElementById("dash-main");
const userNameEl = document.getElementById("user-name");
const lessonList = document.getElementById("lesson-list");
const tuitionStatus = document.getElementById("tuition-status");
const manageSubBtn = document.getElementById("manage-subscription-btn");
const bookRecurringBtn = document.getElementById("book-recurring-btn");
const messageThread = document.getElementById("message-thread");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

let me = null;
let coachId = null;

document.getElementById("signout-btn").addEventListener("click", signOut);

function formatLessonTime(iso) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function loadLessons() {
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, instructor_id, starts_at, duration_min, status")
    .eq("student_id", me.id)
    .eq("status", "scheduled")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (error) throw error;

  if (!lessons.length) {
    lessonList.innerHTML =
      '<li class="empty-state">No upcoming lessons yet — book one below.</li>';
    return lessons;
  }

  const instructors = await fetchProfilesById(
    lessons.map((l) => l.instructor_id)
  );

  lessonList.innerHTML = "";
  lessons.forEach((lesson) => {
    const coach = instructors.get(lesson.instructor_id);
    const li = document.createElement("li");
    li.className = "lesson-row";
    li.innerHTML = `
      <div class="lesson-info">
        <p class="lesson-date">${formatLessonTime(lesson.starts_at)}</p>
        <p class="lesson-coach">with ${coach ? coach.full_name : "your coach"}</p>
      </div>
      <button type="button" class="lesson-cancel" data-id="${lesson.id}">CANCEL</button>
    `;
    lessonList.appendChild(li);
  });

  lessonList.querySelectorAll(".lesson-cancel").forEach((btn) => {
    btn.addEventListener("click", () => cancelLesson(btn.dataset.id));
  });

  return lessons;
}

async function cancelLesson(lessonId) {
  const li = document.querySelector(`.lesson-cancel[data-id="${lessonId}"]`)
    .closest(".lesson-row");
  li.style.opacity = "0.5";

  const { error } = await supabase
    .from("lessons")
    .update({ status: "cancelled" })
    .eq("id", lessonId);

  if (error) {
    li.style.opacity = "1";
    alert("Couldn't cancel that lesson: " + error.message);
    return;
  }

  li.remove();
  if (!lessonList.children.length) {
    lessonList.innerHTML =
      '<li class="empty-state">No upcoming lessons yet — book one below.</li>';
  }
}

async function loadTuition() {
  const { data: sub, error } = await supabase
    .from("subscriptions")
    .select("status, current_period_end, stripe_customer_id")
    .eq("student_id", me.id)
    .maybeSingle();

  if (error) throw error;

  if (!sub || !sub.stripe_customer_id) {
    tuitionStatus.textContent =
      "No active plan yet. Book recurring lessons to set up billing.";
    manageSubBtn.hidden = true;
    return;
  }

  const renews = sub.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  tuitionStatus.textContent = renews
    ? `Plan status: ${sub.status}. Renews ${renews}.`
    : `Plan status: ${sub.status}.`;
  manageSubBtn.hidden = false;
}

async function callBillingApi(path, statusEl) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  statusEl.hidden = false;
  statusEl.style.color = "#146f5c";
  statusEl.textContent = "One sec…";

  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Something went wrong.");
    location.href = body.url;
  } catch (err) {
    statusEl.style.color = "#8a2a12";
    statusEl.textContent = err.message;
  }
}

bookRecurringBtn.addEventListener("click", () => {
  callBillingApi(
    "/api/create-checkout-session",
    document.getElementById("book-status")
  );
});

manageSubBtn.addEventListener("click", () => {
  callBillingApi(
    "/api/create-portal-session",
    document.getElementById("portal-status")
  );
});

async function loadMessages(lessons) {
  // "Your coach" = the instructor on your soonest upcoming lesson. If you
  // have none upcoming, fall back to your most recent lesson of any
  // status so messaging still works after a lesson's come and gone.
  if (lessons.length) {
    coachId = lessons[0].instructor_id;
  } else {
    const { data } = await supabase
      .from("lessons")
      .select("instructor_id")
      .eq("student_id", me.id)
      .order("starts_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    coachId = data ? data.instructor_id : null;
  }

  if (!coachId) {
    messageThread.innerHTML =
      '<p class="empty-state">Book a lesson to start messaging your coach.</p>';
    messageForm.hidden = true;
    return;
  }

  const msgs = await fetchThread(coachId, me.id);
  renderMessageBubbles(messageThread, msgs, me.id);
  await markThreadRead(coachId, me.id);
}

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!coachId) return;
  const body = messageInput.value.trim();
  if (!body) return;

  const sendBtn = messageForm.querySelector(".message-send");
  sendBtn.disabled = true;

  try {
    await sendMessage({ body, senderId: me.id, recipientId: coachId });
    messageInput.value = "";
    const msgs = await fetchThread(coachId, me.id);
    renderMessageBubbles(messageThread, msgs, me.id);
  } catch (err) {
    alert("Couldn't send that message: " + err.message);
  } finally {
    sendBtn.disabled = false;
  }
});

(async function init() {
  const result = await requireSession("student");
  if (!result) return; // requireSession already redirected

  me = result.user;
  userNameEl.textContent = result.profile.full_name || result.user.email;
  userNameEl.hidden = false;
  dashMain.hidden = false;

  try {
    const lessons = await loadLessons();
    await Promise.all([loadTuition(), loadMessages(lessons)]);
  } catch (err) {
    console.error(err);
  }
})();
