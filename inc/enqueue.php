<?php
/**
 * SPIS TREŚCI
 * 1. ASSETY FRONTU (build/main.css, build/main.js)
 * 2. ASSETY EDYTORA GUTENBERGA (build/editor.css przez enqueue_block_assets — NIE add_editor_style, patrz R14)
 * 3. FAILSAFE: OSTRZEŻENIE O NIEAKTUALNYM CSS (tylko WP_DEBUG, R12)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. ASSETY FRONTU
   ============================================ */
function wbstarter_enqueue_assets() {
	$theme_ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'wbstarter-main', get_template_directory_uri() . '/build/main.css', array(), $theme_ver );
	wp_enqueue_script( 'wbstarter-main', get_template_directory_uri() . '/build/main.js', array(), $theme_ver, true );
}
add_action( 'wp_enqueue_scripts', 'wbstarter_enqueue_assets' );

/* ============================================
   2. ASSETY EDYTORA GUTENBERGA
   enqueue_block_assets trafia do iframe'a edytora bez przepisywania
   selektorów (add_editor_style łamie @layer Tailwinda 4 — Gutenberg #69833).
   ============================================ */
function wbstarter_enqueue_editor_assets() {
	if ( ! is_admin() ) {
		return;
	}
	$theme_ver = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'wbstarter-editor', get_template_directory_uri() . '/build/editor.css', array(), $theme_ver );
}
add_action( 'enqueue_block_assets', 'wbstarter_enqueue_editor_assets' );

/* ============================================
   3. FAILSAFE: CSS NIEAKTUALNY (WP_DEBUG)
   Źródła nowsze niż build = watchery nie działały. Zamiast cichej awarii — komunikat.
   ============================================ */
function wbstarter_stale_css_notice() {
	if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
		return;
	}
	$build = get_template_directory() . '/build/main.css';
	$src   = get_template_directory() . '/resources/css/main.css';
	if ( file_exists( $build ) && file_exists( $src ) && filemtime( $src ) > filemtime( $build ) ) {
		echo '<div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#dc2626;color:#fff;padding:8px 16px;font:14px sans-serif;text-align:center;">⚠ CSS nieaktualny — otwórz projekt skrótem start-projekt (watchery nie działają)</div>';
	}
}
add_action( 'wp_footer', 'wbstarter_stale_css_notice' );
