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

  // Clear existing options
  dropdown.innerHTML = '';

  // Get unique categories and include 'all'
  const categories = ['all', ...new Set(quotes.map(q => q.category))];

  // Create and append each option using appendChild
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    dropdown.appendChild(option);
  });

  // Restore selected category from localStorage
  const savedCategory = localStorage.getItem('selectedCategory') || 'all';
  dropdown.value = savedCategory;

  // Filter quotes based on selected category
  filterQuotes();
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

 
