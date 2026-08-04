# PROJEKT: {{NAZWA_PROJEKTU}}

> Ten plik to stan i checklist projektu (Claude uzupełnia). Jak pracujemy → `INSTRUKCJA.md`.

- **Start:** RRRR-MM-DD · **Wersja startera:** 0.12.0
- **Strona Local:** {{SCIEZKA_LOCAL}}
- **Figma:** (link)

## Checklist życia projektu

### Setup
- [ ] Rozpakowany ZIP startera + `/nowy-projekt` (rebranding, przepisany `pinegrow.json`, `npm install`)
- [ ] Pinegrow: **Open project** (projekt gotowy — panel Design i ustawienia WP już skonfigurowane)
- [ ] Eksport ustawiony na stronę Local, motyw aktywny w WP
- [ ] Kolory marki podmienione w **panelu Design PG** (primary/secondary/accent)

### Budowa
- [ ] Header + stopka (master page)
- [ ] Strona główna — sekcja po sekcji z Figmy
- [ ] Podstrony: (lista wg designu)
- [ ] Bloki dedykowane: (lista)
- [ ] CPT / taksonomie: (jeśli są)
- [ ] WooCommerce: (jeśli sklep — moduł `inc/woo.php`)

### Jakość
- [ ] Walidacja bloków (block-validator) czysta
- [ ] Audyt WCAG + SEO (ręcznie przez Claude)
- [ ] Test responsywności
- [ ] Parity front ↔ edytor Gutenberga
- [ ] Grafiki przekonwertowane (`npm run optimize`)

### Oddanie
- [ ] Eksport z PG, motyw kompletny
- [ ] Przekazanie klientowi (instrukcja edycji bloków)

## Notatki sesji
(Claude dopisuje: data — co zrobiono / na czym stanęliśmy)
