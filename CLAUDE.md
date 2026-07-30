# Projekt: {{NAZWA_PROJEKTU}} — motyw WordPress (starter WB v0.3.0)

Motyw WP budowany w **Pinegrow 9.3** (bloki native-hybrid `cms-block*`) + **Tailwind 4** (wbudowany kompilator PG). **Zero builda** — custom CSS/JS to gotowe pliki serwowane wprost z `assets/`. Pełna dokumentacja workflow: `D:\Pulpit\Workflow\Docs\`.

## Ścieżki projektu

- **Strona Local (WordPress):** `{{SCIEZKA_LOCAL}}` — tu jest WP, folder eksportu motywu, `wp-content/debug.log`.

## Jak co działa (zero builda)

- **Tailwind** kompiluje **Pinegrow na zapis** (wbudowany kompilator 4.2.2 → `tailwind_theme/tailwind.css`). Nic nie budujemy ręcznie.
- **Kolory/fonty/breakpointy** ustawia się w **panelu Design Pinegrow** (nie w kodzie).
- **Custom CSS** → `assets/css/custom.css` (i `components.css`). Edytujesz → zapisujesz → odświeżasz przeglądarkę. Bez builda.
- **Custom JS** → `assets/js/main.js` i `assets/js/modules/*.js` (plain JS, bez `import`). Biblioteki (Splide, AOS) są „vendored" w `assets/vendor/` i działają globalnie.
- **Grafiki:** wrzuć jpg/png do `inc/img/`, potem jedna komenda **`npm run optimize`** robi webp (oryginał zostaje). W HTML referencja do `.webp`.
- Enqueue wszystkiego robi `inc/enqueue.php`.

## ZAKAZY (twarde)

1. NIE edytuj: `projectdb.pgml`, `pinegrow.json`, `_pginfo/`, `tailwind_theme/`, folderu eksportu w `wp-content/themes/`.
2. NIE dodawaj bundlera/watcherów/kroku builda — świadomie ich nie ma.
3. NIE wymyślaj własnej składni atrybutów `cms-*` / `wp-*` / `wc-*` — wyłącznie wzorce z `Docs/11-konwencje-blokow.md` i istniejących bloków projektu.
4. NIE dopisuj custom CSS, gdy istnieje klasa Tailwinda (Tailwind-first).

## Zasada WYŁĄCZNOŚCI Pinegrow ↔ Claude (najważniejsza reguła)

Pinegrow NIE wykrywa nowych/usuniętych plików z zewnątrz i może nadpisać zmiany z dysku wersją z pamięci. Dlatego:

- Jeśli Pinegrow jest otwarty — POPROŚ użytkownika o **Save All w Pinegrow** zanim zaczniesz edytować pliki, i przypominaj o tym przy edycji HTML.
- Po edycji (zwłaszcza po NOWYCH plikach) przypomnij: **„Reload project" w Pinegrow** (nie File Reload — tylko Reload project indeksuje nowe pliki).

## Konwencje (szczegóły: Docs/11-konwencje-blokow.md)

- **Tailwind-first:** wszystko klasami TW — arbitrary values (`hover:text-[#b0246d]`), cienie, gradienty. Custom CSS TYLKO dla: styli Splide, pseudo-elementów niemożliwych w TW, styli wtyczek.
- **Kolory:** z palety projektu ustawionej w panelu Design PG (nie hardcoduj hexów po plikach).
- **InnerContent:** nigdy dwa na tym samym poziomie; kolumny = bloki-dzieci z własnymi InnerContent; zawsze `cms-block-inner-content-allowed` + `-template`.
- **Supports na każdej sekcji:** `spacing.padding,spacing.margin,anchor,color.background,color.text,typography.fontSize`.
- **Nazewnictwo:** bloki kebab-case (`hero-slider`), pola `blok_element`, ID `nazwasekcji-element` tylko dla anchorów, prefiks PHP `{{PREFIKS}}_`.
- **Spis treści** na górze plików kodu (CSS/JS/PHP) — TY go aktualizujesz.
- **Slidery:** kontener `[nazwa]Slider splide`, konfiguracja wyłącznie w `assets/js/modules/sliders.js`.

## Workflow z Figmą

Sekcja po sekcji (duże frame'y przekraczają limit MCP): najpierw `get_metadata`, potem `get_code`/`get_image` dla pojedynczej sekcji. Wartości z variables (`get_variable_defs`), nie „na oko". Po zbudowaniu bloku ZAWSZE porównaj render ze screenshotem frame'a.

## Definicja „skończone" (blok/sekcja)

Działa na stronie demo i w Gutenbergu (wygląd identyczny front ↔ edytor), przeszedł walidację (agent block-validator), klasy Tailwinda działają, brak błędów w `debug.log`, użytkownik zrobił Reload project w PG.
