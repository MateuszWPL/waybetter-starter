/**
 * SPIS TREŚCI - dragscroll.js (przeciąganie do przewijania w poziomie, multi-instance)
 * Kontener .dragSlider z przewijaną zawartością (overflow-x). Mysz + dotyk.
 */
document.addEventListener('DOMContentLoaded', function () {
	var sliders = document.querySelectorAll('.dragSlider');
	if (!sliders.length) return;

	sliders.forEach(function (slider) {
		var isDown = false, startX = 0, scrollLeft = 0;

		function start(pageX) {
			isDown = true;
			startX = pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		}
		function move(pageX) {
			var walk = (pageX - slider.offsetLeft) - startX;
			slider.scrollLeft = scrollLeft - walk;
		}
		function end() { isDown = false; }

		// Mysz - preventDefault tylko w trakcie przeciągania (blokuje zaznaczanie tekstu)
		slider.addEventListener('mousedown', function (e) { start(e.pageX); });
		slider.addEventListener('mousemove', function (e) { if (isDown) { e.preventDefault(); move(e.pageX); } });
		slider.addEventListener('mouseleave', end);
		slider.addEventListener('mouseup', end);

		// Dotyk - passive:false, bo blokujemy scroll strony przy przeciąganiu w poziomie
		slider.addEventListener('touchstart', function (e) { start(e.touches[0].pageX); }, { passive: true });
		slider.addEventListener('touchmove', function (e) { if (!isDown) return; e.preventDefault(); move(e.touches[0].pageX); }, { passive: false });
		slider.addEventListener('touchend', end);
	});
});
