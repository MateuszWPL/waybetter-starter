# Projekt: {{NAZWA_PROJEKTU}} — motyw WordPress (starter WB v0.12.0)

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
| `assets/css/editor.css` | Parity edytora Gutenberga (tylko admin): neutralizacja CSS treści WP + statyczny podgląd komponentów JS. Scope `.editor-styles-wrapper` | Claude + człowiek |
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

## Style w edytorze WP - parity front ↔ Gutenberg (jak to naprawdę działa)

Canvas edytora bloków to **iframe**. WordPress wstrzykuje do niego style (hak `enqueue_block_assets`), ale **nigdy skryptów**. Stąd cała mechanika:

**Kolory i layout (parity wyglądu):**
- Do iframe idzie **surowy `tailwind_theme/tailwind.css`** (wpina go `inc/enqueue.php` przez `enqueue_block_assets` + `is_admin()`). Wprost, bez transformacji, więc `:root` (zmienne `--color-*`) i `@layer` działają. Kolory i utilities poprawne.
- **Nie polegamy** na `tailwind_for_wp_editor.css` z `add_editor_style()` (marker PG). WordPress przy `add_editor_style` przepisuje selektory (`:root` → `.editor-styles-wrapper`) i psuje `@layer`. To była przyczyna „rozwalonych" bloków w starym starterze: złe kolory nagłówków, rozjechane gridy/flexy. Arkusz PG zostaje (teren PG), ale po transformacji jest nieszkodliwy.
- **`assets/css/editor.css`** (ładowany tylko w adminie) neutralizuje niewarstwowy CSS treści edytora WP (marginesy i rozmiary nagłówków, listy, linki), który inaczej wygrywa z warstwowymi utilities Tailwinda 4. To mirror preflight, celowo bez `@layer`.
- `components.css` + `custom.css` + `animations.css` też lecą przez `enqueue_block_assets` (front i edytor).

**Komponenty JS w edytorze (celowo statyczne):**
JS nie działa w iframe, więc `editor.css` pokazuje komponenty statycznie i czytelnie do edycji: slidy w siatce 3 kolumn, tabsy jeden pod drugim, akordeon otwarty, popup i megamenu w przerywanej ramce z etykietą, animacje wejścia wyłączone (element widoczny). To ZAMIERZONE, na froncie wszystko działa normalnie. Warunek: komponent ma poprawne hooki (popup z klasą `.popup-modal`, slider `.swiper-wrapper` > `.swiper-slide`, tabsy `[tab-panel]` w `[data-tab-panels]`).

