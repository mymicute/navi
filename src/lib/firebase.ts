// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// Firebase configuration
// TEMPORARY TEST - REMOVE AFTER DEBUGGING!
const firebaseConfig = {
  apiKey: "AIzaSyAVUcLYVdpPGytsA5Y6Za1uIABk_mfMfAs", // Your real key
  authDomain: "navi-28a02.firebaseapp.com",
  projectId: "navi-28a02",
  storageBucket: "navi-28a02.firebasestorage.app",
  messagingSenderId: "985536683073",
  appId: "1:985536683073:web:2d8b3e892ece6a0ce77ac0",
  measurementId: "G-C2S7DQMXV3"
}

// Initialize Firebase (prevent duplicate apps)
let app: FirebaseApp
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

// Export Firebase services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export { app }
export const storage = getStorage(app);