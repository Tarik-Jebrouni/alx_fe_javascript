// Sample quotes array
const quotes = [
  { text: "Your limitation—it’s only your imagination.", category: "Motivation" },
  { text: "Push yourself, because no one else is going to do it for you.", category: "Motivation" },
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Life is short, and it's up to you to make it sweet.", category: "Life" }
];

// Select DOM elements
const categorySelect = document.getElementById("categoryFilter");
const quoteContainer = document.getElementById("quoteContainer");

// Populate the category dropdown
function populateCategoryOptions() {
  const uniqueCategories = Array.from(new Set(quotes.map(q => q.category)));

  // Clear existing options
  categorySelect.innerHTML = '';

  // Add default 'All' option
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Categories";
  categorySelect.appendChild(defaultOption);

  // Add unique category options
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Restore previously selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categorySelect.value = savedCategory;
  }

  // Display quotes for the selected category
  displayFilteredQuotes();
}

// Filter and display quotes
function displayFilteredQuotes() {
  const selectedCategory = categorySelect.value;

  // Save selection to localStorage
  localStorage.setItem("selectedCategory", selectedCategory);

  // Filter quotes
  const visibleQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  // Clear the display
  quoteContainer.innerHTML = '';

  // Render filtered quotes
  visibleQuotes.forEach(({ text }) => {
    const quoteElement = document.createElement("p");
    quoteElement.textContent = text;
    quoteContainer.appendChild(quoteElement);
  });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  populateCategoryOptions();
  categorySelect.addEventListener("change", displayFilteredQuotes);
});
