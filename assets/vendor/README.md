# Biblioteki „vendored"

Gotowe pliki bibliotek serwowane wprost (bez builda), ładowane przez `inc/enqueue.php`.
Zero npm w runtime — aktualizacja = ręczna podmiana pliku.

| Plik | Biblioteka | Wersja | Źródło |
|---|---|---|---|
| `splide.min.js` | Splide (slider) | 4.1.x | https://github.com/Splidejs/splide |
| `splide-core.min.css` | Splide — style rdzenia | 4.1.x | j.w. |
| `splide-extension-auto-scroll.min.js` | Splide AutoScroll | 0.5.x | https://github.com/Splidejs/splide-extension-auto-scroll |
| `aos.js` | AOS (Animate On Scroll) | 2.3.x | https://github.com/michalsnik/aos |
| `aos.css` | AOS — style | 2.3.x | j.w. |

## Jak zaktualizować

1. Pobierz nowy plik z dystrybucji (CDN/GitHub release), podmień w tym folderze pod TĄ SAMĄ nazwą.
2. Sprawdź breaking changes (Splide: init w `assets/js/modules/sliders.js`; AOS: init w `assets/js/main.js`).
3. Zaktualizuj wersję w tabeli powyżej.
4. Test na froncie i w edytorze Gutenberga.

## Uwagi

- **AOS** to stabilny build 2.3.x (podwójny selektor `[data-aos][data-aos]`, kroki 50ms; config API: `startEvent`, `disableMutationObserver`). Wg roadmapy do rozważenia zamiana na CSS scroll-driven animations — na razie zostaje.
- Handle enqueue są prefiksowane nazwą motywu (`{{PREFIKS}}-splide`, `{{PREFIKS}}-aos`) — patrz `inc/enqueue.php`.
