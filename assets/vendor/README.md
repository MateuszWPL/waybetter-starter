# Biblioteki „vendored"

Gotowe pliki bibliotek serwowane wprost (bez builda), ładowane przez `inc/enqueue.php`.
Runtime motywu = zero-build: te pliki są w repo i motyw działa bez `node_modules`.
Zarządzane przez **npm** — nie edytuj ich ręcznie, są nadpisywane przez `scripts/vendors.js`.

| Plik | Biblioteka | Wersja | Źródło |
|---|---|---|---|
| `swiper-bundle.min.js` | Swiper (slider) | 11.x | https://swiperjs.com |
| `swiper-bundle.min.css` | Swiper — style | 11.x | j.w. |

## Jak zaktualizować

1. `npm update swiper` (podbija w `package.json`/lock),
2. `npm run vendors` (kopiuje świeże pliki z `node_modules/swiper/` tutaj) — robi to też automatycznie `postinstall` po każdym `npm install`,
3. sprawdź breaking changes (init sliderów w `assets/js/modules/sliders.js`),
4. test na froncie i w edytorze Gutenberga, commit zaktualizowanych plików vendor.

## Uwagi

- **Swiper** zastąpił Splide (bez rozwoju) — bundle zawiera wszystkie moduły (Navigation, Pagination, Autoplay, FreeMode…), bez składania customowego builda.
- Animacje on-scroll NIE używają już biblioteki (koniec AOS) — patrz `assets/css/animations.css` (CSS scroll-driven) + `assets/js/modules/reveal.js` (fallback IntersectionObserver).
- Handle enqueue są prefiksowane nazwą motywu (`{{PREFIKS}}-swiper`) — patrz `inc/enqueue.php`.
