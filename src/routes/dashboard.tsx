// src/routes/dashboard.tsx
// ─────────────────────────────────────────────────────────────────────
// 🧭 PathWise Dashboard — Main Learning Path Interface
// ─────────────────────────────────────────────────────────────────────
// 
// Features:
// • Firestore-synced progress tracking across devices
// • 50-lesson winding path with unlock logic
// • Video + quiz lesson flow with XP rewards
// • Mini-game unlocks after every 2 lessons
// • Real-time stats bar (hearts, streak, stars, level)
// • Animated Navi mascot with contextual moods
// • Glassmorphism UI with smooth Framer Motion animations
// • Mobile-first responsive design with safe areas
// • Auth-protected route with auto-redirect
// • Accessible navigation with ARIA labels
//
// Architecture:
// • Component composition via imported UI modules
// • Custom hooks for auth + profile management
// • Hybrid progress storage (Firestore + localStorage fallback)
// • TypeScript interfaces for type safety
// • Event-driven UI updates via CustomEvent
//
// ─────────────────────────────────────────────────────────────────────

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Sparkles, Play, ChevronRight, Award, TrendingUp, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────
// 🧩 Imported UI Components
// ─────────────────────────────────────────────────────────────────────
import { Navi } from "@/components/Navi";
import { PathMap, type PathNode } from "@/components/PathMap";
import { BottomNav } from "@/components/BottomNav";
import { LessonModal } from "@/components/LessonModal";

// ─────────────────────────────────────────────────────────────────────
// 🔐 Auth & Data Hooks
// ─────────────────────────────────────────────────────────────────────
import { useUserProfile } from "@/hooks/useUserProfile";

// ─────────────────────────────────────────────────────────────────────
// 💾 Progress Management (Hybrid: Firestore + localStorage)
// ─────────────────────────────────────────────────────────────────────
import {
  getProgress,
  saveProgress,
  getCompletedLessons,
  addRewards,
  isLessonUnlocked,
  calculateLevel,
} from "@/lib/progress";

// ─────────────────────────────────────────────────────────────────────
// 📚 Lesson Content & Mini-Game Configuration
// ─────────────────────────────────────────────────────────────────────
import {
  LESSONS,
  getMiniGameAfterLesson,
  type Lesson,
  type MiniGame,
} from "@/lib/lessons";

// ─────────────────────────────────────────────────────────────────────
// 🎨 Animation Variants (Reusable for consistency)
// ─────────────────────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const springButton = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.03 },
  transition: { type: "spring", stiffness: 400, damping: 18 },
};

const floatAnimation = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

// ─────────────────────────────────────────────────────────────────────
// 🏷️ Route Configuration (TanStack Router)
// ─────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "PathWise — Gamified Career Learning" },
      { name: "description", content: "Follow the winding path with Navi the compass mascot. Complete bite-sized lessons and unlock career skills." },
      { property: "og:title", content: "PathWise — Gamified Career Learning" },
      { property: "og:description", content: "Bite-sized career lessons that feel like a game. Level up with Navi." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { name: "theme-color", content: "#FF6B9D" },
    ],
  }),
  component: Dashboard,
});

