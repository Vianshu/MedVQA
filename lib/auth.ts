import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { auth } from "./firebaseconfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registerWithGoogle: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const provider = new GoogleAuthProvider();

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      registerWithGoogle: async () => {
        const userCredential = await signInWithPopup(auth, provider);
        if (userCredential.user) {
          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              photoURL: userCredential.user.photoURL,
            },
            isAuthenticated: true,
          });
        }
      },

      loginWithGoogle: async () => {
        const userCredential = await signInWithPopup(auth, provider);
        if (userCredential.user) {
          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              photoURL: userCredential.user.photoURL,
            },
            isAuthenticated: true,
          });
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
