document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelectorAll('.hamburger').length > 0 && document.querySelectorAll('.nav-menu').length > 0) {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;
    const closeButton = document.querySelector('.close-menu');
    const overlay = document.querySelector('.nav-overlay');

    // Funkcja zamykająca menu
    const closeMenu = () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      body.style.overflow = "";
    };

    // Obsługa kliknięcia hamburger
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      if (overlay) overlay.classList.toggle("active");
      
      body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });

    // Opcjonalna obsługa przycisku zamykania
    if (closeButton) {
      closeButton.addEventListener("click", closeMenu);
    }

    // Opcjonalna obsługa overlay
    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    // Obsługa kliknięć w linki nawigacyjne
    const navLinks = document.querySelectorAll(".nav-link");
    if (navLinks.length > 0) {
      navLinks.forEach(link => link.addEventListener("click", closeMenu));
    }
  }
});