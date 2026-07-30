/* Megamenu Functionality */
document.addEventListener('DOMContentLoaded', () => {
  // Pobranie wszystkich przycisków megamenu
  const megamenuButtons = document.querySelectorAll('.megamenu-item button');
  
  // Funkcja zamykająca aktywne menu
  const closeActive = () => {
    document.querySelectorAll('[megamenu-panel].active').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.megamenu-item button.active').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.megamenu-item button svg.active').forEach(svg => svg.classList.remove('active'));
  };
 
  // Funkcja przełączająca stan megamenu
  const toggleMegamenu = (button) => {
    const megamenuPanelId = button.getAttribute('name');
    const megamenuPanel = document.getElementById(megamenuPanelId);
    const activeMegamenu = document.querySelector('[megamenu-panel].active');
    const svg = button.querySelector('svg');
 
    // Przełączanie klas dla aktywnego/nieaktywnego stanu
    const togglePanel = () => {
      button.classList.toggle('active');
      megamenuPanel.classList.toggle('active');
      svg.classList.toggle('active');
    };
 
    // Logika przełączania menu
    if (activeMegamenu) {
      if (activeMegamenu.id === megamenuPanelId) {
        togglePanel();
      } else {
        closeActive();
        togglePanel();
      }
    } else {
      togglePanel();
    }
  };
 
  // Nasłuchiwanie kliknięć na przyciskach menu
  megamenuButtons.forEach(button => {
    button.addEventListener('click', () => toggleMegamenu(button));
  });
 
  // Zamknięcie menu po kliknięciu poza nim
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.megamenu-item')) {
      closeActive();
    }
  });
 });