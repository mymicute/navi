import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import naviImg from "@/assets/navi-mascot.png";

type Mood = "idle" | "happy" | "thinking" | "celebrating" | "guiding" | "worried";

interface NaviProps {
  mood?: Mood;
  size?: number;
  className?: string;
  /** Tilt toward the user's cursor (eye-tracking feel). */
  trackCursor?: boolean;
  /** Optional hint bubble to render next to Navi (e.g. for worried/error). */
  hint?: string;
  /** Compass needle target angle in degrees (0 = up). */
  needleAngle?: number;
}

export function Navi({
  mood = "idle",
  size = 220,
  className = "",
  trackCursor = false,
  hint,
  needleAngle,
}: NaviProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor-driven tilt (Framer springs for buttery follow)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 14 });
  const sy = useSpring(my, { stiffness: 120, damping: 14 });
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);

  // Idle subtle needle bob (also reflects "pointing to next node" if supplied)
  const [idleAngle, setIdleAngle] = useState(0);
  useEffect(() => {
    if (needleAngle !== undefined) return;
    const id = setInterval(() => setIdleAngle((a) => (a >= 8 ? -8 : a + 1)), 80);
    return () => clearInterval(id);
  }, [needleAngle]);

  useEffect(() => {
    if (!trackCursor) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / 220;
      const dy = (e.clientY - cy) / 220;
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [trackCursor, mx, my]);

  const animations: Record<Mood, any> = {
    idle: { y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] },
    happy: { y: [0, -16, 0], scale: [1, 1.06, 1] },
    thinking: { rotate: [-4, 4, -4] },
    celebrating: { y: [0, -28, 0], rotate: [0, 360], scale: [1, 1.15, 1] },
    guiding: { x: [0, 6, 0, -6, 0] },
    worried: { x: [0, -3, 3, -3, 3, 0], y: [0, -4, 0] },
  };
  const duration =
    mood === "celebrating" ? 1.2 : mood === "thinking" ? 1.6 : mood === "worried" ? 0.8 : 3.4;

  const angle = needleAngle ?? idleAngle;

  return (
    <div ref={ref} className={`relative perspective-1000 ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={trackCursor ? { rotateX, rotateY } : undefined}
        animate={animations[mood]}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ground shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-md"
          style={{
            bottom: "-4%",
            width: "70%",
            height: "10%",
            background: "radial-gradient(ellipse, rgba(80,30,90,0.35), transparent 70%)",
          }}
        />
        <motion.img
          src={naviImg}
          alt="Navi the compass mascot"
          width={size}
          height={size}
          className="relative w-full h-full object-contain drop-shadow-[0_18px_24px_rgba(196,77,255,0.35)]"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Compass needle overlay — sits above the held compass and points toward the next node */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: "12%",
            width: 2,
            height: size * 0.18,
            transformOrigin: "50% 100%",
            background: "linear-gradient(to top, #C44DFF 0%, #FF6B9D 100%)",
            borderRadius: 2,
            boxShadow: "0 0 6px rgba(255,107,157,0.6)",
          }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        />

        {/* Sparkles */}
        {(mood === "celebrating" || mood === "happy") && (
          <>
            <span className="absolute top-2 right-4 text-2xl animate-sparkle">✨</span>
            <span className="absolute bottom-8 left-2 text-xl animate-sparkle" style={{ animationDelay: "1s" }}>⭐</span>
          </>
        )}
        {mood === "worried" && (
          <span className="absolute -top-2 right-2 text-2xl">💧</span>
        )}
      </motion.div>

      {hint && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-2 left-full ml-2 whitespace-nowrap glass-strong rounded-2xl px-3 py-1.5 text-xs font-stat font-bold text-foreground shadow-pop"
        >
          {hint}
        </motion.div>
      )}
    </div>
  );
}
