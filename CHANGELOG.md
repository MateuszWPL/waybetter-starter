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

## 0.1.1 — 2026-07-29 (odkrycia z testu F1)

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
