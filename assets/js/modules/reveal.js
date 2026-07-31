/**
 * SPIS TREŚCI - reveal.js (animacje wejścia - fallback)
 * Nowoczesne przeglądarki (animation-timeline: view()) - animuje samo CSS
 * (assets/css/animations.css). Ten moduł wtedy NIC nie robi.
 * Starsze przeglądarki - dokłada html.no-sda + klasę .anim-in na elementy
 * [data-anim] wchodzące w viewport (IntersectionObserver, reveal-once).
 * Dynamiczna treść (np. doładowane bloki): window.wbReveal.scan() obejmie nowe.
 */
(function () {
	// Nowoczesne CSS scroll-driven - nic nie robimy (CSS załatwia wszystko).
	if (window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) {
		return;
	}

	// Sygnał dla animations.css, że wchodzimy ścieżką fallbacku (dodane ASAP → minimalny FOUC).
	document.documentElement.classList.add('no-sda');

	var observer = null;

	function scan() {
		var items = document.querySelectorAll('[data-anim]:not(.anim-in)');
		if (!('IntersectionObserver' in window)) {
			// Brak IO - pokaż wszystko od razu (bezpieczny default).
			items.forEach(function (el) { el.classList.add('anim-in'); });
			return;
		}
		if (!observer) {
			observer = new IntersectionObserver(function (entries, obs) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					var el = entry.target;
					var delay = parseInt(el.getAttribute('data-anim-delay'), 10);
					if (delay) el.style.transitionDelay = delay + 'ms';
					el.classList.add('anim-in');
					obs.unobserve(el);
				});
			}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
		}
		items.forEach(function (el) { observer.observe(el); });
	}

	window.wbReveal = { scan: scan };
	document.addEventListener('DOMContentLoaded', scan);
})();
