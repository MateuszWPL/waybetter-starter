# INSTALACJA — kroki F1 do wykonania (część wymaga GUI Pinegrow)

Stan: szkielet startera gotowy i przetestowany bez Pinegrow. Poniższe kroki spinają go z PG 9.3 i Localem — to są **bramki F1 z Docs/08-roadmapa.md**. Odhaczaj po kolei; problemy zapisuj na dole.

## A. Podpięcie Pinegrow (GUI — robi człowiek)

1. Utwórz stronę w Local na testy startera (np. `starter-test`), pusta instalacja WP.
2. Pinegrow 9.3 → **Open project** → wskaż folder tego startera. PG utworzy/uzupełni `pinegrow.json` i `projectdb.pgml`.
3. Ustawienia projektu WP w PG: typ **Classic theme**, bloki **native-hybrid (Blocks v3)**, eksport do `{strona Local}\app\public\wp-content\themes\starter-test`.
4. Aktywacja **Tailwind 4** w projekcie PG + **external build process** (Design panel → Tailwind → compiler options): PG ma NIE kompilować sam, tylko aktualizować `_pginfo/used-classes.html`; jako komendę builda przy zapisie ustaw `npm run css:once` (drugi pas bezpieczeństwa — działa bez watcherów).
5. Utwórz w PG pierwszy szablon `index.html` (master page) z akcjami WP jak w starym szablonie.

## B. Testy — bramki F1

- [ ] **B1.** Eksport motywu z PG → motyw instaluje się i aktywuje w Local bez błędów (functions.php + inc/ przechodzą).
- [ ] **B2.** `start-projekt.bat` odpala watchery i PG; zapisanie zmiany w PG bez watcherów też kompiluje CSS (one-shot z kroku A4).
- [ ] **B3.** Klasa TW dodana w panelu Design PG pojawia się w `build/main.css` (dowód, że `@source used-classes.html` działa mimo .gitignore).
- [ ] **B4. Parity edytora:** testowy blok wygląda identycznie w Gutenbergu i na froncie (cienie, hover, typografia). Jeśli nie — dokręcamy editor.css (Docs/04, R14).
- [ ] **B5.** `wp.bat` działa: `./wp.bat db export test.sql` przechodzi (wrapper na bazie „Open Site Shell" Locala — zbudujemy przy pierwszym projekcie).
- [ ] **B6.** Test K2 (5 min): zamknij PG, przenieś `projectdb.pgml` gdzieś indziej, otwórz projekt w PG — czy odtwarza stan? Wynik → Docs/10 (K2).
- [ ] **B7.** Wrzuć `test.jpg` do `inc/img/` — powstaje `test.webp`, oryginał zostaje.
- [ ] **B8. Test K10:** zmień kolor primary w panelu Design PG → sprawdź (git diff), gdzie się zapisał (pinegrow.json? CSS?). Wynik → Docs/10 (K10) i decyzja o synchronizacji z `theme.css`.
- [ ] **B9. Roundtrip:** edycja pliku przez Claude → dialog reload w PG działa; nowy plik od Claude widoczny po **Reload project**; scenariusz konfliktowy (niezapisane zmiany w PG + edycja Claude) — procedura ratunkowa ze snapshotem git działa.

## C. Po testach

- Wyniki B6/B8 wpisać do `D:\Pulpit\Workflow\Docs\10-otwarte-kwestie.md`.
- Poprawki szkieletu → commit w repo startera + wpis w CHANGELOG.md.
- Dopiero potem F2: przenoszenie bloków wzorcowych (Docs/08).

## Problemy / notatki

(zapisuj tutaj)
