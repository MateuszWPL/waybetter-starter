//Splide sliders code

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

document.addEventListener('DOMContentLoaded', function () {
    // Initialization (basicSliders)
    function initBasicSlider() {
        const basicSliders = document.querySelectorAll('.basicSlider');
        if (basicSliders.length === 0) return;
    
        basicSliders.forEach(slider => {
            if (slider.querySelectorAll('.splide__slide').length === 0) return;
    
            const splideInstance = new Splide(slider, {
                type: 'loop',
                gap: '1.125rem',
                perPage: 2,
                perMove: 2,
                autoplay: false,
                interval: 5000,
                pagination: true,
                arrows: true,
                breakpoints: {
                    1024: {
                        arrows: false,
                        perPage: 1,
                        perMove: 1,
                    },
                },
            }).mount();
        });
    }

    // Initialization Auto Scroll Sliders
    function initAutoSlider() {
        const autoSliders = document.querySelectorAll('.autoSlider');
        if (autoSliders.length === 0) return;
    
        autoSliders.forEach(slider => {
            if (slider.querySelectorAll('.splide__slide').length === 0) return;
    
            const splideInstance = new Splide(slider, {
                type: 'loop',
                drag: 'free',
                gap: '5rem',
                pagination: false,
                arrows: false,
                perPage: 'auto',          
                autoWidth: true, 
                clones: 20,
                trimSpace: false, 
                focus: 0,         
                start: 0,
                breakpoints: {
                    1024: {
                        gap: '3rem',
                        autoScroll: {
                            speed: 1,
                        },
                    },
                },
                autoScroll: {
                    pauseOnHover: false,
                    speed: 1.5,
                    waitForTransition: false,
                    rewind: false,
                    disableOnInteraction: false
                },
            }).mount({ AutoScroll });
        });
    }
    
// Initialization sliders
    initBasicSlider();
    initAutoSlider();
});
