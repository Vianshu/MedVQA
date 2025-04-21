import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

let app;

try {
  if (!getApps().length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    if (!serviceAccountJson) {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_JSON environment variable not set!"
      );
    }

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch (e) {
      throw new Error(
        "Error parsing FIREBASE_SERVICE_ACCOUNT_JSON: " + (e instanceof Error ? e.message : String(e))
      );
    }

    app = initializeApp({
      credential: cert(serviceAccount),
      databaseURL:
        "https://med-vqa-a410e-default-rtdb.asia-southeast1.firebasedatabase.app/",
    });
    console.log("Firebase app initialized successfully");
  } else {
    app = getApps()[0]; // Get the existing app
    console.log("Firebase app already initialized");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  // It's crucial to handle the initialization error appropriately in your application.
  // Depending on your use case, you might want to:
  // - Exit the process (if the app cannot function without Firebase).
  // - Log the error and attempt to re-initialize later.
  // - Disable Firebase-dependent features.
}

const db = getDatabase(app); // Get the database instance

export { db };
