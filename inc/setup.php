<?php
/**
 * SPIS TREŚCI
 * 1. THEME SUPPORTS I MENUSY
 * 2. KATEGORIE BLOKÓW
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ============================================
   1. THEME SUPPORTS I MENUSY
   ============================================ */
function wbstarter_setup() {
	load_theme_textdomain( 'wbstarter' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'editor-styles' );

	register_nav_menus(
		array(
			'primary' => __( 'Menu główne', 'wbstarter' ),
			'footer'  => __( 'Menu stopki', 'wbstarter' ),
		)
	);
}
add_action( 'after_setup_theme', 'wbstarter_setup' );

/* ============================================
   2. KATEGORIE BLOKÓW
   ============================================ */
function wbstarter_block_categories( $categories ) {
	array_unshift(
		$categories,
		array(
			'slug'  => 'custom_blocks',
			'title' => __( 'Bloki dedykowane', 'wbstarter' ),
		)
	);
	return $categories;
}
add_filter( 'block_categories_all', 'wbstarter_block_categories' );
