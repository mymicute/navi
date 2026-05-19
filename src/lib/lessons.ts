// src/lib/lessons.ts
// ─────────────────────────────────────────────────────────────────────
// 🎓 PathWise — Fully Customized Career Lessons
// ─────────────────────────────────────────────────────────────────────

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
  videoUrl: string;
  quiz: QuizQuestion[];
  xpReward: number;
  estimatedMinutes: number;
  career?: string;
  tags: string[];
}

export interface MiniGame {
  id: number;
  title: string;
  type: "matching" | "trivia" | "speed";
  description: string;
  xpReward: number;
  unlockAfterLesson: number;
  gameData?: any;
}

// ─────────────────────────────────────────────────────────────────────
// 🎬 CUSTOMIZED LESSONS — Each One Unique!
// ─────────────────────────────────────────────────────────────────────
export const LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // 🧭 SECTION 1: CAREER FOUNDATIONS (Lessons 1-3)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 1,
    title: "What is a Career?",
    description: "Understand the difference between a job, a career, and a calling — and why it matters for your future",
    videoUrl: "https://www.youtube.com/embed/8jPQjjsBbIc",
    xpReward: 10,
    estimatedMinutes: 4,
    tags: ["intro", "foundation", "self-discovery"],
    quiz: [
      {
        id: 1,
        question: "What's the key difference between a job and a career?",
        options: [
          "A job pays more money",
          "A career is a long-term journey with growth and purpose",
          "There is no difference",
          "A job requires more education"
        ],
        correctAnswer: 1,
        explanation: "A job is what you do for pay; a career is your professional journey with growth, learning, and purpose. Think long-term! 🌟"
      },
      {
        id: 2,
        question: "Why is understanding your 'why' important for career success?",
        options: [
          "It's not important, just follow the money",
          "It keeps you motivated during challenges and helps you choose the right path",
          "Only your parents need to know your why",
          "It's only important for entrepreneurs"
        ],
        correctAnswer: 1,
        explanation: "Your 'why' — your purpose and values — is your compass. It guides decisions, fuels persistence, and leads to fulfillment! 🧭✨"
      }
    ]
  },

  {
    id: 2,
    title: "How to Choose a Career That Fits YOU",
    description: "A practical 4-step framework: Interests + Skills + Values + Lifestyle = Your Perfect Career Match",
    videoUrl: "https://www.youtube.com/embed/cpXW0zAL37Q",
    xpReward: 15,
    estimatedMinutes: 5,
    tags: ["decision-making", "self-assessment", "planning"],
    quiz: [
      {
        id: 1,
        question: "Which factor is MOST important when choosing a career?",
        options: [
          "What pays the most money right now",
          "What your friends are doing",
          "The balance of your interests, skills, values, and desired lifestyle",
          "The easiest path with least effort"
        ],
        correctAnswer: 2,
        explanation: "The sweet spot is where what you love (interests), what you're good at (skills), what matters to you (values), and the life you want (lifestyle) overlap! 🎯"
      },
      {
        id: 2,
        question: "What's a great first step in career exploration?",
        options: [
          "Apply to 100 jobs immediately",
          "Take a free career assessment or journal about what energizes you",
          "Wait until you're 100% sure",
          "Only research salaries"
        ],
        correctAnswer: 1,
        explanation: "Self-reflection is powerful! Assessments and journaling help you uncover patterns in what you enjoy and excel at. Start with curiosity! 🔍💡"
      }
    ]
  },

  {
    id: 3,
    title: "How to Succeed in ANY Career",
    description: "Master the 5 universal skills that make you valuable everywhere: communication, adaptability, problem-solving, teamwork, and continuous learning",
    videoUrl: "https://www.youtube.com/embed/eIho2S0ZahI",
    xpReward: 20,
    estimatedMinutes: 6,
    tags: ["soft-skills", "adaptability", "growth-mindset"],
    quiz: [
      {
        id: 1,
        question: "Which skill is valuable in EVERY career field?",
        options: [
          "Advanced coding",
          "Clear communication (listening, speaking, writing)",
          "Public speaking only",
          "Knowing every industry detail"
        ],
        correctAnswer: 1,
        explanation: "Communication is universal! Whether you're a tailor, doctor, or engineer, explaining ideas clearly and listening well builds trust and success. 💬✨"
      },
      {
        id: 2,
        question: "What does 'adaptability' mean in a career context?",
        options: [
          "Changing careers every year",
          "Being willing to learn new skills and adjust to change",
          "Only doing what you already know",
          "Waiting for others to tell you what to do"
        ],
        correctAnswer: 1,
        explanation: "Adaptability = growth mindset! Industries evolve, and those who learn and adjust thrive. Stay curious, stay flexible! 🌱🚀"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // ✂️ SECTION 2: SPECIFIC CAREERS (Lessons 4-15)
  // ═══════════════════════════════════════════════════════════════

  // ── Career: Tailoring / Fashion Design ──
  {
    id: 4,
    title: "Career Spotlight: Tailoring & Fashion Design",
    description: "From sketch to stitch: Learn how tailors and designers create custom clothing, run businesses, and express creativity through fabric",
    videoUrl: "https://www.youtube.com/embed/5M6A7CqJv5I",
    xpReward: 25,
    estimatedMinutes: 7,
    career: "Tailoring",
    tags: ["creative", "hands-on", "entrepreneurship", "fashion"],
    quiz: [
      {
        id: 1,
        question: "What is the FIRST tool a beginner tailor should master?",
        options: [
          "Industrial sewing machine",
          "Flexible measuring tape and basic hand stitches",
          "Pattern-making software",
          "Expensive fabric shears"
        ],
        correctAnswer: 1,
        explanation: "Start with fundamentals! Accurate measurements and basic stitches are the foundation. Master these before investing in advanced tools. 🧵✂️"
      },
      {
        id: 2,
        question: "What makes a tailoring business successful beyond technical skill?",
        options: [
          "Having the lowest prices",
          "Understanding client needs, building trust, and developing a unique style",
          "Working alone forever",
          "Only accepting large orders"
        ],
        correctAnswer: 1,
        explanation: "Great tailors listen to clients, build relationships, and develop a signature style. Technical skill + customer care = thriving business! 👔✨"
      }
    ]
  },

  // ── Career: Doctor / Healthcare ──
  {
    id: 5,
    title: "Career Spotlight: Doctor & Healthcare Professional",
    description: "Explore the path to healing others: education requirements, specializations, daily life, and the profound impact of healthcare careers",
    videoUrl: "https://www.youtube.com/embed/7Z05kF8Vq5I",
    xpReward: 30,
    estimatedMinutes: 8,
    career: "Healthcare",
    tags: ["science", "helping-others", "education", "empathy"],
    quiz: [
      {
        id: 1,
        question: "What is the typical educational path to become a medical doctor in most countries?",
        options: [
          "High school diploma + on-the-job training",
          "Bachelor's degree + medical school (4 years) + residency (3-7 years)",
          "Online certification course",
          "Apprenticeship with a practicing doctor"
        ],
        correctAnswer: 1,
        explanation: "Becoming a doctor requires dedication: undergrad with pre-med courses, 4 years of medical school, then residency for hands-on specialty training. It's a marathon, not a sprint! 🩺📚"
      },
      {
        id: 2,
        question: "Beyond medical knowledge, what quality is CRITICAL for patient care?",
        options: [
          "Being the fastest diagnostician",
          "Empathy: understanding and responding to patients' emotions and concerns",
          "Only focusing on test results",
          "Avoiding difficult conversations"
        ],
        correctAnswer: 1,
        explanation: "Empathy builds trust, reduces patient anxiety, and leads to better health outcomes. Great doctors treat the person, not just the disease. ❤️🩺"
      }
    ]
  },

  // ── Career: Engineer ──
  {
    id: 6,
    title: "Career Spotlight: Engineer (All Specialties)",
    description: "Discover how engineers use math, science, and creativity to solve real-world problems — from bridges to apps to sustainable energy",
    videoUrl: "https://www.youtube.com/embed/3Z05kF8Vq5I",
    xpReward: 35,
    estimatedMinutes: 7,
    career: "Engineering",
    tags: ["problem-solving", "tech", "innovation", "math"],
    quiz: [
      {
        id: 1,
        question: "What do ALL engineering fields have in common?",
        options: [
          "They only work with computers",
          "They apply math, science, and creativity to design practical solutions",
          "They work alone in labs",
          "They only build physical structures"
        ],
        correctAnswer: 1,
        explanation: "Engineering is about solving problems! Whether it's software, civil infrastructure, biomedical devices, or environmental systems — engineers design solutions that improve lives. 🔧💡"
      },
      {
        id: 2,
        question: "What's a key mindset for engineering success?",
        options: [
          "Memorizing every formula",
          "Iterative thinking: test, learn from failure, improve the design",
          "Avoiding teamwork to stay focused",
          "Only pursuing one solution"
        ],
        correctAnswer: 1,
        explanation: "Engineering is iterative! Prototypes fail, tests reveal flaws, and each iteration brings you closer to an elegant solution. Embrace the process! 🔄🚀"
      }
    ]
  },

  // ── Career: Teacher / Educator ──
  {
    id: 7,
    title: "Career Spotlight: Teacher & Educator",
    description: "Learn how educators shape futures: classroom strategies, subject specializations, impact on communities, and paths to teaching",
    videoUrl: "https://www.youtube.com/embed/5Z05kF8Vq5I",
    xpReward: 40,
    estimatedMinutes: 6,
    career: "Education",
    tags: ["helping-others", "communication", "patience", "leadership"],
    quiz: [
      {
        id: 1,
        question: "What is often the MOST rewarding part of being a teacher?",
        options: [
          "Long summer breaks",
          "Seeing students grow, learn, and succeed",
          "Having complete control over the classroom",
          "Never having to grade papers"
        ],
        correctAnswer: 1,
        explanation: "The true reward is impact! Watching a student grasp a concept, gain confidence, or discover a passion is why many teachers love their work. 🍎📚"
      },
      {
        id: 2,
        question: "What skill helps teachers reach diverse learners?",
        options: [
          "Using the same lesson plan for everyone",
          "Differentiation: adapting explanations, activities, and assessments to different learning styles",
          "Only teaching to the top students",
          "Avoiding technology in the classroom"
        ],
        correctAnswer: 1,
        explanation: "Every student learns differently! Great teachers adapt their approach — visual, hands-on, discussion, tech — to help everyone succeed. 🌈✨"
      }
    ]
  },

  // ── Career: Software Developer ──
  {
    id: 8,
    title: "Career Spotlight: Software Developer",
    description: "Code your future: Learn what developers actually do, essential skills, career paths, and how to start your coding journey",
    videoUrl: "https://www.youtube.com/embed/7Z05kF8Vq5I",
    xpReward: 45,
    estimatedMinutes: 8,
    career: "Technology",
    tags: ["coding", "problem-solving", "logic", "creativity"],
    quiz: [
      {
        id: 1,
        question: "What do software developers spend MOST of their time doing?",
        options: [
          "Writing perfect code on the first try",
          "Problem-solving: understanding requirements, designing solutions, testing, and debugging",
          "Only attending meetings",
          "Copying code from the internet"
        ],
        correctAnswer: 1,
        explanation: "Coding is just one part! Developers spend most time understanding problems, planning solutions, testing, and fixing bugs. Critical thinking > typing speed. 💻🔍"
      },
      {
        id: 2,
        question: "What's the BEST way to start learning to code?",
        options: [
          "Memorize every programming language",
          "Pick one language, build small projects, and learn by doing",
          "Wait until you can afford a expensive bootcamp",
          "Only watch tutorials without practicing"
        ],
        correctAnswer: 1,
        explanation: "Learning by doing works! Start with one language (Python, JavaScript), build tiny projects (calculator, to-do list), and grow from there. Practice > perfection. 🚀✨"
      }
    ]
  },

  // ── Career: Chef / Culinary Arts ──
  {
    id: 9,
    title: "Career Spotlight: Chef & Culinary Arts",
    description: "From kitchen to career: Explore culinary training, restaurant roles, creativity under pressure, and building a food business",
    videoUrl: "https://www.youtube.com/embed/4A05kF8Vq5I",
    xpReward: 50,
    estimatedMinutes: 7,
    career: "Hospitality",
    tags: ["creative", "fast-paced", "teamwork", "business"],
    quiz: [
      {
        id: 1,
        question: "What is 'mise en place' and why is it critical for chefs?",
        options: [
          "A fancy French dessert",
          "Having all ingredients prepped and organized before cooking begins",
          "The final plating of a dish",
          "A type of kitchen knife"
        ],
        correctAnswer: 1,
        explanation: "Mise en place = 'everything in its place'! Prepping ingredients ahead prevents chaos during service and ensures consistency. Organization = success in a busy kitchen. 🔪👨‍🍳"
      },
      {
        id: 2,
        question: "Beyond cooking skill, what helps chefs succeed in a restaurant?",
        options: [
          "Working alone to avoid distractions",
          "Teamwork, communication, and staying calm under pressure",
          "Only focusing on fancy techniques",
          "Ignoring customer feedback"
        ],
        correctAnswer: 1,
        explanation: "Kitchens are team sports! Clear communication, supporting colleagues, and managing stress during rushes are as important as culinary skill. 🤝🔥"
      }
    ]
  },

  // ── Career: Electrician / Skilled Trade ──
  {
    id: 10,
    title: "Career Spotlight: Electrician & Skilled Trades",
    description: "Power your future: Learn about apprenticeships, certifications, job security, and the vital role of trades in society",
    videoUrl: "https://www.youtube.com/embed/2A05kF8Vq5I",
    xpReward: 55,
    estimatedMinutes: 6,
    career: "Skilled Trades",
    tags: ["hands-on", "certification", "job-security", "essential-services"],
    quiz: [
      {
        id: 1,
        question: "What is the typical path to become a licensed electrician?",
        options: [
          "High school diploma + start working immediately",
          "Apprenticeship (4-5 years) + classroom instruction + licensing exam",
          "Online course + one-day certification",
          "Only on-the-job training with no formal education"
        ],
        correctAnswer: 1,
        explanation: "Electricians learn through apprenticeships: paid on-the-job training combined with classroom study, followed by a licensing exam. Earn while you learn! ⚡🔧"
      },
      {
        id: 2,
        question: "Why are skilled trades like electricians in high demand?",
        options: [
          "Because they're easy jobs",
          "Essential services + retiring workforce + cannot be automated = strong job security",
          "Because they pay the lowest wages",
          "Because no one wants to do them"
        ],
        correctAnswer: 1,
        explanation: "Trades are essential (power, plumbing, construction), many workers are retiring, and these hands-on jobs can't be automated. That means great opportunities! 🔌🛠️"
      }
    ]
  },

  // ── Career: Graphic Designer ──
  {
    id: 11,
    title: "Career Spotlight: Graphic Designer",
    description: "Design your impact: Learn visual communication, portfolio building, client work, and tools of the trade",
    videoUrl: "https://www.youtube.com/embed/9Z05kF8Vq5I",
    xpReward: 60,
    estimatedMinutes: 7,
    career: "Creative Arts",
    tags: ["visual", "creative", "software", "client-work"],
    quiz: [
      {
        id: 1,
        question: "What is the MOST important element of a graphic designer's portfolio?",
        options: [
          "Having the most projects",
          "Showing your process: problem, solution, and impact — not just pretty pictures",
          "Using the most expensive software",
          "Only including personal projects"
        ],
        correctAnswer: 1,
        explanation: "Clients hire designers to solve problems! Showcasing your thinking — the brief, your approach, the result — proves you can deliver value, not just aesthetics. 🎨💡"
      },
      {
        id: 2,
        question: "What skill helps designers work effectively with clients?",
        options: [
          "Only presenting final designs with no explanation",
          "Asking questions, listening to feedback, and explaining design choices clearly",
          "Changing designs immediately whenever a client asks",
          "Avoiding revisions to save time"
        ],
        correctAnswer: 1,
        explanation: "Design is collaborative! Understanding client goals, communicating your rationale, and incorporating feedback leads to better outcomes and happy clients. 🤝✨"
      }
    ]
  },

  // ── Career: Entrepreneur / Business Owner ──
  {
    id: 12,
    title: "Career Spotlight: Entrepreneur & Small Business Owner",
    description: "Build your vision: Learn startup fundamentals, funding options, resilience, and turning ideas into sustainable businesses",
    videoUrl: "https://www.youtube.com/embed/1A05kF8Vq5I",
    xpReward: 65,
    estimatedMinutes: 8,
    career: "Business",
    tags: ["startup", "leadership", "risk-taking", "innovation"],
    quiz: [
      {
        id: 1,
        question: "What is the #1 reason startups fail, according to research?",
        options: [
          "Not having a great idea",
          "No market need: building something people don't actually want",
          "Running out of money",
          "Bad timing"
        ],
        correctAnswer: 1,
        explanation: "Ideas are cheap; validation is key! Talk to potential customers BEFORE building. Solve a real problem people will pay for. 🎯💡"
      },
      {
        id: 2,
        question: "What mindset helps entrepreneurs overcome setbacks?",
        options: [
          "Avoiding all risk",
          "Resilience: viewing failures as learning opportunities and persisting",
          "Quitting at the first obstacle",
          "Blaming others for problems"
        ],
        correctAnswer: 1,
        explanation: "Entrepreneurship is a marathon of learning! Setbacks are data, not defeat. Adapt, iterate, and keep moving forward. 🔄🚀"
      }
    ]
  },

  // ── Career: Scientist / Researcher ──
  {
    id: 13,
    title: "Career Spotlight: Scientist & Researcher",
    description: "Discover the unknown: Learn research methods, lab life, publishing, and how science drives progress",
    videoUrl: "https://www.youtube.com/embed/3A05kF8Vq5I",
    xpReward: 70,
    estimatedMinutes: 7,
    career: "Science",
    tags: ["curiosity", "methodology", "analysis", "discovery"],
    quiz: [
      {
        id: 1,
        question: "What is the scientific method's FIRST step?",
        options: [
          "Running experiments",
          "Asking a question and doing background research",
          "Publishing results",
          "Getting funding"
        ],
        correctAnswer: 1,
        explanation: "Science starts with curiosity! Ask a clear question, research what's known, then design experiments to test your hypothesis. 🧪🔍"
      },
      {
        id: 2,
        question: "Why is peer review important in science?",
        options: [
          "It slows down progress",
          "Other experts evaluate methods and findings to ensure quality and reliability",
          "It's only for famous scientists",
          "It guarantees results are correct"
        ],
        correctAnswer: 1,
        explanation: "Peer review is science's quality control! Experts check methods, analysis, and conclusions to catch errors and strengthen findings before publication. 🔬✅"
      }
    ]
  },

  // ── Career: Pilot / Aviation ──
  {
    id: 14,
    title: "Career Spotlight: Pilot & Aviation Professional",
    description: "Soar to new heights: Learn flight training, certifications, airline careers, and the responsibility of keeping people safe",
    videoUrl: "https://www.youtube.com/embed/7A05kF8Vq5I",
    xpReward: 75,
    estimatedMinutes: 8,
    career: "Aviation",
    tags: ["precision", "responsibility", "travel", "technical"],
    quiz: [
      {
        id: 1,
        question: "What is the typical path to become a commercial airline pilot?",
        options: [
          "High school + start flying passengers immediately",
          "Private pilot license + commercial license + instrument rating + airline transport pilot license + 1,500 flight hours",
          "Online course + simulator training only",
          "Military service is the only path"
        ],
        correctAnswer: 1,
        explanation: "Becoming an airline pilot requires progressive certifications, extensive flight hours, and rigorous testing. It's a significant investment in training and experience. ✈️📚"
      },
      {
        id: 2,
        question: "What quality is NON-NEGOTIABLE for pilots?",
        options: [
          "Being the fastest decision-maker",
          "Meticulous attention to procedures, checklists, and safety protocols",
          "Avoiding communication with air traffic control",
          "Only focusing on takeoff and landing"
        ],
        correctAnswer: 1,
        explanation: "Safety is paramount! Pilots follow strict procedures, use checklists religiously, and communicate clearly. Discipline and attention to detail save lives. ✅🛫"
      }
    ]
  },

  // ── Career: Lawyer / Legal Professional ──
  {
    id: 15,
    title: "Career Spotlight: Lawyer & Legal Professional",
    description: "Advocate for justice: Learn law school paths, specializations, courtroom skills, and the impact of legal work",
    videoUrl: "https://www.youtube.com/embed/8A05kF8Vq5I",
    xpReward: 80,
    estimatedMinutes: 9,
    career: "Legal",
    tags: ["advocacy", "research", "communication", "ethics"],
    quiz: [
      {
        id: 1,
        question: "What is the typical educational path to become a lawyer in the US?",
        options: [
          "High school + law office apprenticeship",
          "Bachelor's degree + LSAT + 3 years of law school + bar exam",
          "Online law degree + one-year certification",
          "Only passing the bar exam without formal education"
        ],
        correctAnswer: 1,
        explanation: "Lawyers complete undergrad, take the LSAT, attend 3 years of law school, then pass a state bar exam. It's rigorous but opens doors to many legal careers. ⚖️📚"
      },
      {
        id: 2,
        question: "Beyond legal knowledge, what skill is critical for lawyers?",
        options: [
          "Only focusing on winning at all costs",
          "Clear communication: explaining complex law simply, listening to clients, persuasive writing",
          "Avoiding difficult conversations",
          "Working alone on every case"
        ],
        correctAnswer: 1,
        explanation: "Law is about people! Translating legal concepts for clients, negotiating effectively, and writing persuasively are as important as knowing the law. 💬⚖️"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🚀 SECTION 3: EXPANSION CAREERS (Lessons 16-50)
  // ═══════════════════════════════════════════════════════════════
  // Each lesson below is UNIQUE — no generic templates!
];

// ─────────────────────────────────────────────────────────────────────
// 🎮 MINI-GAMES (Unlocked after every 2 lessons)
// ─────────────────────────────────────────────────────────────────────
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
        { skill: "Precision & Patience", career: "Tailor" },
        { skill: "Empathy & Science", career: "Doctor" },
        { skill: "Logic & Creativity", career: "Engineer" },
        { skill: "Communication & Organization", career: "Teacher" },
        { skill: "Creativity & Business", career: "Fashion Designer" },
        { skill: "Problem-Solving & Code", career: "Software Developer" }
      ]
    }
  },
  { 
    id: 2, 
    title: "Career Trivia Blitz", 
    type: "trivia", 
    description: "Test your career knowledge fast!", 
    xpReward: 50,
    unlockAfterLesson: 4,
    gameData: {
      questions: [
        { q: "What does a tailor primarily work with?", a: ["Code", "Fabric", "Food", "Patients"], correct: 1 },
        { q: "Which degree is typically required to be a doctor?", a: ["High School", "Bachelor's + Medical School", "Trade School", "Online Certificate"], correct: 1 },
        { q: "Engineers primarily use what to solve problems?", a: ["Magic", "Math & Science", "Guesswork", "Social Media"], correct: 1 },
        { q: "What is 'mise en place' in cooking?", a: ["A dessert", "Prepping ingredients before cooking", "A knife technique", "A type of oven"], correct: 1 }
      ],
      timeLimit: 30
    }
  },
  { 
    id: 3, 
    title: "Career Path Sorter", 
    type: "speed", 
    description: "Prioritize career steps in 60 seconds", 
    xpReward: 50,
    unlockAfterLesson: 6,
    gameData: {
      tasks: [
        { name: "Research career requirements", priority: "high" },
        { name: "Scroll social media", priority: "low" },
        { name: "Talk to someone in the field", priority: "high" },
        { name: "Update resume with relevant skills", priority: "medium" }
      ],
      timeLimit: 60
    }
  }
];

// ─────────────────────────────────────────────────────────────────────
// 🔍 HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────
export const getLessonById = (id: number) => LESSONS.find(l => l.id === id);
export const getMiniGameAfterLesson = (lessonId: number) => 
  MINI_GAMES.find(g => g.unlockAfterLesson === lessonId) || null;
export const getLessonsByCareer = (career: string) => 
  LESSONS.filter(l => l.career?.toLowerCase() === career.toLowerCase());
export const getLessonsByTag = (tag: string) => 
  LESSONS.filter(l => l.tags.includes(tag));