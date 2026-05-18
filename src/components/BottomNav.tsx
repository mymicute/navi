// src/components/BottomNav.tsx
import { Link } from "@tanstack/react-router";
import { Home, Map, Trophy, User } from "lucide-react";
import type { ReactNode } from "react";

type ActiveTab = "home" | "path" | "trophies" | "profile";

interface BottomNavProps {
  activeTab?: ActiveTab;
}

interface NavLinkProps {
  to: string;
  active?: boolean;
  icon: ReactNode;
  label: string;
}

export function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/60 px-4 py-3 pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {/* HOME */}
        <NavItem
          to="/"
          active={activeTab === "home"}
          icon={<Home className="h-6 w-6" />}
          label="Home"
        />

        {/* PATH */}
        <NavItem
          to="/dashboard"
          active={activeTab === "path"}
          icon={<Map className="h-6 w-6" />}
          label="Path"
        />

        {/* TROPHIES */}
        <NavItem
          to="/trophies"
          active={activeTab === "trophies"}
          icon={<Trophy className="h-6 w-6" />}
          label="Trophies"
        />

        {/* PROFILE */}
        <NavItem
          to="/profile"
          active={activeTab === "profile"}
          icon={<User className="h-6 w-6" />}
          label="Profile"
        />
      </div>
    </div>
  );
}

function NavItem({
  to,
  active,
  icon,
  label,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all duration-200 ${
        active
          ? "text-[#FF6B9D]"
          : "text-muted-foreground hover:text-[#FF6B9D]"
      }`}
    >
      {icon}

      <span className="text-[10px] font-semibold">
        {label}
      </span>
    </Link>
  );
}