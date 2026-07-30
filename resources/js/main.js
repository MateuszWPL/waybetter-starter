/**
 * SPIS TREŚCI — ENTRY POINT JS
 * 1. MODUŁY BAZOWE (zawsze aktywne)
 * 2. MODUŁY OPCJONALNE (odkomentuj gdy projekt używa)
 * 3. ANIMACJE ON-SCROLL (AOS — wymiana po pilotażu, K1)
 * 4. HELPERY GLOBALNE
 */

/* ============================================
   1. MODUŁY BAZOWE
   ============================================ */
import './modules/mobilemenu.js';
import './modules/custom.js';

/* ============================================
   2. MODUŁY OPCJONALNE
   ============================================ */
import './modules/sliders.js';
// import './modules/accordion.js';
// import './modules/tabs.js';
// import './modules/popup.js';
// import './modules/modalgallery.js';
// import './modules/dragscroll.js';
// import './modules/megamenu.js';
// GSAP (zaawansowane animacje): `npm i gsap`, potem: import gsap from 'gsap';

/* ============================================
   3. ANIMACJE ON-SCROLL (AOS)
   ============================================ */
import AOS from 'aos';
// CSS AOS jest w resources/css/extra.css (żeby main.js nie generował osobnego build/main.css)

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 1000 });
});

/* ============================================
   4. HELPERY GLOBALNE
   ============================================ */
window.refreshAOSAfter = function (delay = 300) {
  setTimeout(() => AOS.refresh(), delay);
};
