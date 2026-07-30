# Jak pracujemy (pół strony — bez lania wody)

## Zaczynam pracę
1. Otwieram projekt w **Pinegrow** (Open project).
2. (opcjonalnie) Otwieram **Claude Code** w folderze projektu — do kodu/bloków/audytów.

Nic nie odpalam w tle — Tailwind kompiluje Pinegrow na zapis, reszta to gotowe pliki.

## Pracuję
- Wizualnie/układ i kolory (panel Design) → **Pinegrow**. Kod/bloki/funkcje → **Claude Code**.
- **Nigdy nie edytuję tego samego pliku w PG i Claude naraz.** Zanim Claude rusza pliki: **Save All** w PG. Po zmianach Claude: **Reload project** w PG.
- Style: klasy **Tailwinda**. Coś czego nie ma w TW → `assets/css/custom.css`. Kolory/fonty → panel Design PG.
- Custom JS → `assets/js/main.js` / `assets/js/modules/`. Zapisuję → odświeżam przeglądarkę. Bez builda.
- Grafiki: wrzucam jpg/png do `inc/img/`, potem raz **`npm run optimize`** → robią się `.webp` (oryginał zostaje). W HTML używam `.webp`.

## Kończę pracę
- Jeśli zmieniały się pliki motywu: **eksport z Pinegrow** (Ctrl+M / Export → WordPress theme). To wszystko.

## Coś się zepsuło
- Style nie działają na froncie → sprawdź, czy zrobiłeś eksport z PG i czy motyw jest aktywny.
- Nie wiem co dalej → zajrzyj do `PROJEKT.md`.

> Kontrola wersji (Git/GitHub) — na razie jej nie używamy, wróci później.
