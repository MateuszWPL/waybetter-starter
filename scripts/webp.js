/**
 * Konwerter WEBP na żądanie — jedna komenda: `npm run optimize`
 * Przelatuje inc/img/ oraz assets/img/, konwertuje jpg/jpeg/png → webp (quality 80).
 * Oryginał ZOSTAJE na miejscu (PG nie wykrywa usuniętych plików). Idempotentne:
 * pomija, gdy webp jest nowszy niż źródło. SVG i webp pomijane.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const QUALITY = 80; // jak w XnConvert
const EXTS = ['.jpg', '.jpeg', '.png'];
const DIRS = [
	path.join(__dirname, '..', 'inc', 'img'),
	path.join(__dirname, '..', 'assets', 'img'),
];

function webpPath(file) {
	return file.slice(0, -path.extname(file).length) + '.webp';
}

async function convert(file) {
	const out = webpPath(file);
	try {
		if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) {
			return false; // aktualne — pomiń
		}
		await sharp(file).webp({ quality: QUALITY }).toFile(out);
		console.log(`[webp] ${path.basename(file)} → ${path.basename(out)}`);
		return true;
	} catch (err) {
		console.error(`[webp] błąd przy ${path.basename(file)}: ${err.message}`);
		return false;
	}
}

async function run() {
	let done = 0;
	for (const dir of DIRS) {
		if (!fs.existsSync(dir)) continue;
		const files = fs
			.readdirSync(dir, { recursive: true })
			.map((f) => path.join(dir, f.toString()))
			.filter((f) => EXTS.includes(path.extname(f).toLowerCase()) && fs.statSync(f).isFile());
		for (const f of files) {
			if (await convert(f)) done++;
		}
	}
	console.log(`[webp] gotowe — przekonwertowano ${done} plik(ów).`);
}

run();
