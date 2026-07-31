---
name: formularz-cf7
description: Konwertuje formularz zbudowany w HTML + Tailwind na gotowy shortcode Contact Form 7 (do wklejenia w zakładce Formularz wtyczki CF7). Używaj gdy użytkownik pisze /formularz-cf7 lub prosi o przerobienie formularza HTML/TW na CF7.
---

Robimy formularze najpierw w HTML + Tailwind (w bloku PG), a potem przerabiamy na CF7. Ten skill robi ten drugi krok: zamienia pola na tagi CF7, zostawiając cały układ (divy, klasy Tailwinda) bez zmian.

Argument: nazwa formularza (kebab-case, np. `kontakt`). Brak → zapytaj o nazwę i skąd wziąć markup (wklejony HTML czy istniejący blok).

## Wejście

Weź markup formularza w HTML + Tailwind. Jeśli użytkownik go nie wkleił, poproś albo wskaż blok, z którego mam go wziąć.

## Reguły konwersji (pole HTML → tag CF7)

- `<input type="text">` → `[text* name ...]` (gwiazdka = pole wymagane), `type="email"` → `[email* name]`, `type="tel"` → `[tel* name]`, `<textarea>` → `[textarea name ...]`, `<select>` → `[select name "Opcja 1" "Opcja 2"]`, checkbox zgody → `[acceptance name ...]`, przycisk wysyłki → `[submit "Etykieta"]`.
- **Wymagane pole** = gwiazdka po typie (`[text*`), niewymagane bez (`[text`). Domyślnie wymagane: imię, e-mail, telefon, zgoda.
- **Klasy Tailwinda** z `class="..."` przepisz na składnię CF7: każda klasa jako `class:nazwa` (bez kropki, po jednej na klasę). `class="bg-white border rounded-lg"` → `class:bg-white class:border class:rounded-lg`.
- **Placeholder** z `placeholder="..."` → na końcu tagu `placeholder "Tekst"`. Textarea liczba wierszy → `x5` (np. `[textarea your-message x5 ...]`).
- **Nazwy pól** unikalne, opisowe (`your-name`, `your-email`, `your-tel`, `your-company`, `your-message`). Zapamiętaj je - trafią do zakładki Mail.
- **Zgoda (acceptance):** `[acceptance acceptance-1 class:...]` a po nim tekst zgody jako zwykły HTML (link do polityki zostaje `<a>`). Wyrównanie checkboxa z tekstem załatwia `components.css` (`.wpcf7-list-item{margin:0}` + flex na labelce). Jeśli design ma minimalne przesunięcie, zostaw je jako ujemny margines na wrapperze (`style="margin-top:-12px"` albo klasa) - CF7 nie rusza tego HTML.
- **Elementy interaktywne bez odpowiednika w CF7** (np. suwak `<input type="range">` z odczytem): zostaw markup HTML bez zmian, a wartość wpiąż ukrytym polem `[text your-area "300"]` synchronizowanym JS-em (jak w istniejących formularzach). CF7 przepuszcza obcy HTML nietknięty.
- **Cały układ** (divy z gridem/flexem i klasami Tailwinda) przepisz 1:1 - CF7 renderuje niebędące tagami fragmenty tak jak są.

## Kroki

1. Rozpisz pola formularza: nazwa, typ CF7, wymagane tak/nie, placeholder.
2. Wygeneruj shortcode: zachowaj strukturę divów i klasy Tailwinda, podmień tylko pola na tagi CF7 wg reguł wyżej.
3. Zapisz wynik do pliku `cf7/{nazwa}.txt` w projekcie (utwórz folder `cf7/` jeśli nie ma) i wypisz go też w czacie - gotowy do wklejenia w CF7 → zakładka **Formularz**.
4. Przypomnij o dwóch rzeczach:
   - Filtr wyłączający `<p>`/`<br>` (`wpcf7_autop_or_not`) jest już w `inc/custom.php` startera. Na starszym projekcie bez niego dodaj tę linię do `inc/custom.php`.
   - W zakładce **Mail** wpisz nazwy pól w mail-tagach (np. `[your-name]`, `[your-email]`), inaczej treść nie przyjdzie.
5. Wypisz listę nazw pól (do zakładki Mail) i zaznacz, które są wymagane.

## Czego nie robić

Nie zmieniaj klas Tailwinda ani układu (to już zaakceptowany wygląd). Nie dodawaj `<p>`/`<br>` (od tego jest filtr). Nie wymyślaj pól, których nie ma w markupie. Nie ustawiaj konfiguracji CF7 poza formularzem (Mail/Messages to robi człowiek w panelu).
