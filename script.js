const addButton = document.getElementById('addButton');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const alertMsg = document.getElementById('alertMsg');

addButton.addEventListener('click', () => {
  const value = itemInput.value.trim();
  if (value === '') {
    alertMsg.textContent = 'لطفاً متن را وارد کنید!';
    return;
  }

  const newItem = document.createElement('div');
  newItem.className = 'result-item';
  newItem.textContent = value;

  // اضافه کردن به انتهای لیست بدون حذف قبلی‌ها
  itemList.appendChild(newItem);

  itemInput.value = '';
  alertMsg.textContent = '';
  itemInput.focus();
});

// امکان زدن Enter برای اضافه کردن عنصر
itemInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addButton.click();
});
