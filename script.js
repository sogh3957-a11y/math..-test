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

// افزودن مجموعه جدید
document.getElementById("addSetBtn").addEventListener("click", () => {
  const nextLetter = getNextSetLetter();
  if (!nextLetter) return;

  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${nextLetter}:</label>
    <input type="text" class="set-input" placeholder="اعداد را با نقطه وارد کنید">
    <button class="remove-btn">×</button>
  `;
  document.getElementById("extraSets").appendChild(div);

  div.querySelector(".remove-btn").addEventListener("click", () => div.remove());

  const input = div.querySelector(".set-input");
  input.addEventListener("input", () => {
    const pos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(pos, pos);
  });
});

// جایگزینی پرانتز در مجموعه‌های اولیه
document.querySelectorAll(".set-input").forEach(input => {
  input.addEventListener("input", () => {
    const pos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(pos, pos);
  });
});

// گرفتن آرایه مجموعه‌ها
function getSets() {
  const inputs = document.querySelectorAll(".set-input");
  return Array.from(inputs).map(input => {
    let val = input.value.trim();
    val = val.replace(/\{/g, "(").replace(/\}/g, ")");
    return val ? val.split(".").map(Number) : [];
  });
}

// دکمه‌های عملیات
document.getElementById("unionBtn").onclick = () => showAnswerBox("union");
document.getElementById("interBtn").onclick = () => showAnswerBox("intersect");
document.getElementById("diffBtn").onclick = () => showAnswerBox("diff");

function showAnswerBox(op) {
  currentOperation = op;
  const answerSection = document.getElementById("answerSection");
  answerSection.classList.remove("hidden");
  const input = document.getElementById("userAnswer");
  input.value = "";
  input.classList.remove("wrong");
  input.style.backgroundColor = "";
  input.style.border = "";
  document.getElementById("correctAnswer").innerHTML = "";
}

// مرتب‌سازی و حذف تکراری (برای مقایسه بدون ترتیب)
function normalizeSet(arr) {
  return [...new Set(arr.map(Number))].sort((a, b) => a - b);
}

// مقایسه دو مجموعه بدون توجه به ترتیب
function setsAreEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

// بررسی جواب و نمایش رنگ
document.getElementById("checkBtn").onclick = checkAnswer;

function checkAnswer() {
  const sets = getSets();
  let result = [];

  if (currentOperation === "union") {
    result = normalizeSet(sets.flat());
  } else if (currentOperation === "intersect") {
    result = sets.length
      ? normalizeSet(sets.reduce((a, b) => a.filter(x => b.includes(x))))
      : [];
  } else if (currentOperation === "diff") {
    result = sets.length
      ? normalizeSet(sets.reduce((a, b) => a.filter(x => !b.includes(x))))
      : [];
  }

  const inputEl = document.getElementById("userAnswer");
  const userInput = inputEl.value.trim();
  const userSet = userInput ? normalizeSet(userInput.split(".").map(Number)) : [];

  const isCorrect = setsAreEqual(result, userSet);

  // ریست رنگ
  inputEl.classList.remove("wrong");
  inputEl.style.backgroundColor = "";
  inputEl.style.border = "";

  if (isCorrect) {
    inputEl.style.backgroundColor = "#d4edda"; // سبز
    inputEl.style.border = "2px solid #28a745";
    document.getElementById("correctAnswer").innerHTML = "✔ جواب صحیح است";
  } else {
    inputEl.classList.add("wrong"); // قرمز کلاس CSS
    document.getElementById("correctAnswer").innerHTML =
      "جواب درست: " + result.join(".");
  }

  // پاک کردن رنگ بعد از ۲ ثانیه
  setTimeout(() => {
    inputEl.classList.remove("wrong");
    inputEl.style.backgroundColor = "";
    inputEl.style.border = "";
  }, 2000);
}
