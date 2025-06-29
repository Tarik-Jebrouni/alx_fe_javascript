let quotes = [];
let lastViewedQuote = null;

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Do what you can, with what you have, where you are.",
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available.");
    return;
  }
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  document.getElementById('quoteDisplay').textContent = quote;
  sessionStorage.setItem('lastViewedQuote', quote); // Session storage
}

function addQuote() {
  const input = document.getElementById('newQuoteInput');
  const newQuote = input.value.trim();
  if (newQuote) {
    quotes.push(newQuote);
    saveQuotes();
    input.value = '';
    alert("Quote added!");
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format. Must be an array of quotes.');
      }
    } catch (err) {
      alert('Error reading file: ' + err.message);
    }
  };
  fileReader.readAsText(file);
}

function restoreSessionQuote() {
  const last = sessionStorage.getItem('lastViewedQuote');
  if (last) {
    document.getElementById('quoteDisplay').textContent = last;
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  restoreSessionQuote();
});
