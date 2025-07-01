// Quotes array with text and category
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" }
];


// Extract unique categories and populate the <select>:
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }

  filterQuotes(); // Initial render
}


// Filter and display quotes according to the selected category:
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filtered);
}



// Render quotes dynamically:
function displayQuotes(quotesToDisplay) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = quotesToDisplay
    .map(q => `<p>${q.text}</p>`)
    .join("");
}


// When adding a new quote, update both the array and dropdown:
function addQuote(text, category) {
  quotes.push({ text, category });

  // If new category, update dropdown
  if (![...document.getElementById("categoryFilter").options]
      .some(opt => opt.value === category)) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    document.getElementById("categoryFilter").appendChild(option);
  }

  filterQuotes(); // Refresh display
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

window.onload = function () {
  loadQuotesFromStorage();
  populateCategories();
};
