const form = document.getElementById('bill-form');
const list = document.getElementById('bill-list');
const totalDisplay = document.getElementById('total');

let total = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('bill-name').value;
  const amount = parseFloat(document.getElementById('bill-amount').value);
  const frequency = document.getElementById('bill-frequency').value;
  const dueDate = document.getElementById('bill-date').value;

  total += amount;

  const li = document.createElement('li');
  li.textContent = `${name} – $${amount.toFixed(2)} (${frequency}) – Due: ${dueDate}`;
  list.appendChild(li);

  totalDisplay.textContent = total.toFixed(2);

  form.reset();
});

