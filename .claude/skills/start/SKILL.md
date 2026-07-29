---
name: start
description: Początek sesji pracy nad projektem — git pull, watchery, status i plan. Używaj gdy użytkownik pisze /start lub zaczyna dzień pracy.
---

Wykonaj po kolei:

1. **Git:** jeśli jest `.git` — `git pull --ff-only`. Konflikt/rozjazd → zaproponuj `/napraw-konflikt`, nie kombinuj sam.
2. **Watchery:** sprawdź `.watchery.lock` w roocie. Brak → uruchom `npm run dev` w tle (Bash, run_in_background) i poinformuj. Jest → sprawdź, czy build/main.css jest świeższy niż resources/ (stary = watchery martwe: usuń lock, odpal na nowo).
3. **Pinegrow:** jeśli hook zgłosił otwarty PG — przypomnij o Save All przed edycjami.
4. **Status:** przeczytaj `PROJEKT.md` + `git log -5 --oneline` i powiedz w 3-5 zdaniach: co ostatnio zrobione, co jest następne w kolejce, czy są nieodhaczone rzeczy blokujące.

Zakończ pytaniem: „Robimy [następna pozycja z PROJEKT.md]?"
