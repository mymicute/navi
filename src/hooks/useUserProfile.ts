// src/hooks/useUserProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile } from '../lib/userData';

export function useUserProfile() {
  // ✅ ALL hooks called at TOP level - NO conditionals before this point
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Refresh function (defined outside useEffect to avoid re-creation)
  const refresh = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
        setError(null);
      }
    } catch (err: any) {
      setError('Failed to load profile. Check your connection.');
      console.error(err);
    }
  }, []);

  // ✅ Single useEffect for auth + profile setup
  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;

      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const snap = await getDoc(docRef);

          if (!snap.exists()) {
            // 🆕 Create new user
            const newUser: UserProfile = {
              uid: user.uid,
              displayName: user.displayName || 'Explorer',
              email: user.email || '',
              photoURL: user.photoURL || null,
              hearts: 5,
              streak: 1,
              stars: 0,
              level: 1,
              xp: 0,
              createdAt: new Date(),
            };
            await setDoc(docRef, {
              ...newUser,
              lastLogin: serverTimestamp(),
              createdAt: serverTimestamp(),
            });
            setProfile(newUser);
          } else {
            // 🔄 Load existing user
            setProfile(snap.data() as UserProfile);
          }
        } catch (err) {
          console.error('Profile setup failed:', err);
          setError('Could not load user data.');
        }
      } else {
        // 👤 No user signed in
        setProfile(null);
      }
      
      // ✅ Always set loading to false AFTER profile state update
      if (mounted) setLoading(false);
    });

    return () => { mounted = false; unsubscribe(); };
  }, [refresh]); // Only re-run if refresh changes (it won't, due to useCallback)

  // ✅ Return object - NO hooks after this point
  return { profile, loading, error, refresh };
}