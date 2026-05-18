import { motion } from "framer-motion";
import { Check, Lock, Play, Star } from "lucide-react";
import { Navi } from "./Navi";

export type NodeStatus = "completed" | "current" | "locked";
export interface PathNode {
  id: number;
  title: string;
  status: NodeStatus;
  type?: "lesson" | "challenge" | "boss";
}

interface PathMapProps {
  nodes: PathNode[];
  onSelect?: (node: PathNode) => void;
}

// Generate winding curve positions
function getNodePositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const y = 100 + i * 140;
    const x = 50 + Math.sin(i * 0.9) * 32; // percentage
    return { x, y, t };
  });
}

export function PathMap({ nodes, onSelect }: PathMapProps) {
  const positions = getNodePositions(nodes.length);
  const totalHeight = 100 + (nodes.length - 1) * 140 + 200;

  // Build winding SVG path
  const pathD = positions
    .map((p, i) => {
      const x = p.x;
      const y = p.y;
      if (i === 0) return `M ${x} ${y}`;
      const prev = positions[i - 1];
      const cx = (prev.x + x) / 2;
      return `Q ${cx} ${(prev.y + y) / 2} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="relative w-full mx-auto" style={{ height: totalHeight, maxWidth: 520 }}>
      {/* Floating decorations */}
      <div className="absolute -left-4 top-32 text-5xl animate-float-soft">🌸</div>
      <div className="absolute right-2 top-72 text-4xl animate-float-soft" style={{ animationDelay: "1.5s" }}>☁️</div>
      <div className="absolute -left-2 top-[50%] text-5xl animate-float-soft" style={{ animationDelay: "3s" }}>🍄</div>
      <div className="absolute right-0 top-[70%] text-4xl animate-float-soft" style={{ animationDelay: "0.7s" }}>🦋</div>
      <div className="absolute left-4 bottom-40 text-5xl animate-float-soft" style={{ animationDelay: "2s" }}>🌳</div>

      {/* Winding dirt path */}
      <svg
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8C39E" />
            <stop offset="100%" stopColor="#C9966B" />
          </linearGradient>
        </defs>
        {/* Path shadow */}
        <path d={pathD} stroke="rgba(120,80,40,0.25)" strokeWidth="14" fill="none" strokeLinecap="round" transform="translate(0,2)" />
        {/* Path body */}
        <path d={pathD} stroke="url(#pathGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
        {/* Dashed center line */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const p = positions[i];
        return (
          <PathNodeButton
            key={node.id}
            node={node}
            xPercent={p.x}
            y={p.y}
            index={i}
            onSelect={onSelect}
          />
        );
      })}

      {/* Navi at the current node */}
      {(() => {
        const currentIdx = nodes.findIndex((n) => n.status === "current");
        if (currentIdx < 0) return null;
        const p = positions[currentIdx];
        return (
          <div
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: p.y - 110,
              transform: "translateX(-50%)",
            }}
          >
            <Navi mood="guiding" size={140} trackCursor needleAngle={20} />
          </div>
        );
      })()}
    </div>
  );
}

function PathNodeButton({
  node,
  xPercent,
  y,
  index,
  onSelect,
}: {
  node: PathNode;
  xPercent: number;
  y: number;
  index: number;
  onSelect?: (n: PathNode) => void;
}) {
  const isCompleted = node.status === "completed";
  const isCurrent = node.status === "current";
  const isLocked = node.status === "locked";

  const bg = isCompleted
    ? "bg-gradient-to-br from-[#FFE066] via-[#FFD700] to-[#FFA500]"
    : isCurrent
    ? "bg-gradient-primary"
    : "bg-gradient-to-br from-slate-200 to-slate-400";

  const Icon = isCompleted ? Check : isLocked ? Lock : node.type === "boss" ? Star : Play;

  return (
    <motion.button
      onClick={() => !isLocked && onSelect?.(node)}
      disabled={isLocked}
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={!isLocked ? { scale: 1.1, rotate: 4 } : {}}
      whileTap={!isLocked ? { scale: 0.92, y: 6 } : {}}
      className="absolute group"
      style={{
        left: `${xPercent}%`,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Pedestal shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-20 h-3 bg-black/20 blur-md rounded-full" />

      {/* Pulsing ring on current */}
      {isCurrent && (
        <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-40 animate-ping" />
      )}

      <div
        className={`relative w-24 h-24 rounded-full ${bg} border-[6px] border-white flex items-center justify-center shadow-node ${
          isLocked ? "opacity-80" : ""
        }`}
      >
        {/* Glossy highlight */}
        <span className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/60 blur-sm" />
        <Icon className="w-10 h-10 text-white drop-shadow-md" strokeWidth={3} fill={isCompleted || node.type === "boss" ? "white" : "none"} />
      </div>

      {/* Label */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap">
        <span className="font-display text-xs px-3 py-1 rounded-full glass-strong text-foreground">
          {node.title}
        </span>
      </div>
    </motion.button>
  );
}
