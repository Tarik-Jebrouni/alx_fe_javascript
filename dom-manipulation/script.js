// Quotes array with text and category
const quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Knowledge is power.", category: "Education" }
];


// Extract unique categories and populate the <select>:
function populateCategories() {
  const categorySet = new Set(quotes.map(q => q.category));
  const select = document.getElementById('categoryFilter');

  // Clear existing options except 'All'
  select.innerHTML = '<option value="all">All Categories</option>';

  categorySet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });

  // Restore last filter if available
  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    select.value = savedFilter;
    filterQuotes();
  }
}


// Filter and display quotes according to the selected category:
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save preference

  const quoteContainer = document.getElementById('quoteContainer');
  quoteContainer.innerHTML = '';

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filtered.forEach(quote => {
    const p = document.createElement('p');
    p.textContent = quote.text;
    quoteContainer.appendChild(p);
  });
}


 

// Render quotes dynamically:
function addQuote(text, category) {
  quotes.push({ text, category });

  // Refresh filter dropdown if new category is unique
  const select = document.getElementById('categoryFilter');
  if (![...select.options].some(opt => opt.value === category)) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  }

  filterQuotes();
}


window.onload = () => {
  populateCategories();
};

 
