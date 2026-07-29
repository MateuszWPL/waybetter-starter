# Jak pracujemy (pół strony — bez lania wody)

## Zaczynam pracę
1. Klikam skrót **🔧 projekt** na pulpicie (odpala watchery + git pull + Pinegrow). To wszystko.
2. Jeśli używam Claude Code: piszę **/start** — powie mi, na czym stanęła praca i co dalej.

## Pracuję
- Wizualnie/układ → **Pinegrow**. Kod/bloki/funkcje → **Claude Code** (mówię mu co chcę).
- **Nigdy nie edytuję tego samego pliku w PG i Claude naraz.** Zanim Claude rusza pliki: Save All w PG. Po zmianach Claude: **Reload project** w PG.
- Grafiki wrzucam do `inc/img/` (jpg/png) — webp robi się sam; w HTML używam `.webp`.
- Style: klasy Tailwinda. Kolory/fonty: `resources/css/theme.css` albo proszę Claude.

## Kończę pracę
1. W Claude Code: **/koniec** (build, backup bazy, commit, push — tylko potwierdzam).
2. Jeśli zmieniały się pliki motywu: **eksport z Pinegrow** (Export → WordPress theme).

## Coś się zepsuło
- Konflikt Gita / dziwny błąd przy pull: **/napraw-konflikt** w Claude Code.
- Czerwony pasek „CSS nieaktualny" na stronie: zamknij wszystko, otwórz projekt skrótem.
- Nie wiem co dalej: **/start** albo zajrzyj do PROJEKT.md.
