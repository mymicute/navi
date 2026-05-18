// src/routes/login.tsx
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { Navi } from "@/components/Navi";
import { auth, googleProvider } from "@/lib/firebase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PathWise" },
      { name: "description", content: "Sign in to PathWise and continue your career learning journey with Navi." },
      { property: "og:title", content: "Sign in — PathWise" },
      { property: "og:description", content: "Sign in to PathWise and continue your career learning journey with Navi." },
    ],
  }),
  component: LoginPage,
});

type Mode = "email" | "google";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("email");
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const friendlyError = (code: string) => {
    switch (code) {
      case "auth/invalid-email": return "That email doesn't look quite right.";
      case "auth/user-not-found": return "We couldn't find an account with that email.";
      case "auth/wrong-password":
      case "auth/invalid-credential": return "Email or password is incorrect.";
      case "auth/email-already-in-use": return "An account with this email already exists.";
      case "auth/weak-password": return "Password should be at least 6 characters.";
      case "auth/popup-closed-by-user": return "Sign-in was cancelled.";
      case "auth/configuration-not-found":
      case "auth/invalid-api-key": return "Firebase isn't configured yet. Add your VITE_FIREBASE_* env vars.";
      default: return "Something went wrong. Please try again.";
    }
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!email) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "At least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      // ✅ FIX: Use imported `auth` instead of undefined getFirebaseAuth()
      if (isSignup) await createUserWithEmailAndPassword(auth, email, password);
      else await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setErrors({ form: friendlyError(err?.code ?? "") });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setErrors({});
    try {
      // ✅ FIX: Use imported `auth`
      await signInWithPopup(auth, googleProvider);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setErrors({ form: friendlyError(err?.code ?? "") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-sky">
      <BackgroundDecor />

      <header className="relative z-10 px-4 pt-5">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-pop border-2 border-white">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl text-gradient-primary">PathWise</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* Navi welcome bubble */}
          <div className="flex flex-col items-center mb-4">
            <Navi mood="guiding" size={140} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[22px] px-4 py-2 -mt-2 shadow-card border-2 border-white/70"
            >
              <p className="text-sm text-foreground">
                <b className="text-gradient-primary">Hi, I'm Navi!</b> Sign in and let's keep exploring 🧭
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-[28px] p-6 shadow-card border border-white/60"
          >
            <h1 className="font-display text-2xl text-center text-gradient-primary">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-center text-sm text-muted-foreground mt-1">
              {isSignup ? "Join the path in seconds." : "Continue your journey with Navi."}
            </p>

            {/* Mode toggle */}
            <div className="mt-5 grid grid-cols-2 gap-1 p-1 rounded-full bg-white/60 border border-white/80">
              <ModeTab active={mode === "email"} onClick={() => setMode("email")}>
                Email
              </ModeTab>
              <ModeTab active={mode === "google"} onClick={() => setMode("google")}>
                Google
              </ModeTab>
            </div>

            <AnimatePresence mode="wait">
              {mode === "email" ? (
                <motion.form
                  key="email"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleEmail}
                  className="mt-5 space-y-4"
                >
                  <Field
                    icon={<Mail className="w-5 h-5" />}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(v) => setEmail(v)}
                    autoComplete="email"
                    error={errors.email}
                    label="Email"
                  />
                  <Field
                    icon={<Lock className="w-5 h-5" />}
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(v) => setPassword(v)}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    error={errors.password}
                    label="Password"
                  />

                  {errors.form && <FormError message={errors.form} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[52px] rounded-2xl bg-gradient-primary text-white font-semibold text-base shadow-pop border-2 border-white/60 active:scale-[0.98] transition disabled:opacity-60"
                  >
                    {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    {isSignup ? "Already have an account?" : "New to PathWise?"}{" "}
                    <button
                      type="button"
                      onClick={() => { setIsSignup(!isSignup); setErrors({}); }}
                      className="font-semibold text-gradient-primary"
                    >
                      {isSignup ? "Sign in" : "Create one"}
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="google"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-5 space-y-4"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    One tap to start your adventure.
                  </p>
                  {errors.form && <FormError message={errors.form} />}
                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full min-h-[52px] rounded-2xl bg-white text-foreground font-semibold text-base shadow-pop border-2 border-white flex items-center justify-center gap-3 active:scale-[0.98] transition disabled:opacity-60"
                  >
                    <GoogleIcon />
                    {loading ? "Connecting…" : "Continue with Google"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            By continuing you agree to PathWise's terms & privacy.
          </p>
        </div>
      </main>
    </div>
  );
}

function ModeTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[44px] rounded-full text-sm font-semibold transition ${
        active ? "bg-gradient-primary text-white shadow-pop" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  icon, type, placeholder, value, onChange, autoComplete, error, label,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
  label: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 ml-2">{label}</label>
      <div
        className={`flex items-center gap-2 px-4 rounded-2xl bg-white/80 border-2 transition ${
          error ? "border-destructive/50 bg-destructive/5" : "border-white focus-within:border-primary/50"
        }`}
        style={{ minHeight: 52 }}
      >
        <span className={error ? "text-destructive/70" : "text-muted-foreground"}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
      {error && (
        <p className="mt-1.5 ml-2 text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive flex items-start gap-2">
      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.7l-6-5c-2 1.4-4.4 2.2-7 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.3 5.3l6 5c-.4.4 6.5-4.7 6.5-14.3 0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      <div className="absolute inset-0 bg-gradient-sky" />
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF6B9D, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #C44DFF, transparent 70%)" }} />
      <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full opacity-30 blur-2xl"
        style={{ background: "radial-gradient(circle, #00D4AA, transparent 70%)" }} />
    </div>
  );
}