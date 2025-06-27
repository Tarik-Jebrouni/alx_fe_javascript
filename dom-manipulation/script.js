// Initial quotes array
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" }
];

// DOM references
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const quoteFormContainer = document.getElementById('quoteFormContainer');

// Populate category select options
function updateCategoryOptions() {
  const existingOptions = Array.from(categorySelect.options).map(opt => opt.value);
  quotes.forEach(q => {
    if (!existingOptions.includes(q.category)) {
      const opt = document.createElement('option');
      opt.value = q.category;
      opt.textContent = q.category;
      categorySelect.appendChild(opt);
    }
  });
}

// Show a random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}" - ${filteredQuotes[randomIndex].category}`;
}

// Create and display the quote input form
function createAddQuoteForm() {
  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  quoteInput.id = 'newQuoteText';

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  categoryInput.id = 'newQuoteCategory';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add Quote';
  addBtn.onclick = addQuote;

  quoteFormContainer.appendChild(quoteInput);
  quoteFormContainer.appendChild(categoryInput);
  quoteFormContainer.appendChild(addBtn);
}

// Add new quote from user input
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Both quote and category are required.");
    return;
  }

  quotes.push({ text, category });

  textInput.value = '';
  categoryInput.value = '';

  updateCategoryOptions();
  alert("Quote added successfully!");
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryOptions();
  createAddQuoteForm();
  showRandomQuote();
});
