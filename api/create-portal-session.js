// POST /api/create-portal-session
//
// Creates a Stripe Customer Portal session for the signed-in student so
// they can update payment methods, view invoices, or cancel. Requires the
// student to already have a stripe_customer_id on their subscriptions row
// (i.e. they've been through checkout at least once) — see
// create-checkout-session.js for that flow.
//
// Talks to Supabase and Stripe over plain fetch (no SDKs) so this stays a
// dependency-free file — the whole site has no build step, and this
// keeps the /api functions the same way.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await verifySupabaseUser(req);
    if (!user) {
      return res.status(401).json({ error: "Not signed in." });
    }

    const subscription = await fetchSubscriptionRow(user.id);

    if (!subscription || !subscription.stripe_customer_id) {
      return res.status(400).json({
        error:
          "No billing account yet — book recurring lessons first to set one up.",
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const params = new URLSearchParams({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/dashboard.html`,
    });

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/billing_portal/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      throw new Error(session.error ? session.error.message : "Stripe error");
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("create-portal-session error:", err);
    return res.status(500).json({ error: "Couldn't open the billing portal." });
  }
};

async function verifySupabaseUser(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: process.env.SUPABASE_ANON_KEY,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

async function fetchSubscriptionRow(studentId) {
  const url =
    `${process.env.SUPABASE_URL}/rest/v1/subscriptions` +
    `?student_id=eq.${studentId}&select=stripe_customer_id,status`;

  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });

  if (!res.ok) throw new Error("Supabase lookup failed");
  const rows = await res.json();
  return rows[0] || null;
}
