---
name: nowy-blok
description: Scaffold nowego bloku Pinegrow wg konwencji zespołu. Używaj gdy użytkownik pisze /nowy-blok [nazwa] lub prosi o nowy blok/sekcję.
---

Argument: nazwa bloku (kebab-case). Brak → zapytaj o nazwę i przeznaczenie (sekcja hero? listing? repeater?).

1. Jeśli Pinegrow otwarty (hook/procesy) — poproś o Save All przed startem.
2. Deleguj do agenta **pinegrow-block-expert**: nowy blok wg konwencji z `CLAUDE.md` (sekcja „Konwencje bloków"), wzorowany na istniejących blokach projektu (przekaż mu nazwę, przeznaczenie, ewentualny opis/design od użytkownika).
3. Jeśli w projekcie jest katalog bloków (`blocks.html`) — dodaj tam demo bloku.
4. Odpal agenta **block-validator** na nowych plikach; napraw `[BŁĄD]`-y.
5. Podsumuj: pliki, pola bloku (co klient może edytować), supports.
6. Przypomnij: **„Reload project" w Pinegrow** (nowe pliki są dla PG niewidzialne), potem eksport motywu, żeby blok pojawił się w Gutenbergu.
