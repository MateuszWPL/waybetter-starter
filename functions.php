<?php
/**
 * SPIS TREŚCI — FUNCTIONS.PHP
 * 1. NASZE MODUŁY (setup, enqueue, custom, woo)
 * 2. SEKCJE ZARZĄDZANE PRZEZ PINEGROW (markery — NIE usuwać!)
 *
 * ENQUEUE: front (build/main.css, build/main.js) ładuje inc/enqueue.php — NIE
 * resource manager Pinegrow, dlatego markery "Enqueue" zostają PUSTE (brak dublowania).
 * Sekcję "Include Resources" wypełnia Pinegrow przy eksporcie (helpery bloków,
 * navwalker, paginacja) — dlatego markery muszą tu być.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. NASZE MODUŁY
   ============================================ */
require_once get_template_directory() . '/inc/setup.php';
require_once get_template_directory() . '/inc/enqueue.php';
require_once get_template_directory() . '/inc/custom.php';

if ( class_exists( 'WooCommerce' ) ) {
	require_once get_template_directory() . '/inc/woo.php';
}

/* ============================================
   2. SEKCJE PINEGROW (nie usuwać markerów)
   ============================================ */

/* Pinegrow generated Include Resources Begin */
/* Pinegrow generated Include Resources End */

if ( ! function_exists( 'wbstarter_pg_enqueue' ) ) :
	function wbstarter_pg_enqueue() {

		/* Pinegrow generated Enqueue Scripts Begin */
		/* Pinegrow generated Enqueue Scripts End */

		/* Pinegrow generated Enqueue Styles Begin */
		/* Pinegrow generated Enqueue Styles End */

	}
	add_action( 'wp_enqueue_scripts', 'wbstarter_pg_enqueue' );
endif;
