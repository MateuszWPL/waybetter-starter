# Changelog startera

Projekty zapisują w PROJEKT.md wersję startera, z której powstały. Poprawki NIE propagują automatycznie do oddanych stron — backportujemy tylko krytyczne (Docs/12).

## 0.2.0 — 2026-07-30 (rewizja D3: wbudowany kompilator PG)

Duża zmiana po testach F1 — CSS kompiluje **wbudowany kompilator Pinegrow (Tailwind 4.2.2)**, nie external build. Powody: kompilacja na zapis (jak Prepros), kolory z panelu Design (GUI), PG sam generuje arkusz edytora Gutenberga (rozwiązuje parity/R14), znikają błędy external build. JS/dodatkowy CSS zostają na esbuild.

- `main.css`: `@theme` scalone tutaj (jedno miejsce tokenów, PG panel Design pisze do markerów); usunięte `@source`/used-classes (PG skanuje klasy sam).
- Nowy `resources/css/extra.css` → `build/extra.css` (esbuild): Splide + AOS css + components + custom. PG ignoruje `@import` zwykłego CSS, więc zbieramy je tu i ładujemy osobno.
- `inc/enqueue.php`: ładuje `build/main.js` (front) + `build/extra.css` (front+edytor). Tailwind ładuje PG. Usunięte ładowanie `build/main.css`/`editor.css`.
- `main.js`: `import 'aos/dist/aos.css'` przeniesiony do extra.css (żeby esbuild nie robił osobnego build/main.css).
- Usunięte pliki: `resources/css/theme.css`, `resources/css/editor.css`.
- `package.json`: bez `tailwindcss`/`@tailwindcss/cli` (zostaje esbuild, sharp, chokidar, concurrently); scripts js/extra/webp.
- `functions.php`: PG wypełnił `Include Resources` (custom.php + wp_pg_helpers) i enqueue Tailwind (`tailwind_theme/tailwind.css`).

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
