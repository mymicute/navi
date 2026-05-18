// src/lib/lessons.ts
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string; // YouTube embed URL
  quiz: QuizQuestion[];
  xpReward: number;
  estimatedMinutes: number;
  tags: string[]; // For filtering/search
}

export interface MiniGame {
  id: number;
  title: string;
  type: "matching" | "trivia" | "speed";
  description: string;
  xpReward: number;
  unlockAfterLesson: number;
  gameData?: any; // Game-specific config
}

// 🎬 First 10 Lessons with REAL educational content
export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Welcome to PathWise",
    description: "Meet Navi and discover how this journey works",
    videoUrl: "https://www.youtube.com/embed/8jPQjjsBbIc", // TED: How to find your passion
    xpReward: 10,
    estimatedMinutes: 4,
    tags: ["intro", "motivation"],
    quiz: [
      {
        id: 1,
        question: "What is the main goal of PathWise?",
        options: [
          "To play games all day",
          "To help you build career skills through bite-sized lessons",
          "To replace your job",
          "To teach you coding only"
        ],
        correctAnswer: 1,
        explanation: "PathWise makes career learning fun, interactive, and achievable—one small step at a time! 🧭"
      },
      {
        id: 2,
        question: "Who guides you on this journey?",
        options: ["Alex", "Navi the compass", "A robot", "Your boss"],
        correctAnswer: 1,
        explanation: "Navi is your friendly AI compass mascot, here to cheer you on every step! ✨"
      }
    ]
  },
  {
    id: 2,
    title: "Discover Your Strengths",
    description: "Learn to identify your natural talents",
    videoUrl: "https://www.youtube.com/embed/cpXW0zAL37Q", // TED: The power of believing you can improve
    xpReward: 15,
    estimatedMinutes: 5,
    tags: ["self-awareness", "strengths"],
    quiz: [
      {
        id: 1,
        question: "What is a 'strength' in career development?",
        options: [
          "Something you're forced to do",
          "A natural talent or skill you excel at",
          "A weakness you hide",
          "A hobby you do on weekends"
        ],
        correctAnswer: 1,
        explanation: "Strengths are activities that energize you and that you're naturally good at—leveraging them leads to career satisfaction!"
      },
      {
        id: 2,
        question: "How can you discover your strengths?",
        options: [
          "Ignore feedback from others",
          "Reflect on tasks that energize you + ask for feedback",
          "Only do what's easy",
          "Copy someone else's career path"
        ],
        correctAnswer: 1,
        explanation: "Self-reflection + external feedback = powerful insights into your unique strengths! 💡"
      }
    ]
  },
  {
    id: 3,
    title: "Set SMART Goals",
    description: "Turn dreams into actionable plans",
    videoUrl: "https://www.youtube.com/embed/MZAtm5dJc1E", // How to set SMART goals
    xpReward: 20,
    estimatedMinutes: 6,
    tags: ["goals", "planning"],
    quiz: [
      {
        id: 1,
        question: "What does SMART stand for in goal-setting?",
        options: [
          "Simple, Magical, Amazing, Radical, Transformative",
          "Specific, Measurable, Achievable, Relevant, Time-bound",
          "Super, Massive, Awesome, Rapid, Terrific",
          "Short, Medium, Advanced, Rare, Top"
        ],
        correctAnswer: 1,
        explanation: "SMART goals are clear, trackable, realistic, meaningful, and deadline-driven—making success achievable! 🎯"
      }
    ]
  },
  {
    id: 4,
    title: "Time Management Basics",
    description: "Make every hour count",
    videoUrl: "https://www.youtube.com/embed/oTugjssqOT0", // TED: How to gain control of your free time
    xpReward: 25,
    estimatedMinutes: 7,
    tags: ["productivity", "time"],
    quiz: [
      {
        id: 1,
        question: "What is the 'Pomodoro Technique'?",
        options: [
          "Working 8 hours straight without breaks",
          "25 minutes focused work + 5 minute break, repeated",
          "Only working when you feel motivated",
          "Multitasking on 5 projects at once"
        ],
        correctAnswer: 1,
        explanation: "Pomodoro helps maintain focus while preventing burnout—perfect for sustained productivity! 🍅"
      }
    ]
  },
  {
    id: 5,
    title: "Communication Skills",
    description: "Express ideas clearly and confidently",
    videoUrl: "https://www.youtube.com/embed/eIho2S0ZahI", // TED: 10 ways to have a better conversation
    xpReward: 30,
    estimatedMinutes: 8,
    tags: ["communication", "soft-skills"],
    quiz: [
      {
        id: 1,
        question: "What is 'active listening'?",
        options: [
          "Waiting for your turn to speak",
          "Fully concentrating, understanding, and responding thoughtfully",
          "Nodding while thinking about your grocery list",
          "Interrupting to share your opinion"
        ],
        correctAnswer: 1,
        explanation: "Active listening builds trust, prevents misunderstandings, and makes others feel valued! 👂✨"
      }
    ]
  },
  {
    id: 6,
    title: "Problem Solving Framework",
    description: "Tackle challenges with confidence",
    videoUrl: "https://www.youtube.com/embed/Ks-_Mh1QhMc", // Your body language may shape who you are
    xpReward: 35,
    estimatedMinutes: 6,
    tags: ["critical-thinking", "problem-solving"],
    quiz: [
      {
        id: 1,
        question: "What is the first step in effective problem-solving?",
        options: [
          "Jump to the first solution",
          "Clearly define the problem",
          "Ask someone else to fix it",
          "Ignore it and hope it goes away"
        ],
        correctAnswer: 1,
        explanation: "A well-defined problem is half-solved! Clarity prevents wasted effort on the wrong issues. 🔍"
      }
    ]
  },
  {
    id: 7,
    title: "Emotional Intelligence",
    description: "Understand and manage emotions (yours and others')",
    videoUrl: "https://www.youtube.com/embed/Y7m9eNoB3NU", // What is emotional intelligence?
    xpReward: 40,
    estimatedMinutes: 7,
    tags: ["ei", "leadership", "self-awareness"],
    quiz: [
      {
        id: 1,
        question: "Which is NOT a component of emotional intelligence?",
        options: [
          "Self-awareness",
          "Self-regulation",
          "Ignoring others' feelings",
          "Empathy"
        ],
        correctAnswer: 2,
        explanation: "EI is about understanding AND responding to emotions—ignoring them defeats the purpose! ❤️🧠"
      }
    ]
  },
  {
    id: 8,
    title: "Networking Fundamentals",
    description: "Build genuine professional relationships",
    videoUrl: "https://www.youtube.com/embed/hV5afwRk3gQ", // How to network when you hate networking
    xpReward: 45,
    estimatedMinutes: 6,
    tags: ["networking", "relationships"],
    quiz: [
      {
        id: 1,
        question: "What is the best approach to networking?",
        options: [
          "Only contact people when you need a job",
          "Build genuine relationships by offering value first",
          "Collect business cards and never follow up",
          "Only network with people more successful than you"
        ],
        correctAnswer: 1,
        explanation: "Authentic networking is about mutual value—help others, and opportunities will follow! 🤝"
      }
    ]
  },
  {
    id: 9,
    title: "Resume Writing Essentials",
    description: "Craft a resume that gets noticed",
    videoUrl: "https://www.youtube.com/embed/Y8e7T0xSKH0", // How to write a resume that stands out
    xpReward: 50,
    estimatedMinutes: 8,
    tags: ["resume", "job-search"],
    quiz: [
      {
        id: 1,
        question: "What should your resume focus on?",
        options: [
          "Every job you've ever had",
          "Achievements and impact, not just duties",
          "Fancy design over content",
          "Using every buzzword you know"
        ],
        correctAnswer: 1,
        explanation: "Hiring managers care about RESULTS—quantify your impact with numbers and outcomes! 📊"
      }
    ]
  },
  {
    id: 10,
    title: "Interview Preparation",
    description: "Ace your next job interview",
    videoUrl: "https://www.youtube.com/embed/6iYRkXw8J4w", // How to answer 'Tell me about yourself'
    xpReward: 55,
    estimatedMinutes: 9,
    tags: ["interview", "confidence"],
    quiz: [
      {
        id: 1,
        question: "What is the STAR method for behavioral questions?",
        options: [
          "Smile, Talk, Answer, Repeat",
          "Situation, Task, Action, Result",
          "Start, Think, Act, Review",
          "Say, Tell, Ask, Respond"
        ],
        correctAnswer: 1,
        explanation: "STAR helps you structure clear, compelling stories that showcase your skills in action! 🌟"
      }
    ]
  }
];

