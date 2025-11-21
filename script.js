const addButton = document.getElementById('addButton');
const setInput = document.getElementById('setInput');
const setList = document.getElementById('setList');
const alertMsg = document.getElementById('alertMsg');

addButton.addEventListener('click', () => {
  const value = setInput.value.trim();
  if (value === '') {
    alertMsg.textContent = 'لطفاً متن را وارد کنید!';
    return;
  }

  const newItem = document.createElement('div');
  newItem.className = 'result-item';
  newItem.textContent = value;

  setList.appendChild(newItem);

  setInput.value = '';
  alertMsg.textContent = '';
  setInput.focus();
});

setInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addButton.click();
});
