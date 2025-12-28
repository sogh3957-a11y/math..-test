function getSets() {
  return [...document.querySelectorAll(".set-input")]
    .map(i => i.value.trim())
    .map(v => v ? v.split(".").map(Number) : []);
}

function calculate(op) {
  const sets = getSets();
  if (sets.length === 0) return [];

  if (op === "union")
    return [...new Set(sets.flat())];

  if (op === "intersect")
    return sets.reduce((a,b)=>a.filter(x=>b.includes(x)));

  if (op === "diff")
    return sets.reduce((a,b)=>a.filter(x=>!b.includes(x)));
}

document.querySelectorAll(".op-block").forEach(block => {
  const op = block.dataset.op;
  const input = block.querySelector(".answer-input");
  const btn = block.querySelector("button");

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const correct = calculate(op).sort((a,b)=>a-b).join(".");
      input.classList.remove("correct","wrong");
      input.classList.add(
        input.value.trim() === correct ? "correct" : "wrong"
      );
    }
  });

  btn.onclick = () => {
    input.value = calculate(op).sort((a,b)=>a-b).join(".");
    input.classList.remove("wrong");
  };
});
