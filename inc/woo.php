<?php
/**
 * SPIS TREŚCI — MODUŁ WOOCOMMERCE (D8/D10)
 * Ładowany tylko gdy WooCommerce aktywny (patrz functions.php).
 * 1. WSPARCIE MOTYWU + DEKLARACJA HPOS
 * 2. (dalsze sekcje projektowe — checkout, ulubione itd.)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. WSPARCIE MOTYWU + DEKLARACJA HPOS
   ============================================ */
function wbstarter_woo_setup() {
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'wbstarter_woo_setup' );

// Deklaracja kompatybilności HPOS (custom order tables).
add_action(
	'before_woocommerce_init',
	function () {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', get_template_directory() . '/functions.php', true );
		}
	}
);
