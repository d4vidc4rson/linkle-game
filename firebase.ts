// Firebase configuration using environment variables
// These are loaded from .env file via Vite
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc 
} from 'firebase/firestore';

// Firebase configuration from environment variables
// In Vite, env vars must be prefixed with VITE_ to be exposed to client code
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

// Initialize Firebase only if properly configured
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.warn('Firebase initialization failed:', e);
    // Show warning in the DOM if available
    if (typeof document !== 'undefined') {
      const warning = document.getElementById('firebase-config-warning');
      if (warning) warning.style.display = 'block';
    }
  }
} else {
  console.warn('Firebase not configured. Set VITE_FIREBASE_* environment variables in .env file.');
  // Show warning in the DOM if available
  if (typeof document !== 'undefined') {
    const warning = document.getElementById('firebase-config-warning');
    if (warning) warning.style.display = 'block';
  }
}

// Export Firebase services and utilities
export {
  auth,
  db,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  isFirebaseConfigured,
};
