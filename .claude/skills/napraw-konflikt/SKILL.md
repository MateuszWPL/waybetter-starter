---
name: napraw-konflikt
description: Ratunek po konflikcie Gita dla osób nietechnicznych. Używaj gdy git pull/push zgłasza konflikt lub użytkownik pisze /napraw-konflikt.
---

Cel: użytkownik NIE rozwiązuje konfliktu ręcznie — Ty go prowadzisz. Spokojnie, krok po kroku:

1. `git status` — ustal, które pliki są w konflikcie. Wyjaśnij jednym zdaniem, co się stało (dwie osoby zmieniły to samo).
2. **Pliki stanu Pinegrow** (`projectdb.pgml`, `pinegrow.json`, `_pginfo/*`): bierz wersję ZDALNĄ (`git checkout --theirs`) — stan PG odtworzy się przy Reload project.
3. **Pliki kodu** (HTML/CSS/JS/PHP): pokaż użytkownikowi obie wersje zmian (kto co zmienił, po polsku, bez żargonu) i zapytaj, którą zachować — albo scal ręcznie, jeśli zmiany nie nachodzą na siebie. Nigdy nie zostawiaj markerów `<<<<<<<` w plikach.
4. Po rozwiązaniu: `git add -A`, commit „scalenie zmian: [opis]", push.
5. Przypomnij: **Reload project w Pinegrow** + na przyszłość zasada z PROJEKT.md — jeden projekt prowadzi jedna osoba naraz.
