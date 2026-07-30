/**
 * ENTRY JS — inicjalizacja AOS + helpery globalne (plain, bez importów).
 * Biblioteki (Splide, AOS) i moduły ładuje inc/enqueue.php jako osobne pliki
 * — zero builda. Kolejność ładowania pilnuje WP przez zależności (deps).
 */
document.addEventListener('DOMContentLoaded', function () {
	if (typeof AOS !== 'undefined') {
		AOS.init({ duration: 1000 });
	}
});

// Odśwież AOS po dynamicznym doładowaniu treści (np. lazy obrazki)
window.refreshAOSAfter = function (delay) {
	delay = delay || 300;
	setTimeout(function () {
		if (typeof AOS !== 'undefined') AOS.refresh();
	}, delay);
};
