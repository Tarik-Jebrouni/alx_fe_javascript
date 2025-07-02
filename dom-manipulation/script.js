// Array to store all quotes with their respective categories
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Do or do not, there is no try.", category: "Inspiration" },
  { text: "Knowledge is power.", category: "Wisdom" },
];

// Populate the dropdown filter with unique categories from the quotes array
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Extract unique categories using Set
  const categories = [...new Set(quotes.map(quote => quote.category))];

  // Reset and add default "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // Append each unique category to the dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore and apply last selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory && categoryExists(savedCategory)) {
    categoryFilter.value = savedCategory;
  }

  filterQuotes();
}

// Check if the selected category still exists in the dropdown
function categoryExists(category) {
  const options = document.querySelectorAll("#categoryFilter option");
  return [...options].some(option => option.value === category);
}

// Filter quotes based on the selected category and display them
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;

  // Save selection to localStorage
  localStorage.setItem("selectedCategory", selected);

  // Filter or show all quotes
  const filtered = selected === "all"
    ? quotes
    : quotes.filter(quote => quote.category === selected);

  displayQuotes(filtered);
}

// Render the filtered quotes in the quoteContainer
function displayQuotes(quoteList) {
  const container = document.getElementById("quoteContainer");
  container.innerHTML = ""; // Clear previous quotes

  if (quoteList.length === 0) {
    container.textContent = "No quotes in this category.";
    return;
  }

  quoteList.forEach(({ text, category }) => {
    const div = document.createElement("div");
    div.className = "quote";
    div.innerHTML = `<strong>"${text}"</strong> <em>[${category}]</em>`;
    container.appendChild(div);
  });
}

// Add a new quote from user input and update UI
function addQuote() {
  const quoteInput = document.getElementById("newQuote");
  const categoryInput = document.getElementById("newCategory");
  const text = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to array
  quotes.push({ text, category });

  // Clear input fields
  quoteInput.value = "";
  categoryInput.value = "";

  // Refresh categories and quote display
  populateCategories();
}

// Initialize the app on page load
window.onload = populateCategories;
