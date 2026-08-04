---
name: audyt
description: Audyt projektu przed oddaniem - skan dostępności (WCAG) i SEO szablonów, bloków i inc/. Zwraca raport z priorytetami, NIE zmienia plików. Używaj gdy użytkownik pisze /audyt albo prosi o sprawdzenie strony przed oddaniem/publikacją (dostępność, WCAG, SEO, alt, kontrast, nagłówki).
---

Audyt uruchamiany pod koniec projektu. **Tylko raportujesz** - nie zmieniasz plików. Poprawki wdraża główny agent dopiero po akceptacji użytkownika (żeby nie ruszać czegoś, co jest celowe).

## Zakres skanu
Skanuj: `*.html` w rootcie (szablony + `blocks.html` + `examples.html` pomiń jako referencję), `inc/*.php`, `assets/css/*`. Duży projekt (dużo plików `.html`, duży `blocks.html`) → deleguj skan do agenta **Explore** i zbierz wyniki. Pomijaj `tailwind_theme/`, `_pginfo/`, `_pgbackup/`, `node_modules/`, `assets/vendor/`.

### Dostępność (WCAG)
- **Obrazy:** każdy `<img>` ma `alt` (treściowy) albo pochodzi z pola cms z altem; dekoracyjne mają `alt=""`. Brak atrybutu = [BŁĄD].
- **Hierarchia nagłówków:** per szablon jeden `<h1>`, bez przeskoków poziomów (h2 → h4). Rozjazd = [OSTRZEŻENIE].
- **aria-label:** linki-ikony (sam SVG bez tekstu), nawigacja, hamburger, strzałki slidera, przyciski zamknięcia - mają `aria-label` po polsku. Brak = [OSTRZEŻENIE].
- **Kontrast (heurystyka, nie licz dokładnie):** flaguj podejrzane pary tekst/tło z klas TW - jasny szary tekst na białym (`text-gray-400`/`text-gray-500` na `bg-white`), tekst z `/opacity` poniżej ~60% na jasnym tle, `text-white` na jasnym tle. Oznacz [OSTRZEŻENIE] „do sprawdzenia kontrastu", nie przesądzaj.
- **Formularze:** pola mają `<label>` skojarzone (`for`/`id`) albo `aria-label`; placeholder nie zastępuje labela. Dotyczy też markupu przed konwersją na CF7.
- **Focus:** nie usuwaj widocznego focusa bez alternatywy (`outline-none` bez `focus:ring`/`focus:border`) = [OSTRZEŻENIE].
- **Klikalne:** linki/przyciski mają `cursor-pointer` + hover (spójne z konwencją).

### SEO / semantyka
- Jeden `<h1>` na szablon (treściowy, nie logo).
- Semantyka: `<main>`, `<nav>`, `<header>`, `<footer>` użyte; treść nie jest wyłącznie `<div>`.
- Obrazy w formacie `.webp` (poza SVG); `loading="lazy"` na obrazach poza pierwszym ekranem (hero zostaw bez lazy).
- `wp-template-export-as` bez kolizji nazw między szablonami.
- Brak resztek placeholderów w treściach oddawanych klientowi: `{{...}}`, „lorem ipsum", „example.pl", `kontakt@example`, telefon `000 000 000`, „Tytuł wpisu"/„Kategoria" jako realny tekst. Zgłoś [OSTRZEŻENIE] (placeholdery w szablonach-wzorcach typu `single.html` są OK, chodzi o realne strony projektu).

### Higiena
- Moduł JS włączony w `wbstarter_modules()` (`inc/enqueue.php` = `true`), którego hooków nie ma w żadnym HTML = [SUGESTIA] (wyłącz, oszczędzasz request).
- Placeholder grafiki startera (`pinegrow.com/placeholders/...`, przykładowe webp) pozostałe w realnych szablonach = [OSTRZEŻENIE].
- `debug.log` (jeśli dostępny) - wspomnij, żeby użytkownik sprawdził czysty.

## Wynik
1. Raport w czacie: pogrupowany `[BŁĄD]` / `[OSTRZEŻENIE]` / `[SUGESTIA]`, każda pozycja `plik:linia` + konkretna poprawka. Na końcu jedno zdanie: gotowe do oddania czy nie.
2. Zapisz ten sam raport do `audyt-RRRR-MM-DD.md` w rootcie projektu (data z systemu).
3. Odhacz w `PROJEKT.md` pozycję „Audyt WCAG + SEO" (sekcja Jakość), jeśli nie ma `[BŁĄD]`-ów; przy błędach zostaw niezaznaczone i wypisz co blokuje.
4. Zapytaj użytkownika, czy wdrożyć poprawki (dopiero wtedy edytujesz pliki, per pozycja).
