<?php
/**
 * inc/custom.php — TU PISZEMY NASZ KOD PHP.
 *
 * Pinegrow wymaga tego pliku (wciąga go w "Include Resources") i NIGDY go nie nadpisuje.
 * functions.php zostaw w spokoju — zarządza nim w całości Pinegrow (bloki, menusy, enqueue Tailwinda).
 *
 * Tu wpinamy:
 *   - inc/enqueue.php  → ładowanie naszych assetów (biblioteki, custom.css, main.js),
 *   - inc/woo.php      → WooCommerce (tylko gdy wtyczka aktywna),
 *   - własne funkcje projektowe (na dole).
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

// Ładowanie naszych assetów (front + edytor). Patrz inc/enqueue.php.
require_once __DIR__ . '/enqueue.php';

// WooCommerce — ładuj tylko gdy wtyczka aktywna.
if ( class_exists( 'WooCommerce' ) ) {
	require_once __DIR__ . '/woo.php';
}

/* ============================================
   DEMO / PLACEHOLDER — jednorazowy setup przy AKTYWACJI motywu.
   Tworzy: kategorię wpisów „Aktualności", stronę startową (ustawioną jako
   strona główna) i przykładowy wpis. Odpala się RAZ (flaga w opcjach WP).

   ⚠ W realnym projekcie klienta USUŃ całą tę sekcję (albo nie aktywuj startera
   na czystej instalacji). Aby odpalić ponownie w testach: skasuj opcję
   'wbstarter_demo_done' (np. w Narzędzia → lub deaktywuj i aktywuj motyw po
   usunięciu opcji).
   ============================================ */
add_action( 'after_switch_theme', 'wbstarter_demo_setup' );
function wbstarter_demo_setup() {
	if ( get_option( 'wbstarter_demo_done' ) ) {
		return;
	}

	// 1. Kategoria wpisów.
	if ( ! term_exists( 'aktualnosci', 'category' ) ) {
		wp_insert_term( 'Aktualności', 'category', array( 'slug' => 'aktualnosci' ) );
	}

	// 2. Strona startowa (placeholder) + ustaw jako stronę główną.
	$front_id = wp_insert_post( array(
		'post_title'   => 'Strona startowa',
		'post_status'  => 'publish',
		'post_type'    => 'page',
		'post_content' => '<!-- wp:paragraph --><p>Placeholder strony startowej — podmień treść lub złóż ją z bloków.</p><!-- /wp:paragraph -->',
	) );
	if ( $front_id && ! is_wp_error( $front_id ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $front_id );
	}

	// 3. Przykładowy wpis w kategorii.
	$cat = get_category_by_slug( 'aktualnosci' );
	wp_insert_post( array(
		'post_title'    => 'Przykładowy wpis',
		'post_status'   => 'publish',
		'post_type'     => 'post',
		'post_content'  => '<!-- wp:paragraph --><p>Przykładowy wpis testowy.</p><!-- /wp:paragraph -->',
		'post_category' => $cat ? array( $cat->term_id ) : array(),
	) );

	update_option( 'wbstarter_demo_done', 1 );
}

/* ============================================
   FUNKCJE PROJEKTOWE — dodawaj poniżej
   ============================================ */
