let currentOperation = "";
const MAX_SET = "Z".charCodeAt(0);

/* گرفتن حرف بعدی */
function getNextSetLetter() {
  const labels = document.querySelectorAll(".set-row label");
  let used = [];

  labels.forEach(l => {
    const ch = l.textContent.replace("مجموعه", "").replace(":", "").trim();
    if (ch >= "A" && ch <= "Z") used.push(ch.charCodeAt(0));
  });

  if (used.length === 0) return "C";
  const next = Math.max(...used) + 1;
  if (next > MAX_SET) return null;
  return String.fromCharCode(next);
}

/* اضافه کردن مجموعه */
document.getElementById("addSetBtn").onclick = () => {
  const letter = getNextSetLetter();
  if (!letter) return;

  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${letter}:</label>
    <input type="text" class="set-input">
    <button class="remove-btn">×</button>
  `;

  document.getElementById("extraSets").appendChild(div);

  div.querySelector(".remove-btn").onclick = () => div.remove();
};

/* گرفتن مجموعه‌ها */
function getSets() {
  return [...document.querySelectorAll(".set-input")].map(i =>
    i.value ? i.value.split(".").map(Number) : []
  );
}

/* کلیک روی عملیات */
document.querySelectorAll(".op-btn").forEach(btn => {
  btn.onclick = () => {
    currentOperation = btn.dataset.op;
    showCorrectAnswer();
  };
});

/* Enter برای بررسی */
document.getElementById("answerBox").addEventListener("keydown", e => {
  if (e.key === "Enter") checkAnswer();
});

function calculate() {
  const sets = getSets();
  let res = [];

  if (currentOperation === "union")
    res = [...new Set(sets.flat())];
  if (currentOperation === "intersect")
    res = sets.reduce((a,b) => a.filter(x => b.includes(x)));
  if (currentOperation === "diff")
    res = sets.reduce((a,b) => a.filter(x => !b.includes(x)));

  return res.sort((a,b) => a-b).join(".");
}

function checkAnswer() {
  const box = document.getElementById("answerBox");
  const correct = calculate();

  box.classList.remove("correct","wrong");

  if (box.value.trim() === correct) {
    box.classList.add("correct");
  } else {
    box.classList.add("wrong");
  }
}

function showCorrectAnswer() {
  const box = document.getElementById("answerBox");
  box.value = calculate();
  box.classList.remove("wrong");
}
