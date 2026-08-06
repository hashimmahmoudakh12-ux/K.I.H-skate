// POST /api/create-checkout-session
//
// Creates a Stripe Checkout session (subscription mode) for the signed-in
// student's recurring lesson plan. Reuses their existing Stripe customer
// if they have one, so repeat checkouts don't create duplicate customers.
//
// NOTE: creating a Checkout session here does NOT write anything to the
// `subscriptions` table — Stripe only tells us about the resulting
// customer/subscription once checkout completes, via a webhook. This
// endpoint intentionally does not include that webhook (see the PR
// description / README for why and what's needed to add one) — until
// it exists, `subscriptions` rows won't populate even after a
// successful checkout.

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_PRICE_ID) {
    return res
      .status(500)
      .json({ error: "STRIPE_PRICE_ID is not configured." });
  }

  try {
    const user = await verifySupabaseUser(req);
    if (!user) {
      return res.status(401).json({ error: "Not signed in." });
    }

    const subscription = await fetchSubscriptionRow(user.id);
    const origin = req.headers.origin || `https://${req.headers.host}`;

    const params = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": process.env.STRIPE_PRICE_ID,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/dashboard.html?checkout=success`,
      cancel_url: `${origin}/dashboard.html?checkout=cancelled`,
      client_reference_id: user.id,
      "metadata[supabase_user_id]": user.id,
      "subscription_data[metadata][supabase_user_id]": user.id,
    });

    if (subscription && subscription.stripe_customer_id) {
      params.set("customer", subscription.stripe_customer_id);
    } else {
      params.set("customer_email", user.email);
    }

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
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
    console.error("create-checkout-session error:", err);
    return res
      .status(500)
      .json({ error: "Couldn't start checkout. Try again in a moment." });
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
