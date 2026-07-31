<?php
/**
 * functions.php - GENERUJE I W PEŁNI ZARZĄDZA PINEGROW. NIE EDYTUJ RĘCZNIE.
 *
 * Pinegrow sam wypełnia sekcje /* Pinegrow generated ... *​/ przy eksporcie:
 * rejestrację bloków, menusy, kategorie, enqueue Tailwinda, helpery bloków.
 * Nie musisz tu nic dopisywać - nawet bloków (robi to sekcja "Register Pinegrow Blocks").
 *
 * SWÓJ kod PHP pisz w  inc/custom.php  (Pinegrow wciąga go w "Include Resources").
 * Ładowanie własnych assetów (biblioteki, custom.css, main.js) robi  inc/enqueue.php
 * (wpięty z inc/custom.php). Tu NIE dokładamy własnych require - bo PG nadpisze plik.
 */

if ( ! function_exists( 'wbstarter_theme_setup' ) ) :
function wbstarter_theme_setup() {

	/* Pinegrow generated Load Text Domain Begin */
	load_theme_textdomain( 'wbstarter', get_template_directory() . '/languages' );
	/* Pinegrow generated Load Text Domain End */

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );

	register_nav_menus( array(
		'primary' => __( 'Menu główne', 'wbstarter' ),
	) );

	/* Pinegrow generated Register Menus Begin */
	/* Pinegrow generated Register Menus End */

	/* Pinegrow generated Image sizes Begin */
	/* Pinegrow generated Image sizes End */

	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );
}
endif;
add_action( 'after_setup_theme', 'wbstarter_theme_setup' );


if ( ! function_exists( 'wbstarter_theme_init' ) ) :
function wbstarter_theme_init() {

	/* Pinegrow generated Custom Post Types Begin */
	/* Pinegrow generated Custom Post Types End */

	/* Pinegrow generated Taxonomies Begin */
	/* Pinegrow generated Taxonomies End */
}
endif;
add_action( 'init', 'wbstarter_theme_init' );


/*
 * Pliki zasobów dołączane przez Pinegrow (nasz kod: inc/custom.php + helpery bloków).
 */
/* Pinegrow generated Include Resources Begin */
require_once "inc/custom.php";
if( !class_exists( 'PG_Helper_v2' ) ) { require_once "inc/wp_pg_helpers.php"; }
if( !class_exists( 'PG_Blocks_v7' ) ) { require_once "inc/wp_pg_blocks_helpers.php"; }
/* Pinegrow generated Include Resources End */


if ( ! function_exists( 'wbstarter_enqueue_scripts' ) ) :
function wbstarter_enqueue_scripts() {

	/* Pinegrow generated Enqueue Scripts Begin */
	/* Pinegrow generated Enqueue Scripts End */

	/* Pinegrow generated Enqueue Styles Begin */

	wp_deregister_style( 'wbstarter-tailwind' );
	wp_enqueue_style( 'wbstarter-tailwind', get_template_directory_uri() . '/tailwind_theme/tailwind.css', [], '1.0.0', 'all');

	wp_deregister_style( 'wbstarter-style' );
	wp_enqueue_style( 'wbstarter-style', get_bloginfo('stylesheet_url'), [], '1.0.0', 'all');

	/* Pinegrow generated Enqueue Styles End */
}
add_action( 'wp_enqueue_scripts', 'wbstarter_enqueue_scripts' );
endif;


/* Rejestracja bloków edytora - Pinegrow sam dopisuje require dla każdego bloku. */
if ( ! function_exists( 'wbstarter_blocks_init' ) ) :
function wbstarter_blocks_init() {
	// Nie edytuj między poniższymi komentarzami - zarządza Pinegrow.
	/* Pinegrow generated Register Pinegrow Blocks Begin */
	/* Pinegrow generated Register Pinegrow Blocks End */
}
add_action( 'init', 'wbstarter_blocks_init' );
endif;


/* Kategorie bloków. */
function wbstarter_register_blocks_categories( $categories ) {
	/* Pinegrow generated Register Blocks Category Begin */

$categories = array_merge( $categories, array( array(
		'slug' => 'custom_blocks',
		'title' => __( 'Bloki dedykowane', 'wbstarter' )
	) ) );

	/* Pinegrow generated Register Blocks Category End */
	return $categories;
}
add_action( version_compare( '5.8', get_bloginfo( 'version' ), '<=' ) ? 'block_categories_all' : 'block_categories', 'wbstarter_register_blocks_categories' );


/* Wsparcie edytora bloków. */
function wbstarter_setup_theme_supports() {
	/* Pinegrow generated Theme Supports Begin */

//Tell WP to scope loaded editor styles to the block editor
add_theme_support( 'editor-styles' );
	/* Pinegrow generated Theme Supports End */
}
add_action( 'after_setup_theme', 'wbstarter_setup_theme_supports' );


/* Style edytora bloków. */
function wbstarter_add_blocks_editor_styles() {
	/* Pinegrow generated Load Blocks Editor Styles Begin */
	/* Pinegrow generated Load Blocks Editor Styles End */
}
add_action( 'admin_init', 'wbstarter_add_blocks_editor_styles' );
