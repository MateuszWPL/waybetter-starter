document.addEventListener('DOMContentLoaded', () => {
  const accordionContainers = document.querySelectorAll('[data-accordion]');

  accordionContainers.forEach(container => {
  // ---------------------------------------------------------
  // CZĘŚĆ 1: LOGIKA AKORDYONU
  // ---------------------------------------------------------
    const accordionButtons = container.querySelectorAll('[accordion-button]');

    // Sprawdzamy czy kontener ma atrybut open i otwieramy pierwszy element
    if (container.getAttribute('data-accordion') === 'open' && accordionButtons.length > 0) {
      const firstButton = accordionButtons[0];
      const firstPanel = firstButton.nextElementSibling;

      firstButton.classList.add('active');
      firstPanel.classList.add('active');
      firstPanel.style.height = firstPanel.scrollHeight + 'px';
    }

    accordionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isActive = panel.classList.contains('active');

        // Zamykamy wszystkie aktywne panele w tym samym kontenerze
        const activePanels = container.querySelectorAll('[accordion-panel].active');
        const activeButtons = container.querySelectorAll('[accordion-button].active');

        activePanels.forEach(activePanel => {
          activePanel.style.height = '0';
          setTimeout(() => {
            activePanel.classList.remove('active');
          }, 300);
        });

        activeButtons.forEach(activeBtn => {
          activeBtn.classList.remove('active');
        });

        // Jeśli kliknięty panel nie był aktywny, otwieramy go
        if (!isActive) {
          panel.classList.add('active');
          panel.style.height = panel.scrollHeight + 'px';
          btn.classList.add('active');
        }

        //Refresh AOS
        if (typeof refreshAOSAfter === 'function') {
           refreshAOSAfter(300);
        }
      });
    });

  // ---------------------------------------------------------
  // CZĘŚĆ 2: LOGIKA "POKAŻ WIĘCEJ"
  // ---------------------------------------------------------
    // 1. Sprawdzamy, czy kontener ma atrybut blokujący zwijanie (np. data-show-all)
    if (container.hasAttribute('data-show-all')) {
        return;
    }

    // 2. Pobieramy limit z HTML lub ustawiamy domyślnie 5
    const limitAttr = container.getAttribute('data-limit');
    const itemsToShow = limitAttr ? parseInt(limitAttr) : 5; 

    const allItems = container.querySelectorAll('.accordion-item');

    if (allItems.length > itemsToShow) {
      
      for (let i = itemsToShow; i < allItems.length; i++) {
        allItems[i].style.display = 'none';
      }

      const showMoreBtn = document.createElement('button');
      showMoreBtn.classList.add('show-more-btn');
      showMoreBtn.innerText = 'Pokaż więcej';
      
      container.after(showMoreBtn);

      showMoreBtn.addEventListener('click', () => {
        const isExpanded = showMoreBtn.classList.contains('expanded');

        if (!isExpanded) {
          for (let i = itemsToShow; i < allItems.length; i++) {
            allItems[i].style.display = '';
            allItems[i].style.animation = 'fadeIn 0.5s ease';
          }
          showMoreBtn.innerText = 'Schowaj';
          showMoreBtn.classList.add('expanded');
        } else {
          for (let i = itemsToShow; i < allItems.length; i++) {
            allItems[i].style.display = 'none';
          }
          showMoreBtn.innerText = 'Pokaż więcej';
          showMoreBtn.classList.remove('expanded');
          
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (typeof refreshAOSAfter === 'function') {
            refreshAOSAfter(100); 
          }
      });
    }
  });
});