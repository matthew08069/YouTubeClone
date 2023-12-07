 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User} from "firebase/auth";
import { getFunctions } from "firebase/functions";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKbxHiMxXKBvIa4iLWMa_Tbd3W7Pd8N2Y",
  authDomain: "yt-clone-407015.firebaseapp.com",
  projectId: "yt-clone-407015",
  appId: "1:945988050697:web:6ab2ce6c34f53a90b97dd8",
  measurementId: "G-D5MPDEMCJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export const functions = getFunctions();

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
    return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}