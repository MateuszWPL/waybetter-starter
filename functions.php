<?php
/**
 * SPIS TREŚCI — FUNCTIONS.PHP (tylko require modułów, logika w inc/)
 * 1. MODUŁY MOTYWU (setup, enqueue, custom)
 * 2. MODUŁ WOOCOMMERCE (warunkowo)
 * 3. HELPERY PINEGROW (dopisywane przez eksport PG — nie usuwać sekcji)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. MODUŁY MOTYWU
   ============================================ */
require_once get_template_directory() . '/inc/setup.php';
require_once get_template_directory() . '/inc/enqueue.php';
require_once get_template_directory() . '/inc/custom.php';

/* ============================================
   2. MODUŁ WOOCOMMERCE
   ============================================ */
if ( class_exists( 'WooCommerce' ) ) {
	require_once get_template_directory() . '/inc/woo.php';
}

/* ============================================
   3. HELPERY PINEGROW
   (PG przy eksporcie dokłada wp_pg_helpers itd. — sekcja zostaje dla F1)
   ============================================ */
