---
name: nowy-projekt
description: Zakłada nowy projekt z rozpakowanego ZIP-a startera — rebranding nazw i prefiksu, przepisanie ścieżek pinegrow.json, npm install (sharp), instrukcja otwarcia w Pinegrow + Local. Używaj gdy użytkownik pisze /nowy-projekt [nazwa].
---

Zakładamy, że starter jest już pobrany jako ZIP z GitHuba i rozpakowany do `D:\Projekty\{nazwa}` (bez `.git`). Kontroli wersji na razie nie robimy. **Starter jest gotowym projektem Pinegrow** — niesie `pinegrow.json`, `projectdb.pgml`, `tailwind_theme/`, `index.html` (master page), `blocks.html`. Panel Design ma już przykładowe kolory (primary/secondary/accent), font Inter i klasę `max-w-site` (1324px). Nie robimy „Create Classic theme" — tylko „Open project".

Zbierz od użytkownika:
- nazwa projektu / klienta (do `style.css`, tytułów, `pinegrow.json` → name),
- prefiks PHP (2-4 litery, np. `kn`) → zastąpi `wbstarter`,
- ścieżka strony Local (np. `D:\Strony\{nazwa}\app\public\wp-content\themes\{nazwa}`) — strona musi już istnieć w Local,
- (opcjonalnie) link do Figmy.

Kroki:
1. **Rebranding kodu** — w plikach projektu (functions.php, style.css, inc/*.php, CLAUDE.md, PROJEKT.md, package.json) podmień, zapisując PHP **bez BOM**:
   - `wbstarter` → prefiks (np. `kn`) — prefiks funkcji, handle, text-domain
   - `WB Starter` → nazwa klienta (style.css Theme Name)
   - placeholdery `{{NAZWA_PROJEKTU}}`, `{{PREFIKS}}`, `{{SCIEZKA_LOCAL}}`
2. **Przepisz `pinegrow.json`** (JSON — zachowaj poprawną składnię, jedna linia):
   - `wp-theme-info.name` → nazwa klienta, `wp-theme-info.slug` → slug (małe litery),
   - `wp-theme-info.dir` (placeholder `{{SCIEZKA_LOCAL}}`) → pełna ścieżka folderu motywu w Local,
   - `{{SCIEZKA_PROJEKTU}}` (3 wystąpienia: `files.*.frameworks[0]` i `frameworks[0]`) → `file:///` + ścieżka folderu projektu z ukośnikami `/` (np. `file:///D:/Projekty/kynett`).
   - NIE ruszaj: `block_category`, `block_category_name`, `blocks_editor_styles`, `wc_enabled`, `design-settings.custom_config` (to działające ustawienia).
3. `npm install` — **koniecznie z katalogu projektu, bez flag** (NIE `--prefix`, NIE `npm install <nazwa>` — inaczej npm dopisze błędną samo-referencję `"nazwa": "file:"` do package.json/lock; jeśli się pojawi, usuń ten wpis). Ściąga tylko sharp do webp. Bez builda — nie ma `npm run dev`/`build`.
4. Jeśli podano Figmę: pobierz kolory (`get_variable_defs`) i **poinstruuj użytkownika**, żeby podmienił przykładowe kolory (primary/secondary/accent) w panelu Design PG na kolory marki (tokeny nie idą do kodu przy wbudowanym kompilatorze).
5. Uzupełnij `PROJEKT.md` (nazwa, data startu, wersja startera).
6. Wypisz użytkownikowi checklist GUI: Pinegrow → **Open project** (projekt gotowy, nie „Create Classic theme") → sprawdź/ustaw folder eksportu = `{{SCIEZKA_LOCAL}}` w WordPress Theme Settings → **Ctrl+M** (eksport) → aktywuj motyw w WP. Panel Design już skonfigurowany — na projekcie podmieniasz tylko wartości kolorów marki.