**Sterowanie wyglądem per blok - natywny wariant `wp-in-block-editor:`:**
Pinegrow ma wbudowany stan (wariant) **`wp-in-block-editor`** (panel klas → stany → WordPress; obok `wp-has-admin-bar`). Klasa z tym prefiksem działa TYLKO w edytorze bloków (kompiluje się do selektora scope'owanego pod `.editor-styles-wrapper`), na froncie nie robi nic. To PRECYZYJNE narzędzie per blok - używaj, gdy dany blok ma w edytorze wyglądać inaczej niż domyślnie: `hidden wp-in-block-editor:block` pokazuje w edytorze coś ukrytego na starcie, `wp-in-block-editor:grid-cols-2` daje własny układ podglądu. `editor.css` to automatyczny baseline dla wszystkich bloków; wariant to ręczna korekta pojedynczego. Żeby nadpisać regułę z `editor.css`, dodaj `!` (`wp-in-block-editor:grid-cols-2!`) - editor.css jest bez `@layer`, więc bez `!` utility przegra.

Gdy edytor ≠ front: zrób świeży eksport z PG; sprawdź, czy użyta klasa jest w skanowanym HTML (klasy wpisywane ręcznie w polu „Dodatkowe klasy CSS" mogą się nie skompilować, używaj supports bloków lub krótkiej safelisty).

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

### Supports — maksymalna edycja dla nietechnicznego klienta
Im więcej klient ustawi sam, tym lepiej. Minimum na KAŻDEJ sekcji głównej:
```html
cms-block-supports="spacing.padding,spacing.margin,spacing.blockGap,anchor,color.background,color.text,typography.fontSize,typography.lineHeight,align"
```
- Kolory z palety `theme.json` (klient wybiera z naszych tokenów, nie hardcode hexów).
- **Warianty układu = pole `select`** (liczba kolumn 2/3/4, wyrównanie, wariant kolorystyczny) mapowane na klasy Tailwinda, nie sztywny markup.
- **Odstępy między elementami** przez `spacing.blockGap` lub pole; paddingi/marginesy sekcji przez supports.
- **Breakpointów klient nie dotyka** — układ jest mobile-first w klasach TW i sam się dostosowuje. Dajemy gotowy responsywny wygląd, nie pole „breakpoint".
- Zasada przy przypisywaniu klas: myśl „co klient będzie chciał zmienić" i wystaw to jako supports albo pole, zamiast zaszywać na sztywno.

### Responsywność (breakpointy)
Używamy **standardowych breakpointów Tailwinda** (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536), mobile-first. Bez własnych breakpointów. Typowo:
- **mobile** = baza, bez prefiksu (projektuj od ~375px)
- **tablet** = `md:` (768px)
- **desktop** = `xl:` (1280px); dla sekcji, które w układzie desktopowym wyglądają dobrze wcześniej, `lg:` (1024px)

Każda sekcja ma przemyślany układ na mobile, tablecie i desktopie (nie „desktop, mobile później"). Żaden układ nie może wywoływać poziomego scrolla; kontener strony = `max-w-site` (1324px).

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

### Akcje WP - jak wpinać edytowalność (wzorce obowiązkowe)
Wzorce zebrane z 5 oddanych projektów (Rogowski, KokuSushi, Askdom, Proste Cło, Dozycia) i potwierdzone w docs Pinegrow. To jedyne poprawne sposoby, nie wymyślaj własnych.

**Link na przycisku / elemencie `<a>` (twarda zasada):** akcja Block Attribute z typem `link` na całym `<a>`. **ZAKAZ** wpinania href przez `cms-block-field-type="attr"` + `cms-block-field-attribute="href"` (klient traci wyszukiwarkę podstron w panelu, to błąd architektury). Tekst przycisku to OSOBNE pole content:
```html
<a href="#" class="..."
   cms-block-field="hero_cta" cms-block-field-type="link"
   cms-block-field-control="link" cms-block-field-title="Link: przycisk główny">
  <span cms-block-field="hero_cta_label" cms-block-field-type="content"
        cms-block-field-control="richtext" cms-block-field-title="Etykieta: przycisk główny">Poznaj ofertę</span>
</a>
```
Wariant bez spana: drugie pole na tym samym `<a>` przez `cms-block-field-2` + `cms-block-field-type-2="content"` + `cms-block-field-control-2="richtext"`.
Linki specjalne: strona główna = `cms-site-link="home"` · link posta w pętli = `cms-post-link` · link w headerze/stopce (customizer) = `cms-editable` + `cms-editable-type="link"` + `cms-editable-section`.

**Obrazek:** `cms-block-field-type="image"` + `cms-block-field-control="image"` (media library, WP sam generuje srcset). W pętlach postów: `cms-post-image="medium|large"` + `cms-post-image-sizes="..."` i ZAWSZE fallback:
```html
<img ... cms-post-image="medium" wp-if-has-post-thumbnail>
<img src="fallback.webp" ... wp-if-has-post-thumbnail="!">
```

**Tło sekcji z grafiką:** nie robimy edytowalnego CSS background-image. Wzorzec warstwowy: `<img class="absolute inset-0 h-full object-cover w-full z-0">` z polem image + opcjonalny gradient overlay (`z-10`) + treść (`relative z-20`), sekcja `relative overflow-hidden`. Tła jednolite = klasy `bg-*` z palety.

**Wariant układu / koloru / statusu:** pole select na atrybucie lub klasie:
```html
cms-block-field="karta_status" cms-block-field-type="attr"
cms-block-field-attribute="fill" cms-block-field-control="select"
cms-block-field-values="Zielony=#6EFF3A
Pomarańczowy=#F99A42"
```
(wartości rozdzielone nową linią, format `Etykieta=wartość` albo same wartości).

**Pętla postów:** `cms-post="loop"` + `cms-post-type` + `cms-post-type-order="date DESC"` + `cms-post-repeat="selektor"` + `cms-post-items-container` + `cms-post-show-empty-element` (zawsze element "brak wyników" z linkiem powrotu). Taksonomie na karcie: `cms-tags="taksonomia"` + `cms-tags-range`.

**Niepewność = dokumentacja, nie zgadywanie.** Jeśli nie wiesz, jak wpiąć akcję, czytasz docs Pinegrow (WebFetch): `pinegrow.com/docs/wordpress/actions/` (lista akcji), `.../actions/block-attributes/` (typy pól), `.../creating-custom-wordpress-blocks/the-complete-guide/`. Logiczne domysły przy akcjach WP są zakazane, kosztują 2x więcej czasu przy poprawkach.

### Przyciski (twarda zasada)
Wymiar przycisku wynika WYŁĄCZNIE z paddingów i tekstu, nigdy ze sztywnej szerokości:
- Szerokość: `w-fit` (domyślnie), `max-w-max`, `w-full` (formularze, mobile CTA). **ZAKAZ** `w-24`, `w-[200px]`, `min-w-*` wymuszających rozmiar. Wyjątek: kwadratowe przyciski-ikony (`size-14`, paginacja, hamburger).
- Padding wg Figmy, typowo `px-4`/`px-5`/`px-6` + `py-3`/`py-3.5`/`py-4`.
- Zawsze `cursor-pointer` + płynny hover (`duration-300` z `hover:scale-105`, `hover:bg-*`, zmiana bordera).
- Ikona w przycisku: `flex items-center justify-center gap-2`.
- Tekst: `text-center`; `whitespace-nowrap` tylko gdy łamanie faktycznie psuje układ.

### Standardowy layout sekcji
Wzorzec z 95% sekcji naszych oddanych projektów:
```html
<section class="bg-... overflow-hidden px-5 relative">
  <div class="max-w-site mx-auto py-16 lg:py-24">...</div>
</section>
```
- `px-5` na sekcji (odstęp treści od krawędzi ekranu na mobile), wewnątrz kontener `max-w-site mx-auto`.
- Pionowe odstępy na kontenerze, minimum 2 breakpointy (`py-10 lg:py-16`, `py-16 lg:py-24`).
- `overflow-hidden` gdy sekcja ma elementy wychodzące poza obrys (gradienty, dekoracje, slidery).
- Header: `fixed inset-x-0 top-0 z-[999]` + `transition-all duration-300`, w środku ten sam kontener `max-w-site`.
- Stopka: grid `grid-cols-2 lg:grid-cols-12` (logo+opis `lg:col-span-5`, kolumny linków po `lg:col-span-2/3`), pasek dolny z `cms-function="current_year"` + `cms-site-name`.

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
Dwa InnerContent obok siebie · sekcja bez `cms-block-supports` · InnerContent bez `-allowed`/`-template` · spacje/numery aparatu w nazwach grafik · custom CSS gdy istnieje klasa TW · funkcje PHP bez prefiksu · Swiper konfigurowany w HTML · `wc-*` bez komentarza · ID „na zapas" (tylko dla anchorów) · edytowalny href przez `type="attr"` zamiast `type="link"` · sztywne szerokości przycisków (`w-24`) · sekcja bez wzorca `px-5` + `max-w-site mx-auto`.

## Workflow z Figmą

Sekcja po sekcji (duże frame'y przekraczają limit MCP): najpierw `get_metadata`, potem `get_code`/`get_image` dla pojedynczej sekcji. Wartości z variables (`get_variable_defs`), nie „na oko". Po zbudowaniu bloku ZAWSZE porównaj render ze screenshotem frame'a.

## Definicja „skończone" (blok/sekcja)

Działa na stronie demo i w Gutenbergu (wygląd identyczny front ↔ edytor), przeszedł walidację (agent block-validator), klasy Tailwinda działają, brak błędów w `debug.log`, użytkownik zrobił Reload project w PG.
