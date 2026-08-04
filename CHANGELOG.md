# Changelog startera

Projekty zapisują w PROJEKT.md wersję startera, z której powstały. Poprawki NIE propagują automatycznie do oddanych stron — backportujemy tylko krytyczne.

## 0.12.0 — 2026-08-04 (konwencje z analizy 5 oddanych projektów)

Test workflow wykazał, że agenci wpinali akcje WP "logicznie, ale błędnie" (Block Attribute `href` zamiast typu Link) i dawali sztywne szerokości przycisków (`w-24`). Przeanalizowane projekty: Rogowski, KokuSushi, Askdom, Proste Cło, Dozycia (pełny raport: warsztatowe `Docs/14-analiza-projektow-konwencje.md`, nie w repo). Reguły potwierdzone w oficjalnych docs Pinegrow.

- **`CLAUDE.md`, nowa sekcja "Akcje WP - jak wpinać edytowalność":** link na `<a>` zawsze przez `cms-block-field-type="link"` + `control="link"` (zakaz `type="attr"` z `attribute="href"`), etykieta przycisku osobnym polem content (span albo `cms-block-field-2`); linki specjalne (`cms-site-link`, `cms-post-link`, `cms-editable-type="link"`); obrazki z fallbackiem `wp-if-has-post-thumbnail="!"`; tło sekcji jako warstwowy `img absolute` z polem image (nie background-image); warianty przez `control="select"` + `field-values`; pętla postów zawsze ze stanem pustym. Plus nakaz: przy niepewności czytać docs Pinegrow (konkretne URL-e), nie zgadywać.
- **`CLAUDE.md`, sekcje "Przyciski" i "Standardowy layout sekcji":** wymiar przycisku wyłącznie z paddingów (`px-4/5/6` + `py-3/3.5/4`) i `w-fit`/`max-w-max`/`w-full`, zakaz sztywnych szerokości (wyjątek: przyciski-ikony `size-*`); wzorzec sekcji `px-5` na `<section>` + `max-w-site mx-auto` + `py-*` na 2 breakpointach; wzorce headera (fixed, z-[999]) i stopki (grid 12 kolumn, `current_year` + `cms-site-name`).
- **`pinegrow-block-expert`:** nowe sekcje "Akcje WP - poprawne wpinanie" i "Przyciski i layout" (twarde zasady + WebFetch docs Pinegrow zamiast domysłów).
- **`block-validator`:** punkty 20-23: zła akcja na linku = [BŁĄD], sztywna szerokość przycisku = [BŁĄD], odstępstwo od wzorca sekcji = [OSTRZEŻENIE], tło/fallbacki/stan pusty pętli.

## 0.11.1 — 2026-07-31 (standardowe breakpointy Tailwinda)

- **Cofnięty custom breakpoint `desktop` (1324px)** z 0.11.0. Używamy wyłącznie standardowych breakpointów Tailwinda (`sm`/`md`/`lg`/`xl`/`2xl`). `custom_config` w `pinegrow.json` z powrotem tylko z `--container-site`. Sekcja „Responsywność" w `CLAUDE.md` i `pinegrow-block-expert` zaktualizowane: mobile (baza) / tablet `md:` / desktop `xl:`, a `lg:` dla sekcji dobrze wyglądających od 1024px.

## 0.11.0 — 2026-07-31 (natywny wariant edytora, breakpoint desktop, weryfikacja na frame'ach)

Dopracowanie parity edytora (0.10.0) o natywny mechanizm Pinegrow oraz spójna responsywność.

