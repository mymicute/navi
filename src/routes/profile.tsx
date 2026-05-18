// src/routes/profile.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Flame,
  Star,
  Trophy,
  LogOut,
  Edit3,
  Shield,
  Gift,
  Settings,
  ChevronRight,
  X,
  Camera,
  Save,
  Image as ImageIcon,
  BookOpen,
  Target,
  Award,
  Zap,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

import { Navi } from "@/components/Navi";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getCompletedLessons } from "@/lib/progress";

import { auth, db } from "@/lib/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Profile — PathWise" }],
  }),
  component: ProfilePage,
});

// ─────────────────────────────────────────────
// 🏆 Achievement Interface
// ─────────────────────────────────────────────
interface Achievement {
  id: string;
  title: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

function ProfilePage() {
  const { profile, loading, refresh } = useUserProfile();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  // ✅ Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    photoFile: null as File | null,
    photoPreview: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─────────────────────────────────────────────
  // 📊 Load Completed Lessons
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (profile?.uid) {
      getCompletedLessons(profile.uid).then(setCompletedLessons);
    }
  }, [profile?.uid]);

  // ─────────────────────────────────────────────
  // 🏆 Generate Dynamic Achievements
  // ─────────────────────────────────────────────
  const achievements = useMemo((): Achievement[] => {
    if (!profile) return [];
    
    const lessonsCount = completedLessons.length;
    
    return [
      {
        id: "streak-7",
        title: "7-Day Streak",
        icon: <Flame className="w-6 h-6" />,
        unlocked: profile.streak >= 7,
      },
      {
        id: "first-lesson",
        title: "First Lesson",
        icon: <Star className="w-6 h-6" />,
        unlocked: lessonsCount >= 1,
      },
      {
        id: "perfect-quiz",
        title: "Perfect Quiz",
        icon: <Target className="w-6 h-6" />,
        unlocked: profile.stars >= 10,
      },
      {
        id: "level-5",
        title: "Level 5",
        icon: <Trophy className="w-6 h-6" />,
        unlocked: profile.level >= 5,
      },
      {
        id: "lesson-10",
        title: "10 Lessons",
        icon: <BookOpen className="w-6 h-6" />,
        unlocked: lessonsCount >= 10,
      },
      {
        id: "streak-3",
        title: "3-Day Streak",
        icon: <Zap className="w-6 h-6" />,
        unlocked: profile.streak >= 3,
      },
      {
        id: "xp-100",
        title: "100 XP",
        icon: <Award className="w-6 h-6" />,
        unlocked: profile.xp >= 100,
      },
      {
        id: "navi-friend",
        title: "Navi's Friend",
        icon: <Sparkles className="w-6 h-6" />,
        unlocked: lessonsCount >= 5,
      },
    ];
  }, [profile, completedLessons]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  /* ─────────────────────────────────────────────
     🚪 Logout
  ───────────────────────────────────────────── */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate({ to: "/login" });
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to sign out. Please try again.");
    }
  };

  /* ─────────────────────────────────────────────
     ✏️ Open Edit Modal
  ───────────────────────────────────────────── */
  const openEditModal = () => {
    if (!profile) return;

    setEditForm({
      displayName: profile.displayName || "",
      photoFile: null,
      photoPreview: profile.photoURL || "",
    });

    setError(null);
    setIsEditing(true);
  };

  /* ─────────────────────────────────────────────
     🖼️ File Select
  ───────────────────────────────────────────── */
  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!validTypes.includes(file.type)) {
      setError("Please select JPG, PNG, or WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setEditForm({
      ...editForm,
      photoFile: file,
      photoPreview: previewUrl,
    });

    setError(null);
  };

  /* ─────────────────────────────────────────────
     💾 Save Profile
  ───────────────────────────────────────────── */
  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!profile) return;

    setSaving(true);
    setError(null);

    try {
      let newPhotoURL = profile.photoURL || "";

      // ✅ Upload avatar if selected
      if (editForm.photoFile) {
        const storage = getStorage();

        const storageRef = ref(
          storage,
          `avatars/${profile.uid}/${Date.now()}_${
            editForm.photoFile.name
          }`
        );

        const snapshot = await uploadBytes(
          storageRef,
          editForm.photoFile
        );

        newPhotoURL = await getDownloadURL(snapshot.ref);
      }

      // ✅ Update Firebase Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName:
            editForm.displayName.trim() ||
            profile.displayName,

          photoURL: newPhotoURL,
        });
      }

      // ✅ Update Firestore
      const userRef = doc(db, "users", profile.uid);

      await updateDoc(userRef, {
        displayName:
          editForm.displayName.trim() ||
          profile.displayName,

        photoURL: newPhotoURL,
        updatedAt: new Date(),
      });

      // ✅ Refresh cloud profile
      await refresh?.();

      setIsEditing(false);

      // Cleanup blob
      if (editForm.photoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editForm.photoPreview);
      }
    } catch (err: any) {
      console.error("Profile update error:", err);

      setError(
        err.message ||
          "Failed to save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ─────────────────────────────────────────────
     📸 Helpers
  ───────────────────────────────────────────── */
  const triggerFileInput = () =>
    fileInputRef.current?.click();

  const clearSelectedPhoto = (
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    setEditForm({
      ...editForm,
      photoFile: null,
      photoPreview: profile?.photoURL || "",
    });
  };

  /* ─────────────────────────────────────────────
     🧹 Cleanup blob URLs
  ───────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (editForm.photoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editForm.photoPreview);
      }
    };
  }, [editForm.photoPreview]);

  /* ─────────────────────────────────────────────
     ⏳ Loading State
  ───────────────────────────────────────────── */
  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <div className="navi-container animate-float mb-4">
            <span className="text-5xl"></span>
          </div>

          <p className="font-display text-xl text-gradient-primary animate-pulse">
            Navi is gathering your profile...
          </p>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     📊 XP Progress
  ───────────────────────────────────────────── */
  const nextLevelXP = profile.level * 100;

  const progressPercent = Math.min(
    (profile.xp / nextLevelXP) * 100,
    100
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-sky pb-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #FF6B9D, transparent 70%)",
          }}
        />

        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #C44DFF, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 px-4 pt-6 max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="p-2 rounded-full glass text-foreground hover:bg-white/80 transition"
          >
            ← Back
          </button>

          <h1 className="font-display text-xl text-gradient-primary">
            Profile
          </h1>

          <Link 
            to="/trophies"
            className="p-2 rounded-full glass text-foreground hover:bg-white/80 transition flex items-center gap-1"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-semibold hidden sm:inline">{unlockedCount}</span>
          </Link>
        </div>


        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60 mb-6"
        >
          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="relative mb-4 group">
              <img
                src={
                  profile.photoURL ||
                  "/default-avatar.png"
                }
                alt={profile.displayName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.src =
                    "/default-avatar.png";
                }}
              />

              <button
                onClick={openEditModal}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-8 h-8 text-white" />
              </button>

              <div className="absolute -bottom-2 -right-2 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-white shadow-pop">
                Lv {profile.level}
              </div>
            </div>

            {/* Name */}
            <h2 className="font-display text-2xl text-foreground">
              {profile.displayName}
            </h2>

            <p className="text-muted-foreground text-sm mt-1">
              {profile.email}
            </p>

            {/* XP Progress */}
            <div className="w-full mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{profile.xp} XP</span>
                <span>{nextLevelXP} XP to next level</span>
              </div>

              <div className="h-3 rounded-full bg-white/60 border border-white/80 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progressPercent}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>

        
        {/* ✅ DYNAMIC ACHIEVEMENTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Achievements
            </h3>
            <Link 
              to="/trophies"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {achievements.slice(0, 8).map((achievement) => (
              <Badge
                key={achievement.id}
                icon={achievement.icon}
                label={achievement.title}
                unlocked={achievement.unlocked}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <ActionButton
            icon={<Edit3 className="w-5 h-5" />}
            label="Edit Profile"
            onClick={openEditModal}
          />

          <ActionButton
            icon={<Shield className="w-5 h-5" />}
            label="Privacy & Security"
            onClick={() => {}}
          />

          <ActionButton
            icon={<Gift className="w-5 h-5" />}
            label="Invite Friends"
            onClick={() => {}}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-red-500/10 text-red-500 font-semibold border border-red-500/20 active:scale-[0.98] transition mt-4"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Navi Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-sm">
          <Navi mood="guiding" size={32} />
          <p>Keep exploring! You're doing great ✨</p>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          ✏️ Edit Profile Modal
      ───────────────────────────────────────── */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() =>
              !saving && setIsEditing(false)
            }
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
                y: 20,
              }}
              className="glass-strong rounded-[28px] p-6 w-full max-w-md shadow-card border border-white/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg text-foreground">
                  Edit Profile
                </h3>

                <button
                  onClick={() =>
                    !saving && setIsEditing(false)
                  }
                  className="p-2 rounded-full hover:bg-white/50 transition"
                  disabled={saving}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSave}
                className="space-y-4"
              >
                {/* Upload */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2 ml-1">
                    Profile Picture
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={saving}
                  />

                  <div
                    onClick={triggerFileInput}
                    className="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed cursor-pointer transition border-white/60 bg-white/40 hover:bg-white/60"
                  >
                    {editForm.photoPreview ? (
                      <>
                        <img
                          src={editForm.photoPreview}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-3 bg-white"
                        />

                        <p className="text-sm font-medium text-foreground">
                          Click to change
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, WebP • Max 5MB
                        </p>

                        <button
                          type="button"
                          onClick={clearSelectedPhoto}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-gradient-primary/20 flex items-center justify-center mb-3">
                          <ImageIcon className="w-8 h-8 text-pink-500" />
                        </div>

                        <p className="text-sm font-medium text-foreground">
                          Upload a photo
                        </p>

                        <button
                          type="button"
                          className="mt-3 px-4 py-2 rounded-full bg-gradient-primary text-white text-xs font-semibold"
                        >
                          Choose File
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 ml-1">
                    Display Name
                  </label>

                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        displayName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white focus:border-pink-400 outline-none"
                    minLength={2}
                    maxLength={30}
                    required
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-400/40 bg-red-50 px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/60 text-foreground font-semibold border border-white/80"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-primary text-white font-semibold shadow-pop flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <span className="animate-spin">
                          ⏳
                        </span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Navi Helper */}
              <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-xs">
                <Navi mood="happy" size={24} />
                <p>
                  Changes sync instantly across devices!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   🧩 Components
───────────────────────────────────────────── */

function Badge({
  icon,
  label,
  unlocked,
}: {
  icon: React.ReactNode;
  label: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition ${
        unlocked
          ? "bg-white/60 border-white/80 hover:scale-105"
          : "bg-gray-100/50 border-gray-200 opacity-50 grayscale"
      }`}
    >
      <div className={`${unlocked ? "text-foreground" : "text-gray-400"}`}>
        {icon}
      </div>

      <span className="text-[10px] font-semibold text-center leading-tight text-foreground">
        {label}
      </span>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 rounded-2xl glass text-foreground font-semibold border border-white/60 active:scale-[0.98] transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}