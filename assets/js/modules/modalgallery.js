class Gallery {
    constructor() {
        // Required items
        if (!document.getElementById('modalLightbox') || !document.getElementById('ModalLightboxImage')) {
            console.warn('Required gallery elements not found');
            return;
        }

        this.currentIndex = 0;
        this.images = Array.from(document.querySelectorAll('.gallery-item img'));
        this.modal = document.getElementById('modalLightbox');
        this.modalImage = document.getElementById('ModalLightboxImage');
        this.pagination = document.getElementById('lightboxPagination');
        
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        this.startX = 0;
        
        this.setupEventListeners();
        if (this.pagination) {
            this.setupPagination();
        }
    }
 
    setupPagination() {
        // Creating pagination dots
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'w-2 h-2 rounded-full bg-white opacity-20';
            if (index === 0) {
                dot.classList.remove('opacity-20');
            }
            this.pagination.appendChild(dot);
        });
     }

    updatePagination() {
        if (!this.pagination) return;

        // Active dot update
        const dots = this.pagination.children;
        Array.from(dots).forEach((dot, index) => {
            dot.className = 'w-2 h-2 rounded-full ' + 
                (index === this.currentIndex ? 'bg-white' : 'bg-white opacity-20');
        });
    }

    setupEventListeners() {
        // Clicking on a thumbnail opens a lightbox
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => this.openModal(index));
        });

        const closeBtn = document.getElementById('closeModalLightbox');
        const prevBtn = document.getElementById('prevButton');
        const nextBtn = document.getElementById('nextButton');
 
        // Closing lightbox after clicking X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
                
        // Close lightbox after clicking background
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
 
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showPrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showNext();
            });
        }
 
        // Keyboard support (ESC, arrows)
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('hidden')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.showPrev();
                if (e.key === 'ArrowRight') this.showNext();
            }
        });

        // Touch events
        this.modalImage.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.isDragging = true;
        });

        this.modalImage.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
        });

        this.modalImage.addEventListener('touchend', (e) => {
            this.isDragging = false;
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Mouse events
        this.modalImage.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
        });

        document.addEventListener('mouseup', (e) => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.touchEndX = e.clientX;
            this.handleSwipe();
        });

        document.addEventListener('mouseleave', () => {
            this.isDragging = false;
        });
    }
 
    // Open lightbox
    openModal(index) {
        this.currentIndex = index;
        this.modalImage.src = this.images[index].src;
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        this.updatePagination();
    }
 
    // Closing lightbox
    closeModal() {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
 
    // Show next photo
    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex].src;
        this.updatePagination();
    }
 
    // Showing prev photo
    showPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.modalImage.src = this.images[this.currentIndex].src;
        this.updatePagination();
    }

    // Check Dragging
    handleSwipe() {
        const swipeThreshold = 40;
        const swipeLength = this.touchEndX - this.startX;
     
        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                this.showPrev();
            } else {
                this.showNext();
            }
        }
    }
 }
 
 // Initialize the gallery
 document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('galleryContainer');
    if (galleryContainer && document.querySelector('.gallery-item')) {
        new Gallery();
    }
 });