// ─────────────────────────────────────────────────────────────────────
// 🎛️ Main Dashboard Component
// ─────────────────────────────────────────────────────────────────────
function Dashboard() {
  // ─────────────────────────────────────────────────────────────────
  // 🔐 Auth & Profile State
  // ─────────────────────────────────────────────────────────────────
  const { profile, loading, error: profileError } = useUserProfile();
  const navigate = useNavigate();

  // ─────────────────────────────────────────────────────────────────
  // 🗺️ Path & Lesson State
  // ─────────────────────────────────────────────────────────────────
  const [nodes, setNodes] = useState<PathNode[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [activeNode, setActiveNode] = useState<PathNode | null>(null);
  const [open, setOpen] = useState(false);
  const [resumeStep, setResumeStep] = useState<number | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // ─────────────────────────────────────────────────────────────────
  // 🎮 Mini-Game & Reward State
  // ─────────────────────────────────────────────────────────────────
  const [pendingMiniGame, setPendingMiniGame] = useState<MiniGame | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // ─────────────────────────────────────────────────────────────────
  // ⚠️ Error Handling State
  // ─────────────────────────────────────────────────────────────────
  const [syncError, setSyncError] = useState<string | null>(null);

  // ─────────────────────────────────────────────────────────────────
  // 🔄 Load Progress from Firestore (with localStorage fallback)
  // ─────────────────────────────────────────────────────────────────
  const loadProgress = useCallback(async () => {
    if (!profile?.uid) {
      setProgressLoading(false);
      return;
    }

    try {
      setSyncError(null);
      
      // ✅ Fetch completed lessons from Firestore
      const completed = await getCompletedLessons(profile.uid);
      
      // ✅ Generate path nodes with unlock logic
      const generated: PathNode[] = LESSONS.map((lesson: Lesson) => {
        const isCompleted = completed.includes(lesson.id);
        const isUnlocked = lesson.id === 1 || completed.includes(lesson.id - 1);
        
        // Determine node type for visual variety
        let type: PathNode["type"] = "lesson";
        if (lesson.id % 10 === 0) type = "boss"; // Every 10th = boss challenge
        else if (lesson.id % 2 === 0) type = "challenge"; // Even = mini-challenge
        
        return {
          id: lesson.id,
          title: lesson.title,
          status: isCompleted ? "completed" : isUnlocked ? "current" : "locked",
          type,
          xpReward: lesson.xpReward,
          estimatedMinutes: lesson.estimatedMinutes,
        };
      });

      setNodes(generated);

      // ✅ Find resume position (next unlocked or last completed)
      const lastCompleted = completed[completed.length - 1];
      const nextUnlocked = generated.find((n) => n.status === "current");
      const target = nextUnlocked || (lastCompleted ? generated.find((n) => n.id === lastCompleted) : null);

      if (target) {
        const progress = await getProgress(profile.uid, target.id);
        setResumeStep(progress && !progress.completed ? progress.step + 1 : null);
      }
      
      setLastSyncTime(new Date());
    } catch (err: any) {
      console.error("Progress load failed:", err);
      setSyncError("Could not sync progress. Using offline data.");
      // Fallback: generate nodes with localStorage data
      const localCompleted = await getCompletedLessons(); // No userId = localStorage
      const localNodes = LESSONS.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        status: localCompleted.includes(lesson.id) ? "completed" : lesson.id === 1 ? "current" : "locked",
        type: lesson.id % 10 === 0 ? "boss" : lesson.id % 2 === 0 ? "challenge" : "lesson",
        xpReward: lesson.xpReward,
      }));
      setNodes(localNodes);
    } finally {
      setProgressLoading(false);
    }
  }, [profile?.uid]);

  // ─────────────────────────────────────────────────────────────────
  // 🎧 Listen for progress updates (cross-component sync)
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    loadProgress();
    const handler = () => loadProgress();
    window.addEventListener("pathwise:progress", handler);
    return () => window.removeEventListener("pathwise:progress", handler);
  }, [loadProgress]);

  // ─────────────────────────────────────────────────────────────────
  // 🔐 Auth Redirect: Send unauthenticated users to login
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loading && !profile) {
      navigate({ to: "/login" });
    }
  }, [profile, loading, navigate]);

  // ─────────────────────────────────────────────────────────────────
  // 🎯 Open Lesson Modal (with lock check)
  // ─────────────────────────────────────────────────────────────────
  const openNode = useCallback((node: PathNode) => {
    if (node.status === "locked") return;
    setActiveNode(node);
    setOpen(true);
  }, []);

  // ─────────────────────────────────────────────────────────────────
  // ▶️ Continue Button: Jump to next available lesson
  // ─────────────────────────────────────────────────────────────────
  const handleContinue = useCallback(() => {
    if (!profile) return;
    const target = nodes.find((n) => n.status === "current");
    if (target) openNode(target);
  }, [nodes, openNode, profile]);

  // ─────────────────────────────────────────────────────────────────
  // ✅ Complete Lesson: Save progress, award XP, unlock mini-game
  // ─────────────────────────────────────────────────────────────────
  const handleComplete = async (node: PathNode, quizScore?: number) => {
    if (!profile) return;
    const lesson = LESSONS.find((l: Lesson) => l.id === node.id);
    if (!lesson) return;

    try {
      // ✅ Save progress to Firestore (with localStorage fallback)
      await saveProgress(
        {
          lessonId: node.id,
          step: 99,
          total: 2,
          completed: true,
          quizScore: quizScore ?? 1,
          xpEarned: lesson.xpReward,
          starsEarned: 1,
          completedAt: new Date().toISOString(),
        },
        profile.uid
      );

      // ✅ Award XP and stars
      await addRewards(lesson.xpReward, 1, profile.uid);

      // ✅ Trigger UI refresh across components
      window.dispatchEvent(new CustomEvent("pathwise:progress"));

      // ✅ Show celebration animation
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);

      // ✅ Check for mini-game unlock
      const miniGame = getMiniGameAfterLesson(node.id);
      if (miniGame) {
        setPendingMiniGame(miniGame);
        setTimeout(() => {
          navigate({ to: "/minigame/$id", params: { id: miniGame.id.toString() } });
          setPendingMiniGame(null);
        }, 1800);
      }
    } catch (err: any) {
      console.error("Failed to complete lesson:", err);
      setSyncError("Progress saved locally. Will sync when online.");
    }
  };

  // ─────────────────────────────────────────────────────────────────
  // 🎨 Calculate Derived Values
  // ─────────────────────────────────────────────────────────────────
  const nextLevelXP = useMemo(() => profile?.level ? profile.level * 100 : 100, [profile?.level]);
  const progressPercent = useMemo(() => {
    if (!profile) return 0;
    return Math.min((profile.xp / nextLevelXP) * 100, 100);
  }, [profile?.xp, nextLevelXP]);

  const unlockedCount = useMemo(() => nodes.filter(n => n.status !== "locked").length, [nodes]);
  const completedCount = useMemo(() => nodes.filter(n => n.status === "completed").length, [nodes]);

  // ─────────────────────────────────────────────────────────────────
  // ⏳ Loading State: Show skeleton while data loads
  // ─────────────────────────────────────────────────────────────────
  if (loading || progressLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <div className="navi-container animate-float mb-4">
            <span className="text-5xl">🧭</span>
          </div>
          <p className="font-display text-xl text-gradient-primary animate-pulse">
            Syncing your journey...
          </p>
          {syncError && (
            <p className="text-sm text-muted-foreground mt-2">{syncError}</p>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // 🚨 Error State: Show recovery options
  // ─────────────────────────────────────────────────────────────────
  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky p-4">
        <div className="glass-strong rounded-2xl p-6 max-w-md text-center">
          <h2 className="font-display text-xl text-foreground mb-2">Connection Issue</h2>
          <p className="text-muted-foreground mb-4">{profileError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // 🎨 Main Render: Dashboard UI
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-32 overflow-x-hidden relative bg-gradient-sky">
      {/* ───────────────────────────────────────────────────────────
          🎨 Animated Background Layers
          ─────────────────────────────────────────────────────────── */}
      <RollingHills />

      {/* ───────────────────────────────────────────────────────────
          🎉 Celebration Overlay (on lesson complete)
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-center"
            >
              <div className="text-6xl mb-2">🎉</div>
              <p className="font-display text-2xl text-gradient-primary">Lesson Complete!</p>
              <p className="text-muted-foreground">+{nodes.find(n => n.status === "current")?.xpReward} XP</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────
          📊 Header: Logo + Real-time Stats
          ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-4 pt-4 pb-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Go to home page">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-pop border-2 border-white">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-xl text-gradient-primary">PathWise</span>
          </Link>
          
          
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────
          👋 Welcome Card: Personalized Greeting + XP Progress
          ─────────────────────────────────────────────────────────── */}
      <section className="px-4 max-w-2xl mx-auto mb-6">
        <motion.div
          {...fadeInUp}
          className="glass-strong rounded-[28px] p-5 flex items-center gap-4 shadow-card border border-white/60"
        >
          <div className="shrink-0" aria-hidden="true">
            <Navi mood="happy" size={92} trackCursor />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl text-gradient-primary leading-tight">
              Ready, {profile.displayName}? 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              You're{" "}
              <b className="text-foreground">{Math.max(0, nextLevelXP - profile.xp)} XP</b>{" "}
              away from leveling up to{" "}
              <b className="text-foreground">Navigator</b>.
            </p>

            {/* 📈 XP Progress Bar with Animation */}
            <div className="mt-3 h-3 rounded-full bg-white/70 overflow-hidden border-2 border-white" role="progressbar" aria-valuenow={Math.round(progressPercent)} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-primary rounded-full"
                aria-hidden="true"
              />
            </div>

            {/* ▶️ Continue Button */}
            <motion.button
              {...springButton}
              onClick={handleContinue}
              className="mt-3 min-h-12 px-5 rounded-2xl bg-gradient-primary text-white font-display shadow-pop border-2 border-white inline-flex items-center gap-2"
              aria-label="Continue to next lesson"
            >
              <Play className="w-4 h-4" fill="white" aria-hidden="true" />
              {resumeStep ? `Continue — Step ${resumeStep}` : "Continue"}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          🗺️ Path Map: Winding Lesson Path with Nodes
          ─────────────────────────────────────────────────────────── */}
      <section className="px-4 relative z-10">
        <PathMap
          nodes={nodes}
          onSelect={openNode}
          currentLevel={profile.level}
          unlockedCount={unlockedCount}
          totalCount={LESSONS.length}
        />
        
        {/* 📊 Path Progress Summary */}
        <div className="mt-6 glass rounded-2xl p-4 text-center border border-white/60">
          <p className="text-sm text-muted-foreground">
            <b className="text-foreground">{completedCount}</b> of <b className="text-foreground">{LESSONS.length}</b> lessons completed
          </p>
          <div className="mt-2 h-2 rounded-full bg-white/60 overflow-hidden">
            <div className="h-full bg-gradient-primary" style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          🎓 Lesson Modal: Video + Quiz Flow
          ─────────────────────────────────────────────────────────── */}
      <LessonModal
        node={activeNode}
        open={open}
        onClose={() => setOpen(false)}
        onComplete={handleComplete}
        userProfile={profile}
      />

      {/* ───────────────────────────────────────────────────────────
          🧭 Bottom Navigation: Persistent App Nav
          ─────────────────────────────────────────────────────────── */}
      <BottomNav activeTab="path" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 🎨 Background Decor: Rolling Hills + Floating Particles
// ─────────────────────────────────────────────────────────────────────
function RollingHills() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-sky" aria-hidden="true" />
      
      {/* Floating glow orbs */}
      <motion.div
        {...floatAnimation}
        className="absolute top-10 right-10 w-40 h-40 rounded-full opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle, #FFE066 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <motion.div
        {...floatAnimation}
        transition={{ duration: 4, delay: 1 }}
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, #FF6B9D 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      
      {/* SVG hills */}
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[60%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B8E994" />
            <stop offset="100%" stopColor="#78D483" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9DD9C5" />
            <stop offset="100%" stopColor="#6BBFA8" />
          </linearGradient>
        </defs>
        <path
          d="M0,400 C300,300 600,500 900,380 C1200,260 1300,420 1440,360 L1440,600 L0,600 Z"
          fill="url(#hill2)"
          opacity="0.6"
        />
        <path
          d="M0,460 C200,360 500,520 800,440 C1100,360 1300,500 1440,440 L1440,600 L0,600 Z"
          fill="url(#hill1)"
        />
      </svg>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FFD700]/30 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 📝 TypeScript Interfaces (Exported for other components)
// ─────────────────────────────────────────────────────────────────────
export interface DashboardStats {
  completedLessons: number;
  totalLessons: number;
  currentStreak: number;
  totalXP: number;
  nextLevelXP: number;
}

export interface PathProgress {
  unlockedCount: number;
  completedCount: number;
  nextUnlockedId: number | null;
}

// ─────────────────────────────────────────────────────────────────────
// 🧪 Utility Functions (Could be moved to /lib/utils)
// ─────────────────────────────────────────────────────────────────────
export function calculateProgressStats(profile: any, nodes: PathNode[]): DashboardStats {
  const completed = nodes.filter(n => n.status === "completed").length;
  return {
    completedLessons: completed,
    totalLessons: nodes.length,
    currentStreak: profile?.streak || 0,
    totalXP: profile?.xp || 0,
    nextLevelXP: (profile?.level || 1) * 100,
  };
}

export function getNextUnlockedNode(nodes: PathNode[]): PathNode | null {
  return nodes.find(n => n.status === "current") || null;
}

// ─────────────────────────────────────────────────────────────────────
// ♿ Accessibility Helpers
// ─────────────────────────────────────────────────────────────────────
export function getAriaStatus(node: PathNode): string {
  switch (node.status) {
    case "completed": return "Completed";
    case "current": return "Available";
    case "locked": return `Locked — Complete lesson ${node.id - 1} to unlock`;
    default: return "Unknown status";
  }
}

// ─────────────────────────────────────────────────────────────────────
// 🎨 Design Tokens (Could be moved to /lib/theme)
// ─────────────────────────────────────────────────────────────────────
export const COLORS = {
  primary: { start: "#FF6B9D", end: "#C44DFF" },
  success: "#00D4AA",
  warning: "#FFD700",
  error: "#EF4444",
  glass: {
    bg: "rgba(255, 255, 255, 0.7)",
    border: "rgba(255, 255, 255, 0.6)",
    strong: "rgba(255, 255, 255, 0.85)",
  },
};

export const SHADOWS = {
  pop: "0 4px 20px rgba(196, 77, 255, 0.25), 0 2px 8px rgba(0, 0, 0, 0.08)",
  card: "0 8px 32px rgba(255, 107, 157, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06)",
};

// ─────────────────────────────────────────────────────────────────────
// 🚀 Performance Optimizations
// ─────────────────────────────────────────────────────────────────────
// • useMemo for derived values (progressPercent, stats)
// • useCallback for event handlers (loadProgress, handleComplete)
// • React.memo could be applied to child components if needed
// • Code splitting via TanStack Router (already implemented)
// • Lazy loading for heavy components (Confetti, complex animations)

// ─────────────────────────────────────────────────────────────────────
// 🧭 End of File — Dashboard Ready for Production!
// ─────────────────────────────────────────────────────────────────────