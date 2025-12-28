/***********************
  بخش 1: افزودن مجموعه‌ها
************************/

const MAX_SET = "Z".charCodeAt(0);

function getNextSetLetter() {
  const labels = document.querySelectorAll(".set-row label");
  let usedCodes = [];

  labels.forEach(label => {
    const letter = label.textContent
      .replace("مجموعه", "")
      .replace(":", "")
      .trim();

    if (letter.length === 1 && letter >= "A" && letter <= "Z") {
      usedCodes.push(letter.charCodeAt(0));
    }
  });

  if (usedCodes.length === 0) return "C";

  const nextCode = Math.max(...usedCodes) + 1;
  if (nextCode > MAX_SET) return null;

  return String.fromCharCode(nextCode);
}

document.getElementById("addSetBtn").addEventListener("click", () => {
  const nextLetter = getNextSetLetter();
  if (!nextLetter) return;

  const row = document.createElement("div");
  row.className = "set-row";

  row.innerHTML = `
    <label>مجموعه ${nextLetter}:</label>
    <input type="text" class="set-input">
    <button class="remove-btn">×</button>
  `;

  document.getElementById("extraSets").appendChild(row);

  row.querySelector(".remove-btn").addEventListener("click", () => {
    row.remove();
  });
});


/***********************
  بخش 2: گرفتن مجموعه‌ها
************************/

function getSets() {
  const inputs = document.querySelectorAll(".set-input");
  let sets = [];

  inputs.forEach(input => {
    const value = input.value.trim();
    if (value === "") {
      sets.push([]);
    } else {
      sets.push(value.split(".").map(Number));
    }
  });

  return sets;
}


/*************************
  بخش 3: محاسبات ریاضی
**************************/

function calculateResult(operation) {
  const sets = getSets();
  if (sets.length === 0) return [];

  let result = [];

  if (operation === "union") {
    result = [...new Set(sets.flat())];
  }

  if (operation === "intersect") {
    result = sets.reduce((a, b) =>
      a.filter(x => b.includes(x))
    );
  }

  if (operation === "diff") {
    result = sets.reduce((a, b) =>
      a.filter(x => !b.includes(x))
    );
  }

  return result.sort((a, b) => a - b);
}


/****************************************
  بخش 4: رفتار هر عملیات (کاملاً مستقل)
*****************************************/

document.querySelectorAll(".op-block").forEach(block => {
  const operation = block.dataset.op;
  const input = block.querySelector(".answer-input");
  const button = block.querySelector("button");

  // Enter → بررسی جواب
  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;

    const correctAnswer = calculateResult(operation).join(".");
    const userAnswer = input.value.trim();

    input.classList.remove("correct", "wrong");

    if (userAnswer === correctAnswer) {
      input.classList.add("correct");
    } else {
      input.classList.add("wrong");
    }
  });

  // دکمه → نمایش جواب درست
  button.addEventListener("click", () => {
    input.value = calculateResult(operation).join(".");
    input.classList.remove("wrong");
    input.classList.add("correct");
  });
});
