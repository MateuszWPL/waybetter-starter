/**
 * Kopiowanie „vendored" bibliotek z node_modules → assets/vendor/ — jedna komenda:
 * `npm run vendors` (uruchamiane też automatycznie po `npm install` przez postinstall).
 * Runtime motywu zostaje zero-build: pliki vendor są w repo i ładują się wprost przez
 * inc/enqueue.php. Aktualizacja biblioteki: `npm update swiper && npm run vendors`.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const VENDOR = path.join(ROOT, 'assets', 'vendor');

// [ pakiet npm, plik w pakiecie, nazwa docelowa w assets/vendor ]
const FILES = [
	['swiper', 'swiper-bundle.min.js', 'swiper-bundle.min.js'],
	['swiper', 'swiper-bundle.min.css', 'swiper-bundle.min.css'],
];

function pkgVersion(pkg) {
	try {
		return require(path.join(ROOT, 'node_modules', pkg, 'package.json')).version;
	} catch (e) {
		return '?';
	}
}

function run() {
	if (!fs.existsSync(VENDOR)) fs.mkdirSync(VENDOR, { recursive: true });
	let copied = 0;
	for (const [pkg, src, dest] of FILES) {
		const from = path.join(ROOT, 'node_modules', pkg, src);
		const to = path.join(VENDOR, dest);
		if (!fs.existsSync(from)) {
			console.warn(`[vendors] pomijam ${pkg}/${src} — brak w node_modules (uruchom najpierw npm install)`);
			continue;
		}
		fs.copyFileSync(from, to);
		console.log(`[vendors] ${pkg}@${pkgVersion(pkg)}: ${src} → assets/vendor/${dest}`);
		copied++;
	}
	console.log(`[vendors] gotowe — skopiowano ${copied} plik(ów).`);
}

run();
