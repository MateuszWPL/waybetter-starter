/**
 * SPIS TREŚCI - sliders.js (slidery Swiper, plain JS, globalny Swiper z vendored)
 * 1. .basicSlider - slider z paginacją i strzałkami (1 / od 1024px: 2)
 * 2. .autoSlider  - ciągły auto-scroll (marquee), pauza na hover
 * ------------------------------------------------------------
 * Markup Swiper: kontener `.[nazwa]Slider.swiper` > `.swiper-wrapper` > `.swiper-slide`.
 * Nawigacja/paginacja: `.swiper-button-next/prev`, `.swiper-pagination` wewnątrz kontenera.
 * Konfiguracja WYŁĄCZNIE tutaj (per klasa kontenera) - nie w HTML.
 */
document.addEventListener('DOMContentLoaded', function () {
	if (typeof Swiper === 'undefined') return;

	// Komunikaty czytnika ekranu po polsku (moduł A11y Swipera ma domyślnie angielskie).
	var a11yPL = {
		prevSlideMessage: 'Poprzedni slajd',
		nextSlideMessage: 'Następny slajd',
		firstSlideMessage: 'To jest pierwszy slajd',
		lastSlideMessage: 'To jest ostatni slajd',
		paginationBulletMessage: 'Przejdź do slajdu {{index}}',
	};

	// 1. Slidery podstawowe
	document.querySelectorAll('.basicSlider').forEach(function (el) {
		if (el.querySelectorAll('.swiper-slide').length === 0) return;
		new Swiper(el, {
			slidesPerView: 1,
			spaceBetween: 18,
			loop: true, // wymaga zapasu slajdów; przy zbyt małej liczbie Swiper sam wyłącza loop (warning w konsoli)
			// observer* przelicza wymiary, gdy slider startuje w ukrytym kontenerze (tabs, akordeon, popup)
			observer: true,
			observeParents: true,
			a11y: a11yPL,
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
			breakpoints: {
				1024: { slidesPerView: 2, spaceBetween: 18 },
			},
		});
	});

	// 2. Slidery ciągłe (auto-scroll / marquee) - odpowiednik dawnego AutoScroll.
	//    Ruch liniowy zapewnia CSS: .autoSlider .swiper-wrapper { transition-timing-function: linear }.
	document.querySelectorAll('.autoSlider').forEach(function (el) {
		if (el.querySelectorAll('.swiper-slide').length === 0) return;
		new Swiper(el, {
			slidesPerView: 'auto',
			spaceBetween: 80,
			loop: true, // marquee potrzebuje zapasu slajdów (~2x szerokość kontenera), inaczej widać przerwę
			freeMode: true,
			speed: 4000,
			observer: true,
			observeParents: true,
			a11y: a11yPL,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				1024: { spaceBetween: 48 },
			},
		});
	});
});
