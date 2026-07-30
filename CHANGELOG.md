# Changelog startera

Projekty zapisują w PROJEKT.md wersję startera, z której powstały. Poprawki NIE propagują automatycznie do oddanych stron — backportujemy tylko krytyczne.

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