- **Wariant `wp-in-block-editor:`** (natywny stan Pinegrow, panel klas → stany → WordPress) udokumentowany jako precyzyjne narzędzie per blok: klasa działa tylko w edytorze (scope `.editor-styles-wrapper`), na froncie nic nie robi. `editor.css` zostaje automatycznym baseline'em dla wszystkich bloków; wariant to ręczna korekta pojedynczego (z `!` gdy nadpisuje regułę z editor.css). Wcześniejsza diagnoza „ta klasa nie istnieje" była błędna. Opis w `CLAUDE.md` i nagłówku `editor.css`.
- **Custom breakpoint `desktop` = 1324px** (`pinegrow.json` → `design-settings.custom_config`, obok `--container-site`), czyli szerokość kontenera `max-w-site`. Nowa sekcja „Responsywność" w `CLAUDE.md`: mobile (baza) / tablet `md:` 768 / desktop `desktop:` 1324, opcjonalnie `lg:` 1024 dla sekcji, które w układzie desktopowym wyglądają dobrze wcześniej.
- **Agenci budują na 3-4 breakpointach.** `pinegrow-block-expert`: sekcja „Responsywność" (mobile-first, układ przemyślany na każdym poziomie, korekta edytora przez `wp-in-block-editor:`). `pinegrow-block-expert` i skill `/nowa-sekcja`: weryfikacja responsywności na frame'ach Pinegrow (mobilny + desktopowy) i proszenie użytkownika o screeny dla pewności (subagent nie widzi ekranu).

## 0.10.0 — 2026-07-31 (parity edytora Gutenberga dla Tailwind 4 + edytowalność bloków)

