<?php
/**
 * inc/custom.php - TU PISZEMY NASZ KOD PHP.
 *
 * Pinegrow wymaga tego pliku (wciąga go w "Include Resources") i NIGDY go nie nadpisuje.
 * functions.php zostaw w spokoju - zarządza nim w całości Pinegrow (bloki, menusy, enqueue Tailwinda).
 *
 * Tu wpinamy:
 *   - inc/enqueue.php  → ładowanie naszych assetów (biblioteki, custom.css, main.js),
 *   - inc/woo.php      → WooCommerce (tylko gdy wtyczka aktywna),
 *   - własne funkcje projektowe (na dole).
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

// Ładowanie naszych assetów (front + edytor). Patrz inc/enqueue.php.
require_once __DIR__ . '/enqueue.php';

// WooCommerce - ładuj tylko gdy wtyczka aktywna.
if ( class_exists( 'WooCommerce' ) ) {
	require_once __DIR__ . '/woo.php';
}

/* ============================================
   FUNKCJE PROJEKTOWE - dodawaj poniżej
   ============================================ */

// Contact Form 7: nie owijaj pól w <p>/<br> - układ formularza robimy klasami Tailwinda
// (patrz skill /formularz-cf7). Filtr jest nieszkodliwy, gdy wtyczka jest nieaktywna.
add_filter( 'wpcf7_autop_or_not', '__return_false' );
