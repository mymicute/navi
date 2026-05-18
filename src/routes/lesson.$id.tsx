// src/routes/lesson.$id.tsx

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Play,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Award,
  Volume2,
  RefreshCw,
} from "lucide-react";

import { Navi } from "@/components/Navi";

import { useUserProfile } from "@/hooks/useUserProfile";

import {
  LESSONS,
  getMiniGameAfterLesson,
} from "@/lib/lessons";

import {
  saveProgress,
  addRewards,
  getProgress,
} from "@/lib/progress";

export const Route = createFileRoute("/lesson/$id")({
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const { profile } = useUserProfile();

  const lessonId = parseInt(id);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [showResult, setShowResult] =
    useState(false);

  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [completed, setCompleted] =
    useState(false);

  const [videoWatched, setVideoWatched] =
    useState(false);

  const lesson = LESSONS.find(
    (l) => l.id === lessonId
  );

  const miniGame =
    getMiniGameAfterLesson(lessonId);

  /* ────────────────────────────────────────────
     ✅ LOAD EXISTING PROGRESS
     ──────────────────────────────────────────── */

  useEffect(() => {
    if (!profile) return;

    const loadProgress = async () => {
      try {
        const progress = await getProgress(
          profile.uid,
          lessonId
        );

        if (progress?.completed) {
          setCompleted(true);
        } else if (progress?.step === 1) {
          setCurrentStep(1);
        }
      } catch (err) {
        console.error(
          "Failed to load lesson progress:",
          err
        );
      }
    };

    loadProgress();
  }, [profile, lessonId]);

  /* ────────────────────────────────────────────
     ✅ LESSON NOT FOUND
     ──────────────────────────────────────────── */

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center glass-strong rounded-2xl p-8">
          <h2 className="font-display text-2xl text-foreground mb-4">
            Lesson not found
          </h2>

          <button
            onClick={() =>
              navigate({ to: "/dashboard" })
            }
            className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────
     ✅ VIDEO COMPLETED
     ──────────────────────────────────────────── */

  const handleVideoEnd = async () => {
    setVideoWatched(true);

    // Save partial progress
    if (profile) {
      await saveProgress(
        {
          lessonId: lesson.id,
          step: 1,
          total: 2,
          completed: false,
          updatedAt: Date.now(),
        },
        profile.uid
      );
    }

    setTimeout(() => {
      setCurrentStep(1);
    }, 2000);
  };

  /* ────────────────────────────────────────────
     ✅ ANSWER HANDLER
     ──────────────────────────────────────────── */

  const handleAnswer = (index: number) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    const question =
      lesson.quiz[currentQuestion];

    const isCorrect =
      index === question.correctAnswer;

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (
        currentQuestion <
        lesson.quiz.length - 1
      ) {
        setCurrentQuestion((q) => q + 1);

        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setCompleted(true);

        completeLesson();
      }
    }, 1800);
  };

  /* ────────────────────────────────────────────
     ✅ COMPLETE LESSON
     ──────────────────────────────────────────── */

  const completeLesson = async () => {
    if (!profile) return;

    try {
      const quizScore =
        score / lesson.quiz.length;

      // Save progress
      await saveProgress(
        {
          lessonId: lesson.id,
          step: 99,
          total: 2,
          completed: true,
          quizScore,
          xpEarned: lesson.xpReward,
          starsEarned: 1,
          updatedAt: Date.now(),
        },
        profile.uid
      );

      // Add rewards
      await addRewards(
        lesson.xpReward,
        1,
        profile.uid
      );

      // Refresh dashboard UI
      window.dispatchEvent(
        new CustomEvent("pathwise:progress")
      );
    } catch (err) {
      console.error(
        "Failed to complete lesson:",
        err
      );
    }
  };

  /* ────────────────────────────────────────────
     ✅ NEXT BUTTON
     ──────────────────────────────────────────── */

  const goToNext = () => {
    if (miniGame) {
      navigate({
        to: "/minigame/$id",
        params: {
          id: miniGame.id.toString(),
        },
      });

      return;
    }

    if (lessonId < 50) {
      navigate({
        to: "/lesson/$id",
        params: {
          id: (lessonId + 1).toString(),
        },
      });

      return;
    }

    navigate({ to: "/dashboard" });
  };

  /* ────────────────────────────────────────────
     ✅ RESTART LESSON
     ──────────────────────────────────────────── */

  const restartLesson = () => {
    setCurrentStep(0);

    setCurrentQuestion(0);

    setScore(0);

    setSelectedAnswer(null);

    setShowResult(false);

    setCompleted(false);

    setVideoWatched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-sky pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-40 glass border-b border-white/60 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() =>
              navigate({ to: "/dashboard" })
            }
            className="p-2 rounded-full hover:bg-white/50 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Lesson {lessonId}/50
            </span>

            <div className="w-32 h-2 rounded-full bg-white/60">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all"
                style={{
                  width: `${(lessonId / 50) * 100}%`,
                }}
              />
            </div>
          </div>

          {!completed ? (
            <button
              onClick={restartLesson}
              className="p-2 rounded-full hover:bg-white/50 transition text-muted-foreground"
              title="Restart lesson"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!completed ? (
            <>
              {/* VIDEO STEP */}
              {currentStep === 0 && (
                <motion.div
                  key="video"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  className="space-y-6"
                >
                  <div className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="font-display text-2xl text-gradient-primary mb-2">
                          {lesson.title}
                        </h1>

                        <p className="text-muted-foreground">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-primary/10">
                        <Award className="w-4 h-4 text-primary" />

                        <span className="text-sm font-semibold">
                          {lesson.xpReward} XP
                        </span>
                      </div>
                    </div>

                    {/* VIDEO */}
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg mb-4">
                      <iframe
                        src={`${lesson.videoUrl}?rel=0&modestbranding=1`}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => {
                          console.log(
                            "Video loaded"
                          );
                        }}
                      />
                    </div>

                    {!videoWatched && (
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-3">
                        <Volume2 className="w-4 h-4" />

                        <p>
                          Watch the video then
                          continue to the quiz
                        </p>
                      </div>
                    )}

                    {/* CONTINUE */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="flex items-center justify-between mt-4 pt-4 border-t border-white/60"
                    >
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Navi
                          mood="happy"
                          size={32}
                        />

                        <p className="text-sm">
                          Ready for the quiz?
                        </p>
                      </div>

                      <button
                        onClick={handleVideoEnd}
                        className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold shadow-pop hover:scale-105 transition flex items-center gap-2"
                      >
                        Start Quiz{" "}
                        <Play
                          className="w-4 h-4"
                          fill="white"
                        />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* QUIZ STEP */}
              {currentStep === 1 && (
                <motion.div
                  key="quiz"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  className="space-y-6"
                >
                  <div className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl text-foreground">
                        Question{" "}
                        {currentQuestion + 1} of{" "}
                        {lesson.quiz.length}
                      </h2>
                    </div>

                    {/* QUESTION */}
                    <motion.p
                      key={currentQuestion}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="text-lg font-semibold text-foreground mb-6"
                    >
                      {
                        lesson.quiz[currentQuestion]
                          .question
                      }
                    </motion.p>

                    {/* OPTIONS */}
                    <div className="space-y-3">
                      {lesson.quiz[
                        currentQuestion
                      ].options.map(
                        (option, idx) => {
                          const question =
                            lesson.quiz[
                              currentQuestion
                            ];

                          const isCorrect =
                            idx ===
                            question.correctAnswer;

                          const isSelected =
                            idx ===
                            selectedAnswer;

                          return (
                            <motion.button
                              key={idx}
                              initial={{
                                opacity: 0,
                                x: -20,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay:
                                  idx * 0.1,
                              }}
                              onClick={() =>
                                handleAnswer(
                                  idx
                                )
                              }
                              disabled={
                                showResult
                              }
                              className={`w-full p-4 rounded-2xl border-2 text-left transition flex items-center justify-between ${
                                showResult
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50/50"
                                    : isSelected
                                    ? "border-red-500 bg-red-50/50"
                                    : "border-white/60 opacity-50"
                                  : "border-white/60 hover:border-primary/50 hover:bg-white/50"
                              }`}
                            >
                              <span className="font-medium text-foreground">
                                {option}
                              </span>

                              {showResult &&
                                isCorrect && (
                                  <CheckCircle className="w-6 h-6 text-green-500" />
                                )}

                              {showResult &&
                                isSelected &&
                                !isCorrect && (
                                  <XCircle className="w-6 h-6 text-red-500" />
                                )}
                            </motion.button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            /* COMPLETION SCREEN */
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="glass-strong rounded-[28px] p-8 text-center shadow-card border border-white/60"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>

              <h2 className="font-display text-3xl text-gradient-primary mb-2">
                Lesson Complete! 🎉
              </h2>

              <p className="text-muted-foreground mb-6">
                You scored {score} out of{" "}
                {lesson.quiz.length}
              </p>

              {/* REWARDS */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-2xl p-4">
                  <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />

                  <p className="text-2xl font-bold text-foreground">
                    +{lesson.xpReward}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    XP Earned
                  </p>
                </div>

                <div className="glass rounded-2xl p-4">
                  <span className="text-2xl">
                    ⭐
                  </span>

                  <p className="text-2xl font-bold text-foreground">
                    +1
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Star
                  </p>
                </div>
              </div>

              {/* MINI GAME */}
              {miniGame && (
                <div className="bg-gradient-primary/10 rounded-2xl p-4 mb-6 border-2 border-primary/30">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    🎮 Bonus Game Unlocked!
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Play{" "}
                    <b>
                      {miniGame.title}
                    </b>{" "}
                    to earn +
                    {miniGame.xpReward} XP
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="space-y-3">
                <button
                  onClick={goToNext}
                  className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-semibold shadow-pop hover:scale-[1.02] transition"
                >
                  {miniGame
                    ? "Play Mini-Game →"
                    : "Next Lesson →"}
                </button>

                <button
                  onClick={() =>
                    navigate({
                      to: "/dashboard",
                    })
                  }
                  className="w-full py-3 rounded-2xl bg-white/60 text-foreground font-semibold border border-white/80 hover:bg-white/80 transition"
                >
                  Back to Dashboard
                </button>
              </div>

              {/* NAVI */}
              <div className="mt-6">
                <Navi
                  mood="celebrating"
                  size={48}
                />

                <p className="text-xs text-muted-foreground mt-2">
                  Keep up the great work!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}