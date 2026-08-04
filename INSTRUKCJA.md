# INSTRUKCJA - zacznij tutaj

Motyw WordPress budujemy w **Pinegrow** (bloki + szablony) + **Tailwind 4** (kompiluje Pinegrow na zapis). **Nic nie budujemy w tle** - custom CSS/JS to gotowe pliki z `assets/`.

Ten plik to wszystko, co trzeba wiedzieć. Kolejność ma znaczenie - rób po kolei.

---

## 1. Zakładanie projektu (po kolei)

1. **Strona w Local** - załóż nową stronę WordPress w Local (musi istnieć przed startem).
2. **Rozpakuj startera** do `D:\Projekty\{nazwa}` (ZIP z GitHuba, bez `.git`).
3. **Claude Code** w folderze projektu → wpisz **`/nowy-projekt {nazwa}`**. To zrobi rebranding (nazwa, prefiks), przepisze ścieżki i odpali `npm install`.
4. **Pinegrow → Open project** (nie „Create Classic theme" - projekt jest już gotowy). Panel Design ma przykładowe kolory i font.
5. **Ustaw eksport** na folder motywu w Local (WordPress Theme Settings) i zrób pierwszy eksport: **Ctrl+M**.
6. **Aktywuj motyw** w WP (Wygląd → Motywy).
7. **Podmień kolory marki** w panelu Design PG (primary / secondary / accent) - reszta pójdzie automatycznie.

Od tej chwili budujesz stronę. **Header i stopka są już w masterze** (`index.html`) jako neutralny szkielet - przestylujesz je pod Figmę (logo, kolory, pozycje menu). Potem sekcje z Figmy.

---

## 2. Codzienna praca

**Podział ról:**
- Wygląd, układ, kolory, fonty → **Pinegrow** (panel Design).
- Kod, bloki, funkcje, formularze, audyty → **Claude Code**.

**Jedna żelazna zasada:** nigdy nie edytuj tego samego pliku w Pinegrow i Claude naraz.
- Zanim Claude rusza pliki: **Save All** w Pinegrow.
- Po zmianach Claude (zwłaszcza nowe pliki): **Reload project** w Pinegrow.

**Style:** klasy Tailwinda. Czego nie ma w TW → `assets/css/custom.css`. Kolory/fonty tylko w panelu Design.

**JS:** `assets/js/main.js` lub `assets/js/modules/`. Zapisujesz → odświeżasz przeglądarkę. Bez builda.

---

## 3. Grafiki

Wrzuć jpg/png do `inc/img/`, potem raz w terminalu:

```
npm run optimize
```

Robią się `.webp` (oryginał zostaje). W HTML zawsze używaj `.webp`.

---

## 4. Co masz gotowe (używaj, nie pisz od zera)

**Skille Claude Code** (wpisz `/nazwa`):
- **`/nowy-projekt`** - zakłada projekt (krok 1 wyżej).
- **`/nowa-sekcja`** - buduje pełną sekcję z Figmy (interakcje, slider, animacje, walidacja).
- **`/nowy-blok`** - pojedynczy blok.
- **`/nowy-cpt`** - rejestruje custom post type (np. realizacje, oferta, zespół) + szablony archiwum i wpisu.
- **`/formularz-cf7`** - przerabia formularz HTML+Tailwind na gotowy shortcode Contact Form 7.
- **`/audyt`** - przed oddaniem: skan dostępności (WCAG) i SEO, raport co poprawić.

**Header i stopka**: w masterze `index.html`, na każdej stronie. Neutralny szkielet - przestyluj pod Figmę.

**Szablony stron** (w rootcie, otwierasz w PG): `404`, `page`, `single`, `archive`, `search`, `parts` (breadcrumbs + paginacja) oraz wzorce CPT `archive-cpt` / `single-cpt`. Gotowe do dopasowania pod projekt.

**Biblioteka wzorców** `examples.html` - sprawdzone układy (przyciski, karty, paginacja, snap-scroll→grid). Otwórz w PG albo skopiuj markup do bloku.

**Moduły JS** (włączasz w `inc/enqueue.php` - tablica na górze, `true`/`false`): slider (Swiper), menu mobilne, accordion, tabs, popup, galeria (lightbox), megamenu, drag scroll, animacje wejścia (`data-anim`).

**Animacje:** dodaj atrybut `data-anim="fade-up"` (albo `fade`, `fade-left`, `fade-right`, `zoom`) na elemencie. Nic nie inicjalizujesz.

---

## 5. Gdzie czego szukać

| Chcę... | Plik / miejsce |
|---|---|
| Zmienić kolory / fonty | Panel Design w Pinegrow |
| Dopisać własny styl | `assets/css/custom.css` |
| Style komponentów (menu, popup, CF7) | `assets/css/components.css` |
| Włączyć/wyłączyć moduł JS | `inc/enqueue.php` (tablica na górze) |
| Napisać własny kod PHP | `inc/custom.php` (nigdy `functions.php`) |
| Dodać custom post type | skill `/nowy-cpt` |
| Skopiować gotowy układ (przycisk, karta) | `examples.html` |
| WooCommerce | `inc/woo.php` (ładuje się, gdy wtyczka aktywna) |
| Stan i checklist projektu | `PROJEKT.md` |
| Pełne konwencje i zasady | `CLAUDE.md` |

**Nie ruszaj:** `functions.php`, `pinegrow.json`, `projectdb.pgml`, `theme.json`, `tailwind_theme/`, `_pginfo/` - zarządza nimi Pinegrow.

---

## 6. Coś nie działa

- **Style nie działają na froncie** → zrób eksport z PG (Ctrl+M) i sprawdź, czy motyw jest aktywny.
- **Nowy plik/blok niewidoczny w PG** → **Reload project** (nie File Reload).
- **Blok wygląda inaczej w edytorze niż na froncie** → zrób świeży eksport z PG; sprawdź, czy użyte klasy są w skanowanym HTML.
- **Komponenty w edytorze wyglądają statycznie** (tabsy jeden pod drugim, slidy w siatce, popup w ramce) → to celowe. JS działa tylko na froncie, w edytorze pokazujemy zawartość tak, żeby dało się ją wygodnie edytować.
- **JS komponentu nie działa na froncie** → sprawdź w `inc/enqueue.php` (tablica na górze), czy dany moduł ma `=> true`. Jeśli używasz warunkowego `has_block()`, namespace bloku to slug motywu (np. `wbstarter/hero`), do sprawdzenia w `blocks/{blok}/block.json` (pole `name`).
- **Slider się nie uruchamia** → moduł `sliders => true`, kontener ma klasę wariantu (`basicSlider` albo `autoSlider`) i są w nim slajdy. Warning w konsoli o „loop mode" = za mało slajdów (dodaj slajdy albo wyłącz pętlę).
- **Podstrona CPT / archiwum daje 404** → WP → Ustawienia → Bezpośrednie odnośniki → Zapisz zmiany (przebudowa reguł przekierowań).
- **Menu puste na stronie** → WP → Wygląd → Menu → utwórz menu i przypisz je do lokalizacji (np. „Menu główne (nagłówek)").
- **Eksport pada: „Section Customizer Controls not found in functions.php"** → projekt założony ze starszej wersji startera (przed 0.14.1) nie ma funkcji `customize_register`, której potrzebują edytowalne pola header/stopki. Dodaj do `functions.php` (raz), potem eksport ponownie:
  ```php
  if ( ! function_exists( 'wbstarter_theme_customize_register' ) ) :
  function wbstarter_theme_customize_register( $wp_customize ) {
  	/* Pinegrow generated Customizer Controls Begin */
  	/* Pinegrow generated Customizer Controls End */
  }
  add_action( 'customize_register', 'wbstarter_theme_customize_register' );
  endif;
  ```
  Od startera 0.14.1 jest to w szkielecie domyślnie.
- **Font się nie wczytuje** → to 2 kroki: `@font-face` w `assets/css/custom.css` (sekcja 6) ORAZ dodanie rodziny jako token w panelu Design PG (bez tego klasa `font-nazwa` nie istnieje).
- **Nie wiem, co dalej** → `PROJEKT.md` (stan projektu), potem `CLAUDE.md` (zasady).

> Kontrola wersji (Git) - na razie nie używamy. Bazę Local trzymasz lokalnie.
