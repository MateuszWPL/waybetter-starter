<?php
/**
 * functions.php — motyw budowany w Pinegrow (classic theme).
 * WAŻNE: sekcje „Pinegrow generated ... Begin/End" to markery, w które Pinegrow
 * wstrzykuje kod przy eksporcie (menu, bloki, kategorie bloków, CPT itd.).
 * NIE usuwać markerów — bez nich PG nie zarejestruje m.in. bloków.
 *
 * Nasze rzeczy: enqueue assetów (assets/) robi inc/enqueue.php; Tailwind
 * (tailwind_theme/tailwind.css) wstrzykuje PG w sekcji „Enqueue Styles".
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   THEME SETUP (menusy, text domain, image sizes, supports)
   ============================================ */
if ( ! function_exists( 'wbstarter_setup' ) ) :
function wbstarter_setup() {

	/* Pinegrow generated Load Text Domain Begin */
	load_theme_textdomain( 'wbstarter', get_template_directory() . '/languages' );
	/* Pinegrow generated Load Text Domain End */

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );

	register_nav_menus( array(
		'primary' => __( 'Menu główne', 'wbstarter' ),
		'footer'  => __( 'Menu stopki', 'wbstarter' ),
	) );

	/* Pinegrow generated Register Menus Begin */
	/* Pinegrow generated Register Menus End */

	/* Pinegrow generated Image sizes Begin */
	/* Pinegrow generated Image sizes End */

	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
}
endif;
add_action( 'after_setup_theme', 'wbstarter_setup' );

/* ============================================
   INIT (custom post types, taksonomie)
   ============================================ */
if ( ! function_exists( 'wbstarter_init' ) ) :
function wbstarter_init() {
	/* Pinegrow generated Custom Post Types Begin */
	/* Pinegrow generated Custom Post Types End */

	/* Pinegrow generated Taxonomies Begin */
	/* Pinegrow generated Taxonomies End */
}
endif;
add_action( 'init', 'wbstarter_init' );

/* ============================================
   NAZWY CUSTOMOWYCH ROZMIARÓW OBRAZKÓW
   ============================================ */
if ( ! function_exists( 'wbstarter_custom_image_sizes_names' ) ) :
function wbstarter_custom_image_sizes_names( $sizes ) {
	/* Pinegrow generated Image Sizes Names Begin*/
	/* Pinegrow generated Image Sizes Names End */
	return $sizes;
}
add_filter( 'image_size_names_choose', 'wbstarter_custom_image_sizes_names' );
endif;

/* ============================================
   SIDEBARY / OBSZARY WIDGETÓW
   ============================================ */
if ( ! function_exists( 'wbstarter_widgets_init' ) ) :
function wbstarter_widgets_init() {
	/* Pinegrow generated Register Sidebars Begin */
	/* Pinegrow generated Register Sidebars End */
}
add_action( 'widgets_init', 'wbstarter_widgets_init' );
endif;

/* ============================================
   CUSTOMIZER
   ============================================ */
if ( ! function_exists( 'wbstarter_customize_register' ) ) :
function wbstarter_customize_register( $wp_customize ) {
	/* Pinegrow generated Customizer Controls Begin */
	/* Pinegrow generated Customizer Controls End */
}
add_action( 'customize_register', 'wbstarter_customize_register' );
endif;
function pgwp_sanitize_placeholder( $input ) { return $input; }

/* ============================================
   ENQUEUE ZARZĄDZANY PRZEZ PINEGROW (Tailwind + style.css)
   Nasze assety (vendor/JS/CSS) ładuje osobno inc/enqueue.php.
   ============================================ */
if ( ! function_exists( 'wbstarter_pg_enqueue' ) ) :
function wbstarter_pg_enqueue() {
	/* Pinegrow generated Enqueue Scripts Begin */
	/* Pinegrow generated Enqueue Scripts End */

	/* Pinegrow generated Enqueue Styles Begin */
	/* Pinegrow generated Enqueue Styles End */
}
add_action( 'wp_enqueue_scripts', 'wbstarter_pg_enqueue' );
endif;

/* ============================================
   NASZE MODUŁY (assety z assets/, WooCommerce)
   inc/custom.php dokłada Pinegrow w „Include Resources" niżej.
   ============================================ */
require_once get_template_directory() . '/inc/enqueue.php';
if ( class_exists( 'WooCommerce' ) ) {
	require_once get_template_directory() . '/inc/woo.php';
}

/* ============================================
   HELPERY PINEGROW (custom.php, bloki, navwalker, paginacja)
   ============================================ */
/* Pinegrow generated Include Resources Begin */
/* Pinegrow generated Include Resources End */

/* ============================================
   REJESTRACJA BLOKÓW PINEGROW
   ============================================ */
if ( ! function_exists( 'wbstarter_blocks_init' ) ) :
function wbstarter_blocks_init() {
	/* Pinegrow generated Register Pinegrow Blocks Begin */
	/* Pinegrow generated Register Pinegrow Blocks End */
}
add_action( 'init', 'wbstarter_blocks_init' );
endif;

/* ============================================
   KATEGORIE BLOKÓW
   ============================================ */
function wbstarter_register_blocks_categories( $categories ) {
	/* Pinegrow generated Register Blocks Category Begin */
	$categories = array_merge( $categories, array( array(
		'slug'  => 'custom_blocks',
		'title' => __( 'Bloki dedykowane', 'wbstarter' )
	) ) );
	/* Pinegrow generated Register Blocks Category End */
	return $categories;
}
add_action( version_compare( '5.8', get_bloginfo( 'version' ), '<=' ) ? 'block_categories_all' : 'block_categories', 'wbstarter_register_blocks_categories' );

/* ============================================
   THEME SUPPORTS DLA EDYTORA
   ============================================ */
function wbstarter_setup_theme_supports() {
	/* Pinegrow generated Theme Supports Begin */
	add_theme_support( 'editor-styles' );
	/* Pinegrow generated Theme Supports End */
}
add_action( 'after_setup_theme', 'wbstarter_setup_theme_supports' );

/* ============================================
   STYLE EDYTORA BLOKÓW (PG wstrzykuje tailwind_for_wp_editor.css)
   ============================================ */
function wbstarter_add_blocks_editor_styles() {
	/* Pinegrow generated Load Blocks Editor Styles Begin */
	/* Pinegrow generated Load Blocks Editor Styles End */
}
add_action( 'admin_init', 'wbstarter_add_blocks_editor_styles' );
