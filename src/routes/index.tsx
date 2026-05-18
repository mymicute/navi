// src/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Play, Users, Award, TrendingUp, ChevronRight, Menu, X, LayoutDashboard, Map, Trophy, User, LogOut } from "lucide-react";
import { Navi } from "@/components/Navi";
import { useUserProfile } from "@/hooks/useUserProfile";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathWise — Gamified Career Learning" },
      { name: "description", content: "Transform your career with bite-sized lessons, interactive quizzes, and fun mini-games. Learn with Navi, your AI compass guide!" },
      { property: "og:title", content: "PathWise — Gamified Career Learning" },
      { property: "og:description", content: "Transform your career with bite-sized lessons, interactive quizzes, and fun mini-games." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { profile, loading } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = !!profile;

  const handleSignOut = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <div className="navi-container animate-float mb-4">
            <span className="text-5xl"></span>
          </div>
          <p className="font-display text-xl text-gradient-primary animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky overflow-x-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #FF6B9D, transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #C44DFF, transparent 70%)" }} />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full opacity-30 blur-2xl" style={{ background: "radial-gradient(circle, #00D4AA, transparent 70%)" }} />
      </div>

      {/* Navigation - Auth Aware & Mobile Friendly */}
      <nav className="px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-pop border-2 border-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl text-gradient-primary font-bold">PathWise</span>
          </Link>
          
          {/* Desktop Nav */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-foreground hover:bg-white/60 transition">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-foreground hover:bg-white/60 transition">
                <Map className="w-4 h-4" /> Path
              </Link>
              <Link to="/trophies" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-foreground hover:bg-white/60 transition">
                <Trophy className="w-4 h-4" /> Trophies
              </Link>
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-foreground hover:bg-white/60 transition">
                <User className="w-4 h-4" /> Profile
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="px-5 py-2.5 rounded-2xl font-semibold text-foreground hover:bg-white/60 transition">
                Sign In
              </Link>
              <Link to="/login" className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-semibold shadow-pop border-2 border-white hover:scale-105 transition">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl glass text-foreground hover:bg-white/60 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-strong rounded-2xl p-4 shadow-card border border-white/60"
          >
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-white/60 transition">
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </Link>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-white/60 transition">
                    <Map className="w-5 h-5" /> Path
                  </Link>
                  <Link to="/trophies" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-white/60 transition">
                    <Trophy className="w-5 h-5" /> Trophies
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-white/60 transition">
                    <User className="w-5 h-5" /> Profile
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition text-left"
                  >
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-white/60 transition text-center">
                    Sign In
                  </Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-pop border-2 border-white transition text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            {isLoggedIn ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Welcome Back!</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient-primary leading-tight mb-6">
                  Ready to continue, {profile.displayName}? 👋
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                  Your learning path is waiting. Pick up where you left off and keep leveling up with Navi! 🧭
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-2xl bg-gradient-primary text-white font-display text-base md:text-lg shadow-pop border-2 border-white hover:scale-105 transition"
                  >
                    Go to Dashboard <Play className="w-5 h-5" fill="white" />
                  </Link>
                  <Link
                    to="/trophies"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-2xl glass font-display text-base md:text-lg border-2 border-white/80 hover:bg-white/60 transition"
                  >
                    View Trophies <Trophy className="w-5 h-5" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Transform Your Career Today</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary leading-tight mb-6">
                  Learn Careers Like a Game
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Master in-demand skills through bite-sized lessons, interactive quizzes, and fun mini-games. Your AI compass Navi guides you every step of the way! 🧭
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-2xl bg-gradient-primary text-white font-display text-base md:text-lg shadow-pop border-2 border-white hover:scale-105 transition"
                  >
                    Start Learning Free <Play className="w-5 h-5" fill="white" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-2xl glass font-display text-base md:text-lg border-2 border-white/80 hover:bg-white/60 transition">
                    Watch Demo <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gradient-primary">50+</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Lessons</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gradient-primary">10k+</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Learners</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gradient-primary">4.9</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right: BIG Navi Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative z-10 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[520px] mx-auto">
              <Navi mood={isLoggedIn ? "happy" : "celebrating"} size={520} trackCursor />
            </div>
            
            {/* Floating Elements (Desktop Only) */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute top-10 -left-12 glass rounded-2xl p-4 shadow-card border border-white/60"
            >
              <Award className="w-8 h-8 text-yellow-500" />
              <p className="text-sm font-semibold mt-1">Earn XP & Stars</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute bottom-24 -right-8 glass rounded-2xl p-4 shadow-card border border-white/60"
            >
              <TrendingUp className="w-8 h-8 text-green-500" />
              <p className="text-sm font-semibold mt-1">Track Progress</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 py-16 md:py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-primary mb-4">
              Why Learn with PathWise?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              We make career learning addictive, effective, and fun. No boring lectures, just engaging micro-lessons.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<Play className="w-6 md:w-8 h-6 md:h-8" />}
              title="Bite-Sized Lessons"
              description="Learn in 3-5 minute chunks. Perfect for busy schedules and maximum retention."
              color="from-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={<Award className="w-6 md:w-8 h-6 md:h-8" />}
              title="Gamified Progress"
              description="Earn XP, unlock achievements, and compete on leaderboards. Learning feels like playing!"
              color="from-purple-500 to-violet-500"
            />
            <FeatureCard
              icon={<Users className="w-6 md:w-8 h-6 md:h-8" />}
              title="AI-Powered Guide"
              description="Navi adapts to your learning style and pace. Personalized career guidance 24/7."
              color="from-teal-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-[28px] md:rounded-[40px] p-8 md:p-12 shadow-card border border-white/60"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-primary mb-6">
              {isLoggedIn ? "Keep Climbing the Path!" : "Ready to Start Your Journey?"}
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-8">
              {isLoggedIn 
                ? "Your next lesson is waiting. Stay consistent and watch your skills grow!" 
                : "Join thousands of learners transforming their careers with PathWise."}
            </p>
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-gradient-primary text-white font-display text-base md:text-xl shadow-pop border-2 border-white hover:scale-105 transition"
            >
              {isLoggedIn ? "Continue Learning" : "Get Started Free"} <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
            </Link>
            {!isLoggedIn && <p className="text-xs md:text-sm text-muted-foreground mt-4">No credit card required • Cancel anytime</p>}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-8 border-t border-white/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg text-gradient-primary font-bold">PathWise</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 PathWise. Made with 💖 for learners everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-strong rounded-[24px] md:rounded-[28px] p-6 md:p-8 shadow-card border border-white/60"
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}