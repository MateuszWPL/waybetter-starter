<?php
/**
 * Theme setup — supports i menusy. (Plik wymagany przez functions.php.)
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! function_exists( 'wbstarter_setup' ) ) :
function wbstarter_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'editor-styles' );

	register_nav_menus( array(
		'primary' => __( 'Menu główne', 'wbstarter' ),
		'footer'  => __( 'Menu stopki', 'wbstarter' ),
	) );
}
add_action( 'after_setup_theme', 'wbstarter_setup' );
endif;
