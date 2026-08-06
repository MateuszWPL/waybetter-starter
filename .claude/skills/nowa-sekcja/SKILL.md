---
name: nowa-sekcja
description: Orkiestruje budowę bloku/sekcji z Figmy — prowadzi pipeline: materiały wejściowe (desktop + mobile) → budowa (pixel-perfect) → akcje → slidery → animacje → walidacja. Używaj gdy użytkownik pisze /nowa-sekcja albo prosi o zbudowanie bloku, sekcji lub ekranu z designu (Figma) — także pojedynczego bloku.
---

Prowadzisz uporządkowany przebieg budowy sekcji z Figmy, delegując do wyspecjalizowanych agentów. **Kluczowa zasada: subagenci NIE rozmawiają z użytkownikiem — wszystkie wymagania zbierasz TY (główny agent) PRZED delegacją.** Jeśli agent zwróci listę pytań zamiast kodu, dopytaj użytkownika (AskUserQuestion) i ponów delegację z uzupełnionym briefem.

## 0. Materiały wejściowe (obowiązkowe, zbierz ZANIM zaczniesz)
Nie startuj budowy bez kompletu. Poproś użytkownika (jedną wiadomością) o **cztery rzeczy**:
1. **Link do frame'a DESKTOP** w Figmie (albo selekcja).
2. **Link do frame'a MOBILE** w Figmie (albo selekcja).
3. **Screen z desktopu** (podgląd docelowego układu).
4. **Screen z mobile** (podgląd docelowego układu).

Po co komplet: subagent nie widzi ekranu, a układ mobilny bywa inny niż zwykłe zwężenie desktopu (inna kolejność, ukryte elementy, inny layout). Bez obu frame'ów i obu screenów pixel-perfect na mobile jest zgadywaniem.

Jeśli czegoś brakuje - dopytaj, nie zakładaj:
- **Brak osobnego frame'a mobile** → zapytaj wprost, jak sekcja ma się zachować na mobile (kolejność elementów, co się zwija/chowa, ile kolumn). Zapisz odpowiedź jako brief mobilny.
- **Brak screenów** → poproś o nie (screen z Figmy albo z frame'a). Jeśli użytkownik nie może dać - odnotuj, że weryfikacja renderu będzie ograniczona, i mocniej dopilnuj kroku 7.

Dodatkowo: jeśli Pinegrow jest otwarty, poproś o **Save All w Pinegrow** przed startem (inaczej PG może nadpisać zmiany z dysku).

## 1. Zbierz wymagania (AskUserQuestion — przed delegacją)
Zapytaj o to, czego nie widać jednoznacznie z frame'a:
- **Interakcje** w sekcji? (accordion / zakładki / popup / lightbox galerii / menu / brak)
- **Slider/karuzela?** jeśli tak — jaki charakter (przewijany ręcznie z paginacją? auto-scroll/marquee? ile widocznych na desktop/mobile?)
- **Animacje wejścia?** jeśli użytkownik nie ma zdania — zaznacz, że animation-expert zaproponuje minimalistyczny wariant do akceptacji.
- **Odstęp do sąsiednich sekcji:** jeśli design go nie precyzuje, dopytaj albo przyjmij skalę domu (`py-16 lg:py-24`). Odstęp robimy paddingiem symetrycznie (połowa na sekcję), nie marginesem - pełna zasada w `CLAUDE.md` „Standardowy layout sekcji". Przekaż ustalenie budowniczemu.
- Nazwa bloku (kebab-case) i przeznaczenie.

## 2. Budowa (pixel-perfect) → agent `pinegrow-block-expert`
Przekaż komplet z kroku 0: **frame desktop + frame mobile + oba screeny**, nazwę bloku, ustalenia z kroku 1, brief mobilny (jeśli nie było osobnego frame'a) i informację JAKIE hooki zostawić (pod slider/interakcje - wg konwencji). Wymagaj: markup + Tailwind mobile-first, hovery + `cursor-pointer`, oraz **porównanie renderu z obydwoma screenami - desktop i mobile osobno** (nie tylko desktop zwężony).

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
- **Responsywność:** porównaj gotowy render z **obydwoma screenami z kroku 0** (desktop i mobile). Jeśli coś się rozjeżdża na mobile - popraw, zanim zamkniesz. Dla pewności poproś użytkownika o screeny z frame'ów Pinegrow (mobilny + desktopowy) po eksporcie.
- Przypomnij: **„Reload project" w Pinegrow** → eksport → **porównaj render z Figmą** na mobile, tablecie i desktopie (front ORAZ edytor Gutenberga - mają wyglądać identycznie).

Kroki 3–5 pomijaj, gdy sekcja ich nie potrzebuje. Kolejność jest ważna: najpierw struktura, potem akcje/slidery (dopinają hooki), na końcu animacje (warstwa na gotowym) i walidacja.
