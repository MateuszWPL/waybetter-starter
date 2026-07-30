/**
 * SPIS TREŚCI — modalgallery.js (lightbox galerii, MULTI-INSTANCE)
 * Każdy kontener [data-gallery] to osobna, izolowana galeria — może być wiele na stronie.
 * Markup (HTML w dalszym etapie):
 *   <div data-gallery data-gallery-modal="galeria-1">
 *     <button class="gallery-item"><img src="mini.webp" alt=""></button> ...
 *   </div>
 *   <div id="galeria-1" data-gallery-lightbox class="hidden"
 *        role="dialog" aria-modal="true" aria-hidden="true">
 *     <img data-gallery-image alt="">
 *     <button data-gallery-close>×</button>
 *     <button data-gallery-prev>‹</button>
 *     <button data-gallery-next>›</button>
 *     <div data-gallery-pagination></div>
 *   </div>
 * Kropki paginacji: klasy .gallery-dot / .gallery-dot-active (components.css) — nie hardcode w JS.
 */
(function () {
	function initGallery(container) {
		if (container.dataset.init === 'true') return;

		var modalId = container.getAttribute('data-gallery-modal');
		var modal = modalId ? document.getElementById(modalId) : null;
		var image = modal ? modal.querySelector('[data-gallery-image]') : null;
		var items = Array.prototype.slice.call(container.querySelectorAll('.gallery-item'));
		if (!modal || !image || items.length === 0) return;

		container.dataset.init = 'true';

		var sources = items.map(function (item) {
			var img = item.querySelector('img');
			return (img && img.getAttribute('src')) || item.getAttribute('data-src');
		});

		var closeBtn = modal.querySelector('[data-gallery-close]');
		var prevBtn = modal.querySelector('[data-gallery-prev]');
		var nextBtn = modal.querySelector('[data-gallery-next]');
		var pagination = modal.querySelector('[data-gallery-pagination]');

		var current = 0;
		var startX = 0;
		var dragging = false;

		// Kropki paginacji
		var dots = [];
		if (pagination) {
			sources.forEach(function () {
				var dot = document.createElement('span');
				dot.className = 'gallery-dot';
				pagination.appendChild(dot);
				dots.push(dot);
			});
		}

		function paint() {
			image.setAttribute('src', sources[current] || '');
			dots.forEach(function (dot, i) {
				dot.classList.toggle('gallery-dot-active', i === current);
			});
		}

		function open(index) {
			current = index;
			paint();
			modal.classList.remove('hidden');
			modal.classList.add('flex');
			modal.setAttribute('aria-hidden', 'false');
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', onKey);
		}

		function close() {
			modal.classList.add('hidden');
			modal.classList.remove('flex');
			modal.setAttribute('aria-hidden', 'true');
			document.body.style.overflow = '';
			document.removeEventListener('keydown', onKey);
		}

		function show(next) {
			current = (next + sources.length) % sources.length;
			paint();
		}

		function onKey(e) {
			if (e.key === 'Escape') close();
			else if (e.key === 'ArrowLeft') show(current - 1);
			else if (e.key === 'ArrowRight') show(current + 1);
		}

		items.forEach(function (item, i) {
			item.addEventListener('click', function () { open(i); });
		});
		if (closeBtn) closeBtn.addEventListener('click', close);
		if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
		if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
		modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

		// Swipe (dotyk + mysz) na obrazku
		function down(x) { dragging = true; startX = x; }
		function up(x) {
			if (!dragging) return;
			dragging = false;
			var delta = x - startX;
			if (Math.abs(delta) > 40) show(current + (delta > 0 ? -1 : 1));
		}
		image.addEventListener('touchstart', function (e) { down(e.touches[0].clientX); }, { passive: true });
		image.addEventListener('touchend', function (e) { up(e.changedTouches[0].clientX); });
		image.addEventListener('mousedown', function (e) { down(e.clientX); });
		image.addEventListener('mouseup', function (e) { up(e.clientX); });
	}

	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('[data-gallery]').forEach(initGallery);
	});
})();
