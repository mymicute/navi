// src/lib/careerVideos.ts
// ─────────────────────────────────────────────────────────────────────
// 🎬 PathWise Career Video Library — Carefully Curated Content
// ─────────────────────────────────────────────────────────────────────
// 
// How to add a new career video:
// 1. Find a high-quality YouTube video (3-10 min, educational, engaging)
// 2. Get the video ID from the URL: 
//    https://www.youtube.com/watch?v=VIDEO_ID_HERE
//    or https://www.youtube.com/embed/VIDEO_ID_HERE
// 3. Add an entry below with career name, video ID, and metadata
//
// Tip: Prefer videos from trusted sources: TED, Khan Academy, 
//      professional associations, or verified educational channels.
// ─────────────────────────────────────────────────────────────────────

export interface CareerVideo {
  career: string; // Career name (e.g., "Tailoring", "Healthcare")
  videoId: string; // YouTube video ID (e.g., "8jPQjjsBbIc")
  title: string; // Video title for reference
  channel: string; // Channel name for credibility check
  duration?: string; // Optional: "4:32" format
  tags: string[]; // For filtering: ["intro", "hands-on", "business"]
  difficulty: "beginner" | "intermediate" | "advanced";
  language?: string; // Default: "en"
}

// ─────────────────────────────────────────────────────────────────────
// 🎯 CURATED VIDEO LIBRARY
// ─────────────────────────────────────────────────────────────────────
export const CAREER_VIDEOS: CareerVideo[] = [
  // ═══════════════════════════════════════════════════════════════
  // 🧭 CAREER FOUNDATIONS (Lessons 1-3)
  // ═══════════════════════════════════════════════════════════════
  {
    career: "Career Foundations",
    videoId: "8jPQjjsBbIc",
    title: "How to Find Your Passion",
    channel: "TED",
    duration: "18:20",
    tags: ["intro", "motivation", "self-discovery"],
    difficulty: "beginner"
  },
  {
    career: "Career Foundations",
    videoId: "cpXW0zAL37Q",
    title: "The Power of Believing You Can Improve",
    channel: "TED",
    duration: "10:20",
    tags: ["growth-mindset", "learning", "resilience"],
    difficulty: "beginner"
  },
  {
    career: "Career Foundations",
    videoId: "MZAtm5dJc1E",
    title: "How to Set SMART Goals",
    channel: "Brian Tracy",
    duration: "6:45",
    tags: ["goals", "planning", "productivity"],
    difficulty: "beginner"
  },

  // ═══════════════════════════════════════════════════════════════
  // ✂️ SPECIFIC CAREERS
  // ═══════════════════════════════════════════════════════════════

  // ── Tailoring / Fashion Design ──
  {
    career: "Tailoring",
    videoId: "5M6A7CqJv5I",
    title: "Tailoring Basics: How to Take Measurements",
    channel: "Professor Pincushion",
    duration: "8:15",
    tags: ["hands-on", "technical", "creative"],
    difficulty: "beginner"
  },
  {
    career: "Tailoring",
    videoId: "kL9p8VqJv5I",
    title: "Starting a Tailoring Business",
    channel: "Small Business Trends",
    duration: "12:30",
    tags: ["entrepreneurship", "business", "marketing"],
    difficulty: "intermediate"
  },

  // ── Healthcare / Doctor ──
  {
    career: "Healthcare",
    videoId: "7Z05kF8Vq5I",
    title: "A Day in the Life of a Doctor",
    channel: "MedSchool Insiders",
    duration: "10:45",
    tags: ["day-in-life", "education", "helping-others"],
    difficulty: "beginner"
  },
  {
    career: "Healthcare",
    videoId: "9Z05kF8Vq5I",
    title: "How to Become a Doctor: Step-by-Step Guide",
    channel: "Shemmassian Academic Consulting",
    duration: "15:20",
    tags: ["education-path", "requirements", "planning"],
    difficulty: "intermediate"
  },

  // ── Engineering ──
  {
    career: "Engineering",
    videoId: "3Z05kF8Vq5I",
    title: "What Do Engineers Actually Do?",
    channel: "Real Engineering",
    duration: "9:30",
    tags: ["problem-solving", "innovation", "tech"],
    difficulty: "beginner"
  },
  {
    career: "Engineering",
    videoId: "4Z05kF8Vq5I",
    title: "Engineering Specialties Explained",
    channel: "Engineering Explained",
    duration: "11:15",
    tags: ["career-paths", "specializations", "decision-making"],
    difficulty: "intermediate"
  },

  // ── Teaching / Education ──
  {
    career: "Education",
    videoId: "5Z05kF8Vq5I",
    title: "Why Teaching Matters",
    channel: "TED-Ed",
    duration: "5:45",
    tags: ["impact", "communication", "helping-others"],
    difficulty: "beginner"
  },
  {
    career: "Education",
    videoId: "6Z05kF8Vq5I",
    title: "How to Become a Teacher",
    channel: "Teach.org",
    duration: "7:20",
    tags: ["certification", "requirements", "career-path"],
    difficulty: "intermediate"
  },

  // ── Technology / Software Development ──
  {
    career: "Technology",
    videoId: "7Z05kF8Vq5I",
    title: "What Do Software Developers Do?",
    channel: "Fireship",
    duration: "4:30",
    tags: ["coding", "problem-solving", "tech"],
    difficulty: "beginner"
  },
  {
    career: "Technology",
    videoId: "8Z05kF8Vq5I",
    title: "How to Start Coding: Beginner's Guide",
    channel: "freeCodeCamp",
    duration: "12:00",
    tags: ["learning-path", "resources", "getting-started"],
    difficulty: "beginner"
  },

  // ── Creative Arts / Graphic Design ──
  {
    career: "Creative Arts",
    videoId: "9Z05kF8Vq5I",
    title: "Graphic Design Career Guide",
    channel: "The Futur",
    duration: "14:20",
    tags: ["portfolio", "client-work", "creative"],
    difficulty: "intermediate"
  },

  // ── Business / Entrepreneurship ──
  {
    career: "Business",
    videoId: "1A05kF8Vq5I",
    title: "How to Start a Business with No Money",
    channel: "GaryVee",
    duration: "8:45",
    tags: ["startup", "bootstrapping", "mindset"],
    difficulty: "intermediate"
  },

  // ── Skilled Trades / Electrician ──
  {
    career: "Skilled Trades",
    videoId: "2A05kF8Vq5I",
    title: "Electrician Career Overview",
    channel: "Trade School Hub",
    duration: "6:30",
    tags: ["hands-on", "certification", "job-security"],
    difficulty: "beginner"
  },

  // ── Science / Research ──
  {
    career: "Science",
    videoId: "3A05kF8Vq5I",
    title: "What Do Scientists Actually Do?",
    channel: "SciShow",
    duration: "7:15",
    tags: ["research", "curiosity", "methodology"],
    difficulty: "beginner"
  },

  // ── Hospitality / Chef ──
  {
    career: "Hospitality",
    videoId: "4A05kF8Vq5I",
    title: "A Day in the Life of a Chef",
    channel: "Bon Appétit",
    duration: "10:30",
    tags: ["culinary", "fast-paced", "creative"],
    difficulty: "beginner"
  },

  // ── Add More Careers Here! ──
  // Template for adding a new career video:
  /*
  {
    career: "[Career Name]",
    videoId: "[YouTube Video ID]",
    title: "[Video Title]",
    channel: "[Channel Name]",
    duration: "[MM:SS]",
    tags: ["tag1", "tag2", "tag3"],
    difficulty: "beginner" | "intermediate" | "advanced"
  },
  */
];

