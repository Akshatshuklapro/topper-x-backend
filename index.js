import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ---------------- GREETINGS ----------------
const GREETINGS = {
  hi: "👋 Hi! Main Topper X hoon. Batao kis class aur subject me help chahiye?",
  hello: "Hello 😊 Padhai ya career guidance?",
  hey: "Hey! Ready to study smart? 📚",
};

// ---------------- MOTIVATION ----------------
const MOTIVATION = [
  "Kill the comfort, let the champion be born.",
  "Discipline is choosing pain now to avoid pain later.",
  "Comfort creates cowards; struggle creates kings."
];
let motivationIndex = 0;

// ---------------- STUDY SAMPLE ----------------
const STUDY = {
  "class 10 maths": {
    chapters: ["Real Numbers", "Polynomials", "Quadratic Equations"],
    formulas: ["ax^2 + bx + c = 0", "D = b^2 - 4ac"]
  }
};

// ---------------- WIKIPEDIA FETCH ----------------
async function fetchFromWikipedia(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.query.search.length > 0) {
      // Wikipedia snippet me HTML tags remove karke return karenge
      const snippet = data.query.search[0].snippet.replace(/<[^>]+>/g, "");
      return `According to Wikipedia:\n${snippet}...`;
    }
    return "According to Wikipedia: No info found.";
  } catch {
    return "According to Wikipedia: Unable to fetch info.";
  }
}

// ---------------- API ----------------
app.post("/ask", async (req, res) => {
  const q = req.body.q.toLowerCase();

  // Motivation request
  if (q.includes("motivation")) {
    return res.json({ ans: MOTIVATION[motivationIndex++ % MOTIVATION.length] });
  }

  // Greetings
  for (let g in GREETINGS) if (q.includes(g)) return res.json({ ans: GREETINGS[g] });

  // Study topics
  for (let s in STUDY) if (q.includes(s)) {
    return res.json({ ans: `📘 ${s.toUpperCase()}\nChapters: ${STUDY[s].chapters.join(", ")}\nFormulas: ${STUDY[s].formulas.join("\n")}` });
  }

  // If no known topic -> Wikipedia fetch
  const wikiAnswer = await fetchFromWikipedia(q);
  return res.json({ ans: wikiAnswer });
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Topper X Backend running on port ${PORT}`);
});
