const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const quoteFormContainer = document.getElementById('quoteFormContainer');

function updateCategoryOptions() {
  const existingOptions = Array.from(categorySelect.options).map(opt => opt.value);
  quotes.forEach(q => {
    if (!existingOptions.includes(q.category)) {
      const option = document.createElement('option');
      option.value = q.category;
      option.textContent = q.category;
      categorySelect.appendChild(option);
    }
  });
}

function showRandomQuote () {
  const selectedCategory = categorySelect.value;
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

function createAddQuoteForm() {
  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  quoteInput.id = 'newQuoteText';

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  categoryInput.id = 'newQuoteCategory';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  quoteFormContainer.appendChild(quoteInput);
  quoteFormContainer.appendChild(categoryInput);
  quoteFormContainer.appendChild(addButton);
}

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  updateCategoryOptions();
  alert("New quote added!");
}

newQuoteBtn.addEventListener('click', showRandomQuote);

document.addEventListener('DOMContentLoaded', () => {
  updateCategoryOptions();
  createAddQuoteForm();
  showRandomQuote();
});
