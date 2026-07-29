---
name: koniec
description: Koniec sesji — build produkcyjny, webp, backup bazy, commit i push. Używaj gdy użytkownik pisze /koniec lub kończy pracę.
---

Wykonaj po kolei (przy błędzie zatrzymaj się i zgłoś, nie brnij dalej):

1. `npm run build` (CSS + JS produkcyjne) i `npm run webp` — pokaż wynik.
2. **Szybka walidacja:** jeśli w sesji powstały/zmieniły się bloki — odpal agenta block-validator na zmienionych plikach; `[BŁĄD]`-y wypisz (decyzja użytkownika: naprawiamy teraz czy commitujemy z TODO).
3. **Backup bazy:** `./wp.bat db export "D:\Backupy\{projekt}\{RRRR-MM-DD_HHmm}.sql"` (folder utwórz, jeśli brak; skasuj dumpy starsze niż 10 ostatnich). Brak wp.bat → zgłoś i pomiń.
4. **PROJEKT.md:** odhacz ukończone pozycje.
5. **Commit:** `git add -A` + commit z krótkim opisem po polsku CO zrobiono (nie „zmiany"), potem `git push` (jeśli jest remote). Pokaż użytkownikowi opis przed commitem.
6. Przypomnij na koniec: jeśli były zmiany w plikach motywu — **eksport motywu z Pinegrow** robi człowiek w PG (Export → WordPress theme), inaczej strona w Local nie zobaczy zmian.
