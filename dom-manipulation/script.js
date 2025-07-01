// Quotes array with text and category
let quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" }
];


// Extract unique categories and populate the <select>:
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  const dropdown = document.getElementById("categoryFilter");

  dropdown.innerHTML = categories.map(
    cat => `<option value="${cat}">${cat}</option>`
  ).join("");

  const saved = localStorage.getItem("selectedCategory");
  if (saved) dropdown.value = saved;

  filterQuotes();
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
function displayQuotes(filtered) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = filtered.map(q => `<p>${q.text}</p>`).join("");
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
