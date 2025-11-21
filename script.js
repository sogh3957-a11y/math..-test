const addButton = document.getElementById('addButton');
const setInput = document.getElementById('setInput');
const setList = document.getElementById('setList');
const alertMsg = document.getElementById('alertMsg');

addButton.addEventListener('click', () => {
  const value = setInput.value.trim();
  if (value === '') {
    alertMsg.textContent = 'لطفاً نام مجموعه را وارد کنید!';
    return;
  }

  const item = document.createElement('div');
  item.className = 'result-item';
  item.textContent = value;

  // اضافه کردن به انتهای لیست بدون حذف قبلی‌ها
  setList.appendChild(item);

  setInput.value = '';
  alertMsg.textContent = '';
  setInput.focus();
});

setInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addButton.click();
});
