// src/routes/minigame.$id.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Award, Timer, Check, X, RefreshCw } from "lucide-react";
import { Navi } from "@/components/Navi";
import { MINI_GAMES, type MiniGame } from "@/lib/lessons";
import { useUserProfile } from "@/hooks/useUserProfile";
import { addRewards } from "@/lib/progress";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/minigame/$id")({
  component: MiniGamePage,
});

// Matching Game Component
function MatchingGame({ game, onComplete }: { game: MiniGame; onComplete: (score: number) => void }) {
  const [cards, setCards] = useState<{id: string; text: string; type: 'skill'|'career'; matched: boolean; flipped: boolean}[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);

  // Initialize cards from game data
  useEffect(() => {
    if (game.gameData?.pairs) {
      const shuffled = [...game.gameData.pairs]
        .flatMap(p => [
          { id: `skill-${p.skill}`, text: p.skill, type: 'skill' as const, matched: false, flipped: false },
          { id: `career-${p.career}`, text: p.career, type: 'career' as const, matched: false, flipped: false }
        ])
        .sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  }, [game]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) {
      setGameOver(true);
      onComplete(score);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, score, onComplete]);

  const handleCardClick = (cardId: string) => {
    if (gameOver || selected.length === 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.matched || card.flipped) return;

    // Flip card
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, flipped: true } : c
    ));
    setSelected(prev => [...prev, cardId]);

    // Check match if 2 selected
    if (selected.length === 1) {
      const [firstId] = selected;
      const first = cards.find(c => c.id === firstId);
      const second = card;

      if (first && second && first.type !== second.type) {
        // Check if they're a pair
        const firstText = first.text;
        const secondText = second.text;
        const isMatch = game.gameData?.pairs.some(
          p => (p.skill === firstText && p.career === secondText) || 
               (p.career === firstText && p.skill === secondText)
        );

        setTimeout(() => {
          if (isMatch) {
            setCards(prev => prev.map(c => 
              c.id === firstId || c.id === cardId ? { ...c, matched: true } : c
            ));
            setScore(s => s + 10);
          }
          setSelected([]);
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === cardId ? { ...c, flipped: !isMatch } : c
          ));
        }, 800);
      } else {
        // Same type - auto unflip
        setTimeout(() => {
          setSelected([]);
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === cardId ? { ...c, flipped: false } : c
          ));
        }, 600);
      }
    }
  };

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setGameOver(true);
      onComplete(score + 20); // Bonus for completing
    }
  }, [cards, score, onComplete]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100">
          <Timer className="w-5 h-5 text-orange-600" />
          <span className="font-bold text-orange-700">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10">
          <Award className="w-5 h-5 text-primary" />
          <span className="font-bold">{score} XP</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass rounded-2xl p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Match each <b>skill</b> with its best <b>career fit</b>!
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cards.map(card => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched || card.flipped || gameOver}
            className={`aspect-square rounded-2xl border-2 flex items-center justify-center p-3 text-center transition-all ${
              card.matched
                ? "bg-green-100 border-green-400"
                : card.flipped
                ? "bg-gradient-primary/20 border-primary"
                : "bg-white/60 border-white/60 hover:border-primary/50"
            }`}
          >
            <span className={`text-sm font-medium ${
              card.matched ? "text-green-700" : "text-foreground"
            }`}>
              {card.flipped || card.matched ? card.text : "?"}
            </span>
            {card.matched && <Check className="w-5 h-5 text-green-500 absolute" />}
          </motion.button>
        ))}
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl"
        >
          <div className="glass-strong rounded-2xl p-6 text-center max-w-xs">
            <h3 className="font-display text-xl text-foreground mb-2">
              {score >= 40 ? "Amazing! 🎉" : score >= 20 ? "Great job! ✨" : "Nice try! 💪"}
            </h3>
            <p className="text-muted-foreground mb-4">
              You earned <b className="text-primary">+{score} XP</b>
            </p>
            <button
              onClick={() => onComplete(score)}
              className="w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Main Page Component
function MiniGamePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const gameId = parseInt(id);
  const game = MINI_GAMES.find(g => g.id === gameId);
  
  const [gameComplete, setGameComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center glass-strong rounded-2xl p-8">
          <h2 className="font-display text-2xl text-foreground mb-4">Game not found</h2>
          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleGameComplete = async (score: number) => {
    setFinalScore(score);
    setGameComplete(true);
    
    if (profile) {
      // Add rewards
      addRewards(score, 1);
      
      // Update Firestore if available
      try {
        const userRef = doc(db, "users", profile.uid);
        await updateDoc(userRef, {
          xp: increment(score),
          stars: increment(1)
        });
      } catch (err) {
        console.warn("Firestore update failed, using localStorage only");
      }
    }
  };

  const goToNextLesson = () => {
    const nextLessonId = game.unlockAfterLesson + 1;
    navigate({ to: "/lesson/$id", params: { id: nextLessonId.toString() } });
  };

  return (
    <div className="min-h-screen bg-gradient-sky pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-white/60 px-4 py-3">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="p-2 rounded-full hover:bg-white/50 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {!gameComplete ? (
          <div className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl text-gradient-primary mb-2">
                {game.title}
              </h1>
              <p className="text-muted-foreground">{game.description}</p>
            </div>
            
            {/* Game Type Renderer */}
            {game.type === "matching" && (
              <MatchingGame game={game} onComplete={handleGameComplete} />
            )}
            
            {/* Placeholder for other game types */}
            {game.type !== "matching" && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {game.type === "trivia" ? "Trivia mode coming soon!" : "Speed mode coming soon!"}
                </p>
                <button
                  onClick={() => handleGameComplete(30)}
                  className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold"
                >
                  Practice Mode (+30 XP)
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-[28px] p-8 text-center shadow-card border border-white/60"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="font-display text-3xl text-gradient-primary mb-2">
              Game Complete! 🎮
            </h2>
            <p className="text-2xl font-bold text-foreground mb-6">
              +{finalScore} XP
            </p>
            
            <div className="space-y-3">
              <button
                onClick={goToNextLesson}
                className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-semibold shadow-pop hover:scale-[1.02] transition"
              >
                Continue Learning →
              </button>
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="w-full py-3 rounded-2xl bg-white/60 text-foreground font-semibold border border-white/80 hover:bg-white/80 transition"
              >
                Back to Dashboard
              </button>
            </div>
            
            <div className="mt-6">
              <Navi mood="celebrating" size={48} />
              <p className="text-xs text-muted-foreground mt-2">You're leveling up fast!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}