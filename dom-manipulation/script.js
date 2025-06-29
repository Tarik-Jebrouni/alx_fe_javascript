// 1. Sample Structure for Quotes (if not already defined):
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" },
];

// 2. Populate Dropdown with Unique Categories
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  dropdown.innerHTML = categories.map(cat => 
    `<option value="${cat}">${cat}</option>`).join("");

  // Restore last selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    dropdown.value = savedCategory;
    filterQuotes();
  }
}

// 3. Filtering Quotes by Selected Category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if(!selectedCategory){
    displayQuotes(filtered);
  }
}

// 4. Display Quotes Function
function displayQuotes(quotesToDisplay) {
  const displayDiv = document.getElementById("quoteDisplay");
  displayDiv.innerHTML = quotesToDisplay.map(q => `
    <div class="quote-card">
      <p>${q.text}</p>
      <small>${q.category}</small>
    </div>`).join("");
}

// 3: Add Quotes with Category Support
function addQuote(text, category) {
  quotes.push({ text, category });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Update categories in dropdown
  populateCategories();

  // Refresh quote list
  filterQuotes();
}

// On Page Load 
window.onload = () => {
  populateCategories();
  filterQuotes();
};
