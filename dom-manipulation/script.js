 const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote-btn');
const notification = document.getElementById('notification');

const SERVER_URL = 'http://localhost:3000/quotes'; // Use your own mock server URL

// Load local quote
function loadQuote() {
  const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.textContent = random ? random.text : 'No quotes available.';
}

// Fetch new quote from server
async function fetchQuotes() {
  try {
    const res = await fetch(SERVER_URL);
    const serverQuotes = await res.json();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    let hasUpdate = false;

    const mergedQuotes = serverQuotes.map(serverQ => {
      const localQ = localQuotes.find(q => q.id === serverQ.id);
      if (!localQ || new Date(serverQ.updatedAt) > new Date(localQ.updatedAt)) {
        hasUpdate = true;
        notify(`Updated quote: "${serverQ.text}"`);
        return serverQ;
      }
      return localQ;
    });

    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    if (hasUpdate) loadQuote();
  } catch (err) {
    console.error('Sync error:', err);
    notify('Failed to sync with server.');
  }
}

// Add new quote manually
newQuoteBtn.addEventListener('click', () => {
  const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const newQuote = prompt('Enter a new quote:');
  if (newQuote) {
    const quoteObj = {
      id: Date.now(),
      text: newQuote,
      updatedAt: new Date().toISOString()
    };
    quotes.push(quoteObj);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    loadQuote();

    // Optional: Simulate POST to server
    fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteObj)
    }).catch(() => notify('Failed to save to server.'));
  }
});

// Display notification
function notify(msg) {
  notification.textContent = msg;
  setTimeout(() => notification.textContent = '', 4000);
}

// Periodic sync
setInterval(fetchQuotes, 60000); // every 60s
window.onload = () => {
  fetchQuotes();
  loadQuote();
};
