/**
 * SPIS TREŚCI — tabs.js (zakładki, multi-instance)
 * Markup: [data-tab="nazwa"] z [data-tab-buttons] > * (przyciski) i [data-tab-panels] > * (panele).
 * ID paneli generowane: `${nazwa}-${index+1}`; role/aria dokładane automatycznie.
 */
document.addEventListener('DOMContentLoaded', () => {
	const setActive = (elements, active, ariaAttr) => {
		elements.forEach(el => {
			el.classList.remove('active');
			if (ariaAttr) el.setAttribute(ariaAttr, 'false');
		});
		active.classList.add('active');
		if (ariaAttr) active.setAttribute(ariaAttr, 'true');
	};

	const initTabs = (tab) => {
		const dataTab = tab.getAttribute('data-tab');
		const buttons = tab.querySelectorAll('[data-tab-buttons] > *');
		const panels = tab.querySelectorAll('[data-tab-panels] > *');

		panels.forEach((panel, i) => {
			panel.setAttribute('id', `${dataTab}-${i + 1}`);
			panel.setAttribute('role', 'tabpanel');
		});

		buttons.forEach((button, i) => {
			const tabId = `${dataTab}-${i + 1}`;
			button.setAttribute('tab-button', tabId);
			button.setAttribute('role', 'tab');
			button.setAttribute('aria-controls', tabId);
			button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
			if (i === 0) button.classList.add('active');

			button.addEventListener('click', () => {
				const target = tab.querySelector(`#${tabId}`);
				if (!target) return;
				setActive(buttons, button, 'aria-selected');
				setActive(panels, target, null);
			});
		});

		if (panels.length > 0) panels[0].classList.add('active');
	};

	document.querySelectorAll('[data-tab]').forEach(initTabs);
});
