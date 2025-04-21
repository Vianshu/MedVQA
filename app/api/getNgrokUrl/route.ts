import { db } from "@/lib/firebaseadmin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching ngrok URL from Firebase Realtime Database... in getngrok");
    const snapshot = await db.ref("medvqa/ngrok_url").once("value");  // Updated to match Firebase key
    const url = snapshot.val();
    console.log("Snapshot value:", snapshot);  // Log the snapshot value for debugging
    console.log("Fetched ngrok URL:", url);  // Log the fetched URL for debugging
    if (url) {
      return NextResponse.json({ url });
    } else {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error fetching ngrok URL:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
