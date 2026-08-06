---
name: nowy-cpt
description: Rejestruje nowy Custom Post Type (i opcjonalnie taksonomię) w inc/custom.php wg konwencji zespołu oraz tworzy szablony archiwum i pojedynczego wpisu z wzorców archive-cpt.html / single-cpt.html. Używaj gdy użytkownik pisze /nowy-cpt [nazwa] lub prosi o custom post type / typ treści (realizacje, oferta, zespół, promocje...).
---

Argument: nazwa CPT (slug w liczbie mnogiej, kebab/snake, np. `realizacje`). Brak → zapytaj o nazwę.

CPT rejestrujemy w **PHP w `inc/custom.php`** (nasz teren), a nie w kreatorze CPT Pinegrow (ten pisze do `functions.php` = teren PG). To jest przenośne, wersjonowane i nie zależy od UI. Atrybut `cms-post-type="slug"` w szablonach to zwykły string, nie wymaga, żeby PG „znał" CPT.

## 1. Zbierz wymagania (subagent nie pyta, więc pytaj teraz)
- **Slug** (mnoga, np. `realizacje`) + **etykiety PL**: liczba pojedyncza („Realizacja") i mnoga („Realizacje").
- **Ikona** menu (dashicon, np. `dashicons-portfolio`, `dashicons-groups`, `dashicons-store`). Domyślnie `dashicons-admin-post`.
- **Taksonomia?** tak/nie. Jeśli tak: slug (np. `realizacje_kategorie`), etykieta, hierarchiczna (jak kategorie) czy płaska (jak tagi).
- **Archiwum?** (`has_archive`) - prawie zawsze tak.
- **Supports**: domyślnie `title, editor, thumbnail, excerpt` (dopytaj tylko, jeśli nietypowe).

## 2. Zarejestruj CPT w inc/custom.php
Dopisz pod nagłówkiem „FUNKCJE PROJEKTOWE". Użyj **prefiksu PHP tego projektu** (ten sam, co w innych funkcjach w `inc/`, podejrzyj `inc/enqueue.php`), NIE `wbstarter_`. Wzór (podmień slug/etykiety/ikonę; sekcję taksonomii pomiń, jeśli niepotrzebna):

```php
/* CPT: Realizacje */
function PREFIKS_cpt_realizacje() {
	register_post_type( 'realizacje', array(
		'labels' => array(
			'name'          => 'Realizacje',
			'singular_name' => 'Realizacja',
			'add_new_item'  => 'Dodaj realizację',
			'edit_item'     => 'Edytuj realizację',
			'all_items'     => 'Wszystkie realizacje',
			'not_found'     => 'Brak realizacji',
			'menu_name'     => 'Realizacje',
		),
		'public'       => true,
		'has_archive'  => true,
		'menu_icon'    => 'dashicons-portfolio',
		'rewrite'      => array( 'slug' => 'realizacje' ),
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'show_in_rest' => true, // wymagane dla edytora blokow (Gutenberg)
	) );

	register_taxonomy( 'realizacje_kategorie', 'realizacje', array(
		'labels' => array(
			'name'          => 'Kategorie realizacji',
			'singular_name' => 'Kategoria',
		),
		'public'       => true,
		'hierarchical' => true,   // true = jak kategorie, false = jak tagi
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'kategoria-realizacji' ),
	) );
}
add_action( 'init', 'PREFIKS_cpt_realizacje' );
```

Zaktualizuj spis treści na górze `inc/custom.php` (dopisz wpis o CPT), jeśli plik go prowadzi.

## 3. Utwórz szablony z wzorców
Skopiuj i podmień slug (przykład `realizacje` → docelowy slug, `realizacje_kategorie` → docelowa taksonomia). **W kopii USUŃ atrybut `wp-template-no-export`** z tagu `<html>` (wzorce go mają, żeby same się nie eksportowały; kopia MA się eksportować):
- `archive-cpt.html` → `archive-{slug}.html`; zmień `wp-template-export-as="archive-{slug}.php"`, usuń `wp-template-no-export`, podmień `cms-post-type="{slug}"`, taksonomię w `cms-tags`, tekst tytułu.
- `single-cpt.html` → `single-{slug}.html`; zmień `wp-template-export-as="single-{slug}.php"`, usuń `wp-template-no-export`, podmień `wp-template-post-template-types="{slug}"`, taksonomię, link „Wszystkie ...".

Nie ruszaj wzorców `archive-cpt.html` / `single-cpt.html` - zostają jako referencja dla następnego CPT.

## 4. (Opcjonalnie) blok listingu na stronę główną
Jeśli CPT ma być pokazany na stronie (nie tylko w archiwum), zaproponuj blok z pętlą `cms-post="loop" cms-post-type="{slug}"` przez `/nowa-sekcja`.

## 5. Walidacja i podsumowanie
- Odpal agenta **block-validator** na nowych szablonach.
- Podsumuj: co dopisano do `custom.php`, jakie pliki szablonów powstały.

## 6. Przypomnij użytkownikowi (kroki ręczne)
1. **Reload project w Pinegrow** (nowe pliki HTML są dla PG niewidzialne bez tego), potem eksport (Ctrl+M).
2. **Odśwież linki bezpośrednie:** WP → Ustawienia → Bezpośrednie odnośniki → Zapisz zmiany. Bez tego archiwum CPT i pojedyncze wpisy dają 404.
3. Sprawdź, że CPT pojawił się w menu WP i że dodanie wpisu + miniaturki działa.
