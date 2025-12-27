let MAX_SET = "Z".charCodeAt(0);

function getNextSetLetter() {
  const labels = document.querySelectorAll(".set-row label");
  let usedLetters = [];
  labels.forEach(label => {
    const letter = label.textContent.trim().replace("مجموعه ", "").replace(":", "").trim();
    if (letter && letter.length === 1 && letter >= 'A' && letter <= 'Z') {
      usedLetters.push(letter.charCodeAt(0));
    }
  });
  if (usedLetters.length === 0) return 'C';
  const maxCode = Math.max(...usedLetters);
  const nextCode = maxCode + 1;
  if (nextCode > MAX_SET) return null;
  return String.fromCharCode(nextCode);
}

// افزودن مجموعه جدید
document.getElementById("addSetBtn").addEventListener("click", () => {
  const nextLetter = getNextSetLetter();
  if (!nextLetter) return;

  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${nextLetter}:</label>
    <input type="text" class="set-input" id="set${nextLetter}" placeholder="اعداد را با نقطه وارد کنید">
    <button class="remove-btn">×</button>
  `;
  document.getElementById("extraSets").append(div);

  div.querySelector(".remove-btn").addEventListener("click", () => div.remove());

  const input = div.querySelector(".set-input");
  input.addEventListener("input", () => {
    const pos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(pos, pos);
  });
});

// مجموعه‌های اولیه A و B
document.querySelectorAll(".set-input").forEach(input => {
  input.addEventListener("input", () => {
    const pos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(pos, pos);
  });
});

// استخراج مجموعه‌ها
function getSets() {
  const inputs = document.querySelectorAll(".set-input");
  const sets = [];
  inputs.forEach(input => {
    let val = input.value.trim().replace(/\{/g, "(").replace(/\}/g, ")");
    let arr = val ? val.split(".").map(Number) : [];
    sets.push(arr);
  });
  return sets;
}

// عملیات‌ها
const operations = {
  union: { btn: "unionBtn", answer: "unionAnswer" },
  intersect: { btn: "interBtn", answer: "interAnswer" },
  diff: { btn: "diffBtn", answer: "diffAnswer" },
};

Object.keys(operations).forEach(op => {
  const btn = document.getElementById(operations[op].btn);
  const input = document.getElementById(operations[op].answer);

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") checkAnswer(op);
  });

  btn.addEventListener("click", () => showCorrect(op));
});

function checkAnswer(op) {
  const sets = getSets();
  let result = [];

  if (op === "union") result = [...new Set(sets.flat())];
  else if (op === "intersect") result = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => b.includes(x))) : [];
  else if (op === "diff") result = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => !b.includes(x))) : [];

  result.sort((a, b) => a - b);
  const correct = result.join(".");
  const input = document.getElementById(operations[op].answer);
  const userVal = input.value.trim();

  if (userVal === correct) {
    input.classList.remove("wrong");
    input.classList.add("correct");
  } else {
    input.classList.remove("correct");
    input.classList.add("wrong");
    setTimeout(() => input.classList.remove("wrong"), 2000);
  }
}

// نمایش جواب صحیح
function showCorrect(op) {
  const sets = getSets();
  let result = [];

  if (op === "union") result = [...new Set(sets.flat())];
  else if (op === "intersect") result = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => b.includes(x))) : [];
  else if (op === "diff") result = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => !b.includes(x))) : [];

  result.sort((a, b) => a - b);
  const correct = result.join(".");
  const input = document.getElementById(operations[op].answer);
  input.value = correct;
  input.classList.remove("wrong");
  input.classList.add("correct");
}
