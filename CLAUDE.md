# Projekt: {{NAZWA_PROJEKTU}} — motyw WordPress (starter WB v0.1.0)

Motyw WP budowany w **Pinegrow 9.3** (bloki native-hybrid `cms-block*`, docelowo Blocks v3/block.json) + **Tailwind 4** (external build) + **esbuild**. Pełna dokumentacja workflow: `D:\Pulpit\Workflow\Docs\`.

## Ścieżki projektu

- **Strona Local (WordPress):** `{{SCIEZKA_LOCAL}}` — tu jest WP, folder eksportu motywu, `wp-content/debug.log`
- **wp-cli:** przez wrapper `wp.bat` w roocie projektu (NIE gołe `wp` — wymaga środowiska Locala)
- **Backupy bazy:** `D:\Backupy\{{NAZWA_PROJEKTU}}\`

## Komendy (odpalane przez Ciebie lub automaty — człowiek ich nie wpisuje)

- `npm run dev` — watchery (CSS TW4 + editor.css, esbuild JS, webp); normalnie startują przez `start-projekt.bat`
- `npm run build` — build produkcyjny; `npm run webp` — jednorazowa konwersja grafik

## ZAKAZY (twarde)

1. NIE edytuj: `projectdb.pgml`, `pinegrow.json`, `_pginfo/`, `tailwind_theme/`, `build/`, folderu eksportu w `wp-content/themes/`.
2. NIE instaluj zależności i nie zmieniaj pipeline builda bez zgody użytkownika.
3. NIE wymyślaj własnej składni atrybutów `cms-*` / `wp-*` / `wc-*` — wyłącznie wzorce z `Docs/11-konwencje-blokow.md` i istniejących bloków projektu.
4. NIE twórz plików CSS poza `resources/css/` ani nie dopisuj custom CSS, gdy istnieje klasa Tailwinda (patrz Tailwind-first niżej).

## Zasada WYŁĄCZNOŚCI Pinegrow ↔ Claude (najważniejsza reguła)

Pinegrow NIE wykrywa nowych/usuniętych plików z zewnątrz i może nadpisać zmiany z dysku wersją z pamięci. Dlatego:

- Na starcie sesji hook sprawdza, czy działa `Pinegrow.exe` — jeśli tak, POPROŚ użytkownika o **Save All w Pinegrow** zanim zaczniesz edytować, i przypomnij o tym przy każdej edycji plików HTML.
- Po każdej sesji edycji (zwłaszcza po utworzeniu NOWYCH plików) przypomnij: **„Reload project" w Pinegrow** (nie File Reload — tylko Reload project indeksuje nowe pliki).
- Hook robi commit-snapshot przed sesją — przy problemie odzyskujesz pliki przez `git checkout`, nie prosisz użytkownika o ratowanie ręczne.

## Konwencje (szczegóły: Docs/11-konwencje-blokow.md)

- **Tailwind-first (D14):** wszystko klasami TW — arbitrary values (`hover:text-[#b0246d]`), cienie (`shadow-[...]`), gradienty. Custom CSS TYLKO dla: styli Splide, pseudo-elementów niemożliwych w TW, styli wtyczek. Tokeny w `resources/css/theme.css` (`@theme`) — nie hardcoduj hexów po plikach.
- **InnerContent:** nigdy dwa na tym samym poziomie; kolumny = bloki-dzieci z własnymi InnerContent; zawsze `cms-block-inner-content-allowed` + `-template`.
- **Supports na każdej sekcji:** `spacing.padding,spacing.margin,anchor,color.background,color.text,typography.fontSize`.
- **Nazewnictwo:** bloki kebab-case (`hero-slider`), pola `blok_element`, ID `nazwasekcji-element` tylko dla anchorów, prefiks PHP `{{PREFIKS}}_`.
- **Spis treści** na górze każdego pliku kodu (CSS/JS/PHP), numerowane sekcje — TY go aktualizujesz przy każdej edycji.
- **Slidery:** kontener `[nazwa]Slider splide`, konfiguracja wyłącznie w `resources/js/modules/sliders.js`.
- **Grafiki:** wrzucane jako jpg/png do `inc/img/` → watcher robi webp; w HTML zawsze referencja do `.webp`; commitujemy tylko webp/svg.

## Workflow z Figmą

Sekcja po sekcji (duże frame'y przekraczają limit MCP): najpierw `get_metadata`, potem `get_code`/`get_image` dla pojedynczej sekcji. Wartości z variables (`get_variable_defs`), nie „na oko". Po zbudowaniu bloku ZAWSZE porównaj render ze screenshotem frame'a.

## Prowadzenie projektu

`PROJEKT.md` = checklist życia projektu. Na starcie sesji przeczytaj go + `git log -5` i powiedz, co jest następne. Po ukończeniu zadania odhacz pozycję i zaproponuj kolejną. Przed oddaniem przypomnij o audycie. Na koniec sesji przypomnij o `/koniec`.

## Definicja „skończone" (blok/sekcja)

Działa na blocks.html i w Gutenbergu (wygląd identyczny front ↔ edytor), przeszedł walidację (agent block-validator), klasy się kompilują, brak błędów w `debug.log`, spis treści zaktualizowany, użytkownik zrobił Reload project w PG.
