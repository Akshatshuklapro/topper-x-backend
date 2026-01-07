import express from "express"; import fetch from "node-fetch";

const app = express(); app.use(express.json());

// ---------------- MEMORY ---------------- let memory = { lastTopic: "" };

// ---------------- GREETINGS ---------------- const GREETINGS = { hi: "👋 Hi! Main Topper X hoon. Batao kis class aur subject me help chahiye?", hello: "Hello 😊 Padhai ya career guidance?", hey: "Hey! Ready to study smart? 📚", "hello bro": "Hello bro 😎 Aaj kya padhna hai?", "hello bhai": "Namaste bhai 🙏 Kis exam ki tayari?", namaste: "Namaste 🙏 Main tumhara study partner hoon.", "kya haal hai": "Bilkul badhiya 💪 Tum batao padhai kaisi chal rahi?", help: "Main notes, formulas, practice, motivation aur roadmaps deta hoon. Type: class 10 maths, neet roadmap, motivation", "good morning": "Good morning 🌞 Ready to crush your studies today?", "good night": "Good night 😴 Sweet dreams & study smart tomorrow!", "how are you": "Main mast hoon 😎 Tum batao padhai kaisi chal rahi?", "ready to study": "Haan bro 💪 Chal shuru karein!" };

// ---------------- MOTIVATION ---------------- const MOTIVATION = [ "Kill the comfort, let the champion be born.", "Discipline is choosing pain now to avoid pain later.", "Comfort creates cowards; struggle creates kings.", "No pain, no power.", "Average is the enemy.", "Suffer now, smile later.", "Hard work never betrays.", "Dreams need discipline, not excuses.", "Be consistent, not busy.", "Your future is created by what you do today.", "Push yourself, because no one else is going to do it for you.", "Success is earned, not given.", "Small daily improvements lead to stunning results.", "The harder you work, the luckier you get." ]; let motivationIndex = 0;

// ---------------- ROADMAPS ---------------- const ROADMAPS = { neet: NEET ROADMAP 🔥   Class 9–10: NCERT strong   Class 11: PCB advanced concepts   Class 12: Deep NCERT revision + mocks   Result: MBBS/BDS,

jee: JEE ROADMAP 🔥   Class 9–10: PCM basics   Class 11–12: Advanced PCM   Result: IIT/NIT/IIIT,

nda: NDA ROADMAP 🔥   Maths + GAT + English   Written + SSB + Fitness,

ias: IAS ROADMAP 🔥   NCERT 6–12   Prelims → Mains → Interview,

ssc: SSC ROADMAP 🔥   Quant + Reasoning + English + GK,

banking: BANKING ROADMAP 🔥   Quant + Reasoning + English + GK,

aiims: AIIMS ROADMAP 🔥   PCB strong + test series,

iit: IIT ROADMAP 🔥   JEE Main + Advanced };

// ---------------- STUDY MATERIAL (CLASS 6–12) ---------------- const STUDY = { "class 6 maths": { chapters: ["Numbers", "Algebra Basics", "Geometry", "Fractions", "Decimals"], formulas: ["Area = l × b", "Perimeter of square = 4a"], practice: { easy: [{ q: "2 + 3", ans: "5" }], moderate: [{ q: "5x + 3 = 18", ans: "x = 3" }], hard: [{ q: "Factorize x² + 5x + 6", ans: "(x+2)(x+3)" }] } },

"class 7 maths": { chapters: ["Integers", "Algebra", "Triangles", "Circles"], formulas: ["½ × b × h", "2πr"], practice: { easy: [{ q: "7 + 8", ans: "15" }], moderate: [{ q: "3x + 7 = 16", ans: "x = 3" }], hard: [{ q: "x² + 7x + 12", ans: "(x+3)(x+4)" }] } },

"class 8 maths": { chapters: ["Rational Numbers", "Linear Equations", "Mensuration"], formulas: ["6a²", "a³"], practice: { easy: [{ q: "2 + 2", ans: "4" }], moderate: [{ q: "2x + 5 = 15", ans: "x = 5" }], hard: [{ q: "x² + 5x + 6", ans: "(x+2)(x+3)" }] } },

"class 9 maths": { chapters: ["Polynomials", "Triangles", "Probability"], formulas: ["(a+b)²"], practice: { easy: [{ q: "3 + 4", ans: "7" }], moderate: [{ q: "3x − 4 = 11", ans: "x = 5" }], hard: [{ q: "x² + 7x + 10", ans: "(x+5)(x+2)" }] } } };

// ---------------- CLASS 10–12 ADDITION ----------------

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

const wiki = await fetchFromWikipedia(q); res.json({ ans: wiki }); });

// ---------------- SERVER ---------------- app.listen(5000, () => console.log("🔥 Topper X Ultra Backend running on http://localhost:5000") );
