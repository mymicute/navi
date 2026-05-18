// src/lib/userData.ts
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  hearts: number;
  streak: number;
  stars: number;
  level: number;
  xp: number;
  lastLogin?: any;
  createdAt: any;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
};

export const createOrUpdateUserProfile = async (user: any) => {
  const docRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    //  New user
    await setDoc(docRef, {
      uid: user.uid,
      displayName: user.displayName || 'Explorer',
      email: user.email,
      photoURL: user.photoURL || null,
      hearts: 5,
      streak: 1,
      stars: 0,
      level: 1,
      xp: 0,
      lastLogin: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  } else {
    // 🔄 Returning user: update streak
    const data = docSnap.data() as UserProfile;
    const lastLogin = data.lastLogin?.toDate ? data.lastLogin.toDate() : new Date();
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = data.streak;
    if (daysDiff === 1) newStreak += 1;
    else if (daysDiff > 1) newStreak = 1;

    await updateDoc(docRef, {
      displayName: user.displayName || data.displayName,
      photoURL: user.photoURL || data.photoURL,
      streak: newStreak,
      lastLogin: serverTimestamp(),
    });
  }
};