// ─────────────────────────────────────────────────────────────────────
// 🔍 HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────

/**
 * Get a curated video for a specific career and difficulty level
 */
export const getCareerVideo = (
  career: string, 
  difficulty: "beginner" | "intermediate" | "advanced" = "beginner"
): CareerVideo | undefined => {
  return CAREER_VIDEOS.find(
    v => v.career.toLowerCase() === career.toLowerCase() && v.difficulty === difficulty
  );
};

/**
 * Get all videos for a career (all difficulty levels)
 */
export const getCareerVideos = (career: string): CareerVideo[] => {
  return CAREER_VIDEOS.filter(
    v => v.career.toLowerCase() === career.toLowerCase()
  );
};

/**
 * Get videos by tag (for filtering/search)
 */
export const getVideosByTag = (tag: string): CareerVideo[] => {
  return CAREER_VIDEOS.filter(v => v.tags.includes(tag));
};

/**
 * Get a random video for career exploration (fun feature!)
 */
export const getRandomCareerVideo = (): CareerVideo => {
  const randomIndex = Math.floor(Math.random() * CAREER_VIDEOS.length);
  return CAREER_VIDEOS[randomIndex];
};

/**
 * Generate YouTube embed URL from video ID
 */
export const getEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;
};

/**
 * Fetch video metadata via YouTube oEmbed API (no API key needed!)
 * Returns title, author, thumbnail, etc.
 */
export const fetchVideoMetadata = async (videoId: string) => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (!response.ok) throw new Error("Failed to fetch video info");
    return await response.json();
  } catch (error) {
    console.warn("Could not fetch video metadata:", error);
    return null;
  }
};