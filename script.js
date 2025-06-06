const form = document.getElementById('bill-form');
const list = document.getElementById('bill-list');
const totalDisplay = document.getElementById('total');
const clearButton = document.getElementById('clear-bills');

let bills = JSON.parse(localStorage.getItem('bills')) || [];

function saveAndReload() {
  localStorage.setItem('bills', JSON.stringify(bills));
  loadBills();
}

function loadBills() {
  list.innerHTML = '';
  let total = 0;

  // Optional: sort by due date
  bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  bills.forEach((bill, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${bill.name} – $${bill.amount.toFixed(2)} (${bill.frequency}) – Due: ${bill.dueDate}
      <span class="delete" data-index="${index}">✖</span>
    `;
    list.appendChild(li);
    total += bill.amount;
  });

  totalDisplay.textContent = total.toFixed(2);

  // Attach delete listeners
  document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = e.target.getAttribute('data-index');
      bills.splice(i, 1);
      saveAndReload();
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('bill-name').value;
  const amount = parseFloat(document.getElementById('bill-amount').value);
  const frequency = document.getElementById('bill-frequency').value;
  const dueDate = document.getElementById('bill-date').value;

  const newBill = { name, amount, frequency, dueDate };
  bills.push(newBill);
  saveAndReload();
  form.reset();
});

clearButton.addEventListener('click', () => {
  if (confirm('Clear all bills?')) {
    bills = [];
    saveAndReload();
  }
});

// Initial load
loadBills();
// Export to CSV
document.getElementById('export-csv').addEventListener('click', () => {
  if (bills.length === 0) {
    alert('No bills to export.');
    return;
  }

  const headers = ['Name', 'Amount', 'Frequency', 'Due Date'];
  const rows = bills.map(b => [b.name, b.amount, b.frequency, b.dueDate]);
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bills.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// Generate Move House Checklist
document.getElementById('generate-checklist').addEventListener('click', () => {
  const checklist = document.getElementById('checklist');
  const output = document.getElementById('checklist-output');
  output.innerHTML = '';

  const uniqueNames = [...new Set(bills.map(b => b.name.trim()))];

  if (uniqueNames.length === 0) {
    output.innerHTML = '<li>No billers found.</li>';
  } else {
    uniqueNames.forEach(name => {
      const li = document.createElement('li');
      li.textContent = `Update your details with: ${name}`;
      output.appendChild(li);
    });
  }

  checklist.style.display = 'block';
});
