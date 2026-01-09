import express from "express"; import fetch from "node-fetch";

const app = express(); app.use(express.json());

// ---------------- MEMORY ---------------- let memory = { lastTopic: "" };

// ---------------- GREETINGS ---------------- const GREETINGS = { hi: "👋 Hi! Main Topper X hoon. Batao kis class aur subject me help chahiye?", hello: "Hello 😊 Padhai ya career guidance?", hey: "Hey! Ready to study smart? 📚", "hello bro": "Hello bro 😎 Aaj kya padhna hai?", "hello bhai": "Namaste bhai 🙏 Kis exam ki tayari?", namaste: "Namaste 🙏 Main tumhara study partner hoon.", "kya haal hai": "Bilkul badhiya 💪 Tum batao padhai kaisi chal rahi?", help: "Main notes, formulas, practice, motivation aur roadmaps deta hoon. Type: class 10 maths, neet roadmap, motivation", "good morning": "Good morning 🌞 Ready to crush your studies today?", "good night": "Good night 😴 Sweet dreams & study smart tomorrow!", "how are you": "Main mast hoon 😎 Tum batao padhai kaisi chal rahi?", "ready to study": "Haan bro 💪 Chal shuru karein!" };

// ---------------- MOTIVATION ---------------- const MOTIVATION = [ "Kill the comfort, let the champion be born.", "Discipline is choosing pain now to avoid pain later.", "Comfort creates cowards; struggle creates kings.", "No pain, no power.", "Average is the enemy.", "Suffer now, smile later.", "Hard work never betrays.", "Dreams need discipline, not excuses.", "Be consistent, not busy.", "Your future is created by what you do today.", "Push yourself, because no one else is going to do it for you.", "Success is earned, not given.", "Small daily improvements lead to stunning results.", "The harder you work, the luckier you get." ]; let motivationIndex = 0;

// ================= ROADMAPS =================

const ROADMAPS = {

  jee: {
    title: "JEE ROADMAP 🔥",
    duration: "2 Years",
    stages: [
      "Class 9–10: Basics (NCERT strong)",
      "Class 11: PCM Concepts + Daily Practice",
      "Class 12: Advanced Problems + Revision",
      "Mocks + PYQs (20 Years)"
    ],
    subjects: {
      physics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
      chemistry: ["Physical", "Organic", "Inorganic"],
      maths: ["Algebra", "Calculus", "Coordinate Geometry", "Vectors"]
    },
    result: "IIT / NIT / IIIT"
  },

  neet: {
    title: "NEET ROADMAP 🧬",
    duration: "2 Years",
    stages: [
      "Class 9–10 Biology Foundation",
      "Class 11 Bio + Physics + Chemistry",
      "Class 12 Completion + Revision",
      "Full Syllabus Mock Tests"
    ],
    subjects: {
      biology: ["Botany", "Zoology"],
      physics: ["Mechanics", "Waves", "Modern Physics"],
      chemistry: ["Physical", "Organic", "Inorganic"]
    },
    result: "MBBS / BDS / Medical Colleges"
  },

  nda: {
    title: "NDA ROADMAP 🪖",
    duration: "1–2 Years",
    stages: [
      "Class 10 Maths + English",
      "Class 11–12 PCM (basic)",
      "GAT Preparation",
      "SSB Interview + Physical Fitness"
    ],
    subjects: {
      maths: ["Algebra", "Trigonometry", "Mensuration"],
      gat: ["English", "GK", "History", "Geography", "Polity", "Science"],
      physical: ["Running", "Push-ups", "Stamina"]
    },
    result: "Indian Army / Navy / Air Force"
  },

  pcm: {
    title: "PCM ROADMAP 📘",
    duration: "Class 11–12",
    focus: [
      "NCERT Mastery",
      "Numerical Practice",
      "Conceptual Clarity",
      "Board Exam Excellence"
    ],
    result: "Boards + Competitive Exams"
  },

  btech: {
    title: "B-TECH ROADMAP 💻",
    duration: "4 Years",
    years: {
      year1: ["Engineering Maths", "Physics", "Programming"],
      year2: ["DSA", "OOPS", "Core Subjects"],
      year3: ["Projects", "Internships", "System Design"],
      year4: ["Placements", "Final Project"]
    },
    result: "Software Engineer / Core Engineer"
  },

  bed: {
    title: "B-ED ROADMAP 🎓",
    duration: "2 Years",
    focus: [
      "Teaching Methods",
      "Child Psychology",
      "Lesson Planning",
      "Internship (Teaching Practice)"
    ],
    result: "Government / Private Teacher"
  },

  ias: {
    title: "IAS ROADMAP 🇮🇳",
    duration: "3–4 Years",
    stages: [
      "NCERT (Class 6–12)",
      "Prelims (GS + CSAT)",
      "Mains (GS + Optional)",
      "Interview (Personality Test)"
    ],
    subjects: [
      "History",
      "Geography",
      "Polity",
      "Economy",
      "Ethics",
      "Current Affairs"
    ],
    result: "IAS Officer"
  },

  ips: {
    title: "IPS ROADMAP 🚓",
    duration: "3–4 Years",
    stages: [
      "UPSC Prelims",
      "UPSC Mains",
      "Interview",
      "Police Training"
    ],
    focus: [
      "Law",
      "Internal Security",
      "Physical Fitness",
      "Leadership"
    ],
    result: "IPS Officer"
  }

};

