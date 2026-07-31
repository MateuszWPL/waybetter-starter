/**
 * SPIS TREŚCI - mobilemenu.js (menu mobilne: hamburger + overlay)
 * Elementy: .hamburger, .nav-menu, opcjonalnie .nav-overlay, .close-menu, .nav-link.
 */
document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.nav-menu');
	if (!hamburger || !navMenu) return;

	const body = document.body;
	const closeButton = document.querySelector('.close-menu');
	const overlay = document.querySelector('.nav-overlay');

	const setState = (open) => {
		hamburger.classList.toggle('active', open);
		navMenu.classList.toggle('active', open);
		if (overlay) overlay.classList.toggle('active', open);
		hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
		body.style.overflow = open ? 'hidden' : '';
	};

	hamburger.setAttribute('aria-expanded', 'false');
	hamburger.addEventListener('click', () => setState(!navMenu.classList.contains('active')));
	if (closeButton) closeButton.addEventListener('click', () => setState(false));
	if (overlay) overlay.addEventListener('click', () => setState(false));
	document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setState(false)));
});
