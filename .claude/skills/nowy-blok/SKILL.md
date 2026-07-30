---
name: nowy-blok
description: Scaffold nowego bloku Pinegrow wg konwencji zespołu. Używaj gdy użytkownik pisze /nowy-blok [nazwa] lub prosi o pojedynczy blok/sekcję. Do pełnej sekcji z Figmy (z interakcjami/sliderem/animacjami) użyj raczej /nowa-sekcja.
---

Argument: nazwa bloku (kebab-case). Brak → zapytaj o nazwę i przeznaczenie (sekcja hero? listing? repeater?).

> **Pełna sekcja z Figmy** (interakcje + slider + animacje)? Użyj **`/nowa-sekcja`** — prowadzi cały pipeline z delegacją do wyspecjalizowanych agentów. Ten skill jest do szybkiego, pojedynczego bloku.

1. Jeśli Pinegrow otwarty (hook/procesy) — poproś o **Save All** przed startem.
2. Zbierz brakujące wymagania od użytkownika (przeznaczenie, pola, czy ma interakcje/slider/animacje) — subagenci nie pytają, więc rób to teraz.
3. Deleguj do agenta **pinegrow-block-expert**: markup + Tailwind pixel-perfect (hovery + `cursor-pointer`, mobile-first) wg `CLAUDE.md` („Konwencje bloków"), wzorowany na istniejących blokach. Przekaż nazwę, przeznaczenie, design/opis i JAKIE hooki zostawić.
4. Jeśli blok ma:
   - **interakcje** (accordion/tabs/popup/lightbox/menu) → agent **interactions-expert**,
   - **slider/karuzelę** → agent **swiper-expert**,
   - **animacje wejścia** → agent **animation-expert**.
5. Dodaj demo bloku do `blocks.html`.
6. Odpal agenta **block-validator** na nowych plikach; napraw `[BŁĄD]`-y.
7. Podsumuj: pliki, pola bloku (co klient edytuje), supports.
8. Przypomnij: **„Reload project" w Pinegrow** (nowe pliki są dla PG niewidzialne), potem eksport, żeby blok pojawił się w Gutenbergu.
