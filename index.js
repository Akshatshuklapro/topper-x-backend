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
  "class 6 maths": {
    chapters: [
      "Knowing Our Numbers",
      "Whole Numbers",
      "Playing with Numbers",
      "Basic Geometrical Ideas",
      "Understanding Elementary Shapes",
      "Integers",
      "Fractions",
      "Decimals",
      "Mensuration",
      "Data Handling"
    ],
    formulas: [
      "Perimeter of rectangle = 2(l + b)",
      "Area of rectangle = l * b",
      "Perimeter of square = 4a",
      "Area of square = a^2"
    ],
    practice: {
      easy: [
        { q: "15 + 27", ans: "42" },
        { q: "100 - 45", ans: "55" }
      ],
      moderate: [
        { q: "Find perimeter of square of side 5 cm", ans: "20 cm" },
        { q: "Simplify 3/4 + 2/4", ans: "5/4" }
      ],
      hard: [
        { q: "Find area of rectangle with l=8, b=5", ans: "40 sq units" }
      ]
    }
  },

  "class 7 maths": {
    chapters: [
      "Integers",
      "Fractions and Decimals",
      "Data Handling",
      "Simple Equations",
      "Lines and Angles",
      "Triangles",
      "Congruence of Triangles",
      "Comparing Quantities",
      "Rational Numbers",
      "Perimeter and Area"
    ],
    formulas: [
      "Area of triangle = 1/2 * b * h",
      "Perimeter of circle = 2 * π * r",
      "Profit = SP - CP",
      "Loss = CP - SP"
    ],
    practice: {
      easy: [
        { q: "(-5) + 8", ans: "3" },
        { q: "Convert 0.75 into fraction", ans: "3/4" }
      ],
      moderate: [
        { q: "Solve 3x + 7 = 16", ans: "x = 3" },
        { q: "Find area of triangle b=10, h=6", ans: "30 sq units" }
      ],
      hard: [
        { q: "Find x if 5x - 9 = 16", ans: "x = 5" }
      ]
    }
  },

  "class 8 maths": {
    chapters: [
      "Rational Numbers",
      "Linear Equations in One Variable",
      "Understanding Quadrilaterals",
      "Practical Geometry",
      "Data Handling",
      "Squares and Square Roots",
      "Cubes and Cube Roots",
      "Comparing Quantities",
      "Mensuration",
      "Algebraic Expressions"
    ],
    formulas: [
      "Square of a number = a^2",
      "Cube of a number = a^3",
      "Simple Interest = (P * R * T) / 100",
      "Total surface area of cube = 6a^2"
    ],
    practice: {
      easy: [
        { q: "Find square of 12", ans: "144" },
        { q: "Find cube of 5", ans: "125" }
      ],
      moderate: [
        { q: "Solve 2x + 5 = 15", ans: "x = 5" },
        { q: "Find SI if P=1000, R=5, T=2", ans: "100" }
      ],
      hard: [
        { q: "Find x if 3x - 7 = 11", ans: "x = 6" }
      ]
    }
  },

  "class 9 maths": {
    chapters: [
      "Number Systems",
      "Polynomials",
      "Coordinate Geometry",
      "Linear Equations in Two Variables",
      "Introduction to Euclid Geometry",
      "Lines and Angles",
      "Triangles",
      "Quadrilaterals",
      "Areas of Parallelograms",
      "Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    formulas: [
      "(a + b)^2 = a^2 + 2ab + b^2",
      "(a - b)^2 = a^2 - 2ab + b^2",
      "Area of circle = πr^2",
      "Volume of cube = a^3"
    ],
    practice: {
      easy: [
        { q: "Evaluate (2 + 3)^2", ans: "25" },
        { q: "Find value of π (approx)", ans: "3.14" }
      ],
      moderate: [
        { q: "Solve 3x - 4 = 11", ans: "x = 5" },
        { q: "Find area of circle r=7", ans: "154 sq units" }
      ],
      hard: [
        { q: "Factorize x^2 + 7x + 10", ans: "(x+5)(x+2)" }
      ]
    }
  },
  
STUDY["class 10 maths"] = {
chapters: [
"Real Numbers",
"Polynomials",
"Pair of Linear Equations",
"Quadratic Equations",
"Arithmetic Progressions",
"Triangles",
"Circles",
"Trigonometry",
"Coordinate Geometry",
"Statistics",
"Probability"
],
formulas: [
"ax² + bx + c = 0",
"Discriminant D = b² − 4ac",
"sin²θ + cos²θ = 1",
"Area of circle = πr²",
"Mean = Σxi / n"
],
practice: {
easy: [
{ q: "Find D of x² − 5x + 6", ans: "D = 1" }
],
moderate: [
{ q: "Solve x² − 7x + 10 = 0", ans: "x = 5, 2" }
],
hard: [
{ q: "Find 10th term of AP: 2, 5, 8…", ans: "a₁₀ = 29" }
]
}
};

STUDY["class 11 maths"] = {
chapters: [
"Sets",
"Relations & Functions",
"Trigonometry",
"Complex Numbers",
"Permutations & Combinations",
"Binomial Theorem",
"Sequences & Series",
"Straight Lines",
"Limits & Derivatives"
],
formulas: [
"nCr = n! / r!(n−r)!",
"(a + b)ⁿ expansion",
"i² = −1",
"Slope m = (y₂−y₁)/(x₂−x₁)"
],
practice: {
easy: [
{ q: "Find 5C2", ans: "10" }
],
moderate: [
{ q: "Find slope between (2,3) and (4,7)", ans: "m = 2" }
],
hard: [
{ q: "Expand (x + 2)⁴", ans: "x⁴ + 8x³ + 24x² + 32x + 16" }
]
}
};

STUDY["class 12 maths"] = {
chapters: [
"Relations & Functions",
"Inverse Trigonometry",
"Matrices",
"Determinants",
"Continuity & Differentiability",
"Applications of Derivatives",
"Integrals",
"Differential Equations",
"Vector Algebra",
"3D Geometry",
"Linear Programming",
"Probability"
],
formulas: [
"|A| determinant",
"∫ xⁿ dx = xⁿ⁺¹/(n+1)",
"d/dx(sin x) = cos x",
"P(A) = n(A)/n(S)"
],
practice: {
easy: [
{ q: "Find determinant of [[1,2],[3,4]]", ans: "-2" }
],
moderate: [
{ q: "Differentiate x³ + 5x", ans: "3x² + 5" }
],
hard: [
{ q: "Solve dy/dx = x²", ans: "y = x³/3 + C" }
]
}
};

// ---------------- PRACTICE GENERATOR ---------------- function generatePractice(topic) { if (!STUDY[topic]) return "Practice not available.";

const s = STUDY[topic]; let out = "";

["easy", "moderate", "hard"].forEach(level => { out += \n--- ${level.toUpperCase()} ---\n; s.practice[level].forEach((p, i) => { out += Q${i + 1}: ${p.q}\nAns: ${p.ans}\n; }); });

return out; }

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
