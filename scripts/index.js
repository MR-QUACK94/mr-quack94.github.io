document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function moveToNextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function moveToPrevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    nextBtn.addEventListener('click', moveToNextCard);
    prevBtn.addEventListener('click', moveToPrevCard);
});