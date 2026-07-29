document.addEventListener('DOMContentLoaded', function() {
    const dragSliders = document.querySelectorAll('.dragSlider');
    if (!dragSliders.length) return;

    dragSliders.forEach(dragSlider => {
        let isDragging = false;
        let startX;
        let scrollLeft;

        // Obsługa myszy
        dragSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - dragSlider.offsetLeft;
            scrollLeft = dragSlider.scrollLeft;
        });

        dragSlider.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        dragSlider.addEventListener('mouseup', () => {
            isDragging = false;
        });

        dragSlider.addEventListener('mousemove', (e) => {
            if(!isDragging) return;
            e.preventDefault();
            const x = e.pageX - dragSlider.offsetLeft;
            const walk = (x - startX);
            dragSlider.scrollLeft = scrollLeft - walk;
        });

        // Obsługa dotyku
        dragSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - dragSlider.offsetLeft;
            scrollLeft = dragSlider.scrollLeft;
        });

        dragSlider.addEventListener('touchend', () => {
            isDragging = false;
        });

        dragSlider.addEventListener('touchmove', (e) => {
            if(!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - dragSlider.offsetLeft;
            const walk = (x - startX);
            dragSlider.scrollLeft = scrollLeft - walk;
        });
    });
});