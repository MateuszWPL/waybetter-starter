/* Custom JS goes here */
// Scroll header
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let ticking = false;

  function checkScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScroll();
      });
      ticking = true;
    }
  });
  
  checkScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
});