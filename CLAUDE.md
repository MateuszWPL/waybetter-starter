# Projekt: {{NAZWA_PROJEKTU}} — motyw WordPress (starter WB v0.9.0)

Motyw WP budowany w **Pinegrow 9.3** (bloki native-hybrid `cms-block*`) + **Tailwind 4** (wbudowany kompilator PG). **Zero builda** — custom CSS/JS to gotowe pliki serwowane wprost z `assets/`. Ten plik to KOMPLETNY kontekst pracy nad stroną — nie odwołuje się do niczego spoza projektu.

Starter jest **gotowym projektem Pinegrow** (niesie `pinegrow.json`, `projectdb.pgml`, `tailwind_theme/`, `index.html`, `blocks.html`) — otwierasz go przez **Open project** (nie „Create Classic theme"). Panel Design ma już przykładowe kolory (primary/secondary/accent), font Inter i klasę `max-w-site` (1324px); ustawienia WordPress (kategoria bloków „Customowe bloki", CSS edytora, WooCommerce off) są ustawione.

## Ścieżki projektu

- **Strona Local (WordPress):** `{{SCIEZKA_LOCAL}}` — tu jest WP, folder eksportu motywu, `wp-content/debug.log`.

## Jak co działa (zero builda)

- **Tailwind** kompiluje **Pinegrow na zapis** (wbudowany kompilator 4.2.2 → `tailwind_theme/tailwind.css`). Nic nie budujemy ręcznie.
- **Kolory/fonty/breakpointy** ustawia się w **panelu Design Pinegrow** (nie w kodzie). Wszystko ląduje w `tailwind_theme/tailwind.css` (`@theme`) + `_pginfo/fonts.json`, a definicje w `projectdb.pgml` (`<dmcolor>`, `<dmdesignskill skill="fonts">`). Pliki generuje PG — NIE edytuj ich ręcznie.
- **Kontener strony:** klasa `max-w-site` = **1324px** to natywna klasa Tailwinda, zdefiniowana w custom config kompilatora PG (`pinegrow.json` → `design-settings.custom_config`: `@theme { --container-site: 1324px; }`). Nie ma jej w custom.css. Zmiana szerokości = to pole (przez „Compiler & custom config…" w PG).
- **Custom CSS** → `assets/css/custom.css` (i `components.css`). Edytujesz → zapisujesz → odświeżasz przeglądarkę. Bez builda.
- **Custom JS** → `assets/js/main.js` i `assets/js/modules/*.js` (plain JS, bez `import`). Które moduły się ładują — ustawiasz w tablicy config na górze `inc/enqueue.php` (`true`/`false`), nie odkomentowywaniem. Wszystkie skrypty z `strategy=defer`.
- **Biblioteki (vendory):** tylko **Swiper** (slider) — plik w `assets/vendor/`, zarządzany przez npm: `npm run vendors` (kopiuje z `node_modules`, uruchamiane też po `npm install`). Runtime dalej zero-build. Patrz `assets/vendor/README.md`. Swiper ładuje się TYLKO gdy włączony moduł `sliders`.
- **Animacje on-scroll:** atrybut `data-anim="fade-up|fade|fade-left|fade-right|zoom"` (opcjonalnie `data-anim-delay="200"`). Robi to CSS (`assets/css/animations.css`, scroll-driven) na nowoczesnych przeglądarkach; starsze łapie fallback `reveal.js` (IntersectionObserver). Bez biblioteki, koniec AOS. Respektuje `prefers-reduced-motion`; brak wsparcia = treść widoczna.
- **Grafiki:** wrzuć jpg/png do `inc/img/` (jedyny folder na grafiki), potem jedna komenda **`npm run optimize`** robi webp (oryginał zostaje). W HTML referencja do `.webp`.

## Mapa plików — kto za co odpowiada

| Plik / folder | Rola | Kto edytuje |
|---|---|---|
| `functions.php` | Theme setup, menusy, enqueue Tailwinda, **auto-rejestracja bloków**, kategorie — pełne markery PG | **Pinegrow (nie tykać)** |
| `inc/custom.php` | NASZ kod PHP; wpina `enqueue.php` + warunkowo `woo.php`; miejsce na funkcje projektowe | Claude + człowiek |
| `inc/enqueue.php` | Ładowanie assetów. **Na górze tablica config `wbstarter_modules()`** (moduł → `true`/`false`) — tu włączasz moduły per projekt. Swiper ładowany warunkowo, skrypty `strategy=defer`. Style (components/custom/animations.css) front+edytor. Wzorzec `has_block()` w komentarzu | Claude + człowiek |
| `inc/woo.php` | Moduł WooCommerce (theme support + HPOS). Ładowany tylko gdy Woo aktywne | Claude + człowiek |
| `inc/img/` | Grafiki motywu (logo, favicon, placeholdery). Źródła jpg/png + wygenerowane `.webp` | człowiek + `npm run optimize` |
| `assets/css/custom.css` | Style projektowe (ostateczność po Tailwindzie): Swiper, pseudo-elementy, style wtyczek | Claude + człowiek |
| `assets/css/components.css` | Style komponentów JS (accordion, tabs, mobile menu, popup, gallery, megamenu, drag scroll) | Claude + człowiek |
| `assets/css/animations.css` | Animacje on-scroll `data-anim` (CSS scroll-driven + fallback dla `reveal.js`) | Claude + człowiek |
| `assets/js/main.js` | Entry point — miejsce na globalne inicjalizacje (ładowany po modułach) | Claude + człowiek |
| `assets/js/modules/*.js` | Moduły plain JS (włączane w config `enqueue.php`). **Domyślnie:** `mobilemenu`, `custom` (scroll headera), `reveal` (fallback animacji), `sliders`. **Opcjonalne:** `accordion`, `tabs`, `popup`, `modalgallery`, `dragscroll`, `megamenu` | Claude + człowiek |
| `assets/vendor/*` | **Swiper** (slider) — vendored, zarządzany przez npm (`npm run vendors`). Nie edytuj ręcznie. Wersje: `assets/vendor/README.md` | npm |
| `scripts/webp.js` | Konwerter `npm run optimize` (sharp): `inc/img/` jpg/png → webp, idempotentnie | rzadko |
| `scripts/vendors.js` | `npm run vendors` / `postinstall`: kopiuje biblioteki z `node_modules` → `assets/vendor/` | rzadko |
| `style.css` | Metadane motywu (nazwa, wersja, text-domain) | `/nowy-projekt` |
| `screenshot.png` | Grafika motywu (karta w Wygląd → Motywy) i miniatura projektu PG. Branding Way Better, 1200x900. Zostaje mimo rebrandingu (motyw jest autorstwa agencji) | rzadko |
| `index.html` | Master page projektu PG (`wp-template-define-master-page`) — z niej PG generuje `index.php` | Pinegrow (przez PG) |
| `blocks.html` | Katalog-demo bloków (`wp-template-no-export`) — tu lądują bloki z `/nowy-blok` | Pinegrow (przez PG) |
| `404.html`, `page.html`, `single.html`, `archive.html`, `search.html`, `parts.html` | Szablony stron WP (404 / strona / wpis / archiwum / wyszukiwanie + breadcrumbs i paginacja w `parts`). TW4, tokeny kolorów, `data-anim`. Otwierasz w PG (Reload project), dopasowujesz pod projekt | Claude + Pinegrow |
| `INSTRUKCJA.md` | Punkt wejścia dla zespołu: jak pracujemy, kolejność kroków, gdzie co jest | rzadko |
| `pinegrow.json` | Ustawienia projektu PG: WordPress Theme Settings (kategoria bloków, CSS edytora, WooCommerce off, folder/nazwa) + `design-settings.custom_config` (max-w-site) | **PG / `/nowy-projekt` (nie tykać ręcznie)** |
| `projectdb.pgml` | Panel Design: kolory (`<dmcolor>`) i fonty (`<dmdesignskill skill="fonts">`) | **Pinegrow (panel Design, nie tykać ręcznie)** |
| `theme.json` | Tokeny dla edytora Gutenberga (paleta, font sizes) — **PG generuje z palety** | **Pinegrow (nie tykać)** |
| `tailwind_theme/`, `_pginfo/` | Output kompilatora TW (`tailwind.css`, `tailwind_for_wp_editor.css`) + stan PG | **Pinegrow (nie tykać)** |

## ZAKAZY (twarde)

1. NIE edytuj: **`functions.php`** (generuje i utrzymuje go w całości Pinegrow — nadpisuje ręczne zmiany przy eksporcie!), `projectdb.pgml`, `pinegrow.json`, `_pginfo/`, `tailwind_theme/`, folderu eksportu w `wp-content/themes/`. **Bloki rejestruje Pinegrow sam** (marker „Register Pinegrow Blocks" w functions.php) — nie piszemy do tego żadnego kodu. **Cały nasz kod PHP → `inc/custom.php`** (PG go wymaga i nigdy nie nadpisuje).
2. NIE dodawaj bundlera/watcherów/kroku builda — świadomie ich nie ma.
3. NIE wymyślaj własnej składni atrybutów `cms-*` / `wp-*` / `wc-*` — wyłącznie wzorce z sekcji „Konwencje bloków" poniżej i z istniejących bloków projektu.
4. NIE dopisuj custom CSS, gdy istnieje klasa Tailwinda (Tailwind-first).

## Pisz jak człowiek — zero śladów AI (twarde, obowiązuje też subagentów)

Wszystko, co trafia do plików projektu (komentarze w kodzie, teksty w blokach, helpy pól, dokumentacja, komunikaty commitów, treści dla klienta), ma wyglądać jak napisane przez polskiego developera. Konkretnie:

1. **Zero atrybucji AI.** Żadnych „Generated by Claude/AI", „Co-Authored-By: Claude", stopek i emotek robota w commitach, wzmianek „jako AI/asystent". Commity: krótkie, rzeczowe, po polsku, bez stopek.
2. **Zero długich myślników „—" (em dash)** w generowanych treściach, komentarzach i commitach. Przeformułuj zdanie albo użyj przecinka, kropki, dwukropka, nawiasu lub zwykłego dywizu „-". Nie wprowadzaj ich także przy edycji istniejących plików.
3. **Zero frazesów AI**, po polsku i angielsku: „kluczowy", „warto zauważyć/zaznaczyć", „podsumowując", „w dzisiejszych czasach", „kompleksowy", „innowacyjny", „szeroka gama", „bogata oferta", „delve", „robust", „seamless", „leverage", „comprehensive". Unikaj konstrukcji „to nie tylko X, ale (też) Y" oraz odruchowych wyliczanek trójkami.
4. **Komentarze tylko tam, gdzie kod sam się nie tłumaczy** (ograniczenie, powód, pułapka). Nie opisuj, co robi następna linia; nie komentuj linia po linii; nie zostawiaj komentarzy o tym, co właśnie zmieniłeś.
5. **Zero emoji** w kodzie, komentarzach, commitach i treściach strony (wyjątek: design wprost ich wymaga).
6. **Typografia:** w kodzie wyłącznie proste cudzysłowy (' i "); polskie „..." tylko w treściach dla ludzi. W tekstach na stronę bez nadmiaru pogrubień i list punktowanych; klient dostaje naturalne akapity, nie ustrukturyzowany raport.
7. **Teksty-placeholdery w blokach:** naturalna polszczyzna pod branżę klienta, bez pompatycznych ogólników („dynamicznie rozwijająca się firma", „wychodzimy naprzeciw oczekiwaniom").

## Zasada WYŁĄCZNOŚCI Pinegrow ↔ Claude (najważniejsza reguła)

Pinegrow NIE wykrywa nowych/usuniętych plików z zewnątrz i może nadpisać zmiany z dysku wersją z pamięci. Dlatego:

- Jeśli Pinegrow jest otwarty — POPROŚ użytkownika o **Save All w Pinegrow** zanim zaczniesz edytować pliki, i przypominaj o tym przy edycji HTML.
- Po edycji (zwłaszcza po NOWYCH plikach) przypomnij: **„Reload project" w Pinegrow** (nie File Reload — tylko Reload project indeksuje nowe pliki).

## Zespół agentów AI (jak pracujemy nad sekcją)

Starter ma wyspecjalizowanych agentów — **jeden segment = jeden agent**. Do pełnej sekcji z Figmy użyj skilla **`/nowa-sekcja`** (prowadzi pipeline), do pojedynczego bloku **`/nowy-blok`**.

| Agent / skill | Kiedy | Co robi |
|---|---|---|
| `/nowa-sekcja` (skill) | budowa sekcji z Figmy | orkiestruje: wymagania → budowa → akcje → slidery → animacje → walidacja |
| `/nowy-blok` (skill) | pojedynczy blok | scaffold + walidacja |
| `pinegrow-block-expert` (budowniczy) | markup + wygląd | HTML+Tailwind pixel-perfect z Figmy, hovery + `cursor-pointer`, mobile-first |
| `interactions-expert` | interakcje | dobiera/podpina moduły JS (accordion, tabs, popup, lightbox, menu) + config enqueue |
| `swiper-expert` | slidery | konfiguracja Swipera w `sliders.js` (najpierw czyta docs, potem koduje) |
| `animation-expert` | animacje wejścia | `data-anim` minimalistycznie, bez zmian layoutu, pilnuje mobile |
| `block-validator` | po budowie | raport zgodności z konwencją (`[BŁĄD]`/`[OSTRZEŻENIE]`/`[SUGESTIA]`) |

**Zasady współpracy:**
- **Wymagania zbiera główny agent (Ty) PRZED delegacją** — subagent nie rozmawia z użytkownikiem. Agent bez kompletu danych zwróci listę pytań zamiast kodu; wtedy dopytaj (AskUserQuestion) i ponów delegację.
- Jeden agent = jeden segment; role się nie nakładają (budowniczy nie konfiguruje sliderów ani nie nakłada animacji itd.).
- Kolejność: struktura → akcje/slidery (dopinają hooki) → animacje (warstwa na gotowym) → walidacja.
- **Definicja sukcesu = pixel-perfect z Figmą** oraz identyczny wygląd front ↔ edytor Gutenberga.

## Style w edytorze WP — jak działa parity (front ↔ Gutenberg)

Cel: blok w edytorze wygląda identycznie jak na froncie. Zapewniają to dwie rzeczy:
- **Tailwind w edytorze:** wbudowany kompilator PG sam generuje `tailwind_theme/tailwind_for_wp_editor.css` i dokłada go do edytora — nie robimy tego ręcznie.
- **Style komponentów:** `inc/enqueue.php` ładuje `components.css` + `custom.css` hakiem **`enqueue_block_assets`** (trafiają i na front, i do iframe edytora — bez przepisywania selektorów). NIE używamy `add_editor_style()` (prefiksuje selektory i łamie `@layer` Tailwinda 4).
- functions.php ma `add_theme_support('editor-styles')` (marker PG) — potrzebne, by WP wczytał arkusze edytora.

Gdy edytor ≠ front: sprawdź, czy PG zrobił eksport (świeży `tailwind_for_wp_editor.css`) i czy dana klasa użyta jest w skanowanym HTML (klasy wpisywane ręcznie w polu „Dodatkowe klasy CSS" w Gutenbergu mogą się nie skompilować — używaj supports bloków lub krótkiej safelisty).

## Konwencje bloków (native-hybrid `cms-block*`)

### InnerContent — żelazne zasady
- **Nigdy dwa `cms-block-inner-content` na tym samym poziomie** w jednym bloku. Kolumny/strefy = osobne bloki-dzieci w jednym InnerContent, każde dziecko z własnym InnerContent.
- Zawsze jawny `cms-block-inner-content-allowed` (lista dozwolonych dzieci) + `cms-block-inner-content-template` (domyślny układ).
- Hierarchia parent → child czytelna z nazw (`hero-slider` → `hero-text-slide`).

```html
<div cms-block-inner-content
     cms-block-inner-content-template="[ [ '${this}/hero-slider', {} ], [ '${this}/hero-banners', {} ] ]"
     cms-block-inner-content-allowed="hero-slider hero-banners">
  <div cms-block="hero-slider"> ... własny inner-content ... </div>
</div>
```

### Supports — edycja dla nietechnicznego klienta
Minimum na KAŻDEJ sekcji głównej:
```html
cms-block-supports="spacing.padding,spacing.margin,anchor,color.background,color.text,typography.fontSize"
```
Kolory z palety `theme.json` (klient wybiera z naszych tokenów). Gdzie supports nie wystarczą (wariant układu) → pole `select`.

### Pola bloków — komplet atrybutów
```html
cms-block-field="slide_heading"
cms-block-field-title="Nagłówek"          <!-- po polsku -->
cms-block-field-type="content"            <!-- content | image | link | attr | none -->
cms-block-field-control="richtext"        <!-- richtext | image | link | select | input | toggle -->
cms-block-field-default-value="..."
cms-block-field-if-empty="if"
cms-block-field-help="Wskazówka dla klienta"
```
WooCommerce: atrybuty `wc-*` (`wc-cats`, `wc-product-link`, `wc-product-thumbnail`…) — **zawsze z komentarzem** co robią.

### Nazewnictwo
| Element | Konwencja | Przykłady |
|---|---|---|
| Bloki `cms-block` | kebab-case | `main-hero-section`, `feature-tile` |
| Tytuły `cms-block-title` | po polsku, opisowe | „Sekcja cateringowa" |
| Pola `cms-block-field` | `blok_element` / `blok_element_N` | `slide_heading`, `banner_img` |
| ID elementów | tylko dla anchorów; `nazwasekcji-element` | `kontakt`, `oferta-heading` |
| Klasy własne (nie-TW) | camelCase (komponenty JS) | `heroSectionSlider` |
| Grafiki | webp, bez spacji, opisowo | `logo_dark.svg`, `1280x600.webp` |
| Prefiks PHP | `{{PREFIKS}}_` na wszystkich funkcjach | `{{PREFIKS}}_force_stock_text()` |

### Slidery (Swiper)
- Kontener `class="[nazwa]Slider swiper"` (np. `heroSectionSlider`). Struktura Swiper: `.swiper-wrapper` > `.swiper-slide`; **slajd = osobny blok** (`<div cms-block="hero-text-slide" class="swiper-slide">`).
- Nawigacja/paginacja wewnątrz kontenera: `.swiper-button-next` / `.swiper-button-prev` / `.swiper-pagination` (`aria-label` po polsku).
- Warianty kontenerów obsługiwane w starterze: `basicSlider` (paginacja+strzałki, 1 / od 1024px: 2) i `autoSlider` (ciągły auto-scroll/marquee).
- **Konfiguracja wyłącznie w `assets/js/modules/sliders.js`** (per klasa slidera, breakpoint 1024). Żadnej konfiguracji Swiper w HTML — decyduje klasa kontenera.

### Animacje wejścia (on-scroll)
- Atrybut `data-anim="fade-up|fade|fade-left|fade-right|zoom"` na elemencie; opcjonalnie `data-anim-delay="200"` (ms, działa w fallbacku). Bez `data-aos` (koniec AOS).
- Mechanizm: CSS scroll-driven (`animations.css`) + fallback `reveal.js` — nic nie inicjalizujesz w JS. Dynamiczna treść: `window.wbReveal.scan()`.

### Tailwind-first (zasada twarda)
- Wszystko co się da — klasami TW, w tym arbitrary values (`hover:text-[#B0246D]`, `shadow-[0_4px_4px_rgba(0,0,0,0.25)]`), cienie, gradienty, warianty.
- `custom.css` to ostateczność — tylko: style Swiper (pagination/arrows), pseudo-elementy niemożliwe w TW, style wtyczek.
- Kolory NIE hardcodowane po plikach — tokeny z panelu Design PG. (Antywzorzec: `input:focus { border: 1px solid #B0246D !important }` → klasa `focus:border-[...]` lub token.)

### Spis treści w plikach kodu
Każdy plik z funkcjami/stylami (`custom.php`, `woo.php`, `custom.css`, `components.css`, moduły JS) ma **spis treści na górze + numerowane sekcje**. Aktualizujesz go przy każdej zmianie.

### Czego NIE robić
Dwa InnerContent obok siebie · sekcja bez `cms-block-supports` · InnerContent bez `-allowed`/`-template` · spacje/numery aparatu w nazwach grafik · custom CSS gdy istnieje klasa TW · funkcje PHP bez prefiksu · Swiper konfigurowany w HTML · `wc-*` bez komentarza · ID „na zapas" (tylko dla anchorów).

## Workflow z Figmą

Sekcja po sekcji (duże frame'y przekraczają limit MCP): najpierw `get_metadata`, potem `get_code`/`get_image` dla pojedynczej sekcji. Wartości z variables (`get_variable_defs`), nie „na oko". Po zbudowaniu bloku ZAWSZE porównaj render ze screenshotem frame'a.

## Definicja „skończone" (blok/sekcja)

Działa na stronie demo i w Gutenbergu (wygląd identyczny front ↔ edytor), przeszedł walidację (agent block-validator), klasy Tailwinda działają, brak błędów w `debug.log`, użytkownik zrobił Reload project w PG.