// ---------------- STUDY MATERIAL (CLASS 6–12) ---------------- 

const STUDY = {

  // ==================================================
  // CLASS 6
  // ==================================================
  "class 6 maths": {
    chapters: [
      "Knowing Our Numbers",
      "Whole Numbers",
      "Playing with Numbers",
      "Basic Geometry",
      "Integers",
      "Fractions",
      "Decimals",
      "Mensuration",
      "Data Handling"
    ],
    formulas: [
      "Addition = a + b",
      "Subtraction = a - b",
      "Multiplication = a * b",
      "Division = a / b",
      "LCM * HCF = product of numbers",
      "Perimeter rectangle = 2 * (l + b)",
      "Area rectangle = l * b",
      "Perimeter square = 4 * a",
      "Area square = a * a",
      "Fraction addition = (a/b + c/d) = (ad + bc)/bd",
      "Fraction subtraction = (a/b - c/d) = (ad - bc)/bd",
      "Decimal to fraction = value / 10^n",
      "Mean = sum / n"
    ]
  },

  // ==================================================
  // CLASS 7
  // ==================================================
  "class 7 maths": {
    chapters: [
      "Integers",
      "Fractions and Decimals",
      "Simple Equations",
      "Lines and Angles",
      "Triangles",
      "Congruence of Triangles",
      "Comparing Quantities",
      "Rational Numbers",
      "Perimeter and Area"
    ],
    formulas: [
      "Area triangle = (1/2) * b * h",
      "Perimeter circle = 2 * pi * r",
      "Area circle = pi * r * r",
      "Profit = SP - CP",
      "Loss = CP - SP",
      "Profit percent = (Profit / CP) * 100",
      "Loss percent = (Loss / CP) * 100",
      "Simple equation ax + b = c",
      "Complementary angles sum = 90",
      "Supplementary angles sum = 180",
      "Adjacent angles share a side"
    ]
  },

  // ==================================================
  // CLASS 8
  // ==================================================
  "class 8 maths": {
    chapters: [
      "Rational Numbers",
      "Linear Equations",
      "Quadrilaterals",
      "Squares and Square Roots",
      "Cubes and Cube Roots",
      "Mensuration",
      "Algebraic Expressions",
      "Factorisation",
      "Graphs"
    ],
    formulas: [
      "Square = a * a",
      "Cube = a * a * a",
      "Square root = sqrt(x)",
      "Cube root = cubert(x)",
      "Simple Interest = (P * R * T) / 100",
      "Compound Interest = P * (1 + R/100)^T",
      "Area trapezium = (1/2) * (a + b) * h",
      "Surface area cube = 6 * a * a",
      "Volume cube = a^3",
      "Linear equation ax + b = c"
    ]
  },

  // ==================================================
  // CLASS 9
  // ==================================================
  "class 9 maths": {
    chapters: [
      "Number Systems",
      "Polynomials",
      "Coordinate Geometry",
      "Linear Equations",
      "Triangles",
      "Quadrilaterals",
      "Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    formulas: [
      "(a + b)^2 = a^2 + 2ab + b^2",
      "(a - b)^2 = a^2 - 2ab + b^2",
      "a^2 - b^2 = (a - b)(a + b)",
      "Distance formula = sqrt((x2-x1)^2 + (y2-y1)^2)",
      "Midpoint = ((x1+x2)/2 , (y1+y2)/2)",
      "Area circle = pi * r * r",
      "Surface area cube = 6a^2",
      "Volume cube = a^3",
      "Mean = sum / n",
      "Probability = favorable / total"
    ]
  },

  // ==================================================
  // CLASS 10
  // ==================================================
  "class 10 maths": {
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Trigonometry",
      "Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    formulas: [
      "Quadratic equation ax^2 + bx + c = 0",
      "Discriminant D = b^2 - 4ac",
      "Roots = (-b +- sqrt(D)) / (2a)",
      "AP nth term = a + (n-1)d",
      "AP sum = n/2 * (2a + (n-1)d)",
      "sin A = opposite / hypotenuse",
      "cos A = base / hypotenuse",
      "tan A = opposite / base",
      "sin^2 A + cos^2 A = 1",
      "Area sector = (theta/360) * pi * r^2",
      "Mean = sum xi / n",
      "Mode = most frequent value",
      "Median = middle value"
    ]
  },

  // ==================================================
  // CLASS 11 (JEE FOUNDATION)
  // ==================================================
  "class 11 maths": {
    chapters: [
      "Sets",
      "Relations and Functions",
      "Trigonometric Functions",
      "Complex Numbers",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines",
      "Conic Sections",
      "Limits and Derivatives"
    ],
    formulas: [
      "nPr = n! / (n-r)!",
      "nCr = n! / (r! * (n-r)!)",
      "(a + b)^n binomial expansion",
      "i^2 = -1",
      "Modulus complex = sqrt(a^2 + b^2)",
      "Argument = tan inverse (b/a)",
      "Slope = (y2 - y1)/(x2 - x1)",
      "Equation line = y - y1 = m(x - x1)",
      "Limit basic rules",
      "Derivative x^n = n * x^(n-1)",
      "sin^2 x + cos^2 x = 1",
      "tan x = sin x / cos x"
    ]
  },

  // ==================================================
  // CLASS 12 (BOARD + JEE + NDA)
  // ==================================================
  "class 12 maths": {
    chapters: [
      "Relations and Functions",
      "Inverse Trigonometry",
      "Matrices",
      "Determinants",
      "Continuity",
      "Differentiability",
      "Applications of Derivatives",
      "Integrals",
      "Differential Equations",
      "Vector Algebra",
      "3D Geometry",
      "Linear Programming",
      "Probability"
    ],
    formulas: [
      "Determinant 2x2 = ad - bc",
      "Determinant 3x3 expansion",
      "Inverse matrix = adj(A)/det(A)",
      "Integration x^n = x^(n+1)/(n+1)",
      "Integration sin x = -cos x",
      "Integration cos x = sin x",
      "Integration e^x = e^x",
      "dy/dx rules",
      "Vector dot product = |a||b|cos theta",
      "Vector cross product magnitude = |a||b|sin theta",
      "Direction cosines l,m,n",
      "Probability = favorable / total outcomes",
      "Bayes theorem formula",
      "Mean of probability distribution = sum xi*pi"
    ]
  }

};
 
