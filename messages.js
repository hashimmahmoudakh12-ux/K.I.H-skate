// Shared messaging helpers used by both dashboard.js and instructor.js.

import { supabase } from "./supabase-client.js";

// Deterministic thread id for a pair of users — same value regardless of
// who's asking, so both sides always land on the same thread without a
// separate "conversations" table. See supabase-schema.sql for the
// matching convention on the messages table.
export function threadId(userIdA, userIdB) {
  return [userIdA, userIdB].sort().join("_");
}

export async function fetchThread(otherUserId, myId) {
  const { data, error } = await supabase
    .from("messages")
    .select("id, sender_id, recipient_id, body, read_at, created_at")
    .eq("thread_id", threadId(myId, otherUserId))
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function sendMessage({ body, senderId, recipientId }) {
  const { error } = await supabase.from("messages").insert({
    thread_id: threadId(senderId, recipientId),
    sender_id: senderId,
    recipient_id: recipientId,
    body,
  });
  if (error) throw error;
}

export async function markThreadRead(otherUserId, myId) {
  const { error } = await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("thread_id", threadId(myId, otherUserId))
    .eq("recipient_id", myId)
    .is("read_at", null);
  if (error) throw error;
}

export async function unreadCountFrom(otherUserId, myId) {
  const { count, error } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("thread_id", threadId(myId, otherUserId))
    .eq("recipient_id", myId)
    .is("read_at", null);
  if (error) throw error;
  return count || 0;
}

export function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Renders a list of messages as chat bubbles into `container`, aligning
// the signed-in user's own messages to the right. Shared by both
// dashboard.js and instructor.js so the two pages stay visually identical.
export function renderMessageBubbles(container, msgs, myId) {
  if (!msgs.length) {
    container.innerHTML = '<p class="empty-state">No messages yet — say hi!</p>';
    return;
  }
  container.innerHTML = msgs
    .map((m) => {
      const mine = m.sender_id === myId;
      const time = new Date(m.created_at).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      return `
        <div class="message-bubble ${mine ? "sent" : "received"}">
          <p class="message-body">${escapeHtml(m.body)}</p>
          <p class="message-time">${time}</p>
        </div>
      `;
    })
    .join("");
  container.scrollTop = container.scrollHeight;
}
