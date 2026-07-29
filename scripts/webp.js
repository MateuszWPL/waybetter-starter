/**
 * Konwerter WEBP (D12, K11)
 * - `node scripts/webp.js`        → jednorazowy przelot inc/img/
 * - `node scripts/webp.js --watch` → watcher (część npm run dev)
 * Zasady: oryginał ZOSTAJE na miejscu, webp powstaje obok; skip gdy webp
 * nowszy niż źródło; awaitWriteFinish chroni przed plikami w trakcie kopiowania;
 * ostrzeżenie przy kolizji nazw (foto.jpg + foto.png → jedno foto.webp).
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const IMG_DIR = path.join(__dirname, '..', 'inc', 'img');
const QUALITY = 80; // K11: potwierdzone (jak w XnConvert)
const EXTS = ['.jpg', '.jpeg', '.png'];

function webpPath(file) {
  return file.slice(0, -path.extname(file).length) + '.webp';
}

async function convert(file) {
  const out = webpPath(file);
  try {
    const src = fs.statSync(file);
    if (fs.existsSync(out)) {
      if (fs.statSync(out).mtimeMs >= src.mtimeMs) return; // idempotencja
      const siblings = EXTS.map((e) => file.slice(0, -path.extname(file).length) + e)
        .filter((f) => f !== file && fs.existsSync(f));
      if (siblings.length) {
        console.warn(`[webp] UWAGA: kolizja nazw dla ${path.basename(out)} (${siblings.map((s) => path.basename(s)).join(', ')})`);
      }
    }
    await sharp(file).webp({ quality: QUALITY }).toFile(out);
    console.log(`[webp] ${path.basename(file)} → ${path.basename(out)}`);
  } catch (err) {
    console.error(`[webp] błąd przy ${path.basename(file)}: ${err.message}`);
  }
}

async function runOnce() {
  if (!fs.existsSync(IMG_DIR)) return console.error(`[webp] brak folderu ${IMG_DIR}`);
  const files = fs.readdirSync(IMG_DIR, { recursive: true })
    .map((f) => path.join(IMG_DIR, f.toString()))
    .filter((f) => EXTS.includes(path.extname(f).toLowerCase()) && fs.statSync(f).isFile());
  for (const f of files) await convert(f);
  console.log(`[webp] gotowe (${files.length} plików sprawdzonych)`);
}

if (process.argv.includes('--watch')) {
  const chokidar = require('chokidar');
  chokidar
    .watch(IMG_DIR, {
      ignored: (f, stats) => stats?.isFile() && !EXTS.includes(path.extname(f).toLowerCase()),
      awaitWriteFinish: { stabilityThreshold: 800, pollInterval: 100 },
      ignoreInitial: false,
    })
    .on('add', convert)
    .on('change', convert);
  console.log(`[webp] watcher aktywny: ${IMG_DIR}`);
} else {
  runOnce();
}
