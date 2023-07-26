document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const projects = document.querySelectorAll(".project");

  let currentIndex = 0;

  function updateSlider() {
    var projectWidth = projects[0].offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % projects.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateSlider();
  }

  // Boutons de contrôle
  const nextButton = document.querySelector(".next-button");
  nextButton.addEventListener("click", nextSlide);

  const prevButton = document.querySelector(".prev-button");
  prevButton.addEventListener("click", prevSlide);

  // Mise à jour de la position initiale du slider
  updateSlider();
});
