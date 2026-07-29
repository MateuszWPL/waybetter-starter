document.addEventListener('DOMContentLoaded', () => {
  // Znajdujemy wszystkie przyciski otwierające popup modal
  const popupModalTriggers = document.querySelectorAll('.popup-modal-trigger');

  // Funkcja inicjalizująca pojedynczy popup modal
  const initPopupModal = (trigger) => {
    const popupModalId = trigger.getAttribute('data-popup-modal');
    const popupModal = document.getElementById(popupModalId);
    
    if (!popupModal) return;
    
    const body = document.body;
    
    // Funkcja przełączająca stan popup modala
    const togglePopupModal = (e) => {
      if (e) e.preventDefault();

      const isHidden = popupModal.classList.contains('hidden');

      if (isHidden) {
        // OTWIERANIE:
        popupModal.classList.remove('hidden');
        popupModal.classList.add('flex');
        
        body.style.overflow = 'hidden';
        popupModal.removeAttribute('aria-hidden');
      } else {
        // ZAMYKANIE:
        popupModal.classList.remove('flex');
        popupModal.classList.add('hidden');
        
        body.style.overflow = 'auto';
        popupModal.setAttribute('aria-hidden', 'true');
      }
    };

    // ZAWSZE dodajemy nasłuchiwanie kliknięcia na przycisk otwierający
    trigger.addEventListener('click', togglePopupModal);
    
    // ============================================================
    // ZABEZPIECZENIE DLA WIELU PRZYCISKÓW DO JEDNEGO POPUPA
    // ============================================================
    if (popupModal.dataset.init === 'true') {
        return;
    }
    
    const popupModalCloseButtons = popupModal.querySelectorAll('.popup-modal-close');

    const closePopup = (e) => {
      if (e) e.preventDefault();
      popupModal.classList.remove('flex');
      popupModal.classList.add('hidden');
      body.style.overflow = 'auto';
      popupModal.setAttribute('aria-hidden', 'true');
    };
    
    const handleOutsideClick = (event) => {
      if (event.target === popupModal) {
        closePopup(event);
      }
    };
    
    // Dodawanie event listenerów zamykania (tylko raz na popup)
    popupModalCloseButtons.forEach(button => button.addEventListener('click', closePopup));
    popupModal.addEventListener('click', handleOutsideClick);
    
    // Oznaczamy popup jako zainicjowany, żeby kolejne przyciski wiedziały, że zamykanie już działa
    popupModal.dataset.init = 'true';
  };
  
  popupModalTriggers.forEach(initPopupModal);
});