const form = document.getElementById('bill-form');
const list = document.getElementById('bill-list');
const totalDisplay = document.getElementById('total');

let bills = JSON.parse(localStorage.getItem('bills')) || [];

// 🧮 Load bills on page load
function loadBills() {
  list.innerHTML = '';
  let total = 0;

  bills.forEach(bill => {
    const li = document.createElement('li');
    li.textContent = `${bill.name} – $${bill.amount.toFixed(2)} (${bill.frequency}) – Due: ${bill.dueDate}`;
    list.appendChild(li);
    total += bill.amount;
  });

  totalDisplay.textContent = total.toFixed(2);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('bill-name').value;
  const amount = parseFloat(document.getElementById('bill-amount').value);
  const frequency = document.getElementById('bill-frequency').value;
  const dueDate = document.getElementById('bill-date').value;

  const newBill = { name, amount, frequency, dueDate };
  bills.push(newBill);
  localStorage.setItem('bills', JSON.stringify(bills));

  loadBills();
  form.reset();
});

// Load stored bills on page load
loadBills();
