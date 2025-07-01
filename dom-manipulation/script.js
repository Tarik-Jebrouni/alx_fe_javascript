const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const nextQuoteBtn = document.getElementById("next-quote");
const syncNotice = document.getElementById("sync-notice");

const SERVER_URL = "http://localhost:3000/quotes"; // replace with your mock server URL

// Initial load
let localQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
let currentIndex = 0;

function displayQuote(index) {
  if (localQuotes.length > 0 && localQuotes[index]) {
    const quote = localQuotes[index];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
}

function nextQuote() {
  currentIndex = (currentIndex + 1) % localQuotes.length;
  displayQuote(currentIndex);
}

// Fetch from server
async function fetchServerQuotes() {
  const res = await fetch(SERVER_URL);
  const serverQuotes = await res.json();
  return serverQuotes;
}

function mergeQuotes(serverQuotes) {
  const updated = [];
  const localMap = new Map(localQuotes.map(q => [q.id, q]));

  serverQuotes.forEach(serverQuote => {
    const local = localMap.get(serverQuote.id);
    if (!local || new Date(serverQuote.updatedAt) > new Date(local.updatedAt)) {
      updated.push(serverQuote); // server wins
    } else {
      updated.push(local);
    }
    localMap.delete(serverQuote.id);
  });

  // Add any local-only quotes
  for (const remaining of localMap.values()) {
    updated.push(remaining);
  }

  localStorage.setItem("quotes", JSON.stringify(updated));
  localQuotes = updated;
  currentIndex = 0;
  displayQuote(currentIndex);
  showSyncNotice();
}

function showSyncNotice() {
  syncNotice.classList.remove("hidden");
  setTimeout(() => syncNotice.classList.add("hidden"), 4000);
}

// Periodic sync every 10 seconds
setInterval(async () => {
  try {
    const serverQuotes = await fetchServerQuotes();
    mergeQuotes(serverQuotes);
  } catch (e) {
    console.warn("Server sync failed", e);
  }
}, 10000);

// Initialize app
if (localQuotes.length > 0) {
  displayQuote(currentIndex);
} else {
  fetchServerQuotes().then(serverQuotes => {
    mergeQuotes(serverQuotes);
  });
}

nextQuoteBtn.addEventListener("click", nextQuote);
