import { supabase } from "./supabase-client.js";
import { requireSession, signOut } from "./auth.js";
import {
  fetchThread,
  sendMessage,
  markThreadRead,
  unreadCountFrom,
  renderMessageBubbles,
} from "./messages.js";
import { fetchProfilesById } from "./profiles.js";

const dashMain = document.getElementById("dash-main");
const userNameEl = document.getElementById("user-name");
const todayList = document.getElementById("today-list");
const studentList = document.getElementById("student-list");
const threadList = document.getElementById("thread-list");
const threadPanel = document.getElementById("thread-panel");

let me = null;
let activeStudentId = null;
let studentsCache = [];

document.getElementById("signout-btn").addEventListener("click", signOut);

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function startOfTodayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOfTomorrowIso() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.toISOString();
}

async function loadTodaySchedule() {
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, student_id, starts_at, duration_min")
    .eq("instructor_id", me.id)
    .eq("status", "scheduled")
    .gte("starts_at", startOfTodayIso())
    .lt("starts_at", startOfTomorrowIso())
    .order("starts_at", { ascending: true });

  if (error) throw error;

  if (!lessons.length) {
    todayList.innerHTML = '<li class="empty-state">No lessons today.</li>';
    return;
  }

  const students = await fetchProfilesById(lessons.map((l) => l.student_id));

  todayList.innerHTML = lessons
    .map((lesson) => {
      const student = students.get(lesson.student_id);
      return `
        <li class="lesson-row">
          <div class="lesson-info">
            <p class="lesson-date">${formatTime(lesson.starts_at)}</p>
            <p class="lesson-coach">${student ? student.full_name : "Student"} · ${lesson.duration_min} min</p>
          </div>
        </li>
      `;
    })
    .join("");
}

async function loadAllStudents() {
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("student_id, starts_at, status")
    .eq("instructor_id", me.id);

  if (error) throw error;

  const studentIds = [...new Set(lessons.map((l) => l.student_id))];

  if (!studentIds.length) {
    studentList.innerHTML =
      '<li class="empty-state">No students yet.</li>';
    threadList.innerHTML =
      '<li class="empty-state">No students yet.</li>';
    return [];
  }

  const profiles = await fetchProfilesById(studentIds);
  const now = new Date();

  const students = await Promise.all(
    studentIds.map(async (id) => {
      const upcoming = lessons
        .filter(
          (l) =>
            l.student_id === id &&
            l.status === "scheduled" &&
            new Date(l.starts_at) >= now
        )
        .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));

      const unread = await unreadCountFrom(id, me.id);

      return {
        id,
        name: profiles.get(id) ? profiles.get(id).full_name : "Student",
        nextLesson: upcoming[0] || null,
        unread,
      };
    })
  );

  students.sort((a, b) => {
    if (a.nextLesson && !b.nextLesson) return -1;
    if (!a.nextLesson && b.nextLesson) return 1;
    if (a.nextLesson && b.nextLesson) {
      return new Date(a.nextLesson.starts_at) - new Date(b.nextLesson.starts_at);
    }
    return a.name.localeCompare(b.name);
  });

  studentsCache = students;
  renderStudentList(students);
  renderThreadList(students);

  return students;
}

function renderStudentList(students) {
  studentList.innerHTML = students
    .map((s) => {
      const next = s.nextLesson
        ? `${formatDate(s.nextLesson.starts_at)} · ${formatTime(s.nextLesson.starts_at)}`
        : "No upcoming lesson";
      return `
        <li class="lesson-row">
          <div class="lesson-info">
            <p class="lesson-date">${s.name}</p>
            <p class="lesson-coach">${next}</p>
          </div>
          ${s.unread ? `<span class="unread-badge">${s.unread}</span>` : ""}
        </li>
      `;
    })
    .join("");
}

function renderThreadList(students) {
  threadList.innerHTML = students
    .map(
      (s) => `
        <li>
          <button type="button" class="thread-item${s.id === activeStudentId ? " active" : ""}" data-id="${s.id}" data-name="${s.name}">
            <span class="thread-item-name">${s.name}</span>
            ${s.unread ? `<span class="unread-badge">${s.unread}</span>` : ""}
          </button>
        </li>
      `
    )
    .join("");

  threadList.querySelectorAll(".thread-item").forEach((btn) => {
    btn.addEventListener("click", () =>
      openThread(btn.dataset.id, btn.dataset.name)
    );
  });
}

async function openThread(studentId, studentName) {
  activeStudentId = studentId;

  threadList.querySelectorAll(".thread-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.id === studentId);
  });

  threadPanel.innerHTML = `
    <p class="thread-panel-name">${studentName}</p>
    <div class="message-thread" id="active-message-thread">
      <p class="empty-state">Loading…</p>
    </div>
    <form class="message-form" id="active-message-form">
      <input type="text" id="active-message-input" name="message" placeholder="Type a reply…" autocomplete="off" required />
      <button type="submit" class="btn btn-gold message-send">SEND</button>
    </form>
  `;

  const threadEl = document.getElementById("active-message-thread");
  const formEl = document.getElementById("active-message-form");
  const inputEl = document.getElementById("active-message-input");

  const msgs = await fetchThread(studentId, me.id);
  renderMessageBubbles(threadEl, msgs, me.id);
  await markThreadRead(studentId, me.id);

  // Reading the thread just cleared its unread count server-side — reflect
  // that in the roster/thread-list badges without waiting for a reload.
  const student = studentsCache.find((s) => s.id === studentId);
  if (student && student.unread) {
    student.unread = 0;
    renderStudentList(studentsCache);
    renderThreadList(studentsCache);
  }

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = inputEl.value.trim();
    if (!body) return;

    const sendBtn = formEl.querySelector(".message-send");
    sendBtn.disabled = true;

    try {
      await sendMessage({ body, senderId: me.id, recipientId: studentId });
      inputEl.value = "";
      const refreshed = await fetchThread(studentId, me.id);
      renderMessageBubbles(threadEl, refreshed, me.id);
    } catch (err) {
      alert("Couldn't send that message: " + err.message);
    } finally {
      sendBtn.disabled = false;
    }
  });
}

(async function init() {
  const result = await requireSession("instructor");
  if (!result) return; // requireSession already redirected

  me = result.user;
  userNameEl.textContent = result.profile.full_name || result.user.email;
  userNameEl.hidden = false;
  dashMain.hidden = false;

  try {
    await Promise.all([loadTodaySchedule(), loadAllStudents()]);
  } catch (err) {
    console.error(err);
  }
})();