// ---------------- UTILITIES ---------------- function calculator(expr) { try { return "Result: " + eval(expr); } catch { return "Invalid expression 😅"; } }

function convertUnit(q) { const match = q.match(/(\d+.?\d*)\s*(kg|g|cm|m|km)\sto\s(kg|g|cm|m|km)/i); if (!match) return "Cannot parse conversion 😅";

const val = parseFloat(match[1]); const factor = { kg: 1000, g: 1, m: 1, cm: 0.01, km: 1000 }; return ${val} ${match[2]} = ${(val * factor[match[2]]) / factor[match[3]]} ${match[3]}; }

// ---------------- WIKIPEDIA (SILENT) ---------------- async function fetchFromWikipedia(query) { try { const url = https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json; const res = await fetch(url); const data = await res.json(); if (data.query.search.length > 0) { return According to Topper X:\n${data.query.search[0].snippet.replace(/<[^>]+>/g, "")}; } return "According to Topper X: No info found."; } catch { return "According to Topper X: Unable to fetch info."; } }

// ---------------- API ---------------- app.post("/ask", async (req, res) => { const q = req.body.q.toLowerCase();

if (q.includes("motivation")) return res.json({ ans: MOTIVATION[motivationIndex++ % MOTIVATION.length] });

for (let g in GREETINGS) if (q.includes(g)) return res.json({ ans: GREETINGS[g] });

for (let r in ROADMAPS) if (q.includes(r)) return res.json({ ans: ROADMAPS[r] });

for (let s in STUDY) if (q.includes(s)) { memory.lastTopic = s; return res.json({ ans: 📘 ${s.toUpperCase()}   Chapters: ${STUDY[s].chapters.join(", ")}   Formulas:   ${STUDY[s].formulas.join("\n")}   ${generatePractice(s)} }); }

if (q.match(/[0-9+-*/]/)) return res.json({ ans: calculator(q) }); if (q.includes(" to ")) return res.json({ ans: convertUnit(q) });

const 
// ----------- SERVER -----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Topper X Backend running on port ${PORT}`);
});