// 🔄 Auto-generate lessons 11-50 with varied topics
const remainingTopics = [
  "Leadership Basics", "Teamwork & Collaboration", "Critical Thinking",
  "Creativity & Innovation", "Adaptability", "Public Speaking",
  "Salary Negotiation", "Career Planning", "Work-Life Balance",
  "Stress Management", "Professional Ethics", "Digital Literacy",
  "Project Management", "Customer Service", "Sales Fundamentals",
  "Marketing Basics", "Financial Literacy", "Entrepreneurship",
  "Remote Work Success", "Personal Branding", "LinkedIn Optimization",
  "Job Search Strategies", "Portfolio Development", "Freelancing",
  "Career Transitions", "Continuous Learning", "Mentorship",
  "Feedback Reception", "Conflict Resolution", "Decision Making",
  "Risk Management", "Quality Assurance", "Data Analysis",
  "Presentation Skills", "Writing Skills", "Research Methods",
  "Cultural Awareness", "Diversity & Inclusion", "Sustainability",
  "Negotiation Tactics", "Performance Reviews", "Coaching Skills",
  "Delegation", "Strategic Thinking", "Change Management",
  "Customer Experience", "Agile Methodologies", "Design Thinking",
  "User Research", "Product Management"
];

for (let i = 11; i <= 50; i++) {
  const topic = remainingTopics[i - 11] || `Career Skill ${i}`;
  const part = Math.ceil(i / 5);
  
  LESSONS.push({
    id: i,
    title: `${topic} - Part ${part}`,
    description: `Master ${topic.toLowerCase()} for career success`,
    videoUrl: `https://www.youtube.com/embed/dQw4w9WgXcQ`, // Placeholder - replace with real videos
    xpReward: 10 + (i * 3),
    estimatedMinutes: 4 + (i % 5),
    tags: [topic.toLowerCase().replace(/\s+/g, "-")],
    quiz: [
      {
        id: 1,
        question: `What is a key principle of ${topic}?`,
        options: [
          "Practice consistently and seek feedback",
          "Ignore constructive criticism",
          "Work in isolation",
          "Avoid challenging tasks"
        ],
        correctAnswer: 0,
        explanation: `Growth in ${topic.toLowerCase()} comes from deliberate practice and learning from feedback!`
      },
      {
        id: 2,
        question: `How does mastering ${topic} benefit your career?`,
        options: [
          "It doesn't matter",
          "Makes you more adaptable and valuable",
          "Slows down your progress",
          "Creates unnecessary complexity"
        ],
        correctAnswer: 1,
        explanation: `Strong ${topic.toLowerCase()} skills differentiate you and open doors to new opportunities!`
      }
    ]
  });
}

