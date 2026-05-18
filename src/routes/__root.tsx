// src/routes/__root.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import appCss from "@/styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { title: "PathWise — Gamified Career Learning" },
      { name: "description", content: "Follow the winding path with Navi the compass mascot." },
      { name: "theme-color", content: "#FF6B9D" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;500;600;700&family=Quicksand:wght@400;500:600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body className="min-h-screen bg-gradient-sky">{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // 🔐 Firebase Auth Listener - The Gatekeeper
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCheckingAuth(false);
      const currentPath = router.state.location.pathname;

      // Public routes that don't require auth
      const publicRoutes = ["/login", "/"];

      if (user) {
        // ✅ User is logged in: redirect away from login
        if (publicRoutes.includes(currentPath)) {
          router.navigate({ to: "/dashboard", replace: true });
        }
      } else {
        // 🔒 User is NOT logged in: force to login
        if (!publicRoutes.includes(currentPath)) {
          router.navigate({ to: "/login", replace: true });
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ⏳ Show loading screen while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <div className="navi-container animate-float mb-4">
            <span className="text-5xl"></span>
          </div>
          <p className="font-display text-xl text-gradient-primary animate-pulse">
            PathWise Loading...
          </p>
          <p className="text-muted-foreground text-sm mt-2">Connecting your compass ✨</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}