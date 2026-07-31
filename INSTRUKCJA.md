# INSTRUKCJA - zacznij tutaj

Motyw WordPress budujemy w **Pinegrow** (bloki + szablony) + **Tailwind 4** (kompiluje Pinegrow na zapis). **Nic nie budujemy w tle** - custom CSS/JS to gotowe pliki z `assets/`.

Ten plik to wszystko, co trzeba wiedzieć. Kolejność ma znaczenie - rób po kolei.

---

## 1. Zakładanie projektu (po kolei)

1. **Strona w Local** - załóż nową stronę WordPress w Local (musi istnieć przed startem).
2. **Rozpakuj startera** do `D:\Projekty\{nazwa}` (ZIP z GitHuba, bez `.git`).
3. **Claude Code** w folderze projektu → wpisz **`/nowy-projekt {nazwa}`**. To zrobi rebranding (nazwa, prefiks), przepisze ścieżki i odpali `npm install`.
4. **Pinegrow → Open project** (nie „Create Classic theme" - projekt jest już gotowy). Panel Design ma przykładowe kolory i font.
5. **Ustaw eksport** na folder motywu w Local (WordPress Theme Settings) i zrób pierwszy eksport: **Ctrl+M**.
6. **Aktywuj motyw** w WP (Wygląd → Motywy).
7. **Podmień kolory marki** w panelu Design PG (primary / secondary / accent) - reszta pójdzie automatycznie.

Od tej chwili budujesz stronę: header i stopkę, potem sekcje z Figmy.

---

## 2. Codzienna praca

**Podział ról:**
- Wygląd, układ, kolory, fonty → **Pinegrow** (panel Design).
- Kod, bloki, funkcje, formularze, audyty → **Claude Code**.

**Jedna żelazna zasada:** nigdy nie edytuj tego samego pliku w Pinegrow i Claude naraz.
- Zanim Claude rusza pliki: **Save All** w Pinegrow.
- Po zmianach Claude (zwłaszcza nowe pliki): **Reload project** w Pinegrow.

**Style:** klasy Tailwinda. Czego nie ma w TW → `assets/css/custom.css`. Kolory/fonty tylko w panelu Design.

**JS:** `assets/js/main.js` lub `assets/js/modules/`. Zapisujesz → odświeżasz przeglądarkę. Bez builda.

---

## 3. Grafiki

Wrzuć jpg/png do `inc/img/`, potem raz w terminalu:

```
npm run optimize
```

Robią się `.webp` (oryginał zostaje). W HTML zawsze używaj `.webp`.

---

## 4. Co masz gotowe (używaj, nie pisz od zera)

**Skille Claude Code** (wpisz `/nazwa`):
- **`/nowy-projekt`** - zakłada projekt (krok 1 wyżej).
- **`/nowa-sekcja`** - buduje pełną sekcję z Figmy (interakcje, slider, animacje, walidacja).
- **`/nowy-blok`** - pojedynczy blok.
- **`/formularz-cf7`** - przerabia formularz HTML+Tailwind na gotowy shortcode Contact Form 7.

**Szablony stron** (w rootcie, otwierasz w PG): `404`, `page`, `single`, `archive`, `search`, `parts` (breadcrumbs + paginacja). Gotowe do dopasowania pod projekt.

**Moduły JS** (włączasz w `inc/enqueue.php` - tablica na górze, `true`/`false`): slider (Swiper), menu mobilne, accordion, tabs, popup, galeria (lightbox), megamenu, drag scroll, animacje wejścia (`data-anim`).

**Animacje:** dodaj atrybut `data-anim="fade-up"` (albo `fade`, `fade-left`, `fade-right`, `zoom`) na elemencie. Nic nie inicjalizujesz.

---

## 5. Gdzie czego szukać

| Chcę... | Plik / miejsce |
|---|---|
| Zmienić kolory / fonty | Panel Design w Pinegrow |
| Dopisać własny styl | `assets/css/custom.css` |
| Style komponentów (menu, popup, CF7) | `assets/css/components.css` |
| Włączyć/wyłączyć moduł JS | `inc/enqueue.php` (tablica na górze) |
| Napisać własny kod PHP | `inc/custom.php` (nigdy `functions.php`) |
| WooCommerce | `inc/woo.php` (ładuje się, gdy wtyczka aktywna) |
| Stan i checklist projektu | `PROJEKT.md` |
| Pełne konwencje i zasady | `CLAUDE.md` |

**Nie ruszaj:** `functions.php`, `pinegrow.json`, `projectdb.pgml`, `theme.json`, `tailwind_theme/`, `_pginfo/` - zarządza nimi Pinegrow.

---

## 6. Coś nie działa

- **Style nie działają na froncie** → zrób eksport z PG (Ctrl+M) i sprawdź, czy motyw jest aktywny.
- **Nowy plik/blok niewidoczny w PG** → **Reload project** (nie File Reload).
- **Blok wygląda inaczej w edytorze niż na froncie** → zrób świeży eksport z PG; sprawdź, czy użyte klasy są w skanowanym HTML.
- **Komponenty w edytorze wyglądają statycznie** (tabsy jeden pod drugim, slidy w siatce, popup w ramce) → to celowe. JS działa tylko na froncie, w edytorze pokazujemy zawartość tak, żeby dało się ją wygodnie edytować.
- **Nie wiem, co dalej** → `PROJEKT.md` (stan projektu), potem `CLAUDE.md` (zasady).

> Kontrola wersji (Git) - na razie nie używamy. Bazę Local trzymasz lokalnie.
