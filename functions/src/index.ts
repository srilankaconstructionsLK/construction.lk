import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v1";

admin.initializeApp();

const VALID_ROLES = [
  "customer",
  "business_owner",
  "agent",
  "moderator",
  "admin",
  "super_admin",
];

export const syncUserToSupabase = functions.auth
  .user()
  .onCreate(async (user) => {
    try {
      await admin.auth().setCustomUserClaims(user.uid, {
        role: "authenticated",
        app_role: "customer",
      });
      console.log(`Successfully set custom claims for user ${user.uid}`);

      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseServiceKey) {
        await fetch(`${supabaseUrl}/rest/v1/profiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: user.uid,
            email: user.email ?? "",
            role: "customer",
            have_business_profile: false,
          }),
        });
      }

      console.log(`Setup complete for user ${user.uid}`);
    } catch (error) {
      console.error("Error in syncUserToSupabase:", error);
    }
  });

export const setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in.",
    );
  }

  const callerRole = context.auth.token?.app_role;
  const callerUid = context.auth.uid;

  if (callerRole !== "admin" && callerRole !== "super_admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can assign roles.",
    );
  }

  const { uid, role } = data;

  if (!uid || typeof uid !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Valid target UID is required.",
    );
  }
  if (!role || !VALID_ROLES.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Role must be one of: ${VALID_ROLES.join(", ")}`,
    );
  }
  if (role === "super_admin" && callerRole !== "super_admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only super_admins can assign super_admin.",
    );
  }

  try {
    await admin.auth().setCustomUserClaims(uid, {
      role: "authenticated",
      app_role: role,
    });
    console.log(`Successfully updated claims for user ${uid} to ${role}`);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ role }),
      });

      await admin.firestore().collection("user_signals").doc(uid).set(
        {
          needsTokenRefresh: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedBy: callerUid,
        },
        { merge: true },
      );
    }

    console.log(`Successfully updated role for ${uid} to ${role}`);
    return { success: true, uid, role };
  } catch (error: any) {
    console.error("Error setting user role:", error);
    throw new functions.https.HttpsError(
      "internal",
      error.message || "Unexpected error.",
    );
  }
});

// functions/src/index.ts

export const bootstrapAdmin = functions.https.onRequest(async (req, res) => {
  const { email, role } = req.query;
  if (!email || !role) {
    res.status(400).send("Email and role parameters are required");
    return;
  }

  try {
    const user = await admin.auth().getUserByEmail(email as string);
    await admin.auth().setCustomUserClaims(user.uid, {
      role: "authenticated",
      app_role: role as string,
    });

    // Create a signal for the UI to refresh
    await admin.firestore().collection("user_signals").doc(user.uid).set({
      needsTokenRefresh: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.send(
      `Success! User ${email} is now a ${role}. DEPLOY AGAIN WITHOUT THIS FUNCTION NOW.`,
    );
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
