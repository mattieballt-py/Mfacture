const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let index = 0;
// Doesn't really work to be honest //
nextBtn.addEventListener("click", () => {
    index = (index + 1) % carousel.children.length;
    updateCarousel();
});
prevBtn.addEventListener("click", () => {
    index = (index - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
});
function updateCarousel() {
    const offset = -index * 270; // Adjust based on card width
    carousel.style.transform = `translateX(${offset}px)`;
}

// Add search functionality to connect to n8n
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchCategory = document.getElementById('search-category');
  
  searchButton.addEventListener('click', function() {
    const query = searchInput.value;
    const category = searchCategory.value;
    
    if(!query) return;
    
    // You can show a loading state here if desired
    
    fetch('https://solan.app.n8n.cloud/webhook-test/d3fd6642-2665-42ea-bbad-182ac0e49db2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        query: query,
        category: category 
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Search results:', data);
      // Here you would display the results
      // For now, just showing in console
    })
    .catch(error => {
      console.error('Error searching:', error);
    });
  });
});
