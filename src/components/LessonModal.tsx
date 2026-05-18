// src/components/LessonModal.tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Sparkles, Award } from "lucide-react";
import { Navi } from "./Navi";
import { Confetti } from "./Confetti";
import { getProgress, saveProgress, addRewards } from "@/lib/progress";
import type { PathNode } from "./PathMap";
import type { UserProfile } from "@/lib/userData";

interface Step {
  type: "text" | "quiz";
  title: string;
  body: string;
  options?: string[];
  answer?: number;
  explanation?: string;
}

function buildSteps(node: PathNode): Step[] {
  return [
    { 
      type: "text", 
      title: `Welcome to ${node.title}!`, 
      body: "Navi will guide you through a few quick, bite-sized steps. Let's learn something new! 🧭" 
    },
    { 
      type: "text", 
      title: "Core Idea", 
      body: "Bite-sized learning beats marathon study sessions every time. Small steps lead to big progress!" 
    },
    { 
      type: "quiz", 
      title: "Quick Check", 
      body: "Which is more effective for long-term retention?", 
      options: ["Cramming the night before", "Spaced practice over time", "Skipping breaks to finish faster"], 
      answer: 1,
      explanation: "Spaced practice helps your brain consolidate memories over time — that's why PathWise uses short, frequent lessons! ✨"
    },
    { 
      type: "text", 
      title: "Apply It", 
      body: "Try one tiny action today — even 2 minutes counts. Progress > perfection!" 
    },
    { 
      type: "text", 
      title: "Wrap Up", 
      body: "Amazing work! You've earned XP and unlocked the next node on your path. Keep going! 🎉" 
    },
  ];
}

