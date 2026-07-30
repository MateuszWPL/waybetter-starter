<?php
/**
 * functions.php — ZARZĄDZA PINEGROW. Nie edytuj ręcznie: PG nadpisuje ten plik
 * swoją wersją przy eksporcie. Swój kod pisz w inc/custom.php (PG go wymaga
 * w sekcji „Include Resources"). Tailwind wstrzykuje PG w „Enqueue Styles".
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

require_once get_template_directory() . '/inc/setup.php';
require_once get_template_directory() . '/inc/enqueue.php';
if ( class_exists( 'WooCommerce' ) ) {
	require_once get_template_directory() . '/inc/woo.php';
}

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
