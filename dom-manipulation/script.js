// Quotes array with text and category
const quotes = [
  { text: "Believe in yourself.", author: "Unknown", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Productivity" },
  // Add more quotes...
];

// Extract unique categories and populate the <select>:
function populateCategories() {
  const categorySet = new Set();

  // Extract unique categories
  quotes.forEach(function(quote) {
    categorySet.add(quote.category);
  });

  const filter = document.getElementById('categoryFilter');
  filter.innerHTML = '<option value="all">All Categories</option>';

  // Populate dropdown
  categorySet.forEach(function(category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  });

  // Restore last selected category from localStorage
  const lastSelected = localStorage.getItem('selectedCategory');
  if (lastSelected) {
    filter.value = lastSelected;
    filterQuotes(); // Refresh display with saved filter
  }
}


// Filter and display quotes according to the selected category:
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save choice

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filtered);
}

// Render quotes dynamically:
function displayQuotes(quotesArray) {
  const container = document.getElementById('quoteContainer');
  container.innerHTML = ''; // Clear previous

  quotesArray.forEach(quote => {
    const div = document.createElement('div');
    div.className = 'quote';
    div.innerHTML = `<p>"${quote.text}"</p><p>– ${quote.author}</p>`;
    container.appendChild(div);
  });
}

// When adding a new quote, update both the array and dropdown:
function addQuote(text, author, category) {
  quotes.push({ text, author, category });

  if (![...document.getElementById('categoryFilter').options].some(opt => opt.value === category)) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    document.getElementById('categoryFilter').appendChild(option);
  }

  filterQuotes(); // Refresh display
}
