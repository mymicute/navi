// src/lib/progress.ts
// Hybrid progress store: Uses Firestore when userId provided, falls back to localStorage
// Fully backward compatible - no changes needed to existing calls!

import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, serverTimestamp, increment } from 'firebase/firestore';
import { db } from './firebase';

export interface LessonProgress {
  lessonId: number;
  step: number; // 0 = video, 1 = quiz, 99 = completed
  total: number;
  completed: boolean;
  quizScore?: number;
  xpEarned: number;
  starsEarned: number;
  miniGameCompleted?: boolean;
  updatedAt: number;
}

export interface UserProgress {
  totalXP: number;
  totalStars: number;
  currentStreak: number;
  lastLoginDate?: string;
}

// localStorage keys (fallback)
const KEY = "pathwise:progress:v1";
const USER_KEY = "pathwise:user:v1";
const LAST_KEY = "pathwise:lastLesson:v1";

type Store = Record<number, LessonProgress>;

// ────────────────────────────────────────────
// 🔹 localStorage Helpers (Fallback)
// ────────────────────────────────────────────
function readLocal(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch { return {}; }
}

function writeLocal(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

function readUserLocal(): UserProgress {
  if (typeof window === "undefined") return { totalXP: 0, totalStars: 0, currentStreak: 1 };
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? '{"totalXP":0,"totalStars":0,"currentStreak":1}');
  } catch {
    return { totalXP: 0, totalStars: 0, currentStreak: 1 };
  }
}

function writeUserLocal(u: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}

// ────────────────────────────────────────────
// 🔹 Public API (Backward Compatible + Firestore)
// ────────────────────────────────────────────

// ✅ Get progress: Works with or without userId
export async function getProgress(lessonId: number, userId?: string): Promise<LessonProgress | null> {
  // Try Firestore first if userId provided
  if (userId) {
    try {
      const docRef = doc(db, `users/${userId}/lessons/${lessonId}`);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as LessonProgress;
        // Sync to localStorage for offline fallback
        const local = readLocal();
        local[lessonId] = { ...data, updatedAt: Date.now() };
        writeLocal(local);
        return data;
      }
    } catch (err) {
      console.warn('Firestore progress fetch failed, using localStorage:', err);
    }
  }
  // Fallback to localStorage
  return readLocal()[lessonId] ?? null;
}

// ✅ Save progress: Works with or without userId
export async function saveProgress(p: LessonProgress, userId?: string) {
  const withTimestamp = { ...p, updatedAt: Date.now() };
  
  // Always update localStorage (instant + offline)
  const local = readLocal();
  local[p.lessonId] = withTimestamp;
  writeLocal(local);
  
  // Also sync to Firestore if userId provided
  if (userId) {
    try {
      const docRef = doc(db, `users/${userId}/lessons/${p.lessonId}`);
      await setDoc(docRef, {
        ...withTimestamp,
        completedAt: p.completed ? serverTimestamp() : undefined,
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore progress save failed:', err);
    }
  }
  
  // Dispatch event for UI sync
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_KEY, String(p.lessonId));
    window.dispatchEvent(new CustomEvent("pathwise:progress", { detail: p }));
  }
}

// ✅ Add rewards: Works with or without userId
export async function addRewards(xp: number, stars: number, userId?: string) {
  // Update localStorage immediately
  const user = readUserLocal();
  user.totalXP += xp;
  user.totalStars += stars;
  writeUserLocal(user);
  
  // Sync to Firestore if userId provided
  if (userId) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        xp: increment(xp),
        stars: increment(stars),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firestore rewards update failed:', err);
    }
  }
  
  return user;
}

// ✅ Get last lesson ID (localStorage only - lightweight)
export function getLastLessonId(): number | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(LAST_KEY);
  return v ? Number(v) : null;
}

// ✅ Check if lesson is unlocked (hybrid)
export async function isLessonUnlocked(lessonId: number, userId?: string): Promise<boolean> {
  if (lessonId === 1) return true;
  
  // Try Firestore first
  if (userId) {
    try {
      const prev = await getProgress(lessonId - 1, userId);
      return prev?.completed ?? false;
    } catch {
      // Fallback to localStorage
    }
  }
  // Local fallback
  const prev = readLocal()[lessonId - 1];
  return prev?.completed ?? false;
}

// ✅ Get all completed lessons (hybrid)
export async function getCompletedLessons(userId?: string): Promise<number[]> {
  if (userId) {
    try {
      const q = query(collection(db, `users/${userId}/lessons`), where('completed', '==', true));
      const snap = await getDocs(q);
      const ids = snap.docs.map(d => Number(d.id)).sort((a, b) => a - b);
      // Cache to localStorage for offline
      const local = readLocal();
      ids.forEach(id => {
        if (!local[id]) local[id] = { lessonId: id, completed: true, step: 99, total: 2, xpEarned: 0, starsEarned: 0, updatedAt: Date.now() };
      });
      writeLocal(local);
      return ids;
    } catch (err) {
      console.warn('Firestore completed fetch failed:', err);
    }
  }
  // Fallback to localStorage
  return Object.values(readLocal())
    .filter(p => p.completed)
    .map(p => p.lessonId)
    .sort((a, b) => a - b);
}

// ✅ Calculate level from XP
export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / 100) + 1;
}

// ✅ Reset all progress (both storage layers)
export function resetProgress(userId?: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LAST_KEY);
  
  // Also clear Firestore if userId provided
  if (userId) {
    // Note: Bulk delete requires Firebase Admin SDK or cloud function
    // For now, just log that manual cleanup may be needed
    console.log(`🗑️ To fully reset Firestore progress for ${userId}, use Firebase Console or Admin SDK`);
  }
  
  window.dispatchEvent(new CustomEvent("pathwise:progress", { detail: null }));
}

// ✅ Migration helper (one-time: localStorage → Firestore)
export async function migrateToFirestore(userId: string) {
  const localStore = readLocal();
  const localUser = readUserLocal();
  
  try {
    // Migrate user stats
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      uid: userId,
      xp: localUser.totalXP,
      stars: localUser.totalStars,
      currentStreak: localUser.currentStreak,
      migratedAt: serverTimestamp(),
    }, { merge: true });
    
    // Migrate lesson progress
    for (const progress of Object.values(localStore)) {
      await setDoc(doc(db, `users/${userId}/lessons/${progress.lessonId}`), {
        ...progress,
        migratedAt: serverTimestamp(),
      }, { merge: true });
    }
    
    console.log("✅ Progress migrated to Firestore");
    return true;
  } catch (err) {
    console.error("❌ Migration failed:", err);
    return false;
  }
}