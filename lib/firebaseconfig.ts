import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJZS8m7k_kbAX5icKKHRLEDlNUrdOpDmo",
  authDomain: "med-vqa-a410e.firebaseapp.com",
  projectId: "med-vqa-a410e",
  storageBucket: "med-vqa-a410e.appspot.com",
  messagingSenderId: "572897723765",
  appId: "1:572897723765:web:68dbebc44a6193069bbf3c",
  measurementId: "G-V4461C24L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
  console.log("User logged out");
};
