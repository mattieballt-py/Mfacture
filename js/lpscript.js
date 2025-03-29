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
