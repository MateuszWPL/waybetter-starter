# Waybetter starter

Starter motywu WordPress: **Pinegrow 9.3 + Tailwind 4, zero builda**. Szkielet, z którego zakładamy nowe projekty stron. Kod serwowany wprost z `assets/`, Tailwind kompiluje Pinegrow na zapis - nie ma bundlera ani kroku build.

## Szybki start

1. Pobierz ZIP z GitHuba i rozpakuj do `D:\Projekty\{nazwa}` (bez `.git`).
2. W Claude Code (w folderze projektu) wpisz `/nowy-projekt {nazwa}` - rebranding nazwy i prefiksu, przepisanie ścieżek, `npm install`.
3. Pinegrow → **Open project** (nie „Create Classic theme" - projekt jest gotowy), ustaw eksport na stronę w Local, Ctrl+M, aktywuj motyw.

Pełna kolejność i codzienna praca: **[INSTRUKCJA.md](INSTRUKCJA.md)**.

## Dla kogo który plik

- **[INSTRUKCJA.md](INSTRUKCJA.md)** - zespół: jak pracujemy, kolejność kroków, troubleshooting.
- **[CLAUDE.md](CLAUDE.md)** - zasady i konwencje dla Claude Code (agenci, akcje WP, layout, edytor).
- **CHANGELOG.md** - historia wersji startera (utrzymywana w warsztacie, nie wędruje na projekty).
- **PROJEKT.md** - stan i checklist konkretnego projektu (uzupełniany w trakcie).

## Skille (Claude Code)

`/nowy-projekt` · `/nowa-sekcja` · `/nowy-blok` · `/nowy-cpt` · `/formularz-cf7` · `/audyt`

## Stack

- [Pinegrow](https://pinegrow.com/docs/wordpress/) 9.3 (bloki native-hybrid, szablony WP)
- [Tailwind CSS](https://tailwindcss.com/) 4 (wbudowany kompilator PG, tokeny z panelu Design)
- [Swiper](https://swiperjs.com/) 11 (slidery, vendored)
- Contact Form 7 (formularze)
