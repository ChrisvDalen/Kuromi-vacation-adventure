/* Controle voor de statische app.
 *
 * Deze app heeft geen bouwstap en geen afhankelijkheden: het is losse HTML, CSS,
 * JavaScript en plaatjes die GitHub Pages rechtstreeks uitserveert. Wat er dan
 * nog wél stuk kan gaan, is dit:
 *
 *   1. app.js bevat een typefout waardoor de browser hem niet meer inleest;
 *   2. manifest.webmanifest is geen geldige JSON meer, waardoor de app niet
 *      langer op het beginscherm te zetten is;
 *   3. er wordt verwezen naar een bestand dat niet (meer) bestaat.
 *
 * Precies die drie dingen controleert dit script. Uit te voeren met:
 *
 *   node scripts/check.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const wortel = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fouten = [];

function meld(gelukt, tekst) {
  console.log(`${gelukt ? 'ok  ' : 'FOUT'}  ${tekst}`);
  if (!gelukt) fouten.push(tekst);
}

/* 1. Leest de browser app.js zonder te struikelen? */
try {
  execFileSync(process.execPath, ['--check', join(wortel, 'app.js')], { stdio: 'pipe' });
  meld(true, 'app.js is geldige JavaScript');
} catch (e) {
  meld(false, `app.js bevat een syntaxfout:\n${e.stderr?.toString().trim()}`);
}

/* 2. Is het webmanifest geldige JSON, met de verplichte velden? */
let manifest = null;
try {
  manifest = JSON.parse(readFileSync(join(wortel, 'manifest.webmanifest'), 'utf8'));
  meld(true, 'manifest.webmanifest is geldige JSON');
} catch (e) {
  meld(false, `manifest.webmanifest is geen geldige JSON: ${e.message}`);
}

if (manifest) {
  for (const veld of ['name', 'start_url', 'display', 'icons']) {
    meld(veld in manifest, `manifest.webmanifest heeft het veld "${veld}"`);
  }
}

/* 3. Bestaat elk bestand waar de app naar verwijst? */
const verwijzingen = new Map(); // pad -> waar het vandaan komt

function noteer(pad, bron) {
  const schoon = pad.trim().replace(/^\.\//, '');
  // Externe adressen, anker-links en data-URI's slaan we over.
  if (!schoon || /^(https?:|data:|mailto:|#|\/\/)/.test(schoon)) return;
  if (!verwijzingen.has(schoon)) verwijzingen.set(schoon, bron);
}

const html = readFileSync(join(wortel, 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:href|src)\s*=\s*"([^"]+)"/g)) noteer(m[1], 'index.html');

const css = readFileSync(join(wortel, 'styles.css'), 'utf8');
for (const m of css.matchAll(/url\(\s*['"]?([^)'"]+)['"]?\s*\)/g)) noteer(m[1], 'styles.css');

for (const icoon of manifest?.icons ?? []) noteer(icoon.src, 'manifest.webmanifest');

for (const [pad, bron] of [...verwijzingen].sort()) {
  meld(existsSync(join(wortel, pad)), `${bron} verwijst naar ${pad}`);
}

console.log(
  `\n${verwijzingen.size} verwijzing(en) gecontroleerd — ` +
    (fouten.length ? `${fouten.length} probleem/problemen gevonden.` : 'alles in orde.')
);
process.exit(fouten.length ? 1 : 0);
