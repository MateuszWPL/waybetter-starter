/**
 * SPIS TREŚCI - megamenu.js (rozwijane panele menu, click-toggle, multi-instance)
 * Przycisk `.megamenu-item button` z atrybutem name="idPanelu";
 * panel `[megamenu-panel]` o tym samym id. Klik poza megamenu zamyka aktywny panel.
 */
document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.megamenu-item button');

	const closeActive = () => {
		document.querySelectorAll('[megamenu-panel].active').forEach(p => p.classList.remove('active'));
		document.querySelectorAll('.megamenu-item button.active').forEach(b => {
			b.classList.remove('active');
			b.setAttribute('aria-expanded', 'false');
		});
		document.querySelectorAll('.megamenu-item button svg.active').forEach(svg => svg.classList.remove('active'));
	};

	const toggle = (button) => {
		const panelId = button.getAttribute('name');
		const panel = panelId ? document.getElementById(panelId) : null;
		if (!panel) return;
		const svg = button.querySelector('svg');
		const wasActive = panel.classList.contains('active');

		closeActive();
		if (!wasActive) {
			button.classList.add('active');
			button.setAttribute('aria-expanded', 'true');
			panel.classList.add('active');
			if (svg) svg.classList.add('active');
		}
	};

	buttons.forEach(button => {
		button.setAttribute('aria-expanded', 'false');
		button.addEventListener('click', () => toggle(button));
	});

	document.addEventListener('click', (event) => {
		if (!event.target.closest('.megamenu-item')) closeActive();
	});
});
