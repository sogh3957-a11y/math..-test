let nextSetLetter = "C"; 
let currentOperation = "";
const MAX_SET = "Z".charCodeAt(0);

// افزودن مجموعه جدید بالای دکمه +
document.getElementById("addSetBtn").addEventListener("click", () => {
  if (nextSetLetter.charCodeAt(0) > MAX_SET) return; // محدودیت تا Z

  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${nextSetLetter}:</label>
    <input type="text" class="set-input" id="set${nextSetLetter}" placeholder="اعداد را با نقطه وارد کنید">
    <button class="remove-btn">×</button>
  `;
  const extraSetsDiv = document.getElementById("extraSets");
  extraSetsDiv.prepend(div);

  // دکمه حذف مجموعه
  div.querySelector(".remove-btn").addEventListener("click", () => {
    div.remove();
  });

  // listener برای پرانتز → نمایش اکولاد
  const input = div.querySelector(".set-input");
  input.addEventListener("input", () => {
    const cursorPos = input.selectionStart;
    input.value = input.value.replace(/\(/g, "{").replace(/\)/g, "}");
    input.setSelectionRange(cursorPos, cursorPos);
  });

  nextSetLetter = String.fromCharCode(nextSetLetter.charCodeAt(0) + 1);
});

// اعمال listener روی مجموعه‌های اولیه برای پرانتز → اکولاد
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

// کلیک روی دکمه‌های عملیات
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
    finalResult = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => b.includes(x))) : [];
  } else if (currentOperation === "diff") {
    finalResult = sets.length > 0 ? sets.reduce((a, b) => a.filter(x => !b.includes(x))) : [];
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
