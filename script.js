const addButton = document.getElementById('addButton');
const setInput = document.getElementById('setInput');
const setList = document.getElementById('setList');
const alertMsg = document.getElementById('alertMsg');

addButton.addEventListener('click', () => {
  const value = setInput.value.trim() || 'مجموعه جدید'; // اگر ورودی خالی باشه نام پیش‌فرض

  // ساخت یک آیتم جدید
  const item = document.createElement('div');
  item.className = 'result-item';
  item.textContent = value;

  // اضافه کردن به انتهای لیست موجود
  setList.appendChild(item);

  // پاک کردن ورودی و پیام هشدار
  setInput.value = '';
  alertMsg.textContent = '';

  // فوکوس دوباره روی input
  setInput.focus();
});

// امکان زدن Enter برای اضافه کردن مجموعه
setInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addButton.click();
});
