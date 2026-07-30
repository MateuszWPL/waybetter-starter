---
name: nowy-projekt
description: Zakłada nowy projekt z rozpakowanego ZIP-a startera — rebranding nazw i prefiksu, npm install (sharp), instrukcja podpięcia Pinegrow + Local. Używaj gdy użytkownik pisze /nowy-projekt [nazwa].
---

Zakładamy, że starter jest już pobrany jako ZIP z GitHuba i rozpakowany do `D:\Projekty\{nazwa}` (bez `.git`). Kontroli wersji na razie nie robimy.

Zbierz od użytkownika:
- nazwa projektu / klienta (do `style.css` i tytułów),
- prefiks PHP (2-4 litery, np. `kn`) → zastąpi `wbstarter`,
- ścieżka strony Local (np. `D:\Strony\{nazwa}`) — strona musi już istnieć w Local,
- (opcjonalnie) link do Figmy.

Kroki:
1. **Rebranding** — w plikach projektu (functions.php, style.css, inc/*.php, CLAUDE.md, PROJEKT.md, package.json) podmień, zapisując PHP **bez BOM**:
   - `wbstarter` → prefiks (np. `kn`) — prefiks funkcji, handle, text-domain
   - `New Workflow Test` / `WB Starter` → nazwa klienta (style.css Theme Name)
   - placeholdery `{{NAZWA_PROJEKTU}}`, `{{PREFIKS}}`, `{{SCIEZKA_LOCAL}}`
2. `npm install` — **koniecznie z katalogu projektu, bez flag** (NIE `--prefix`, NIE `npm install <nazwa>` — inaczej npm dopisze błędną samo-referencję `"nazwa": "file:"` do package.json/lock; jeśli się pojawi, usuń ten wpis). Ściąga tylko sharp do webp. Bez builda — nie ma `npm run dev`/`build`.
3. Jeśli podano Figmę: pobierz kolory (`get_variable_defs`) i **poinstruuj użytkownika**, żeby wpisał je w panelu Design PG (tokeny nie idą do kodu przy wbudowanym kompilatorze).
4. Uzupełnij `PROJEKT.md` (nazwa, data startu, wersja startera).
5. Wypisz użytkownikowi checklist GUI: Pinegrow → **Open project** → **Create Classic theme** → Tailwind **Built-in JIT 4.2.2** → ustaw eksport do `wp-content/themes/{nazwa}` w Local → Ctrl+M → aktywuj motyw w WP.
