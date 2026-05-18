// src/routes/trophies.tsx
// ─────────────────────────────────────────────────────────────────────
// 🏆 PathWise Achievements Page — Dynamic Trophies & Badges
// ─────────────────────────────────────────────────────────────────────
// 
// Features:
// • Back button to return to dashboard
// • Dynamic achievements based on real Firestore progress
// • Progress bars for incomplete achievements
// • Rarity tiers (Common, Rare, Epic, Legendary)
// • Mobile-responsive grid layout
// • Glassmorphism UI with smooth animations
// • Navi mascot celebration on unlock
// • Accessible with ARIA labels
//
// ─────────────────────────────────────────────────────────────────────

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { 
  Trophy, Star, Flame, Target, Zap, Heart, BookOpen, Clock, 
  TrendingUp, Award, ChevronLeft, Sparkles, Lock, CheckCircle 
} from "lucide-react";

import { Navi } from "@/components/Navi";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getCompletedLessons } from "@/lib/progress";
import type { UserProfile } from "@/lib/userData";

export const Route = createFileRoute("/trophies")({
  head: () => ({
    meta: [
      { title: "Achievements — PathWise" },
      { name: "description", content: "View your unlocked achievements and track your progress toward the next trophy!" },
      { property: "og:title", content: "Achievements — PathWise" },
    ],
  }),
  component: TrophiesPage,
});

// ─────────────────────────────────────────────────────────────────────
// 🏷️ Achievement Interface
// ─────────────────────────────────────────────────────────────────────
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: "learning" | "streak" | "performance" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward?: number;
}

