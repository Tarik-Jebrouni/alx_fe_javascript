// Quotes array with text and category
let quotes = [
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
  // More quotes...
];

// Extract unique categories and populate the <select>:
function populateCategories() {
  const categories = new Set(quotes.map(q => q.category));
  const select = document.getElementById('categoryFilter');

  // Clear existing options (except 'all')
  select.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  // Restore selected category from localStorage
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    select.value = savedCategory;
  }

  filterQuotes();
}



// Filter and display quotes according to the selected category:
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);

  const quoteContainer = document.getElementById('quoteContainer');
  quoteContainer.innerHTML = '';

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filteredQuotes.forEach(quote => {
    const quoteEl = document.createElement('div');
    quoteEl.className = 'quote';
    quoteEl.innerHTML = `<p>"${quote.text}"</p><small>- ${quote.author}</small>`;
    quoteContainer.appendChild(quoteEl);
  });
}



// Render quotes dynamically:
function displayQuotes(filtered) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = filtered.map(q => `<p>${q.text}</p>`).join("");
}

// When adding a new quote, update both the array and dropdown:
function addQuote(text, author, category) {
  quotes.push({ text, author, category });
  populateCategories(); // Refresh dropdown if new category added
  filterQuotes(); // Reapply current filter
}


// Besides the selected filter, you can persist the quotes array itself:
function saveQuotesToStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotesFromStorage() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

window.onload = () => {
  populateCategories();
};
