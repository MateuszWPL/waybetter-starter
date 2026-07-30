---
name: nowa-sekcja
description: Orkiestruje budowę pełnej sekcji/bloku z Figmy — prowadzi pipeline: wymagania → budowa (pixel-perfect) → akcje → slidery → animacje → walidacja. Używaj gdy użytkownik pisze /nowa-sekcja lub prosi o zbudowanie sekcji/ekranu z designu (Figma).
---

Prowadzisz uporządkowany przebieg budowy sekcji z Figmy, delegując do wyspecjalizowanych agentów. **Kluczowa zasada: subagenci NIE rozmawiają z użytkownikiem — wszystkie wymagania zbierasz TY (główny agent) PRZED delegacją.** Jeśli agent zwróci listę pytań zamiast kodu, dopytaj użytkownika (AskUserQuestion) i ponów delegację z uzupełnionym briefem.

## 0. Przygotowanie
- Jeśli Pinegrow jest otwarty — poproś użytkownika o **Save All w Pinegrow** przed startem (inaczej PG może nadpisać zmiany z dysku).
- Ustal źródło: link/selekcja frame'a w Figmie (preferowane) albo opis. Bez designu → poproś o niego lub o dokładny opis.

## 1. Zbierz wymagania (AskUserQuestion — przed delegacją)
Zapytaj o to, czego nie widać jednoznacznie z frame'a:
- **Interakcje** w sekcji? (accordion / zakładki / popup / lightbox galerii / menu / brak)
- **Slider/karuzela?** jeśli tak — jaki charakter (przewijany ręcznie z paginacją? auto-scroll/marquee? ile widocznych na desktop/mobile?)
- **Animacje wejścia?** jeśli użytkownik nie ma zdania — zaznacz, że animation-expert zaproponuje minimalistyczny wariant do akceptacji.
- Nazwa bloku (kebab-case) i przeznaczenie.

## 2. Budowa (pixel-perfect) → agent `pinegrow-block-expert`
Przekaż: frame Figmy/opis, nazwę, ustalenia z kroku 1, informację JAKIE hooki zostawić (pod slider/interakcje — wg konwencji). Wymagaj: markup + Tailwind mobile-first, hovery + `cursor-pointer`, porównanie ze screenshotem frame'a.

## 3. Akcje → agent `interactions-expert` (jeśli sekcja ma interakcje)
Dobiera i podpina moduł JS, dopina hooki w HTML, włącza moduł w `wbstarter_modules()` (`inc/enqueue.php`).

## 4. Slidery → agent `swiper-expert` (jeśli są)
Konfiguruje wariant w `assets/js/modules/sliders.js` (nie w HTML), ustawia klasę kontenera, dba o `sliders: true` w configu.

## 5. Animacje → agent `animation-expert`
Nakłada `data-anim` wg ustaleń z kroku 1 (albo z zaproponowanego i zaakceptowanego wariantu). Minimalistycznie, bez zmian layoutu.

## 6. Walidacja → agent `block-validator`
Odpal na zmienionych plikach. Napraw wszystkie `[BŁĄD]` (delegując do właściwego agenta). `[OSTRZEŻENIE]`/`[SUGESTIA]` — oceń.

## 7. Domknięcie
- Dodaj demo bloku do `blocks.html`.
- Podsumuj: pliki, pola bloku (co klient edytuje), supports, dodane hovery/animacje/interakcje.
- Przypomnij: **„Reload project" w Pinegrow** → eksport → **porównaj render ze screenshotem Figmy** (front ORAZ edytor Gutenberga — mają wyglądać identycznie).

Kroki 3–5 pomijaj, gdy sekcja ich nie potrzebuje. Kolejność jest ważna: najpierw struktura, potem akcje/slidery (dopinają hooki), na końcu animacje (warstwa na gotowym) i walidacja.
