function parseSet(input) {
  // حذف کاراکترهای غیر مجاز و فضاها
  const cleaned = input.replace(/[^\da-zA-Z,]/g, "").replace(/\s+/g, "");
  if (!cleaned) return null;
  return new Set(cleaned.split(",").filter(x => x !== ""));
}

function displayResult(res) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "نتیجه مخفی است. برای مشاهده، روی دکمه زیر کلیک کنید.";
  const showBtn = document.createElement("button");
  showBtn.textContent = "نمایش جواب";
  showBtn.onclick = () => { resultDiv.textContent = Array.from(res).join(", "); };
  resultDiv.innerHTML = "";
  resultDiv.appendChild(showBtn);
}

function showAlert(msg) {
  const alertDiv = document.getElementById("alert");
  alertDiv.textContent = msg;
  setTimeout(() => { alertDiv.textContent = ""; }, 3000);
}

function calculateUnion() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);
  if (!setA || !setB) return showAlert("لطفاً فقط اعداد یا حروف انگلیسی وارد کنید.");
  const union = new Set([...setA, ...setB]);
  displayResult(union);
}

function calculateIntersection() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);
  if (!setA || !setB) return showAlert("لطفاً فقط اعداد یا حروف انگلیسی وارد کنید.");
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  displayResult(intersection);
}

function calculateDifference() {
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);
  if (!setA || !setB) return showAlert("لطفاً فقط اعداد یا حروف انگلیسی وارد کنید.");
  const difference = new Set([...setA].filter(x => !setB.has(x)));
  displayResult(difference);
}
