<?php
/**
 * SPIS TREŚCI
 * Podział CSS/JS przy wbudowanym kompilatorze Pinegrow:
 *  - Tailwind (tailwind_theme/tailwind.css) — ładuje PG (functions.php).
 *  - Tailwind w edytorze (tailwind_for_wp_editor.css) — dokłada PG sam.
 *  - Nasze: JS + zebrane style komponentów (Splide, accordion... = build/extra.css) — tutaj.
 *
 * 1. FRONT: JS (build/main.js)
 * 2. FRONT + EDYTOR: style komponentów (build/extra.css)
 * 3. FAILSAFE: ostrzeżenie o nieaktualnym buildzie JS (WP_DEBUG)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. FRONT: JS
   ============================================ */
function wbstarter_enqueue_front() {
	$ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_script( 'wbstarter-main', get_template_directory_uri() . '/build/main.js', array(), $ver, true );
}
add_action( 'wp_enqueue_scripts', 'wbstarter_enqueue_front' );

/* ============================================
   2. FRONT + EDYTOR: style komponentów (Splide, accordion, tabs...)
   enqueue_block_assets ładuje i na froncie, i w edytorze bloków — parity.
   ============================================ */
function wbstarter_enqueue_components() {
	$ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'wbstarter-extra', get_template_directory_uri() . '/build/extra.css', array(), $ver );
}
add_action( 'enqueue_block_assets', 'wbstarter_enqueue_components' );

/* ============================================
   3. FAILSAFE: build JS starszy niż źródło (tylko WP_DEBUG)
   ============================================ */
function wbstarter_stale_notice() {
	if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
		return;
	}
	$build = get_template_directory() . '/build/main.js';
	$src   = get_template_directory() . '/resources/js/main.js';
	if ( file_exists( $build ) && file_exists( $src ) && filemtime( $src ) > filemtime( $build ) ) {
		echo '<div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#dc2626;color:#fff;padding:8px 16px;font:14px sans-serif;text-align:center;">⚠ Build JS nieaktualny — otwórz projekt skrótem start-projekt (watchery nie działają)</div>';
	}
}
add_action( 'wp_footer', 'wbstarter_stale_notice' );
