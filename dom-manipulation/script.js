// Tableau global des citations
const quotes = [
  { text: "La seule limite, c'est votre esprit.", category: "Motivation" },
  { text: "La vie est ce qui se passe quand on fait d'autres projets.", category: "Vie" },
  { text: "Le savoir est une arme.", category: "Éducation" }
];

// Fonction pour remplir dynamiquement le menu des catégories
function populateCategories() {
  const select = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(q => q.category))]; // Catégories uniques

  // Réinitialiser les options sauf "Toutes les catégories"
  select.innerHTML = '<option value="all">Toutes les catégories</option>';

  // Ajouter les catégories
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });

  // Rétablir la catégorie précédemment sélectionnée
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    select.value = savedCategory;
  }

  // Afficher les citations correspondantes
  filterQuotes();
}

// Fonction pour filtrer et afficher les citations
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory); // Sauvegarder le filtre

  const container = document.getElementById('quoteContainer');
  container.innerHTML = ''; // Nettoyer l'affichage

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filtered.forEach(quote => {
    const p = document.createElement('p');
    p.textContent = quote.text;
    container.appendChild(p);
  });
}

// Initialisation au chargement de la page
window.onload = () => {
  populateCategories();
};