Naprawa problemu zgłoszonego przez zespół: przy TW4 bloki w edytorze się rozwalały (inne kolory nagłówków, rozjechane gridy/flexy, martwy JS). Trzy przyczyny (research: tailwindcss discussion #16934, Gutenberg issue #69833):

- **Surowy Tailwind do iframe edytora.** `inc/enqueue.php` (hook `enqueue_block_assets` + `is_admin()`) wpina teraz `tailwind_theme/tailwind.css` wprost do iframe. Bez transformacji `add_editor_style` (która przepisuje `:root` na `.editor-styles-wrapper` i psuje `@layer`, przez co znikały kolory i layout). Arkusz `tailwind_for_wp_editor.css` od PG zostaje, po transformacji jest nieszkodliwy.
- **Nowy `assets/css/editor.css`** (tylko admin, scope `.editor-styles-wrapper`): część 1 neutralizuje niewarstwowy CSS treści edytora WP (marginesy/rozmiary nagłówków, listy, linki), który wygrywał z warstwowymi utilities TW4 (mirror preflight, bez `@layer`); część 2 daje statyczny podgląd komponentów JS, których edytor nie uruchamia (iframe bez skryptów): slidy w siatce 3 kolumn, tabsy jeden pod drugim, akordeon otwarty, popup i megamenu w przerywanej ramce z etykietą, animacje wejścia wyłączone.
- **Konwencja `.popup-modal`** na kontenerze modala (udokumentowana w `popup.js`) — bez niej editor.css nie pokaże popupu.
- **Maksymalna edytowalność bloków.** Rozszerzony zestaw supports (dodane `spacing.blockGap`, `typography.lineHeight`, `align`) w `CLAUDE.md`, `pinegrow-block-expert` i `block-validator`. Nowa zasada dla budowniczego: warianty układu jako pole `select`, wszystkie treści jako pola, kolory z palety, breakpointy = klasy mobile-first (klient nie dotyka). Walidator sprawdza hooki pod edytor, hardcode treści i brak pól wariantów.

## 0.9.0 — 2026-07-31 (szablony stron, CF7, jeden plik instrukcji)

- **Szablony stron** (root projektu, port ze starego szablonu na TW4): `404`, `page`, `single`, `archive`, `search` oraz `parts` (breadcrumbs z pełną logiką PHP + wariant CPT `cms-breadcrumbs` + paginacja). Tokeny kolorów zamiast hexów, `lang="pl"`, animacje `data-anim`, bez sidebarów i starych referencji (`main.min`, pgia). Otwierasz w PG przez Reload project.
- **Contact Form 7 wbudowane** (99% projektów używa CF7): filtr `wpcf7_autop_or_not` (`__return_false`) w `inc/custom.php` usuwa owijanie pól w `<p>`/`<br>`; sekcja CF7 w `components.css` (zerowanie marginesu akceptacji, wyrównanie checkboxa zgody, komunikaty walidacji). Filtr nieszkodliwy, gdy wtyczka nieaktywna.
- **Skill `/formularz-cf7`**: konwertuje formularz HTML+Tailwind na gotowy shortcode CF7 (klasy na `class:`, placeholdery, pola wymagane, acceptance, suwaki jako obcy HTML). Zapisuje do `cf7/{nazwa}.txt` i wypisuje w czacie.
- **Jeden plik instrukcji**: nowy `INSTRUKCJA.md` (punkt wejścia dla zespołu: kolejność zakładania projektu, praca codzienna, grafiki, co jest gotowe, gdzie czego szukać). `README-praca.md` usunięty (wchłonięty). `PROJEKT.md` zostaje jako stan projektu z notką odsyłającą do instrukcji. `/nowy-projekt` usuwa teraz `CHANGELOG.md` z projektu (historia startera zostaje na GitHubie).

## 0.8.2 — 2026-07-31 (grafika motywu)

- **Dodany `screenshot.png`** w rootcie projektu (branding Way Better, 1200x900, format 4:3 wymagany przez WP). Służy jako grafika motywu na karcie w Wygląd > Motywy oraz jako miniatura projektu w Pinegrow. Pinegrow kopiuje go do folderu motywu przy eksporcie.
- Grafika zostaje przy rebrandingu (`/nowy-projekt` jej nie podmienia): motyw jest autorstwa agencji, więc na projektach klienckich karta motywu nosi logo Way Better. Wiersz dodany do mapy plików w `CLAUDE.md`.

## 0.8.1 — 2026-07-31 (pierwsze wnioski z testów E2E + zero śladów AI)

Poprawki z pierwszego testu end-to-end (projekt EnterThePoint) oraz reguły „pisz jak człowiek".

- **Fix `has_block()`:** wzorzec w `inc/enqueue.php` pokazywał namespace `custom/` — a Pinegrow rejestruje bloki w namespace SLUGA MOTYWU (`slug/nazwa-bloku`, patrz `blocks/{blok}/block.json`). Zły namespace = warunek zawsze false i skrypt się nie ładuje (tak wyglądał „brak JS" na teście). Komentarz-wzorzec poprawiony i ostrzega; `block-validator` sprawdza namespace (pkt 14).
- **`index.html` (master page): `lang="pl"`** zamiast `en`.
- **Zero śladów AI (nowe, twarde):** sekcja „Pisz jak człowiek" w `CLAUDE.md` + skrót w każdym agencie + punkt 16 walidatora ([BŁĄD]). Zakazane: atrybucje AI („Generated by Claude", „Co-Authored-By"), długie myślniki „—", frazesy („kluczowy", „warto zauważyć", „nie tylko X, ale też Y"), emoji w kodzie, komentarze narratorskie, marketingowe ogólniki w placeholderach.
- **Czystka em-dashy:** 60 wystąpień „—" usuniętych z komentarzy plików kodu motywu (18 plików: inc/, assets/, scripts/, functions.php, style.css) — zamienione na zwykły dywiz.
- Relikt: „style Splide" w walidatorze poprawione na Swiper (pozostałość po 0.7.0).

## 0.8.0 — 2026-07-30 (warstwa AI: zespół agentów + orkiestracja /nowa-sekcja)

Starter gotowy pod pracę „programista + pomocnik AI" do rezultatu pixel-perfect z Figmą. Sam kod motywu bez zmian — to warstwa `.claude/` + kontekst.

- **Nowi agenci** (`.claude/agents/`): `swiper-expert` (slidery — najpierw czyta docs/kod, potem koduje), `animation-expert` (animacje `data-anim` minimalistycznie, bez zmian layoutu, pilnuje mobile), `interactions-expert` (wpinanie akcji — dobiera i podpina moduły JS + config enqueue).
- **`pinegrow-block-expert` = budowniczy**: workflow Figma pixel-perfect (metadata → code/screenshot → wartości z variables → porównanie renderu), twarda zasada hoverów (`transition` + `cursor-pointer` na każdym klikalnym) i mobile-first; jasne granice roli (slider/animacje/akcje → wyspecjalizowani agenci).
- **`block-validator`** rozszerzony: hover/kursor, animacje (transform/opacity, dozwolone `data-anim`), markup Swiper, integracja hook↔`wbstarter_modules()`, mobile.
- **Skill `/nowa-sekcja`**: orkiestruje pełny pipeline sekcji z Figmy (wymagania PRZED delegacją → budowa → akcje → slidery → animacje → walidacja). `/nowy-blok` deleguje do właściwych agentów i odsyła do `/nowa-sekcja` przy pełnych sekcjach.
- **CLAUDE.md**: sekcja „Zespół agentów AI" (tabela + zasady współpracy). Mechanika: subagent nie rozmawia z userem → wymagania zbiera główny agent, agent bez danych zwraca pytania zamiast kodu.
- Wersje → 0.8.0. Kod motywu (JS/CSS/PHP) bez zmian.

## 0.7.0 — 2026-07-30 (rewizja frontu: Swiper, scroll-driven animations, config enqueue, jakość JS)

Audyt i dopracowanie warstwy JS/CSS/PHP + wymiana martwych vendorów. Runtime dalej zero-build.

- **Splide → Swiper 11** (Splide bez rozwoju). Vendory zarządza npm: `dependencies.swiper` + `scripts/vendors.js` (kopiuje `swiper-bundle.*` z `node_modules` → `assets/vendor/`, uruchamiane też przez `postinstall`). Usunięte `assets/vendor/{splide*,aos*}`. `sliders.js` przepisany na API Swipera (`basicSlider`, `autoSlider`/marquee); paginacja w `custom.css` (`.swiper-pagination-bullet`).
- **AOS → CSS scroll-driven animations + fallback IntersectionObserver.** Nowy `assets/css/animations.css` (atrybuty `data-anim`, `@supports animation-timeline`, `prefers-reduced-motion`, bezpieczny default „widoczne") + `assets/js/modules/reveal.js` (fallback, `window.wbReveal.scan()`). Usunięty AOS i `refreshAOSAfter`; `main.js` odchudzony do czystego entry.
- **`inc/enqueue.php` przepisany:** tablica config `wbstarter_modules()` (moduł → `true/false`, koniec odkomentowywania), wszystkie skrypty `strategy=defer` (WP 6.3+), Swiper ładowany **warunkowo** (tylko gdy `sliders` on), `animations.css` dołożony do stylów front+edytor, wzorzec `has_block()` per-strona w komentarzu.
- **Naprawy jakości JS (z audytu):** `modalgallery.js` przepisany na multi-instance (per `[data-gallery]`, izolowany stan, listenery klawiatury dodawane/zdejmowane przy open/close, aria, koniec ID-based buga i hardcoded Tailwind → klasy `.gallery-dot`). `accordion.js` — `dataset.init`, `aria-expanded`, przycisk „Pokaż więcej" tworzony raz. `dragscroll.js` — `passive:false` przy `preventDefault`. `megamenu.js` — guard na brak panelu + `aria-expanded`. `mobilemenu.js` — `aria-expanded`. `tabs.js` — `role`/`aria-selected`. `popup.js` — zamykanie Escape. Spisy treści w nagłówkach modułów.
- `functions.php`, `inc/custom.php`, `inc/woo.php` — bez zmian. Wersje → 0.7.0.

## 0.6.0 — 2026-07-30 (pre-konfigurowany projekt PG: panel Design + ustawienia WP)

Świadome odwrócenie decyzji z 0.4.0 (starter = sam kod). Starter jest teraz **gotowym projektem Pinegrow** — po pobraniu i `/nowy-projekt` otwierasz przez **Open project** (koniec „Create Classic theme"), a panel Design i ustawienia WordPress są już skonfigurowane. Formaty plików PG przechwycone empirycznie z działającego projektu (`000.NewWorkflowTest`), nie zgadywane.

- **Klasa kontenera `max-w-site` = 1324px** jako natywna klasa Tailwinda: `pinegrow.json` → `design-settings.custom_config` = `@theme { --container-site: 1324px; }` (kompiluje się do `tailwind.css` i `tailwind_for_wp_editor.css`). Usunięty hack `.max-w-site` z `custom.css`. Koniec szukania „gdzie ustawić szerokość".
- **Panel Design pre-seedowany** (`projectdb.pgml`): przykładowe kolory semantyczne primary/secondary/accent (+ neutralne) i font **Inter** dla H1–H6 — do podmiany wartości na projekcie.
- **Ustawienia WordPress pre-seedowane** (`pinegrow.json` → `wp-theme-info`): kategoria bloków `custom_block` / „Customowe bloki", CSS edytora `tailwind_theme/tailwind_for_wp_editor.css`, `blocks_type` native-hybrid, **WooCommerce off**. Nazwa/slug/folder jako placeholdery.
- **Nowe pliki w repo:** `pinegrow.json`, `projectdb.pgml`, `theme.json` (PG-generowany z palety), `tailwind_theme/`, `index.html` (master page), `blocks.html` (czysty katalog bloków).
- **`/nowy-projekt`**: flow „Open project" zamiast „Create Classic theme"; dochodzi przepisywanie `pinegrow.json` (name/slug/dir + self-ref `{{SCIEZKA_PROJEKTU}}` = `file:///` ścieżka projektu).
- **CLAUDE.md**: zaktualizowana mapa plików (pliki PG teraz w repo, kto co edytuje), opis klasy `max-w-site`, flow Open project. Wersje ujednolicone → 0.6.0.

## 0.5.0 — 2026-07-30 (czyszczenie: samowystarczalny kontekst, neutralizacja)

Runda porządkowa — starter gotowy jako czysta baza do dalszego rozwoju. Bez zmian architektury (functions.php = teren PG, kod w custom.php, zero builda).

- **Rozdział kontekstów.** `CLAUDE.md` startera jest teraz SAMOWYSTARCZALNY — nie odwołuje się do niczego spoza projektu (usunięte linki do `D:\Pulpit\Workflow\Docs\`). Kontekst budowy startera został w warsztacie; ZIP niesie tylko to, co potrzebne do developmentu strony.
- **Mapa plików** w `CLAUDE.md` (tabela: plik → rola → kto edytuje) + wcielone pełne **konwencje bloków** (InnerContent, Supports, pola, nazewnictwo, slidery, Tailwind-first) + sekcja **parity edytora WP** (enqueue_block_assets + tailwind_for_wp_editor.css od PG).
- **Neutralizacja kolorów** — usunięte hardcodowane barwy cudzego klienta: `assets/css/custom.css` (złoty `#be964a` → `currentColor`/czarny + „TODO kolor projektu"), `components.css` (`#2B2A28` w `.show-more-btn`). Poprawiona literówka `--tw-ring-sgadow` → `--tw-ring-shadow`, usunięty wiszący zakomentowany `@media`, dodany spis treści w custom.css.
- **`assets/vendor/README.md`** — udokumentowane wersje bibliotek (Splide 4.1.x, AutoScroll 0.5.x, AOS 2.3.x) + jak aktualizować.
- **Porządki:** wersja ujednolicona → 0.5.0 (`package.json`, `package-lock.json`, `style.css`, `CLAUDE.md`, `PROJEKT.md`); usunięte martwe reguły `.gitignore` (`assets/img/**` — folder nie istnieje od 0.3.3); agenci/skille kierują do konwencji w `CLAUDE.md` zamiast do nieistniejących `Docs/`.

## 0.4.0 — 2026-07-30 (konsolidacja: spójny starter, natywny Pinegrow)

Uspójnienie repo po serii testów. Architektura potwierdzona i „zamrożona":
- **Starter = szkielet motywu (kod).** Projekt Pinegrow składasz w PG: Open project → Create Classic theme → Built-in JIT 4.2.2. PG generuje wtedy swoje pliki (`projectdb.pgml`, `pinegrow.json`, HTML → PHP, `tailwind_theme/`).
- **`functions.php` = teren Pinegrow** (pełne markery, **auto-rejestracja bloków** przez marker „Register Pinegrow Blocks" — potwierdzone: PG wypełnia go sam na eksporcie).
- **Nasz kod wyłącznie w `inc/custom.php`** (wpina enqueue + woo). Zero builda; Tailwind kompiluje PG na zapis.

Zmiany porządkowe:
- Ujednolicone numery wersji we wszystkich plikach (`package.json`, `style.css`, `CLAUDE.md`, `PROJEKT.md`) → 0.4.0.
- CHANGELOG uporządkowany — usunięty błędny, zdublowany wpis 0.2.0 wrzucony nad nowsze wersje.
- `assets/css/custom.css`: sekcja WŁASNE KLASY + `.max-w-site` = 1324px (TW4 nie ma już `max-w-screen-*`).

## 0.3.3 — 2026-07-30 (powrót do natywnego Pinegrow — koniec nadpisywania)

LEKCJA z porównania ze starym, DZIAŁAJĄCYM szablonem (`StareWorkflow/0.Szablon WP tailwind3`): budowaliśmy równoległy system obok Pinegrow zamiast używać jego markerów. Naprawione.

- **`functions.php`** = pełny, natywny szkielet Pinegrow ze WSZYSTKIMI markerami (wg starego szablonu): `Load Text Domain`, `Register Menus`, `Image sizes`, `Custom Post Types`, `Taxonomies`, `Include Resources`, `Enqueue Scripts/Styles`, **`Register Pinegrow Blocks`**, `Register Blocks Category`, `Theme Supports`, `Load Blocks Editor Styles`. **Bloki rejestruje Pinegrow SAM** — poprzednio brakowało markera `Register Pinegrow Blocks`, więc bloki nie trafiały do Gutenberga.
- **USUNIĘTE `inc/setup.php`** — theme supports i menusy generuje Pinegrow w functions.php (był zbędnym duplikatem).
- **`inc/custom.php`** = malutki, tylko NASZ kod: wpina `inc/enqueue.php` + `inc/woo.php` i miejsce na funkcje projektowe. Usunięta rejestracja bloków (glob) i kategoria — robi to Pinegrow.
- **`inc/enqueue.php`** bez zmian (ładuje nasze assety), ale wpinany z `custom.php`, nie z functions.php.
- **Koniec duplikacji grafik** — usunięty `assets/img/`, jedyny folder na grafiki to `inc/img/` (webp.js przelatuje tylko jego).
- Fix: parse error / fatal — wynikały z hybrydowego functions.php bez pełnych markerów PG.

## 0.3.2 — 2026-07-30 (functions.php = teren Pinegrow; kod w custom.php)

LEKCJA z testu: Pinegrow **w pełni zarządza `functions.php`** i nadpisuje ręczne edycje przy eksporcie (jak w starym workflow). Przestajemy go tykać.

- **`functions.php`**: minimalny, PG-friendly — `require` setup/enqueue/woo + markery `Include Resources` i `Enqueue`. PG wstrzykuje tu `custom.php`, helpery bloków i Tailwind. Nie edytujemy go ręcznie.
- **`inc/custom.php`**: NASZ plik na kod (PG go wymaga). **Rejestruje bloki automatycznie** — `glob('blocks/*/*_register.php')` — niezależnie od tego, co PG wpisze w functions.php. Plus kategoria „Bloki dedykowane". Tu dopisujemy funkcje projektowe.
- **`inc/setup.php`**: przywrócony (theme supports + menusy).
- Fix: fatal error `require inc/setup.php` po tym, jak PG nadpisał functions.php starą wersją z brakującym plikiem.
- CLAUDE.md: twardy zakaz edycji functions.php; kod → custom.php.

## 0.3.1 — 2026-07-30 (fix: rejestracja bloków)

- **`functions.php` — pełny komplet markerów Pinegrow** (na wzór sprawdzonego starego szablonu): `Register Pinegrow Blocks`, `Register Blocks Category`, `Register Menus`, `Custom Post Types`, `Taxonomies`, `Register Sidebars`, `Customizer`, `Image sizes`, `Theme Supports`, `Load Blocks Editor Styles`, `Load Text Domain`, `Include Resources`, `Enqueue`. Bez sekcji `Register Pinegrow Blocks` PG nie miał gdzie wstrzyknąć rejestracji bloków → bloki nie pojawiały się w Gutenbergu. Naprawione.
- `inc/setup.php` USUNIĘTY — theme setup (menusy, supports) jest teraz w `functions.php` (tam gdzie PG wstrzykuje swoje sekcje). `inc/enqueue.php` (assety) i `inc/woo.php` dalej osobno.
- Tailwind ładuje PG w sekcji „Enqueue Styles" (tailwind_theme/tailwind.css); nasze assety — `inc/enqueue.php`.
- `/nowy-projekt`: ostrzeżenie o `npm install` bez `--prefix` (unikanie samo-referencji w package.json).

## 0.3.0 — 2026-07-30 (radykalne uproszczenie: „zero build", bez Gita)

Cel: mniej warstw, „ma po prostu działać". Usunięte: esbuild, concurrently, chokidar, watchery, `build/`, `resources/`, `start-projekt.bat`, `.vscode/tasks.json`, hook `SessionStart`, skille `/start` `/koniec` `/napraw-konflikt`, `.gitattributes`. Kontrola wersji (Git/GitHub per projekt) odłożona na później.

- **Zero builda dla JS/CSS.** Nowy `assets/`: `css/` (components, custom — plain), `js/` (main + modules, plain, bez `import`), `vendor/` (Splide + AOS jako gotowe pliki „vendored"). Edytujesz → zapisujesz → odświeżasz.
- `sliders.js` / `main.js` przepisane na globalne `Splide`/`AOS` (bez importów).
- `inc/enqueue.php`: ładuje vendored biblioteki + moduły + `main.js` (front) i `components.css`+`custom.css` (front+edytor). Tailwind ładuje PG. Bez failsafe.
- **WEBP jedną komendą:** `npm run optimize` (sharp, one-shot). `package.json` = tylko to + devDep `sharp`.
- **Tokeny w panelu Design PG** (wbudowany kompilator), nie w `@theme` w kodzie — usunięte `resources/css/main.css`/`theme.css`/`editor.css`/`extra.css`.
- **Starter pobierany jako ZIP** z GitHuba (bez `.git` w projekcie).
- CLAUDE.md, README-praca.md, PROJEKT.md, `/nowy-projekt` — przepisane pod nowy, prostszy flow.

## 0.2.0 — 2026-07-29 (rewizja D3: wbudowany kompilator PG)

- `functions.php`: dodane markery Pinegrow (`Include Resources`, `Enqueue Scripts`, `Enqueue Styles`) — bez nich PG nie eksportuje motywu. Decyzja: front enqueue robi `inc/enqueue.php`, markery Enqueue zostają puste; PG wypełnia tylko `Include Resources` (helpery bloków/navwalker/paginacja).
- hook `SessionStart`: wywołanie przez `cmd /c` (rozwijanie `%CLAUDE_PROJECT_DIR%`) + utwardzenie snapshotu.

## 0.1.0 — 2026-07-29

Pierwszy szkielet (faza F1, przed testami z Pinegrow):
- pipeline: Tailwind 4 (external build, @source na used-classes.html), esbuild, webp-watcher (sharp+chokidar), concurrently
- start-projekt.bat (jedno wejście: watchery + git pull + Pinegrow), task VS Code folderOpen
- inc/: setup, enqueue (editor.css przez enqueue_block_assets + failsafe „CSS nieaktualny"), custom, woo (HPOS)
- resources/: theme.css (@theme — jedno miejsce tokenów), main.css, editor.css (important), components.css i moduły JS przeniesione ze starego szablonu
- warstwa Claude: CLAUDE.md, hook SessionStart (snapshot + detekcja PG), agenci pinegrow-block-expert i block-validator, skille /start /koniec /nowy-blok /nowy-projekt /napraw-konflikt
- dokumenty: PROJEKT.md, README-praca.md, INSTALACJA.md
