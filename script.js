let currentOperation = "";
const MAX_SET = "Z".charCodeAt(0);

// گرفتن حرف مجموعه بعدی
function getNextSetLetter() {
  const labels = document.querySelectorAll(".set-row label");
  let usedLetters = [];

  labels.forEach(label => {
    const letter = label.textContent.trim()
      .replace("مجموعه ", "")
      .replace(":", "")
      .trim();

    if (letter && letter.length === 1 && letter >= "A" && letter <= "Z") {
      usedLetters.push(letter.charCodeAt(0));
    }
  });

  if (usedLetters.length === 0) return "C";

  const nextCode = Math.max(...usedLetters) + 1;
  if (nextCode > MAX_SET) return null;

  return String.fromCharCode(nextCode);
}

// افزودن مجموعه جدید (پایینِ قبلی‌ها)
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

  document.getElementById("extraSets").appendChild(div);

  div.querySelector(".remove-btn").addEventListener("click", () => {
    div.remove();
  });

  const input = div.querySelector(".set-input");
  input.addEventListener("input", () => {
    const pos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(pos, pos);
  });
});

// جایگزینی پرانتز در A و B
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
  return Array.from(inputs).map(input => {
    let val = input.value.trim();
    val = val.replace(/\{/g, "(").replace(/\}/g, ")");
    return val ? val.split(".").map(Number) : [];
  });
}

// دکمه‌ها
document.getElementById("unionBtn").onclick = () => showAnswerBox("union");
document.getElementById("interBtn").onclick = () => showAnswerBox("intersect");
document.getElementById("diffBtn").onclick = () => showAnswerBox("diff");

function showAnswerBox(op) {
  currentOperation = op;
  document.getElementById("answerSection").classList.remove("hidden");
  document.getElementById("userAnswer").value = "";
  document.getElementById("userAnswer").classList.remove("wrong", "correct");
  document.getElementById("correctAnswer").innerHTML = "";
}

// مقایسه‌ی مجموعه‌ای (بدون ترتیب)
function normalizeSet(arr) {
  return [...new Set(arr.map(Number))].sort((a, b) => a - b);
}

function setsAreEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

// بررسی جواب
document.getElementById("checkBtn").onclick = checkAnswer;

function checkAnswer() {
  const sets = getSets();
  let result = [];

  if (currentOperation === "union") {
    result = normalizeSet(sets.flat());
  }

  if (currentOperation === "intersect") {
    result = sets.length
      ? normalizeSet(sets.reduce((a, b) => a.filter(x => b.includes(x))))
      : [];
  }

  if (currentOperation === "diff") {
    result = sets.length
      ? normalizeSet(sets.reduce((a, b) => a.filter(x => !b.includes(x))))
      : [];
  }

  const userInput = document.getElementById("userAnswer").value.trim();
  const userSet = userInput
    ? normalizeSet(userInput.split(".").map(Number))
    : [];

  const isCorrect = setsAreEqual(result, userSet);

  const answerBox = document.getElementById("userAnswer");

  answerBox.classList.remove("wrong", "correct");

  if (isCorrect) {
    answerBox.classList.add("correct");
    document.getElementById("correctAnswer").innerHTML = "✔ جواب صحیح است";
  } else {
    answerBox.classList.add("wrong");
    document.getElementById("correctAnswer").innerHTML =
      "جواب درست: " + result.join(".");
  }

  // رنگ فقط ۲ ثانیه بماند
  setTimeout(() => {
    answerBox.classList.remove("wrong", "correct");
  }, 2000);
}
