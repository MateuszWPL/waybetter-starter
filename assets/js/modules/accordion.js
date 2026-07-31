/**
 * SPIS TREŚCI - accordion.js (akordeon, multi-instance)
 * 1. Logika akordeonu (jeden otwarty naraz; data-accordion="open" otwiera pierwszy)
 * 2. „Pokaż więcej" (limit pozycji: data-limit=N; wyłączenie: data-show-all)
 * ------------------------------------------------------------
 * Markup: [data-accordion] > ([accordion-button] + [accordion-panel]) ...
 * Pozycje liczone do „Pokaż więcej": .accordion-item.
 */
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[data-accordion]').forEach(container => {
		if (container.dataset.init === 'true') return;
		container.dataset.init = 'true';

		// --- 1. Akordeon ---
		const buttons = container.querySelectorAll('[accordion-button]');

		const openPanel = (btn, panel) => {
			panel.classList.add('active');
			panel.style.height = panel.scrollHeight + 'px';
			btn.classList.add('active');
			btn.setAttribute('aria-expanded', 'true');
		};
		const closePanel = (btn, panel) => {
			panel.style.height = '0';
			btn.classList.remove('active');
			btn.setAttribute('aria-expanded', 'false');
			setTimeout(() => panel.classList.remove('active'), 300);
		};

		buttons.forEach((btn, i) => {
			const panel = btn.nextElementSibling;
			if (!panel) return;
			btn.setAttribute('aria-expanded', 'false');

			if (i === 0 && container.getAttribute('data-accordion') === 'open') {
				openPanel(btn, panel);
			}

			btn.addEventListener('click', () => {
				const isActive = panel.classList.contains('active');
				// zamknij wszystkie aktywne w TYM kontenerze
				container.querySelectorAll('[accordion-button].active').forEach(activeBtn => {
					const activePanel = activeBtn.nextElementSibling;
					if (activePanel) closePanel(activeBtn, activePanel);
				});
				if (!isActive) openPanel(btn, panel);
			});
		});

		// --- 2. „Pokaż więcej" ---
		if (container.hasAttribute('data-show-all')) return;
		const limit = parseInt(container.getAttribute('data-limit'), 10) || 5;
		const items = container.querySelectorAll('.accordion-item');
		if (items.length <= limit) return;

		for (let i = limit; i < items.length; i++) items[i].style.display = 'none';

		const moreBtn = document.createElement('button');
		moreBtn.type = 'button';
		moreBtn.className = 'show-more-btn';
		moreBtn.textContent = 'Pokaż więcej';
		container.after(moreBtn);

		moreBtn.addEventListener('click', () => {
			const expanded = moreBtn.classList.toggle('expanded');
			for (let i = limit; i < items.length; i++) {
				items[i].style.display = expanded ? '' : 'none';
				if (expanded) items[i].style.animation = 'fadeIn 0.5s ease';
			}
			moreBtn.textContent = expanded ? 'Schowaj' : 'Pokaż więcej';
			if (!expanded) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});
});
