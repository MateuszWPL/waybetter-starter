---
name: nowy-projekt
description: Tworzy nowy projekt kliencki ze startera — podmiana nazw, wp.bat, skrót startowy, npm install. Używaj gdy użytkownik pisze /nowy-projekt [nazwa].
---

Argument: nazwa projektu (kebab-case, np. `kancelaria-nowak`). Zbierz od użytkownika:
- pełna nazwa klienta (do style.css i tytułów),
- prefiks PHP (2-4 litery, np. `kn`),
- ścieżka strony Local (np. `D:\Strony\kancelaria-nowak`) — strona musi już istnieć w Local,
- (opcjonalnie) link do Figmy z tokenami.

Kroki:
1. Skopiuj starter do `D:\Projekty\{NN}.{nazwa}` (NN = kolejny numer wg istniejących folderów). NIE kopiuj: node_modules, .git, build.
2. Podmień w całym projekcie: `wbstarter` → `{prefiks}_{nazwa}` (text domain/slug), `{{NAZWA_PROJEKTU}}`, `{{SCIEZKA_LOCAL}}`, `{{PREFIKS}}` w CLAUDE.md, `WB Starter` → nazwa klienta w style.css, nazwę w package.json.
3. Wygeneruj **wp.bat** w roocie: wrapper ustawiający środowisko Locala (PHP + MySQL socket tej strony) i wywołujący wp-cli — wzorzec ścieżek z „Open Site Shell" Locala; przetestuj `./wp.bat --version`.
4. Zaktualizuj ścieżkę eksportu w `start-projekt.bat` (jeśli inna instalacja PG) i utwórz skrót do niego na Pulpicie: „🔧 {nazwa}".
5. Jeśli podano Figmę: pobierz tokeny (`get_variable_defs`, serwer desktopowy) i wpisz do `resources/css/theme.css` (@theme) + `theme.json`.
6. `npm install`, potem `npm run build` — sprawdź, że przechodzi.
7. `git init` + pierwszy commit „projekt {nazwa} ze startera vX.Y.Z"; remote dodamy wg Docs/06.
8. Wypisz checklist ręczny dla użytkownika: otwórz projekt w Pinegrow (Open project), ustaw eksport WP na ścieżkę Local (Settings → WordPress), Reload project, aktywuj motyw w WP.
9. Uzupełnij PROJEKT.md (nazwa, prowadzący, data startu, wersja startera).
