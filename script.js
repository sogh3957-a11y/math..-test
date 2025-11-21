function parseSet(input) {
  if (!input.trim()) return [];

  // جدا کردن عناصر مجموعه با نقطه
  return input
    .split(".")
    .map(x => x.trim())
    .filter(x => x !== "");
}

function calculateUnion() {
  const A = parseSet(document.getElementById("setA").value);
  const B = parseSet(document.getElementById("setB").value);

  const result = [...new Set([...A, ...B])];

  document.getElementById("result").innerText = "اجتماع: " + result.join(".");
}

function calculateIntersection() {
  const A = parseSet(document.getElementById("setA").value);
  const B = parseSet(document.getElementById("setB").value);

  const result = A.filter(x => B.includes(x));

  document.getElementById("result").innerText = "اشتراک: " + result.join(".");
}

function calculateDifference() {
  const A = parseSet(document.getElementById("setA").value);
  const B = parseSet(document.getElementById("setB").value);

  const result = A.filter(x => !B.includes(x));

  document.getElementById("result").innerText = "تفاضل: " + result.join(".");
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* این باعث میشه همه عناصر داخل کانتینر سمت چپ بچسبند */
}

.input-section {
  margin-bottom: 10px;
  width: 300px; /* میتونی عرض دلخواه بذاری یا هم‌اندازه کادر قدر مطلق */
}
