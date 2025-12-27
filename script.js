let currentOperation = "";
const MAX_SET = "Z".charCodeAt(0);

// تابع برای محاسبه حرف بعدی بر اساس مجموعه‌های موجود
function getNextSetLetter() {
  // تمام labelها رو بگیر (A, B, و extraها)
  const labels = document.querySelectorAll(".set-row label");
  let usedLetters = [];
  
  labels.forEach(label => {
    // استخراج حرف از متن label (مثل "مجموعه X:" → 'X')
    const letter = label.textContent.trim().replace("مجموعه ", "").replace(":", "").trim();
    if (letter && letter.length === 1 && letter >= 'A' && letter <= 'Z') {
      usedLetters.push(letter.charCodeAt(0));
    }
  });
  
  // اگر هیچ حرفی نبود (که نباید باشه، چون حداقل A هست)، از 'C' شروع کن
  if (usedLetters.length === 0) return 'C';
  
  // بیشترین کد اسکی رو پیدا کن و +1 کن
  const maxCode = Math.max(...usedLetters);
  const nextCode = maxCode + 1;
  
  // چک محدودیت Z
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
  
  const extraSetsDiv = document.getElementById("extraSets");
  extraSetsDiv.append(div); // ⬅️ اصلاح اصلی: append به‌جای prepend
  
  // دکمه حذف مجموعه
  div.querySelector(".remove-btn").addEventListener("click", () => {
    div.remove();
  });
  
  // listener برای پرانتز → اکولاد
  const input = div.querySelector(".set-input");
  input.addEventListener("input", () => {
    const cursorPos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(cursorPos, cursorPos);
  });
});

// listener برای مجموعه‌های اولیه (A و B)
document.querySelectorAll(".set-input").forEach(input => {
  input.addEventListener("input", () => {
    const cursorPos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(cursorPos, cursorPos);
  });
});

// استخراج مجموعه‌ها و تبدیل {} به () برای پردازش
function getSets() {
  let inputs = document.querySelectorAll(".set-input");
  let sets = [];
  
  inputs.forEach(input => {
    let val = input.value.trim();
    val = val.replace(/\{/g, "(").replace(/\}/g, ")");
    let arr = val ? val.split(".").map(Number) : [];
    sets.push(arr);
  });
  
  return sets;
}

// دکمه‌های عملیات
document.getElementById("unionBtn").onclick = () => showAnswerBox("union");
document.getElementById("interBtn").onclick = () => showAnswerBox("intersect");
document.getElementById("diffBtn").onclick = () => showAnswerBox("diff");

function showAnswerBox(op) {
  currentOperation = op;
  document.getElementById("answerSection").classList.remove("hidden");
  document.getElementById("userAnswer").value = "";
  document.getElementById("userAnswer").classList.remove("wrong");
  document.getElementById("correctAnswer").innerHTML = "";
}

// بررسی جواب
document.getElementById("checkBtn").onclick = checkAnswer;

function checkAnswer() {
  let sets = getSets();
  let finalResult;
  
  if (currentOperation === "union") {
    finalResult = [...new Set(sets.flat())];
  } else if (currentOperation === "intersect") {
    finalResult = sets.length > 0
      ? sets.reduce((a, b) => a.filter(x => b.includes(x)))
      : [];
  } else if (currentOperation === "diff") {
    finalResult = sets.length > 0
      ? sets.reduce((a, b) => a.filter(x => !b.includes(x)))
      : [];
  }
  
  finalResult.sort((a, b) => a - b);
  let correct = finalResult.join(".");
  let user = document.getElementById("userAnswer").value.trim();
  
  if (user === correct) {
    document.getElementById("userAnswer").classList.remove("wrong");
    document.getElementById("correctAnswer").innerHTML = "✔ جواب صحیح است";
  } else {
    document.getElementById("userAnswer").classList.add("wrong");
    document.getElementById("correctAnswer").innerHTML = "جواب درست: " + correct;
  }
}
