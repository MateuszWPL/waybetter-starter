<?php
/**
 * SPIS TREŚCI — inc/custom.php  (TU PISZEMY NASZ KOD — Pinegrow wymaga tego pliku)
 * 1. REJESTRACJA BLOKÓW (auto: wszystkie blocks/*/*_register.php)
 * 2. KATEGORIA BLOKÓW „Bloki dedykowane"
 * 3. FUNKCJE PROJEKTOWE (dodawaj tutaj)
 *
 * functions.php zostaw w spokoju — zarządza nim Pinegrow. Cały custom kod idzie tutaj.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. REJESTRACJA BLOKÓW PINEGROW (automatyczna)
   Rejestruje wszystkie bloki z folderu blocks/ — niezależnie od functions.php.
   ============================================ */
add_action( 'init', function () {
	$dir = get_template_directory() . '/blocks';
	if ( ! is_dir( $dir ) ) {
		return;
	}
	foreach ( glob( $dir . '/*/*_register.php' ) as $file ) {
		require_once $file;
	}
} );

/* ============================================
   2. KATEGORIA BLOKÓW
   ============================================ */
add_filter(
	version_compare( '5.8', get_bloginfo( 'version' ), '<=' ) ? 'block_categories_all' : 'block_categories',
	function ( $categories ) {
		return array_merge( $categories, array( array(
			'slug'  => 'custom_blocks',
			'title' => __( 'Bloki dedykowane', 'wbstarter' ),
		) ) );
	}
);

/* ============================================
   3. FUNKCJE PROJEKTOWE
   ============================================ */
