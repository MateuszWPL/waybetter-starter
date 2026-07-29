document.addEventListener('DOMContentLoaded', () => {
  // Funkcja pomocnicza do zarządzania klasami active
  const toggleActive = (elements, activeElement) => {
    elements.forEach(element => element.classList.remove('active'));
    activeElement.classList.add('active');
  };

  // Inicjalizacja zakładek
  const initTabs = (tab) => {
    const dataTab = tab.getAttribute('data-tab');
    const tabButtons = tab.querySelectorAll('[data-tab-buttons] > *');
    const tabPanels = tab.querySelectorAll('[data-tab-panels] > *');

    // Ustawienie pierwszych elementów jako aktywne
    if (tabButtons.length > 0) tabButtons[0].classList.add('active');
    if (tabPanels.length > 0) tabPanels[0].classList.add('active');

    // Inicjalizacja przycisków
    tabButtons.forEach((button, index) => {
      const tabId = `${dataTab}-${index + 1}`;
      button.setAttribute('tab-button', tabId);

      button.addEventListener('click', () => {
        const targetPanel = tab.querySelector(`#${tabId}`);
        if (!targetPanel) return;

        toggleActive(tabButtons, button);
        toggleActive(tabPanels, targetPanel);
      });
    });

    // Inicjalizacja paneli
    tabPanels.forEach((panel, index) => {
      panel.setAttribute('id', `${dataTab}-${index + 1}`);
    });
  };

  // Inicjalizacja wszystkich sekcji z zakładkami
  const tabs = document.querySelectorAll('[data-tab]');
  if (tabs.length > 0) {
    tabs.forEach(initTabs);
  }
});