// 🎮 Mini-Games (unlocked after every 2 lessons)
export const MINI_GAMES: MiniGame[] = [
  { 
    id: 1, 
    title: "Career Match Challenge", 
    type: "matching", 
    description: "Match skills to the right careers", 
    xpReward: 50,
    unlockAfterLesson: 2,
    gameData: {
      pairs: [
        { skill: "Communication", career: "Marketing Manager" },
        { skill: "Analytical Thinking", career: "Data Scientist" },
        { skill: "Creativity", career: "UX Designer" },
        { skill: "Leadership", career: "Project Manager" },
        { skill: "Empathy", career: "HR Specialist" },
        { skill: "Problem Solving", career: "Software Engineer" }
      ]
    }
  },
  { 
    id: 2, 
    title: "Speed Trivia", 
    type: "trivia", 
    description: "Answer career facts against the clock", 
    xpReward: 50,
    unlockAfterLesson: 4,
    gameData: {
      questions: [
        { q: "What does 'KPI' stand for?", a: ["Key Performance Indicator", "Keep People Interested", "Known Professional Insight"], correct: 0 },
        { q: "Which is a soft skill?", a: ["Coding", "Time Management", "Data Entry"], correct: 1 },
        { q: "What is networking?", a: ["Using Wi-Fi", "Building professional relationships", "Installing cables"], correct: 1 }
      ],
      timeLimit: 30
    }
  },
  { 
    id: 3, 
    title: "Goal Setter", 
    type: "speed", 
    description: "Prioritize tasks in 60 seconds", 
    xpReward: 50,
    unlockAfterLesson: 6,
    gameData: {
      tasks: [
        { name: "Update resume", priority: "high" },
        { name: "Check social media", priority: "low" },
        { name: "Prepare for interview", priority: "high" },
        { name: "Organize desk", priority: "medium" }
      ],
      timeLimit: 60
    }
  }
  // ... Add more games every 2 lessons up to 50
];

// Helpers
export const getLessonById = (id: number) => LESSONS.find(l => l.id === id);
export const getMiniGameAfterLesson = (lessonId: number) => 
  MINI_GAMES.find(g => g.unlockAfterLesson === lessonId) || null;