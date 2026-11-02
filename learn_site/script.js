// script.js – Enhanced data handling & curriculum UI
const STORAGE_KEY = "outlierPrep";

// ---------- Local storage helpers ----------
const loadData = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { progress: {}, flashcards: [] };
};
const saveData = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// ---------- Curriculum rendering ----------
/** Render the full 28‑day schedule as a collapsible list. */
function renderCurriculum(curr) {
  const container = document.getElementById("content");
  const html = [];
  html.push('<h2>Outlier AI 28‑Day Intensive Curriculum</h2>');
  curr.weeks.forEach((week) => {
    html.push(
      `<details open><summary><strong>Week ${week.week} – ${week.objective}</strong></summary>`
    );
    week.days.forEach((day) => {
      const dayId = `week${week.week}-day${day.day}`;
      html.push(
        `<div class="day" id="${dayId}" style="margin-left:1.5rem;margin-top:0.5rem;">
          <strong>Day ${day.day}:</strong> ${day.title}<br/>
          <em>${day.activities}</em>
        </div>`
      );
    });
    html.push('</details>');
  });
  container.innerHTML = html.join("\n");
}

/** Load curriculum JSON and render it. */
function loadCurriculum() {
  fetch("curriculum.json")
    .then((r) => r.json())
    .then(renderCurriculum)
    .catch(() => {
      document.getElementById("content").innerHTML =
        "<p>⚠️ Curriculum data not found. Ensure <code>curriculum.json</code> is in the same folder.</p>";
    });
}

// ---------- Simple flash‑card UI (optional) ----------
function addFlashcard(term, definition) {
  const data = loadData();
  data.flashcards.push({ term, definition });
  saveData(data);
  alert(`Flashcard "${term}" saved.`);
}

function listFlashcards() {
  const data = loadData();
  if (!data.flashcards.length) return alert("No flashcards saved.");
  const list = data.flashcards
    .map((c) => `${c.term}: ${c.definition}`)
    .join("\n");
  alert(list);
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", loadCurriculum);

// Expose optional helpers to the console for quick testing
window.outlier = { addFlashcard, listFlashcards };