export function LessonModal({
  node,
  open,
  onClose,
  onComplete,
  userProfile,
}: {
  node: PathNode | null;
  open: boolean;
  onClose: () => void;
  onComplete?: (node: PathNode, quizScore?: number) => void;
  userProfile?: UserProfile | null;
}) {
  // ✅ Safe steps generation with null check
  const steps = useMemo(() => {
    if (!node) return [];
    return buildSteps(node);
  }, [node]);
  
  const [step, setStep] = useState(0);
  const [pickedWrong, setPickedWrong] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuizQuestions, setTotalQuizQuestions] = useState(0);

  // ✅ Memoized persist function to avoid re-creation
  const persist = useCallback((s: number, completed: boolean, score?: number) => {
    if (!node) return;
    
    saveProgress({
      lessonId: node.id,
      step: s,
      total: steps.length,
      completed,
      quizScore: score,
      xpEarned: completed ? node.xpReward || 10 : 0,
      starsEarned: completed ? 1 : 0,
      updatedAt: Date.now(),
    }, userProfile?.uid); // ✅ Pass userId for Firestore sync
  }, [node, steps.length, userProfile?.uid]);

  // ✅ Resume saved step when opening a lesson
  useEffect(() => {
    if (!open || !node) return;
    
    const loadProgress = async () => {
      const saved = await getProgress(node.id, userProfile?.uid);
      if (saved && !saved.completed) {
        setStep(Math.min(saved.step, steps.length - 1));
        if (saved.quizScore !== undefined) {
          setQuizScore(saved.quizScore);
        }
      } else {
        setStep(0);
      }
    };
    
    loadProgress();
    setPickedWrong(false);
    setCelebrate(false);
    setQuizScore(0);
    setTotalQuizQuestions(0);
  }, [open, node, steps.length, userProfile?.uid]);

  // ✅ Early return if no node or steps
  if (!node || steps.length === 0) {
    return null;
  }

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const isQuiz = current.type === "quiz";

  const next = () => {
    const ns = step + 1;
    if (isLast) {
      // ✅ Calculate final quiz score if there were quiz questions
      const finalScore = totalQuizQuestions > 0 ? quizScore / totalQuizQuestions : 1;
      
      persist(steps.length - 1, true, finalScore);
      setCelebrate(true);
      
      // ✅ Pass score to onComplete for XP calculation
      setTimeout(() => {
        onComplete?.(node, finalScore);
        onClose();
      }, 1600);
    } else {
      setStep(ns);
      persist(ns, false);
      setPickedWrong(false);
    }
  };

  const prev = () => {
    if (step === 0) return;
    const ns = step - 1;
    setStep(ns);
    persist(ns, false);
  };

  const onPickQuiz = (i: number) => {
    if (current.type !== "quiz" || current.answer === undefined) return;
    
    // Track total quiz questions for scoring
    setTotalQuizQuestions(prev => prev + 1);
    
    if (i === current.answer) {
      setQuizScore(prev => prev + 1);
      setPickedWrong(false);
      // Auto-advance after correct answer with slight delay for feedback
      setTimeout(next, 800);
    } else {
      setPickedWrong(true);
      // Don't auto-advance on wrong answer — let user try again or continue
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-md glass-strong rounded-[32px] p-5 shadow-card border border-white/60"
            role="dialog"
            aria-modal="true"
            aria-label={`Lesson: ${node.title}`}
          >
            {celebrate && <Confetti />}

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-pop border-2 border-white">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Lesson</p>
                  <h2 className="font-display text-base leading-tight text-foreground">{node.title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full glass flex items-center justify-center active:scale-95 transition-transform hover:bg-white/50"
                aria-label="Close lesson"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Step {step + 1} of {steps.length}
                </span>
                <span className="text-xs font-semibold text-foreground">
                  {Math.round(((step + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-white/70 border-2 border-white overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary"
                  initial={false}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                />
              </div>
            </div>

            {/* Navi Guide + Content */}
            <div className="flex items-start gap-3 mb-4">
              <Navi mood={celebrate ? "celebrating" : pickedWrong ? "worried" : "guiding"} size={84} />
              <div className="flex-1 glass rounded-2xl p-3 mt-2 border border-white/60">
                <p className="font-display text-sm text-foreground leading-snug">{current.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{current.body}</p>
                
                {/* Quiz Explanation */}
                {pickedWrong && current.explanation && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs mt-2 text-orange-600 bg-orange-50/50 p-2 rounded-lg border border-orange-200"
                  >
                    💡 {current.explanation}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Quiz Options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
                className="min-h-[80px]"
              >
                {isQuiz && current.options && (
                  <div className="grid gap-2">
                    {current.options.map((opt, i) => {
                      const isSelected = pickedWrong && i !== current.answer;
                      const isCorrect = pickedWrong && i === current.answer;
                      
                      return (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 18 }}
                          onClick={() => onPickQuiz(i)}
                          disabled={pickedWrong}
                          className={`min-h-12 px-4 rounded-2xl border-2 text-left font-semibold transition-all ${
                            isCorrect
                              ? "bg-green-50 border-green-400 text-green-700"
                              : isSelected
                              ? "bg-red-50 border-red-400 text-red-700"
                              : "glass border-white/60 hover:bg-white/80 text-foreground"
                          } disabled:opacity-70`}
                        >
                          {opt}
                          {isCorrect && <Check className="w-4 h-4 inline ml-2 text-green-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer Actions */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/60">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                disabled={step === 0}
                className="min-h-12 min-w-12 px-4 rounded-2xl glass flex items-center gap-1 font-semibold border border-white/60 disabled:opacity-40 hover:bg-white/80 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                onClick={next}
                disabled={isQuiz && !pickedWrong}
                className="flex-1 min-h-12 rounded-2xl bg-gradient-primary text-white font-display shadow-pop border-2 border-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLast ? (
                  <>
                    Finish <Check className="w-4 h-4" />
                  </>
                ) : isQuiz ? (
                  pickedWrong ? "Try Again" : "Submit Answer"
                ) : (
                  <>
                    Continue <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            {/* XP Reward Preview (on last step) */}
            {isLast && !celebrate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-gradient-primary/10 border border-primary/30 flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  +{node.xpReward || 10} XP + 1 Star on completion!
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}