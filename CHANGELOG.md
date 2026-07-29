# Changelog startera

Projekty zapisują w PROJEKT.md wersję startera, z której powstały. Poprawki NIE propagują automatycznie do oddanych stron — backportujemy tylko krytyczne (Docs/12).

## 0.1.0 — 2026-07-29

Pierwszy szkielet (faza F1, przed testami z Pinegrow):
- pipeline: Tailwind 4 (external build, @source na used-classes.html), esbuild, webp-watcher (sharp+chokidar), concurrently
- start-projekt.bat (jedno wejście: watchery + git pull + Pinegrow), task VS Code folderOpen
- inc/: setup, enqueue (editor.css przez enqueue_block_assets + failsafe „CSS nieaktualny"), custom, woo (HPOS)
- resources/: theme.css (@theme — jedno miejsce tokenów), main.css, editor.css (important), components.css i moduły JS przeniesione ze starego szablonu
- warstwa Claude: CLAUDE.md, hook SessionStart (snapshot + detekcja PG), agenci pinegrow-block-expert i block-validator, skille /start /koniec /nowy-blok /nowy-projekt /napraw-konflikt
- dokumenty: PROJEKT.md, README-praca.md, INSTALACJA.md
