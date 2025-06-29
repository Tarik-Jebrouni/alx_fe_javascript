let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  "Be yourself; everyone else is already taken.",
  "The only limit to our realization of tomorrow is our doubts of today.",
];

// Save quotes to local storage ✅
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
// Add New Quote and Save: ✅
function addQuote(newQuote) {
  if (newQuote.trim() === "") return;
  quotes.push(newQuote);
  saveQuotes();
  displayQuote(newQuote);
}

// Load Last Viewed Quote (Session Storage): ✅
function loadLastViewedQuote() { 
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    displayQuote(lastQuote);
  } else {
    displayQuote(quotes[0]);
  }
}
// Export Function ✅
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}
// Import Function ✅
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format");
      }
    } catch (err) {
      alert("Failed to import quotes.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}
//  Display Function and Initialization ✅
function displayQuote(quote) {
  document.getElementById("quoteDisplay").textContent = quote;
  sessionStorage.setItem("lastQuote", quote);
}

function getRandomQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(random);
}

window.onload = function () {
  loadLastViewedQuote();
};

