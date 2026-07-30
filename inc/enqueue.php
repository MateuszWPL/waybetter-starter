<?php
/**
 * SPIS TREŚCI — ŁADOWANIE ASSETÓW (zero builda, pliki wprost z assets/)
 * 1. FRONT: style bibliotek (Splide, AOS) + skrypty (biblioteki → moduły → main.js)
 * 2. FRONT + EDYTOR: nasze style komponentów (components.css, custom.css)
 *
 * Tailwind (tailwind_theme/tailwind.css) ładuje Pinegrow (sekcje w functions.php).
 * Tailwind w edytorze Gutenberga: PG dokłada tailwind_for_wp_editor.css sam.
 * Biblioteki są "vendored" w assets/vendor/ i działają globalnie (bez importów/builda).
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. FRONT
   ============================================ */
function wbstarter_enqueue_front() {
	$uri = get_template_directory_uri();
	$ver = wp_get_theme()->get( 'Version' );

	// Style bibliotek
	wp_enqueue_style( 'wbstarter-splide', $uri . '/assets/vendor/splide-core.min.css', array(), $ver );
	wp_enqueue_style( 'wbstarter-aos', $uri . '/assets/vendor/aos.css', array(), $ver );

	// Biblioteki JS (globalne)
	wp_enqueue_script( 'wbstarter-splide', $uri . '/assets/vendor/splide.min.js', array(), $ver, true );
	wp_enqueue_script( 'wbstarter-splide-autoscroll', $uri . '/assets/vendor/splide-extension-auto-scroll.min.js', array( 'wbstarter-splide' ), $ver, true );
	wp_enqueue_script( 'wbstarter-aos', $uri . '/assets/vendor/aos.js', array(), $ver, true );

	// Nasze moduły (zawsze aktywne)
	wp_enqueue_script( 'wbstarter-mobilemenu', $uri . '/assets/js/modules/mobilemenu.js', array(), $ver, true );
	wp_enqueue_script( 'wbstarter-jscustom', $uri . '/assets/js/modules/custom.js', array(), $ver, true );
	wp_enqueue_script( 'wbstarter-sliders', $uri . '/assets/js/modules/sliders.js', array( 'wbstarter-splide', 'wbstarter-splide-autoscroll' ), $ver, true );

	// Moduły opcjonalne — odkomentuj gdy projekt używa:
	// wp_enqueue_script( 'wbstarter-accordion', $uri . '/assets/js/modules/accordion.js', array(), $ver, true );
	// wp_enqueue_script( 'wbstarter-tabs', $uri . '/assets/js/modules/tabs.js', array(), $ver, true );
	// wp_enqueue_script( 'wbstarter-popup', $uri . '/assets/js/modules/popup.js', array(), $ver, true );
	// wp_enqueue_script( 'wbstarter-modalgallery', $uri . '/assets/js/modules/modalgallery.js', array( 'wbstarter-splide' ), $ver, true );
	// wp_enqueue_script( 'wbstarter-dragscroll', $uri . '/assets/js/modules/dragscroll.js', array(), $ver, true );
	// wp_enqueue_script( 'wbstarter-megamenu', $uri . '/assets/js/modules/megamenu.js', array(), $ver, true );

	// Entry (init AOS + helpery) — po aos.js
	wp_enqueue_script( 'wbstarter-main', $uri . '/assets/js/main.js', array( 'wbstarter-aos' ), $ver, true );
}
add_action( 'wp_enqueue_scripts', 'wbstarter_enqueue_front' );

/* ============================================
   2. FRONT + EDYTOR: style komponentów (Splide, accordion, tabs...)
   enqueue_block_assets ładuje i na froncie, i w edytorze bloków — parity.
   ============================================ */
function wbstarter_enqueue_components() {
	$uri = get_template_directory_uri();
	$ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'wbstarter-components', $uri . '/assets/css/components.css', array(), $ver );
	wp_enqueue_style( 'wbstarter-custom', $uri . '/assets/css/custom.css', array(), $ver );
}
add_action( 'enqueue_block_assets', 'wbstarter_enqueue_components' );
