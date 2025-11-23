let nextSetLetter = "C"; 
let currentOperation = "";

// افزودن مجموعه جدید بالای دکمه +
document.getElementById("addSetBtn").addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${nextSetLetter}:</label>
    <input type="text" class="set-input" id="set${nextSetLetter}" placeholder="اعداد را با نقطه وارد کنید">
  `;
  const extraSetsDiv = document.getElementById("extraSets");
  extraSetsDiv.prepend(div);
  nextSetLetter = String.fromCharCode(nextSetLetter.charCodeAt(0) + 1);
});

// استخراج مجموعه‌ها
function getSets() {
  let inputs = document.querySelectorAll(".set-input");
  let sets = [];
  inputs.forEach(input => {
    let arr = input.value.trim() ? input.value.split(".").map(Number) : [];
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
    if (sets.length > 0) {
      finalResult = sets.reduce((a, b) => a.filter(x => b.includes(x)));
    } else {
      finalResult = [];
    }
  } else if (currentOperation === "diff") {
    if (sets.length > 0) {
      finalResult = sets.reduce((a, b) => a.filter(x => !b.includes(x)));
    } else {
      finalResult = [];
    }
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
