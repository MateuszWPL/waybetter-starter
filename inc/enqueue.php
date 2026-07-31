<?php
/**
 * SPIS TREŚCI - ŁADOWANIE ASSETÓW (zero builda, pliki wprost z assets/)
 * 1. KONFIGURACJA - które moduły JS ładować (per projekt: true/false)
 * 2. FRONT - biblioteki (warunkowo) + moduły + main.js (wszystko strategy=defer)
 * 3. FRONT + EDYTOR - style komponentów (components.css, custom.css, animations.css)
 *
 * Tailwind (tailwind_theme/tailwind.css) ładuje Pinegrow (sekcje w functions.php).
 * Biblioteki są „vendored" w assets/vendor/ - zarządza je npm (`npm run vendors`).
 * Animacje on-scroll: CSS (animations.css) + reveal.js (fallback) - bez biblioteki.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. KONFIGURACJA MODUŁÓW (edytuj per projekt)
   true = ładuj, false = pomiń. Vendor (Swiper) ładuje się TYLKO gdy włączony moduł, który go wymaga.
   ============================================ */
function wbstarter_modules() {
	return array(
		'mobilemenu'   => true,
		'custom'       => true,   // scroll headera
		'reveal'       => true,   // fallback animacji on-scroll (nowoczesne przeglądarki: sam CSS)
		'sliders'      => true,   // wymaga biblioteki Swiper
		'accordion'    => false,
		'tabs'         => false,
		'popup'        => false,
		'modalgallery' => false,
		'dragscroll'   => false,
		'megamenu'     => false,
	);
}

/* ============================================
   2. FRONT
   ============================================ */
function wbstarter_enqueue_front() {
	$uri   = get_template_directory_uri();
	$ver   = wp_get_theme()->get( 'Version' );
	$mods  = wbstarter_modules();
	$defer = array( 'strategy' => 'defer', 'in_footer' => true );

	// Biblioteka Swiper - tylko gdy włączony moduł jej wymagający.
	$needs_swiper = ! empty( $mods['sliders'] );
	if ( $needs_swiper ) {
		wp_enqueue_style( 'wbstarter-swiper', $uri . '/assets/vendor/swiper-bundle.min.css', array(), $ver );
		wp_enqueue_script( 'wbstarter-swiper', $uri . '/assets/vendor/swiper-bundle.min.js', array(), $ver, $defer );
	}

	// Mapa modułów → [ ścieżka pliku, zależności skryptowe ]
	$modules = array(
		'mobilemenu'   => array( 'assets/js/modules/mobilemenu.js',   array() ),
		'custom'       => array( 'assets/js/modules/custom.js',       array() ),
		'reveal'       => array( 'assets/js/modules/reveal.js',       array() ),
		'sliders'      => array( 'assets/js/modules/sliders.js',      array( 'wbstarter-swiper' ) ),
		'accordion'    => array( 'assets/js/modules/accordion.js',    array() ),
		'tabs'         => array( 'assets/js/modules/tabs.js',         array() ),
		'popup'        => array( 'assets/js/modules/popup.js',        array() ),
		'modalgallery' => array( 'assets/js/modules/modalgallery.js', array() ),
		'dragscroll'   => array( 'assets/js/modules/dragscroll.js',   array() ),
		'megamenu'     => array( 'assets/js/modules/megamenu.js',     array() ),
	);

	foreach ( $modules as $name => $cfg ) {
		if ( empty( $mods[ $name ] ) ) { continue; }
		list( $path, $deps ) = $cfg;
		wp_enqueue_script( 'wbstarter-' . $name, $uri . '/' . $path, $deps, $ver, $defer );
	}

	// Entry (globalne inicjalizacje) - po modułach.
	wp_enqueue_script( 'wbstarter-main', $uri . '/assets/js/main.js', array(), $ver, $defer );

	/*
	 * WARUNKOWE ŁADOWANIE PER STRONA (opcjonalnie, wdrażasz na projekcie):
	 * ładuj ciężki asset tylko tam, gdzie faktycznie jest dany blok, np.:
	 *   if ( has_block( 'slugmotywu/hero-slider' ) ) { wp_enqueue_script( ... ); }
	 * UWAGA: namespace bloku = SLUG MOTYWU (pinegrow.json → wp-theme-info.slug),
	 * NIE "custom". Dokładną nazwę sprawdzisz po eksporcie w blocks/{blok}/block.json
	 * (pole "name") - inaczej has_block() zawsze zwróci false i skrypt się nie załaduje.
	 */
}
add_action( 'wp_enqueue_scripts', 'wbstarter_enqueue_front' );

/* ============================================
   3. FRONT + EDYTOR: style komponentów (Swiper, accordion, animacje...)
   enqueue_block_assets ładuje i na froncie, i w edytorze bloków - parity.
   ============================================ */
function wbstarter_enqueue_components() {
	$uri = get_template_directory_uri();
	$ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'wbstarter-components', $uri . '/assets/css/components.css', array(), $ver );
	wp_enqueue_style( 'wbstarter-custom', $uri . '/assets/css/custom.css', array(), $ver );
	wp_enqueue_style( 'wbstarter-animations', $uri . '/assets/css/animations.css', array(), $ver );
}
add_action( 'enqueue_block_assets', 'wbstarter_enqueue_components' );
