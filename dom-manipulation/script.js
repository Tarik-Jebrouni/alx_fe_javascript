// Quotes array with text and category
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  // Add more quotes as needed
];

// Extract unique categories and populate the <select>:
function populateCategories() {
  const dropdown = document.getElementById('categoryFilter');
  const categories = ['all', ...new Set(quotes.map(q => q.category))];

  dropdown.innerHTML = categories.map(cat =>
    `<option value="${cat}">${cat}</option>`
  ).join('');

  // Restore selected category from localStorage
  const savedCategory = localStorage.getItem('selectedCategory') || 'all';
  dropdown.value = savedCategory;
  filterQuotes(); // Initial filter
}

// Filter and display quotes according to the selected category:
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const container = document.getElementById('quotesContainer');
  container.innerHTML = filtered.map(q =>
    `<div class="quote">${q.text} <em>(${q.category})</em></div>`
  ).join('');
}

// Render quotes dynamically:
function displayQuotes(filtered) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = filtered.map(q => `<p>${q.text}</p>`).join("");
}

// When adding a new quote, update both the array and dropdown:
function addQuote(text, category) {
  quotes.push({ text, category });

  // If new category, repopulate dropdown
  const existingCategories = new Set(quotes.map(q => q.category));
  const dropdown = document.getElementById('categoryFilter');
  const options = [...dropdown.options].map(opt => opt.value);

  if (!options.includes(category)) {
    populateCategories(); // Resync category list
  }

  filterQuotes(); // Show latest quotes
}

window.onload = () => {
  populateCategories();
};

 
