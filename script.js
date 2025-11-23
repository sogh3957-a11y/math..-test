let nextSetLetter = "C";

// افزودن مجموعه جدید
document.getElementById("addSetBtn").addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "set-row";
  div.innerHTML = `
    <label>مجموعه ${nextSetLetter}:</label>
    <input type="text" class="set-input" id="set${nextSetLetter}" placeholder="اعداد را با نقطه وارد کنید">
  `;
  document.getElementById("extraSets").appendChild(div);

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

// پنل احتمال
function setupProbPanel() {
  const nAInput = document.getElementById("nA");
  const nBInput = document.getElementById("nB");
  const feedback = document.getElementById("feedback");

  function checkInput(e) {
    if (e.key === "Enter") {
      let nA = parseInt(nAInput.value);
      let nB = parseInt(nBInput.value);

      // تعداد اعضای واقعی مجموعه‌ها
      let correctNA = getSets()[0].length;
      let correctNB = getSets()[1].length;

      if (nA !== correctNA || nB !== correctNB) {
        feedback.textContent = `جواب اشتباه است!`;
        feedback.classList.add("wrong");
        setTimeout(() => {
          feedback.classList.remove("wrong");
          feedback.textContent = `جواب درست: n(A)=${correctNA}, n(B)=${correctNB}`;
        }, 2000);
      } else {
        feedback.textContent = "✔ جواب صحیح است";
        feedback.classList.add("correct");
        setTimeout(() => feedback.classList.remove("correct"), 2000);
      }
    }
  }

  nAInput.addEventListener("keydown", checkInput);
  nBInput.addEventListener("keydown", checkInput);
}

setupProbPanel();
