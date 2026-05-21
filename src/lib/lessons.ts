// src/lib/lessons.ts
// ─────────────────────────────────────────────────────────────────────
// 🎓 PathWise — 50 Fully Customized Career Lessons
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
  category?: string;
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
// 🎬 50 CUSTOMIZED CAREER LESSONS
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
    category: "Foundation",
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
    category: "Foundation",
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
        explanation: "Self-reflection is powerful! Assessments and journaling help you uncover patterns in what you enjoy and excel at. Start with curiosity! 🔍"
      }
    ]
  },

  {
    id: 3,
    title: "How to Succeed in ANY Career",
    description: "Master the 5 universal skills that make you valuable everywhere: communication, adaptability, problem-solving, teamwork, and continuous learning",
    videoUrl: "https://www.youtube.com/embed/eIho2S0ZahI",
    category: "Foundation",
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
  // 🏥 SECTION 2: HEALTHCARE & MEDICINE (Lessons 4-8)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 4,
    title: "Career Spotlight: Doctor & Physician",
    description: "Explore the path to healing others: medical school, residencies, specializations, and the profound impact of healthcare careers",
    videoUrl: "https://www.youtube.com/embed/7Z05kF8Vq5I",
    career: "Healthcare",
    category: "Healthcare",
    xpReward: 25,
    estimatedMinutes: 8,
    tags: ["science", "helping-others", "education", "empathy"],
    quiz: [
      {
        id: 1,
        question: "What is the typical educational path to become a medical doctor?",
        options: [
          "High school diploma + on-the-job training",
          "Bachelor's degree + medical school (4 years) + residency (3-7 years)",
          "Online certification course",
          "Apprenticeship with a practicing doctor"
        ],
        correctAnswer: 1,
        explanation: "Becoming a doctor requires dedication: undergrad with pre-med courses, 4 years of medical school, then residency for hands-on specialty training. It's a marathon, not a sprint! 🩺"
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

  {
    id: 5,
    title: "Career Spotlight: Nurse & Nursing",
    description: "Discover nursing paths: RN, NP, specialties, patient care, and why nurses are the backbone of healthcare",
    videoUrl: "https://www.youtube.com/embed/nurse-career-vid",
    career: "Healthcare",
    category: "Healthcare",
    xpReward: 30,
    estimatedMinutes: 7,
    tags: ["patient-care", "compassion", "teamwork", "medical"],
    quiz: [
      {
        id: 1,
        question: "What is the main difference between an RN (Registered Nurse) and an NP (Nurse Practitioner)?",
        options: [
          "RNs earn more money",
          "NPs have advanced degrees and can diagnose/treat patients independently",
          "RNs work only in hospitals",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "NPs complete master's or doctoral programs and have advanced practice rights, including prescribing medication and diagnosing conditions. RNs provide direct patient care under physician/NP supervision. Both are essential! 👩‍️💊"
      }
    ]
  },

  {
    id: 6,
    title: "Career Spotlight: Physical Therapist",
    description: "Learn how PTs help patients recover movement, manage pain, and improve quality of life through rehabilitation",
    videoUrl: "https://www.youtube.com/embed/pt-career-vid",
    career: "Healthcare",
    category: "Healthcare",
    xpReward: 35,
    estimatedMinutes: 6,
    tags: ["rehabilitation", "movement", "patient-care", "exercise"],
    quiz: [
      {
        id: 1,
        question: "What do physical therapists primarily help patients with?",
        options: [
          "Prescribing medication",
          "Restoring movement and function after injury or illness",
          "Performing surgery",
          "Diagnosing diseases"
        ],
        correctAnswer: 1,
        explanation: "PTs use exercise, manual therapy, and modalities to help patients regain mobility, reduce pain, and prevent disability. They're movement experts! 🏃‍️💪"
      }
    ]
  },

  {
    id: 7,
    title: "Career Spotlight: Pharmacist",
    description: "Explore the role of pharmacists: medication expertise, patient safety, drug interactions, and healthcare collaboration",
    videoUrl: "https://www.youtube.com/embed/pharmacist-vid",
    career: "Healthcare",
    category: "Healthcare",
    xpReward: 40,
    estimatedMinutes: 7,
    tags: ["medication", "safety", "chemistry", "patient-education"],
    quiz: [
      {
        id: 1,
        question: "What is a pharmacist's primary responsibility?",
        options: [
          "Selling over-the-counter products",
          "Ensuring safe and effective medication use through expertise in drugs",
          "Only counting pills",
          "Working only in retail stores"
        ],
        correctAnswer: 1,
        explanation: "Pharmacists are medication experts! They check for drug interactions, counsel patients on proper use, collaborate with doctors, and ensure medication safety. Critical healthcare role! 💊🔬"
      }
    ]
  },

  {
    id: 8,
    title: "Career Spotlight: Medical Technologist",
    description: "Discover the behind-the-scenes heroes: lab testing, diagnostics, research, and how tech drives modern medicine",
    videoUrl: "https://www.youtube.com/embed/medtech-vid",
    career: "Healthcare",
    category: "Healthcare",
    xpReward: 45,
    estimatedMinutes: 6,
    tags: ["laboratory", "diagnostics", "technology", "analysis"],
    quiz: [
      {
        id: 1,
        question: "What do medical technologists do?",
        options: [
          "Perform complex lab tests that help diagnose diseases",
          "Only clean lab equipment",
          "Work only with patients directly",
          "Prescribe medication"
        ],
        correctAnswer: 0,
        explanation: "Med techs perform blood tests, analyze samples, operate sophisticated equipment, and provide critical data that doctors use for diagnosis. They're the detectives of healthcare! 🔬🧪"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 💻 SECTION 3: TECHNOLOGY & ENGINEERING (Lessons 9-15)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 9,
    title: "Career Spotlight: Software Developer",
    description: "Code your future: programming languages, problem-solving, building apps, and the endless possibilities of tech",
    videoUrl: "https://www.youtube.com/embed/7Z05kF8Vq5I",
    career: "Technology",
    category: "Technology",
    xpReward: 50,
    estimatedMinutes: 8,
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
          "Wait until you can afford an expensive bootcamp",
          "Only watch tutorials without practicing"
        ],
        correctAnswer: 1,
        explanation: "Learning by doing works! Start with one language (Python, JavaScript), build tiny projects (calculator, to-do list), and grow from there. Practice > perfection. 🚀✨"
      }
    ]
  },

  {
    id: 10,
    title: "Career Spotlight: Data Scientist",
    description: "Turn data into decisions: statistics, machine learning, visualization, and the power of insights",
    videoUrl: "https://www.youtube.com/embed/datascience-vid",
    career: "Technology",
    category: "Technology",
    xpReward: 55,
    estimatedMinutes: 7,
    tags: ["data", "analytics", "machine-learning", "statistics"],
    quiz: [
      {
        id: 1,
        question: "What is the primary role of a data scientist?",
        options: [
          "Only creating charts and graphs",
          "Analyzing complex data to extract insights and solve business problems",
          "Managing computer networks",
          "Selling software"
        ],
        correctAnswer: 1,
        explanation: "Data scientists use statistics, programming, and domain knowledge to find patterns in data, build predictive models, and help organizations make data-driven decisions. 🔍📊"
      }
    ]
  },

  {
    id: 11,
    title: "Career Spotlight: Cybersecurity Analyst",
    description: "Protect digital assets: threat detection, ethical hacking, security protocols, and defending against cyber attacks",
    videoUrl: "https://www.youtube.com/embed/cybersec-vid",
    career: "Technology",
    category: "Technology",
    xpReward: 60,
    estimatedMinutes: 7,
    tags: ["security", "hacking", "protection", "networks"],
    quiz: [
      {
        id: 1,
        question: "What is the main goal of a cybersecurity analyst?",
        options: [
          "Creating viruses",
          "Protecting systems, networks, and data from cyber threats",
          "Only fixing broken computers",
          "Selling antivirus software"
        ],
        correctAnswer: 1,
        explanation: "Cybersecurity analysts monitor for threats, implement security measures, respond to breaches, and protect sensitive information. They're digital guardians! 🛡️💻"
      }
    ]
  },

  {
    id: 12,
    title: "Career Spotlight: Mechanical Engineer",
    description: "Design the physical world: machines, systems, thermodynamics, and bringing ideas to life through engineering",
    videoUrl: "https://www.youtube.com/embed/mecheng-vid",
    career: "Engineering",
    category: "Engineering",
    xpReward: 65,
    estimatedMinutes: 8,
    tags: ["design", "mechanics", "innovation", "physics"],
    quiz: [
      {
        id: 1,
        question: "What do mechanical engineers design?",
        options: [
          "Only cars",
          "Mechanical systems: engines, machines, HVAC, robotics, and more",
          "Computer software",
          "Buildings and bridges"
        ],
        correctAnswer: 1,
        explanation: "Mechanical engineers work on anything with moving parts! From tiny medical devices to massive power plants, they design, test, and improve mechanical systems. 🔧⚙️"
      }
    ]
  },

  {
    id: 13,
    title: "Career Spotlight: Civil Engineer",
    description: "Build infrastructure: bridges, roads, water systems, and shaping the cities and communities of tomorrow",
    videoUrl: "https://www.youtube.com/embed/civileng-vid",
    career: "Engineering",
    category: "Engineering",
    xpReward: 70,
    estimatedMinutes: 7,
    tags: ["infrastructure", "construction", "public-works", "planning"],
    quiz: [
      {
        id: 1,
        question: "What do civil engineers primarily work on?",
        options: [
          "Computer programs",
          "Infrastructure: bridges, roads, dams, water systems, and public works",
          "Medical devices",
          "Aircraft design"
        ],
        correctAnswer: 1,
        explanation: "Civil engineers design and oversee construction of infrastructure that society depends on daily. They build the foundations of modern civilization! 🌉🏗️"
      }
    ]
  },

  {
    id: 14,
    title: "Career Spotlight: Electrical Engineer",
    description: "Power innovation: circuits, electronics, power systems, and the technology that drives our connected world",
    videoUrl: "https://www.youtube.com/embed/eleceng-vid",
    career: "Engineering",
    category: "Engineering",
    xpReward: 75,
    estimatedMinutes: 7,
    tags: ["electronics", "circuits", "power", "innovation"],
    quiz: [
      {
        id: 1,
        question: "What do electrical engineers work with?",
        options: [
          "Only light bulbs",
          "Electrical systems: circuits, power grids, electronics, telecommunications",
          "Mechanical engines",
          "Chemical processes"
        ],
        correctAnswer: 1,
        explanation: "Electrical engineers design everything from microchips to power plants! They work on electronics, power distribution, communications, and control systems. ⚡"
      }
    ]
  },

  {
    id: 15,
    title: "Career Spotlight: Environmental Engineer",
    description: "Solve global challenges: sustainability, pollution control, renewable energy, and protecting our planet",
    videoUrl: "https://www.youtube.com/embed/enveng-vid",
    career: "Engineering",
    category: "Engineering",
    xpReward: 80,
    estimatedMinutes: 7,
    tags: ["sustainability", "environment", "green-tech", "conservation"],
    quiz: [
      {
        id: 1,
        question: "What is the focus of environmental engineering?",
        options: [
          "Only recycling programs",
          "Using engineering principles to protect the environment and human health",
          "Studying animals in the wild",
          "Creating pollution"
        ],
        correctAnswer: 1,
        explanation: "Environmental engineers develop solutions for clean water, air quality, waste management, and sustainable systems. They engineer a better future for our planet! 🌍♻️"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🎨 SECTION 4: CREATIVE & DESIGN (Lessons 16-20)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 16,
    title: "Career Spotlight: Graphic Designer",
    description: "Communicate visually: branding, typography, digital design, and creating impactful visual experiences",
    videoUrl: "https://www.youtube.com/embed/9Z05kF8Vq5I",
    career: "Creative Arts",
    category: "Creative",
    xpReward: 85,
    estimatedMinutes: 7,
    tags: ["visual", "creative", "software", "branding"],
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
      }
    ]
  },

  {
    id: 17,
    title: "Career Spotlight: UX/UI Designer",
    description: "Design user experiences: research, wireframing, prototyping, and creating intuitive digital products",
    videoUrl: "https://www.youtube.com/embed/uxui-vid",
    career: "Creative Arts",
    category: "Creative",
    xpReward: 90,
    estimatedMinutes: 8,
    tags: ["user-experience", "interface", "research", "digital"],
    quiz: [
      {
        id: 1,
        question: "What's the difference between UX and UI design?",
        options: [
          "They're the same thing",
          "UX focuses on user experience and flow; UI focuses on visual interface elements",
          "UX is for websites only; UI is for apps only",
          "UI is more important than UX"
        ],
        correctAnswer: 1,
        explanation: "UX (User Experience) designers research user needs and design the overall flow. UI (User Interface) designers create the visual elements. Both work together for great products! 🎯"
      }
    ]
  },

  {
    id: 18,
    title: "Career Spotlight: Video Editor & Filmmaker",
    description: "Tell stories through film: editing, cinematography, storytelling, and bringing visions to screen",
    videoUrl: "https://www.youtube.com/embed/video-vid",
    career: "Creative Arts",
    category: "Creative",
    xpReward: 95,
    estimatedMinutes: 7,
    tags: ["video", "storytelling", "editing", "media"],
    quiz: [
      {
        id: 1,
        question: "What skill is essential for video editors?",
        options: [
          "Only knowing software",
          "Storytelling: understanding pacing, emotion, and narrative flow",
          "Owning expensive equipment",
          "Working alone"
        ],
        correctAnswer: 1,
        explanation: "Great editors are storytellers! They use timing, rhythm, and emotional beats to craft compelling narratives. Technical skill serves the story. 🎬✂️"
      }
    ]
  },

  {
    id: 19,
    title: "Career Spotlight: Fashion Designer",
    description: "Create wearable art: design process, textiles, trend forecasting, and building a fashion brand",
    videoUrl: "https://www.youtube.com/embed/fashion-vid",
    career: "Creative Arts",
    category: "Creative",
    xpReward: 100,
    estimatedMinutes: 7,
    tags: ["fashion", "design", "textiles", "creativity"],
    quiz: [
      {
        id: 1,
        question: "What's the first step in fashion design?",
        options: [
          "Sewing immediately",
          "Research, sketching, and understanding your target audience",
          "Buying expensive fabric",
          "Copying other designers"
        ],
        correctAnswer: 1,
        explanation: "Design starts with research and ideation! Understanding trends, your audience, and sketching concepts comes before any sewing. Planning prevents costly mistakes. 👗✏️"
      }
    ]
  },

  {
    id: 20,
    title: "Career Spotlight: Animator & Motion Designer",
    description: "Bring art to life: 2D/3D animation, character design, motion graphics, and visual storytelling",
    videoUrl: "https://www.youtube.com/embed/anim-vid",
    career: "Creative Arts",
    category: "Creative",
    xpReward: 105,
    estimatedMinutes: 8,
    tags: ["animation", "3d", "motion", "storytelling"],
    quiz: [
      {
        id: 1,
        question: "What is the '12 principles of animation'?",
        options: [
          "12 software programs to learn",
          "Fundamental techniques that make animation look realistic and appealing",
          "12 types of characters",
          "A list of animation studios"
        ],
        correctAnswer: 1,
        explanation: "The 12 principles (squash/stretch, anticipation, timing, etc.) are the foundation of great animation. They make movement feel natural and engaging! 🎨🎬"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 💼 SECTION 5: BUSINESS & FINANCE (Lessons 21-26)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 21,
    title: "Career Spotlight: Entrepreneur & Startup Founder",
    description: "Build your vision: ideation, validation, funding, scaling, and the entrepreneurial journey",
    videoUrl: "https://www.youtube.com/embed/1A05kF8Vq5I",
    career: "Business",
    category: "Business",
    xpReward: 110,
    estimatedMinutes: 8,
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
        explanation: "Entrepreneurship is a marathon of learning! Setbacks are data, not defeat. Adapt, iterate, and keep moving forward. 🔄"
      }
    ]
  },

  {
    id: 22,
    title: "Career Spotlight: Marketing Manager",
    description: "Drive brand growth: strategy, digital marketing, analytics, and connecting products with audiences",
    videoUrl: "https://www.youtube.com/embed/marketing-vid",
    career: "Business",
    category: "Business",
    xpReward: 115,
    estimatedMinutes: 7,
    tags: ["marketing", "strategy", "digital", "analytics"],
    quiz: [
      {
        id: 1,
        question: "What is the 'marketing mix' or '4 Ps'?",
        options: [
          "4 social media platforms",
          "Product, Price, Place, Promotion — the key elements of marketing strategy",
          "4 types of advertisements",
          "4 marketing software tools"
        ],
        correctAnswer: 1,
        explanation: "The 4 Ps framework helps marketers strategically position products: what you sell (Product), what it costs (Price), where it's sold (Place), and how you promote it (Promotion). 📊"
      }
    ]
  },

  {
    id: 23,
    title: "Career Spotlight: Financial Analyst",
    description: "Analyze markets and investments: financial modeling, forecasting, and guiding business decisions",
    videoUrl: "https://www.youtube.com/embed/finance-vid",
    career: "Business",
    category: "Business",
    xpReward: 120,
    estimatedMinutes: 7,
    tags: ["finance", "analysis", "investing", "modeling"],
    quiz: [
      {
        id: 1,
        question: "What do financial analysts primarily do?",
        options: [
          "Only manage personal bank accounts",
          "Analyze financial data to guide investment and business decisions",
          "Sell insurance policies",
          "Count cash in banks"
        ],
        correctAnswer: 1,
        explanation: "Financial analysts evaluate companies, industries, and markets to provide recommendations on investments, mergers, acquisitions, and strategic planning. They turn numbers into insights! 💰📈"
      }
    ]
  },

  {
    id: 24,
    title: "Career Spotlight: Human Resources (HR) Manager",
    description: "Build great workplaces: talent acquisition, employee relations, culture, and organizational development",
    videoUrl: "https://www.youtube.com/embed/hr-vid",
    career: "Business",
    category: "Business",
    xpReward: 125,
    estimatedMinutes: 6,
    tags: ["hr", "people", "culture", "management"],
    quiz: [
      {
        id: 1,
        question: "What is the primary role of HR professionals?",
        options: [
          "Only firing employees",
          "Managing the employee lifecycle: recruiting, training, benefits, and culture",
          "Only organizing parties",
          "Enforcing rules only"
        ],
        correctAnswer: 1,
        explanation: "HR is about people strategy! They attract talent, develop employees, ensure compliance, foster culture, and create environments where people thrive. 🤝"
      }
    ]
  },

  {
    id: 25,
    title: "Career Spotlight: Project Manager",
    description: "Lead teams to success: planning, execution, risk management, and delivering projects on time and budget",
    videoUrl: "https://www.youtube.com/embed/pm-vid",
    career: "Business",
    category: "Business",
    xpReward: 130,
    estimatedMinutes: 7,
    tags: ["management", "leadership", "planning", "coordination"],
    quiz: [
      {
        id: 1,
        question: "What is the 'triple constraint' in project management?",
        options: [
          "Time, Money, Coffee",
          "Scope, Time, Cost — the three factors that must be balanced in every project",
          "Team, Tools, Technology",
          "Planning, Execution, Closing"
        ],
        correctAnswer: 1,
        explanation: "The triple constraint (also called the Iron Triangle) means: changing one factor (scope, time, or cost) affects the others. Great PMs balance all three! ⏱️📋"
      }
    ]
  },

  {
    id: 26,
    title: "Career Spotlight: Sales Professional",
    description: "Master the art of selling: relationship building, negotiation, closing deals, and driving revenue",
    videoUrl: "https://www.youtube.com/embed/sales-vid",
    career: "Business",
    category: "Business",
    xpReward: 135,
    estimatedMinutes: 6,
    tags: ["sales", "negotiation", "communication", "revenue"],
    quiz: [
      {
        id: 1,
        question: "What's the key to successful sales?",
        options: [
          "Pushing products on anyone",
          "Understanding customer needs and providing genuine value",
          "Only talking about features",
          "Being the cheapest option"
        ],
        correctAnswer: 1,
        explanation: "Great salespeople are problem-solvers! They listen, understand pain points, and show how their solution creates value. It's about helping, not just selling. 🤝💼"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🔧 SECTION 6: SKILLED TRADES (Lessons 27-32)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 27,
    title: "Career Spotlight: Electrician",
    description: "Power the world: electrical systems, safety protocols, installations, and essential infrastructure",
    videoUrl: "https://www.youtube.com/embed/2A05kF8Vq5I",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 140,
    estimatedMinutes: 6,
    tags: ["electrical", "hands-on", "safety", "installation"],
    quiz: [
      {
        id: 1,
        question: "What is the typical path to become a licensed electrician?",
        options: [
          "High school + start working immediately",
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

  {
    id: 28,
    title: "Career Spotlight: Plumber",
    description: "Keep systems flowing: pipe installation, repairs, water systems, and critical infrastructure maintenance",
    videoUrl: "https://www.youtube.com/embed/plumber-vid",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 145,
    estimatedMinutes: 6,
    tags: ["plumbing", "repair", "water-systems", "maintenance"],
    quiz: [
      {
        id: 1,
        question: "What do plumbers install and maintain?",
        options: [
          "Only toilets",
          "Water supply, drainage, and gas systems in buildings",
          "Electrical wiring",
          "HVAC systems"
        ],
        correctAnswer: 1,
        explanation: "Plumbers work on pipes, fixtures, and systems that bring clean water in and waste water out. Essential for health and sanitation! 🚰🔧"
      }
    ]
  },

  {
    id: 29,
    title: "Career Spotlight: Welder",
    description: "Join metals with precision: welding techniques, safety, fabrication, and building strong structures",
    videoUrl: "https://www.youtube.com/embed/welder-vid",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 150,
    estimatedMinutes: 6,
    tags: ["welding", "metalwork", "fabrication", "precision"],
    quiz: [
      {
        id: 1,
        question: "What is welding?",
        options: [
          "Painting metal",
          "Fusing metals together using heat and/or pressure",
          "Cutting metal only",
          "Polishing metal surfaces"
        ],
        correctAnswer: 1,
        explanation: "Welding joins metals by melting and fusing them together. It's used in construction, manufacturing, automotive, and aerospace. Critical skilled trade! 🔥⚙️"
      }
    ]
  },

  {
    id: 30,
    title: "Career Spotlight: Carpenter",
    description: "Build with wood: framing, finishing, cabinetry, and crafting structures from blueprint to reality",
    videoUrl: "https://www.youtube.com/embed/carpenter-vid",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 155,
    estimatedMinutes: 7,
    tags: ["carpentry", "woodwork", "construction", "craftsmanship"],
    quiz: [
      {
        id: 1,
        question: "What do carpenters primarily work with?",
        options: [
          "Only hammers",
          "Wood and wood-based materials to build structures and fixtures",
          "Metal and steel",
          "Plastic materials"
        ],
        correctAnswer: 1,
        explanation: "Carpenters frame houses, build cabinets, install trim, and create custom woodwork. They transform blueprints into tangible structures! 🪚🏠"
      }
    ]
  },

  {
    id: 31,
    title: "Career Spotlight: HVAC Technician",
    description: "Control climate: heating, ventilation, air conditioning systems, and keeping spaces comfortable",
    videoUrl: "https://www.youtube.com/embed/hvac-vid",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 160,
    estimatedMinutes: 6,
    tags: ["hvac", "climate-control", "mechanical", "repair"],
    quiz: [
      {
        id: 1,
        question: "What does HVAC stand for?",
        options: [
          "High Voltage Air Control",
          "Heating, Ventilation, and Air Conditioning",
          "Home Vacuum And Cleaning",
          "Heavy Vehicle Air Conditioning"
        ],
        correctAnswer: 1,
        explanation: "HVAC technicians install and maintain systems that control indoor temperature, air quality, and comfort. Essential for modern living! ❄️🔥"
      }
    ]
  },

  {
    id: 32,
    title: "Career Spotlight: Automotive Technician",
    description: "Diagnose and repair vehicles: engines, electronics, diagnostics, and keeping cars running safely",
    videoUrl: "https://www.youtube.com/embed/auto-vid",
    career: "Skilled Trades",
    category: "Trades",
    xpReward: 165,
    estimatedMinutes: 7,
    tags: ["automotive", "repair", "diagnostics", "mechanical"],
    quiz: [
      {
        id: 1,
        question: "What do modern automotive technicians need to know?",
        options: [
          "Only how to change oil",
          "Mechanical systems, computer diagnostics, and electronic systems",
          "Only how to paint cars",
          "How to sell cars"
        ],
        correctAnswer: 1,
        explanation: "Today's vehicles are computers on wheels! Techs need mechanical knowledge PLUS expertise in electronics, software, and diagnostic tools. 🚗💻"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 📚 SECTION 7: EDUCATION & SOCIAL SERVICES (Lessons 33-37)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 33,
    title: "Career Spotlight: Teacher (K-12)",
    description: "Shape young minds: classroom management, curriculum, student engagement, and making learning meaningful",
    videoUrl: "https://www.youtube.com/embed/5Z05kF8Vq5I",
    career: "Education",
    category: "Education",
    xpReward: 170,
    estimatedMinutes: 7,
    tags: ["teaching", "education", "youth", "mentorship"],
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

  {
    id: 34,
    title: "Career Spotlight: School Counselor",
    description: "Support student success: academic guidance, mental health, career planning, and holistic development",
    videoUrl: "https://www.youtube.com/embed/counselor-vid",
    career: "Education",
    category: "Education",
    xpReward: 175,
    estimatedMinutes: 6,
    tags: ["counseling", "guidance", "mental-health", "support"],
    quiz: [
      {
        id: 1,
        question: "What do school counselors help students with?",
        options: [
          "Only choosing colleges",
          "Academic achievement, personal/social development, and career planning",
          "Only discipline",
          "Teaching classes"
        ],
        correctAnswer: 1,
        explanation: "Counselors support the whole student! They help with academic planning, social-emotional skills, career exploration, and overcoming challenges. 🎓💚"
      }
    ]
  },

  {
    id: 35,
    title: "Career Spotlight: Social Worker",
    description: "Advocate for change: case management, community resources, crisis intervention, and empowering vulnerable populations",
    videoUrl: "https://www.youtube.com/embed/socialwork-vid",
    career: "Social Services",
    category: "Social Services",
    xpReward: 180,
    estimatedMinutes: 7,
    tags: ["social-work", "advocacy", "community", "support"],
    quiz: [
      {
        id: 1,
        question: "What is the primary goal of social work?",
        options: [
          "Only providing financial aid",
          "Enhancing human well-being and helping meet basic needs, especially for vulnerable populations",
          "Enforcing laws",
          "Managing hospitals"
        ],
        correctAnswer: 1,
        explanation: "Social workers advocate for justice, connect people with resources, provide counseling, and work to improve systems. They're agents of positive change! 🤝"
      }
    ]
  },

  {
    id: 36,
    title: "Career Spotlight: Psychologist",
    description: "Understand the mind: assessment, therapy, research, and helping people achieve mental wellness",
    videoUrl: "https://www.youtube.com/embed/psych-vid",
    career: "Social Services",
    category: "Social Services",
    xpReward: 185,
    estimatedMinutes: 8,
    tags: ["psychology", "mental-health", "therapy", "research"],
    quiz: [
      {
        id: 1,
        question: "What do psychologists study and treat?",
        options: [
          "Only severe mental illness",
          "Human behavior, cognition, and emotional well-being",
          "Physical diseases",
          "Only children"
        ],
        correctAnswer: 1,
        explanation: "Psychologists help people with everything from anxiety and depression to relationship issues and personal growth. They use evidence-based therapy and assessment. 🧠💚"
      }
    ]
  },

  {
    id: 37,
    title: "Career Spotlight: Nonprofit Manager",
    description: "Lead social impact: fundraising, program development, volunteer management, and creating positive change",
    videoUrl: "https://www.youtube.com/embed/nonprofit-vid",
    career: "Social Services",
    category: "Social Services",
    xpReward: 190,
    estimatedMinutes: 6,
    tags: ["nonprofit", "leadership", "fundraising", "impact"],
    quiz: [
      {
        id: 1,
        question: "What is the main focus of nonprofit management?",
        options: [
          "Making profit for shareholders",
          "Advancing a social mission and serving the community",
          "Only organizing events",
          "Avoiding taxes"
        ],
        correctAnswer: 1,
        explanation: "Nonprofit managers balance mission and sustainability! They raise funds, manage programs, engage volunteers, and measure social impact. Purpose-driven leadership! 🌟💚"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🔬 SECTION 8: SCIENCE & RESEARCH (Lessons 38-42)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 38,
    title: "Career Spotlight: Biologist",
    description: "Study life itself: ecosystems, genetics, evolution, and understanding the living world",
    videoUrl: "https://www.youtube.com/embed/3A05kF8Vq5I",
    career: "Science",
    category: "Science",
    xpReward: 195,
    estimatedMinutes: 7,
    tags: ["biology", "research", "life-science", "nature"],
    quiz: [
      {
        id: 1,
        question: "What do biologists study?",
        options: [
          "Only animals",
          "Living organisms: from cells to ecosystems",
          "Only plants",
          "Rocks and minerals"
        ],
        correctAnswer: 1,
        explanation: "Biology is the study of life! Biologists research everything from DNA to ecosystems, helping us understand and protect living systems. 🧬🌿"
      }
    ]
  },

  {
    id: 39,
    title: "Career Spotlight: Chemist",
    description: "Explore matter and reactions: lab work, analysis, drug development, and the science of substances",
    videoUrl: "https://www.youtube.com/embed/chem-vid",
    career: "Science",
    category: "Science",
    xpReward: 200,
    estimatedMinutes: 7,
    tags: ["chemistry", "lab", "analysis", "research"],
    quiz: [
      {
        id: 1,
        question: "What do chemists study and do?",
        options: [
          "Only mix colorful liquids",
          "The composition, properties, and reactions of substances",
          "Only work in pharmaceuticals",
          "Study stars and planets"
        ],
        correctAnswer: 1,
        explanation: "Chemists develop new materials, medicines, and products! They analyze substances, conduct experiments, and solve problems at the molecular level. ⚗️🔬"
      }
    ]
  },

  {
    id: 40,
    title: "Career Spotlight: Physicist",
    description: "Unlock the universe: quantum mechanics, relativity, energy, and the fundamental laws of nature",
    videoUrl: "https://www.youtube.com/embed/physics-vid",
    career: "Science",
    category: "Science",
    xpReward: 205,
    estimatedMinutes: 8,
    tags: ["physics", "quantum", "research", "theory"],
    quiz: [
      {
        id: 1,
        question: "What do physicists study?",
        options: [
          "Only gravity",
          "Matter, energy, and the fundamental forces of the universe",
          "Only astronomy",
          "Biological systems"
        ],
        correctAnswer: 1,
        explanation: "Physicists explore everything from subatomic particles to black holes! They develop theories, conduct experiments, and push the boundaries of human knowledge. 🌌️"
      }
    ]
  },

  {
    id: 41,
    title: "Career Spotlight: Environmental Scientist",
    description: "Protect our planet: climate research, conservation, pollution analysis, and sustainability solutions",
    videoUrl: "https://www.youtube.com/embed/envsci-vid",
    career: "Science",
    category: "Science",
    xpReward: 210,
    estimatedMinutes: 7,
    tags: ["environment", "climate", "conservation", "sustainability"],
    quiz: [
      {
        id: 1,
        question: "What is the focus of environmental science?",
        options: [
          "Only studying animals",
          "Understanding interactions between humans and the natural environment",
          "Only recycling",
          "Creating pollution"
        ],
        correctAnswer: 1,
        explanation: "Environmental scientists study climate change, pollution, ecosystems, and develop solutions for sustainable living. They're protectors of our planet! 🌍"
      }
    ]
  },

  {
    id: 42,
    title: "Career Spotlight: Research Scientist",
    description: "Push knowledge forward: experimental design, data analysis, publishing, and scientific discovery",
    videoUrl: "https://www.youtube.com/embed/research-vid",
    career: "Science",
    category: "Science",
    xpReward: 215,
    estimatedMinutes: 7,
    tags: ["research", "discovery", "innovation", "analysis"],
    quiz: [
      {
        id: 1,
        question: "What is the scientific method?",
        options: [
          "A random guessing process",
          "A systematic approach: observe, hypothesize, experiment, analyze, conclude",
          "Only for famous scientists",
          "A way to prove you're right"
        ],
        correctAnswer: 1,
        explanation: "The scientific method ensures reliable results! Scientists observe phenomena, form testable hypotheses, conduct controlled experiments, and draw evidence-based conclusions. 🔬📊"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🍳 SECTION 9: HOSPITALITY & SERVICE (Lessons 43-47)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 43,
    title: "Career Spotlight: Chef & Culinary Artist",
    description: "Create culinary experiences: cooking techniques, menu design, kitchen management, and food innovation",
    videoUrl: "https://www.youtube.com/embed/4A05kF8Vq5I",
    career: "Hospitality",
    category: "Hospitality",
    xpReward: 220,
    estimatedMinutes: 7,
    tags: ["culinary", "cooking", "creativity", "food"],
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
        explanation: "Mise en place = 'everything in its place'! Prepping ingredients ahead prevents chaos during service and ensures consistency. Organization = success in a busy kitchen. 🔪‍🍳"
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
        explanation: "Kitchens are team sports! Clear communication, supporting colleagues, and managing stress during rushes are as important as culinary skill. 🤝"
      }
    ]
  },

  {
    id: 44,
    title: "Career Spotlight: Hotel Manager",
    description: "Deliver exceptional hospitality: operations, guest experience, staff leadership, and service excellence",
    videoUrl: "https://www.youtube.com/embed/hotel-vid",
    career: "Hospitality",
    category: "Hospitality",
    xpReward: 225,
    estimatedMinutes: 6,
    tags: ["hospitality", "management", "service", "operations"],
    quiz: [
      {
        id: 1,
        question: "What is the primary goal of hotel management?",
        options: [
          "Only making profit",
          "Creating memorable guest experiences while running efficient operations",
          "Only cleaning rooms",
          "Avoiding customer complaints"
        ],
        correctAnswer: 1,
        explanation: "Great hotel managers balance guest satisfaction with business success! They oversee operations, train staff, and ensure every guest feels valued. 🏨⭐"
      }
    ]
  },

  {
    id: 45,
    title: "Career Spotlight: Event Planner",
    description: "Orchestrate memorable events: weddings, conferences, logistics, vendor management, and flawless execution",
    videoUrl: "https://www.youtube.com/embed/event-vid",
    career: "Hospitality",
    category: "Hospitality",
    xpReward: 230,
    estimatedMinutes: 6,
    tags: ["events", "planning", "logistics", "coordination"],
    quiz: [
      {
        id: 1,
        question: "What skill is MOST important for event planners?",
        options: [
          "Only being creative",
          "Organization, attention to detail, and problem-solving under pressure",
          "Avoiding budgets",
          "Working alone"
        ],
        correctAnswer: 1,
        explanation: "Event planning is complex logistics! Planners coordinate vendors, manage budgets, handle last-minute changes, and ensure everything runs smoothly. 🎉📋"
      }
    ]
  },

  {
    id: 46,
    title: "Career Spotlight: Travel Agent",
    description: "Craft dream vacations: destination expertise, booking systems, customer service, and travel trends",
    videoUrl: "https://www.youtube.com/embed/travel-vid",
    career: "Hospitality",
    category: "Hospitality",
    xpReward: 235,
    estimatedMinutes: 6,
    tags: ["travel", "tourism", "customer-service", "planning"],
    quiz: [
      {
        id: 1,
        question: "What do modern travel agents provide?",
        options: [
          "Only booking flights",
          "Expert advice, personalized itineraries, and insider knowledge",
          "Only selling packages",
          "Avoiding customer preferences"
        ],
        correctAnswer: 1,
        explanation: "Travel agents are destination experts! They save clients time, find best deals, handle complications, and create unforgettable travel experiences. ✈️🌍"
      }
    ]
  },

  {
    id: 47,
    title: "Career Spotlight: Flight Attendant",
    description: "Ensure safe travels: safety protocols, customer service, emergency procedures, and hospitality at 30,000 feet",
    videoUrl: "https://www.youtube.com/embed/flight-vid",
    career: "Hospitality",
    category: "Hospitality",
    xpReward: 240,
    estimatedMinutes: 6,
    tags: ["aviation", "safety", "service", "travel"],
    quiz: [
      {
        id: 1,
        question: "What is the PRIMARY responsibility of flight attendants?",
        options: [
          "Only serving drinks",
          "Passenger safety and emergency response",
          "Only making announcements",
          "Selling duty-free items"
        ],
        correctAnswer: 1,
        explanation: "Safety first! Flight attendants are trained in emergency procedures, first aid, evacuation, and security. Customer service is important, but safety is paramount. ✈️"
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 🎯 SECTION 10: ADVANCED & SPECIALIZED (Lessons 48-50)
  // ═══════════════════════════════════════════════════════════════

  {
    id: 48,
    title: "Career Spotlight: Veterinarian",
    description: "Care for animal health: diagnosis, surgery, preventive care, and the human-animal bond",
    videoUrl: "https://www.youtube.com/embed/vet-vid",
    career: "Healthcare",
    category: "Advanced",
    xpReward: 245,
    estimatedMinutes: 8,
    tags: ["veterinary", "animals", "medicine", "care"],
    quiz: [
      {
        id: 1,
        question: "What education is required to become a veterinarian?",
        options: [
          "High school diploma only",
          "Bachelor's degree + 4 years of veterinary school + licensing exam",
          "Online certification",
          "Apprenticeship with a vet"
        ],
        correctAnswer: 1,
        explanation: "Veterinarians complete rigorous training: undergraduate pre-vet courses, 4 years of veterinary school, and pass licensing exams. They're doctors for animals! 🐾🩺"
      }
    ]
  },

  {
    id: 49,
    title: "Career Spotlight: Architect",
    description: "Design spaces that inspire: blueprints, building codes, sustainability, and shaping the built environment",
    videoUrl: "https://www.youtube.com/embed/architect-vid",
    career: "Design",
    category: "Advanced",
    xpReward: 250,
    estimatedMinutes: 8,
    tags: ["architecture", "design", "buildings", "planning"],
    quiz: [
      {
        id: 1,
        question: "What do architects balance in their designs?",
        options: [
          "Only aesthetics",
          "Function, safety, aesthetics, and sustainability",
          "Only cost",
          "Only client preferences"
        ],
        correctAnswer: 1,
        explanation: "Great architecture balances beauty and function! Architects design spaces that are safe, functional, beautiful, and environmentally responsible. 🏛️🎨"
      }
    ]
  },

  {
    id: 50,
    title: "Career Spotlight: Your Future Path",
    description: "Bring it all together: synthesize your learning, create your action plan, and take the first step toward your dream career",
    videoUrl: "https://www.youtube.com/embed/future-vid",
    career: "Foundation",
    category: "Foundation",
    xpReward: 255,
    estimatedMinutes: 10,
    tags: ["planning", "action", "goals", "future"],
    quiz: [
      {
        id: 1,
        question: "What's the most important step after completing PathWise?",
        options: [
          "Forget everything you learned",
          "Take action: research, network, gain experience, and start your journey",
          "Wait for the perfect opportunity",
          "Only tell others about it"
        ],
        correctAnswer: 1,
        explanation: "Knowledge without action is just information! Use what you've learned: explore careers, talk to professionals, gain experience, and take that first step. Your future starts NOW! 🚀🌟"
      },
      {
        id: 2,
        question: "What makes a successful career journey?",
        options: [
          "Following someone else's path exactly",
          "Continuous learning, adaptability, and staying true to your values",
          "Never changing direction",
          "Only chasing money"
        ],
        correctAnswer: 1,
        explanation: "Careers are marathons, not sprints! Stay curious, keep learning, adapt to change, and align your work with your values. You've got this! 💪✨"
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────
// 🎮 MINI-GAMES (Unlocked after every 2-3 lessons)
// ─────────────────────────────────────────────────────────────────────
export const MINI_GAMES: MiniGame[] = [
  { 
    id: 1, 
    title: "Career Match Challenge", 
    type: "matching", 
    description: "Match skills to the right careers", 
    xpReward: 50,
    unlockAfterLesson: 3,
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
    unlockAfterLesson: 6,
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
    unlockAfterLesson: 10,
    gameData: {
      tasks: [
        { name: "Research career requirements", priority: "high" },
        { name: "Scroll social media", priority: "low" },
        { name: "Talk to someone in the field", priority: "high" },
        { name: "Update resume with relevant skills", priority: "medium" }
      ],
      timeLimit: 60
    }
  },
  { 
    id: 4, 
    title: "Skills Matcher", 
    type: "matching", 
    description: "Match careers to their key skills", 
    xpReward: 50,
    unlockAfterLesson: 15,
    gameData: {
      pairs: [
        { skill: "Diagnostic Skills", career: "Nurse" },
        { skill: "Data Analysis", career: "Data Scientist" },
        { skill: "Visual Design", career: "Graphic Designer" },
        { skill: "Financial Modeling", career: "Financial Analyst" },
        { skill: "Welding Techniques", career: "Welder" }
      ]
    }
  },
  { 
    id: 5, 
    title: "Industry Explorer", 
    type: "trivia", 
    description: "Quick facts about different industries", 
    xpReward: 50,
    unlockAfterLesson: 20,
    gameData: {
      questions: [
        { q: "Which industry is growing fastest?", a: ["Technology", "Agriculture", "Mining", "Textiles"], correct: 0 },
        { q: "What does STEM stand for?", a: ["Science, Tech, Engineering, Math", "Sports, Training, Education, Music", "Sales, Trade, Economics, Management"], correct: 0 },
        { q: "Which career requires most education?", a: ["Doctor", "Electrician", "Chef", "Artist"], correct: 0 }
      ],
      timeLimit: 45
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
export const getLessonsByCategory = (category: string) => 
  LESSONS.filter(l => l.category?.toLowerCase() === category.toLowerCase());
export const getLessonsByTag = (tag: string) => 
  LESSONS.filter(l => l.tags.includes(tag));