// Initial list of quotes
let quotes = [
    { text: "The only limit is your mind.", category: "Motivation" },
    { text: "Do or do not, there is no try.", category: "Inspiration" },
    { text: "Knowledge is power.", category: "Wisdom" },
];

// Populate the dropdown with unique categories
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");

    // Get unique categories from quote array
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];

    // Reset dropdown and add 'All Categories' as default
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    // Create and append options dynamically
    uniqueCategories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from localStorage if it exists
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory && [...categoryFilter.options].some(opt => opt.value === savedCategory)) {
        categoryFilter.value = savedCategory;
    }

    // Apply the selected filter on load
    filterQuotes();
}

// Filter and display quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;

    // Save current selection to localStorage
    localStorage.setItem("selectedCategory", selectedCategory);

    // Filter quotes based on selected category
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    // Display filtered results
    displayQuotes(filteredQuotes);
}

// Render quotes to the page
function displayQuotes(list) {
    const container = document.getElementById("quoteContainer");
    container.innerHTML = "";

    // Show message if no quotes exist for selected category
    if (list.length === 0) {
        container.innerHTML = "<p>No quotes in this category.</p>";
        return;
    }

    // Loop through and render each quote
    list.forEach(q => {
        const el = document.createElement("div");
        el.className = "quote";
        el.innerHTML = `<strong>"${q.text}"</strong> <em>[${q.category}]</em>`;
        container.appendChild(el);
    });
}

// Add a new quote and update categories and view
function addQuote() {
    const text = document.getElementById("newQuote").value.trim();
    const category = document.getElementById("newCategory").value.trim();

    // Validate input
    if (!text || !category) {
        return alert("Please enter both a quote and category.");
    }

    // Add the new quote to the array
    quotes.push({ text, category });

    // Clear input fields
    document.getElementById("newQuote").value = "";
    document.getElementById("newCategory").value = "";

    // Refresh categories and quotes
    populateCategories();
}

// Run when page loads
window.onload = populateCategories;