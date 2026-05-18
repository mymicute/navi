import { motion } from "framer-motion";

const COLORS = ["#FF6B9D", "#C44DFF", "#00D4AA", "#FFD700", "#7DD3FC"];

export function Confetti({ count = 28 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const duration = 1.2 + Math.random() * 0.8;
        const rot = Math.random() * 360;
        const color = COLORS[i % COLORS.length];
        const size = 6 + Math.random() * 8;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
            animate={{ y: "120%", x: (Math.random() - 0.5) * 160, opacity: [0, 1, 1, 0], rotate: rot }}
            transition={{ duration, delay, ease: "easeOut" }}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.5,
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}