// ─────────────────────────────────────────────────────────────────────
// 🎨 Rarity Colors & Styles
// ─────────────────────────────────────────────────────────────────────
const RARITY_STYLES = {
  common: {
    gradient: "from-gray-400 to-gray-500",
    bg: "bg-gray-50/50",
    border: "border-gray-300/50",
    text: "text-gray-600",
    badge: "bg-gray-200 text-gray-600",
  },
  rare: {
    gradient: "from-blue-400 to-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-300/50",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  epic: {
    gradient: "from-purple-400 to-purple-600",
    bg: "bg-purple-50/50",
    border: "border-purple-300/50",
    text: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
  legendary: {
    gradient: "from-yellow-400 to-orange-500",
    bg: "bg-yellow-50/50",
    border: "border-yellow-300/50",
    text: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
  },
};

// ─────────────────────────────────────────────────────────────────────
// 🎛️ Main Trophies Page Component
// ─────────────────────────────────────────────────────────────────────
function TrophiesPage() {
  const { profile, loading } = useUserProfile();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // ─────────────────────────────────────────────────────────────────
  // 🔐 Auth Redirect
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loading && !profile) {
      navigate({ to: "/login" });
    }
  }, [profile, loading, navigate]);

  // ─────────────────────────────────────────────────────────────────
  // 📊 Load Completed Lessons for Achievement Logic
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (profile?.uid) {
      getCompletedLessons(profile.uid).then(setCompletedLessons);
    }
  }, [profile?.uid]);

  // ─────────────────────────────────────────────────────────────────
  // 🏆 Generate Dynamic Achievements Based on User Data
  // ─────────────────────────────────────────────────────────────────
  const achievements = useMemo((): Achievement[] => {
    if (!profile) return [];
    
    return [
      // ───── Learning Achievements ─────
      {
        id: "first-lesson",
        title: "First Steps",
        description: "Complete your first lesson",
        icon: <Star className="w-6 h-6" />,
        unlocked: completedLessons.length >= 1,
        category: "learning",
        rarity: "common",
        xpReward: 10,
      },
      {
        id: "lesson-5",
        title: "Getting Started",
        description: "Complete 5 lessons",
        icon: <BookOpen className="w-6 h-6" />,
        unlocked: completedLessons.length >= 5,
        progress: completedLessons.length,
        maxProgress: 5,
        category: "learning",
        rarity: "common",
        xpReward: 25,
      },
      {
        id: "lesson-10",
        title: "Dedicated Learner",
        description: "Complete 10 lessons",
        icon: <Target className="w-6 h-6" />,
        unlocked: completedLessons.length >= 10,
        progress: completedLessons.length,
        maxProgress: 10,
        category: "learning",
        rarity: "rare",
        xpReward: 50,
      },
      {
        id: "lesson-25",
        title: "Career Explorer",
        description: "Complete 25 lessons",
        icon: <Trophy className="w-6 h-6" />,
        unlocked: completedLessons.length >= 25,
        progress: completedLessons.length,
        maxProgress: 25,
        category: "learning",
        rarity: "epic",
        xpReward: 100,
      },
      {
        id: "lesson-50",
        title: "Master Navigator",
        description: "Complete all 50 lessons",
        icon: <Award className="w-6 h-6" />,
        unlocked: completedLessons.length >= 50,
        progress: completedLessons.length,
        maxProgress: 50,
        category: "learning",
        rarity: "legendary",
        xpReward: 250,
      },
      
      // ───── Streak Achievements ─────
      {
        id: "streak-3",
        title: "On Fire",
        description: "Maintain a 3-day streak",
        icon: <Flame className="w-6 h-6" />,
        unlocked: profile.streak >= 3,
        progress: profile.streak,
        maxProgress: 3,
        category: "streak",
        rarity: "common",
        xpReward: 15,
      },
      {
        id: "streak-7",
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: <Zap className="w-6 h-6" />,
        unlocked: profile.streak >= 7,
        progress: profile.streak,
        maxProgress: 7,
        category: "streak",
        rarity: "rare",
        xpReward: 40,
      },
      {
        id: "streak-30",
        title: "Monthly Champion",
        description: "Maintain a 30-day streak",
        icon: <TrendingUp className="w-6 h-6" />,
        unlocked: profile.streak >= 30,
        progress: profile.streak,
        maxProgress: 30,
        category: "streak",
        rarity: "legendary",
        xpReward: 150,
      },
      
      // ───── Performance Achievements ─────
      {
        id: "xp-100",
        title: "Rising Star",
        description: "Earn 100 XP",
        icon: <Star className="w-6 h-6" />,
        unlocked: profile.xp >= 100,
        progress: profile.xp,
        maxProgress: 100,
        category: "performance",
        rarity: "common",
        xpReward: 20,
      },
      {
        id: "xp-500",
        title: "XP Collector",
        description: "Earn 500 XP",
        icon: <Trophy className="w-6 h-6" />,
        unlocked: profile.xp >= 500,
        progress: profile.xp,
        maxProgress: 500,
        category: "performance",
        rarity: "rare",
        xpReward: 75,
      },
      {
        id: "perfect-quiz",
        title: "Perfect Score",
        description: "Get 100% on a quiz",
        icon: <Target className="w-6 h-6" />,
        unlocked: profile.stars >= 10,
        category: "performance",
        rarity: "rare",
        xpReward: 30,
      },
      
      // ───── Special Achievements ─────
      {
        id: "heart-collector",
        title: "Full Hearts",
        description: "Maintain 5 hearts",
        icon: <Heart className="w-6 h-6" />,
        unlocked: profile.hearts >= 5,
        category: "special",
        rarity: "common",
        xpReward: 10,
      },
      {
        id: "early-bird",
        title: "Early Bird",
        description: "Complete a lesson before 9 AM",
        icon: <Clock className="w-6 h-6" />,
        unlocked: false, // Would need timestamp tracking
        category: "special",
        rarity: "epic",
        xpReward: 50,
      },
      {
        id: "navi-friend",
        title: "Navi's Friend",
        description: "Interact with Navi 10 times",
        icon: <Sparkles className="w-6 h-6" />,
        unlocked: false, // Would need interaction tracking
        category: "special",
        rarity: "epic",
        xpReward: 40,
      },
    ];
  }, [profile, completedLessons]);

  // ─────────────────────────────────────────────────────────────────
  // 📊 Calculate Summary Stats
  // ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const unlocked = achievements.filter(a => a.unlocked).length;
    const total = achievements.length;
    const byCategory = {
      learning: achievements.filter(a => a.category === "learning" && a.unlocked).length,
      streak: achievements.filter(a => a.category === "streak" && a.unlocked).length,
      performance: achievements.filter(a => a.category === "performance" && a.unlocked).length,
      special: achievements.filter(a => a.category === "special" && a.unlocked).length,
    };
    return { unlocked, total, byCategory, percent: Math.round((unlocked / total) * 100) };
  }, [achievements]);

  // ─────────────────────────────────────────────────────────────────
  // 🔄 Group Achievements by Category
  // ─────────────────────────────────────────────────────────────────
  const categories = useMemo(() => ({
    learning: achievements.filter(a => a.category === "learning"),
    streak: achievements.filter(a => a.category === "streak"),
    performance: achievements.filter(a => a.category === "performance"),
    special: achievements.filter(a => a.category === "special"),
  }), [achievements]);

  // ─────────────────────────────────────────────────────────────────
  // ⏳ Loading State
  // ─────────────────────────────────────────────────────────────────
  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <div className="navi-container animate-float mb-4">
            <span className="text-5xl">🏆</span>
          </div>
          <p className="font-display text-xl text-gradient-primary animate-pulse">
            Loading your achievements...
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // 🎨 Main Render
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-sky pb-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #FF6B9D, transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #C44DFF, transparent 70%)" }} />
      </div>

      {/* ─────────────────────────────────────────────────────────
          🧭 Header with BACK BUTTON
          ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-4 pt-4 pb-3 glass border-b border-white/60">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* ✅ BACK BUTTON */}
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-foreground hover:bg-white/60 transition active:scale-95"
            aria-label="Go back to dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Back</span>
          </button>
          
          <h1 className="font-display text-xl md:text-2xl text-gradient-primary">Your Achievements</h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="px-4 pt-4 max-w-4xl mx-auto">
        {/* ─────────────────────────────────────────────────────────
            📊 Overall Progress Card
            ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg text-foreground">Achievement Progress</h2>
                <p className="text-sm text-muted-foreground">{stats.unlocked} of {stats.total} unlocked</p>
              </div>
            </div>
            <Navi mood={stats.percent >= 50 ? "happy" : "guiding"} size={56} />
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 rounded-full bg-white/60 overflow-hidden border-2 border-white">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
          
          {/* Category Breakdown */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">{stats.byCategory.learning}</p>
              <p className="text-[10px] text-muted-foreground">Learning</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.byCategory.streak}</p>
              <p className="text-[10px] text-muted-foreground">Streak</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.byCategory.performance}</p>
              <p className="text-[10px] text-muted-foreground">Performance</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.byCategory.special}</p>
              <p className="text-[10px] text-muted-foreground">Special</p>
            </div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────
            🏆 Achievement Categories
            ───────────────────────────────────────────────────────── */}
        {Object.entries(categories).map(([category, catAchievements]) => (
          catAchievements.length > 0 && (
            <section key={category} className="mb-8">
              <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2 capitalize">
                {category === "learning" && <BookOpen className="w-5 h-5 text-primary" />}
                {category === "streak" && <Flame className="w-5 h-5 text-orange-500" />}
                {category === "performance" && <TrendingUp className="w-5 h-5 text-green-500" />}
                {category === "special" && <Star className="w-5 h-5 text-yellow-500" />}
                {category}
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onClick={() => setSelectedAchievement(achievement)}
                  />
                ))}
              </div>
            </section>
          )
        ))}

        {/* ─────────────────────────────────────────────────────────
            🎉 Empty State (if no achievements unlocked yet)
            ───────────────────────────────────────────────────────── */}
        {stats.unlocked === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Navi mood="guiding" size={100} />
            <h3 className="font-display text-xl text-foreground mt-4 mb-2">No Achievements Yet</h3>
            <p className="text-muted-foreground mb-6">Complete lessons to unlock your first trophy!</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold shadow-pop"
            >
              Start Learning <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────
          🔍 Achievement Detail Modal (on tap)
          ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass-strong rounded-[28px] p-6 w-full max-w-md shadow-card border border-white/60"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-r ${RARITY_STYLES[selectedAchievement.rarity].gradient} text-white shadow-lg`}>
                  {selectedAchievement.icon}
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 rounded-full hover:bg-white/50 transition"
                  aria-label="Close"
                >
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>
              
              <h3 className="font-display text-xl text-foreground mb-1">{selectedAchievement.title}</h3>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${RARITY_STYLES[selectedAchievement.rarity].badge} inline-block mb-3`}>
                {selectedAchievement.rarity}
              </span>
              
              <p className="text-muted-foreground mb-4">{selectedAchievement.description}</p>
              
              {/* Progress Bar */}
              {selectedAchievement.progress !== undefined && selectedAchievement.maxProgress && !selectedAchievement.unlocked && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{selectedAchievement.progress}/{selectedAchievement.maxProgress}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${(selectedAchievement.progress! / selectedAchievement.maxProgress!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Reward */}
              {selectedAchievement.xpReward && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-primary/10 border border-primary/30">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">+{selectedAchievement.xpReward} XP on unlock</span>
                </div>
              )}
              
              {/* Status */}
              <div className="mt-4 flex items-center gap-2">
                {selectedAchievement.unlocked ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-600">Unlocked!</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Keep going to unlock</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 🧩 Achievement Card Component
// ─────────────────────────────────────────────────────────────────────
function AchievementCard({ achievement, onClick }: { 
  achievement: Achievement; 
  onClick: () => void;
}) {
  const styles = RARITY_STYLES[achievement.rarity];
  const progressPercent = achievement.progress && achievement.maxProgress 
    ? (achievement.progress / achievement.maxProgress) * 100 
    : 0;

  return (
    <motion.button
      whileHover={achievement.unlocked ? { scale: 1.03, y: -4 } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={!achievement.unlocked && !achievement.progress}
      className={`glass rounded-[20px] p-4 border-2 text-left transition-all ${
        achievement.unlocked
          ? `${styles.bg} ${styles.border} hover:shadow-lg`
          : "bg-white/40 border-white/40 opacity-70"
      }`}
      aria-label={`${achievement.title}: ${achievement.description}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          achievement.unlocked
            ? `bg-gradient-to-r ${styles.gradient} text-white shadow-lg`
            : "bg-gray-200 text-gray-400"
        }`}>
          {achievement.icon}
        </div>
        {achievement.unlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
      
      <h4 className={`font-display text-base mb-1 ${
        achievement.unlocked ? "text-foreground" : "text-muted-foreground"
      }`}>
        {achievement.title}
      </h4>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{achievement.description}</p>
      
      {/* Progress Bar */}
      {achievement.progress !== undefined && achievement.maxProgress && !achievement.unlocked && (
        <div className="mt-2">
          <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
            <div
              className="h-full bg-gradient-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            {achievement.progress}/{achievement.maxProgress}
          </p>
        </div>
      )}
      
      {/* Rarity Badge */}
      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${styles.badge}`}>
        {achievement.rarity}
      </span>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ♿ Accessibility: Achievement Status Helper
// ─────────────────────────────────────────────────────────────────────
function getAchievementStatus(achievement: Achievement): string {
  if (achievement.unlocked) return "Unlocked";
  if (achievement.progress && achievement.maxProgress) {
    return `${achievement.progress} of ${achievement.maxProgress} complete`;
  }
  return "Locked";
}

// ─────────────────────────────────────────────────────────────────────
// 🎨 Design Tokens (Shared with rest of app)
// ─────────────────────────────────────────────────────────────────────
export const TROPHY_COLORS = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  epic: "#8B5CF6",
  legendary: "#F59E0B",
};

// ─────────────────────────────────────────────────────────────────────
// 🚀 End of File — Trophies Page Ready!
// ─────────────────────────────────────────────────────────────────────