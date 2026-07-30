// Splide sliders — plain JS (globalny Splide + AutoScroll z vendored, bez importów)
document.addEventListener('DOMContentLoaded', function () {
	if (typeof Splide === 'undefined') return;
	// Rozszerzenie AutoScroll rejestruje się pod window.splide.Extensions
	var AutoScroll = (window.splide && window.splide.Extensions) ? window.splide.Extensions.AutoScroll : null;

	// Slidery podstawowe
	function initBasicSlider() {
		var basicSliders = document.querySelectorAll('.basicSlider');
		basicSliders.forEach(function (slider) {
			if (slider.querySelectorAll('.splide__slide').length === 0) return;
			new Splide(slider, {
				type: 'loop',
				gap: '1.125rem',
				perPage: 2,
				perMove: 2,
				autoplay: false,
				interval: 5000,
				pagination: true,
				arrows: true,
				breakpoints: {
					1024: { arrows: false, perPage: 1, perMove: 1 },
				},
			}).mount();
		});
	}

	// Slidery auto-scroll
	function initAutoSlider() {
		var autoSliders = document.querySelectorAll('.autoSlider');
		if (autoSliders.length === 0 || !AutoScroll) return;
		autoSliders.forEach(function (slider) {
			if (slider.querySelectorAll('.splide__slide').length === 0) return;
			new Splide(slider, {
				type: 'loop',
				drag: 'free',
				gap: '5rem',
				pagination: false,
				arrows: false,
				perPage: 'auto',
				autoWidth: true,
				clones: 20,
				trimSpace: false,
				focus: 0,
				start: 0,
				breakpoints: {
					1024: { gap: '3rem', autoScroll: { speed: 1 } },
				},
				autoScroll: {
					pauseOnHover: false,
					speed: 1.5,
					waitForTransition: false,
					rewind: false,
					disableOnInteraction: false,
				},
			}).mount({ AutoScroll: AutoScroll });
		});
	}

	initBasicSlider();
	initAutoSlider();
});
