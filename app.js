/* Ida en Chris Vakantie Spelletjes
 *
 * Termen volgen de Ubiquitous Language: Spel, Spellenlijst, Winnaar, Stand,
 * Eindstand, Uitslag invoeren, Corrigeren, Persistente opslag.
 *
 * Eén gedeeld toestel, dus alles staat lokaal in localStorage. Geen synchronisatie.
 */

'use strict';

var OPSLAG_SLEUTEL = 'ida-chris-vakantie-spelletjes-v1';

/* Startlijst: wordt alleen gebruikt de allereerste keer dat de app opent.
   Daarna is de opgeslagen Spellenlijst leidend — ook als die leeg is. */
var STARTLIJST = [
  'Rummikub',
  'Yahtzee',
  'Uno',
  'Skip-Bo',
  'Triominos',
  'Pesten',
  'Klaverjassen',
  'Qwixx'
];

/* ------------------------------------------------------------------ *
 * Persistente opslag
 * ------------------------------------------------------------------ */

function nieuwId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return 'spel-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function maakSpel(naam) {
  return { id: nieuwId(), naam: naam, chris: 0, ida: 0 };
}

/** Maakt van willekeurige opgeslagen data een geldig Spel, of null. */
function normaliseerSpel(ruw) {
  if (!ruw || typeof ruw !== 'object') return null;
  var naam = typeof ruw.naam === 'string' ? ruw.naam.trim() : '';
  if (naam === '') return null;
  return {
    id: typeof ruw.id === 'string' && ruw.id ? ruw.id : nieuwId(),
    naam: naam,
    chris: heelGetal(ruw.chris),
    ida: heelGetal(ruw.ida)
  };
}

function heelGetal(waarde) {
  var getal = Math.trunc(Number(waarde));
  if (!isFinite(getal) || getal < 0) return 0;
  return getal;
}

function laadStand() {
  var ruw = null;
  try {
    ruw = window.localStorage.getItem(OPSLAG_SLEUTEL);
  } catch (fout) {
    /* Opslag geblokkeerd — de app werkt verder, maar bewaart niets. */
  }

  if (ruw) {
    try {
      var data = JSON.parse(ruw);
      if (data && Array.isArray(data.spellen)) {
        var spellen = data.spellen.map(normaliseerSpel).filter(Boolean);
        return {
          spellen: spellen,
          geselecteerdId: typeof data.geselecteerdId === 'string' ? data.geselecteerdId : null
        };
      }
    } catch (fout) {
      /* Onleesbare data: val terug op de startlijst. */
    }
  }

  return { spellen: STARTLIJST.map(maakSpel), geselecteerdId: null };
}

function bewaar() {
  try {
    window.localStorage.setItem(OPSLAG_SLEUTEL, JSON.stringify({
      versie: 1,
      spellen: stand.spellen,
      geselecteerdId: stand.geselecteerdId
    }));
  } catch (fout) {
    document.getElementById('opslag-waarschuwing').hidden = false;
  }
}

/* ------------------------------------------------------------------ *
 * Toestand in het geheugen
 * ------------------------------------------------------------------ */

var stand = laadStand();
var beheermodus = false;
var bewerktId = null; // spel waarvan de naam op dit moment wordt gewijzigd

function vindSpel(id) {
  for (var i = 0; i < stand.spellen.length; i++) {
    if (stand.spellen[i].id === id) return stand.spellen[i];
  }
  return null;
}

function geselecteerdSpel() {
  return stand.geselecteerdId ? vindSpel(stand.geselecteerdId) : null;
}

function eindstandTekst(spel) {
  return 'Chris ' + spel.chris + ' - Ida ' + spel.ida;
}

/* ------------------------------------------------------------------ *
 * Elementen
 * ------------------------------------------------------------------ */

var el = {
  tabAlle: document.getElementById('tab-alle'),
  tabSelectie: document.getElementById('tab-selectie'),
  paneelAlle: document.getElementById('paneel-alle'),
  paneelSelectie: document.getElementById('paneel-selectie'),

  spellenlijst: document.getElementById('spellenlijst'),
  lijstLeeg: document.getElementById('lijst-leeg'),
  beheerKnop: document.getElementById('beheer-knop'),
  toevoegFormulier: document.getElementById('toevoeg-formulier'),
  nieuweNaam: document.getElementById('nieuwe-naam'),

  spelkiezer: document.getElementById('spelkiezer'),
  kiezerLeeg: document.getElementById('kiezer-leeg'),
  gekozenSpel: document.getElementById('gekozen-spel'),
  gekozenNaam: document.getElementById('gekozen-naam'),
  standChris: document.getElementById('stand-chris'),
  standIda: document.getElementById('stand-ida'),
  chrisWint: document.getElementById('chris-wint'),
  idaWint: document.getElementById('ida-wint'),
  correctieChris: document.getElementById('correctie-chris'),
  correctieIda: document.getElementById('correctie-ida')
};

/* ------------------------------------------------------------------ *
 * Tabbladen
 * ------------------------------------------------------------------ */

function toonTabblad(naam) {
  var alle = naam === 'alle';
  el.tabAlle.setAttribute('aria-selected', String(alle));
  el.tabSelectie.setAttribute('aria-selected', String(!alle));
  el.tabAlle.tabIndex = alle ? 0 : -1;
  el.tabSelectie.tabIndex = alle ? -1 : 0;
  el.paneelAlle.hidden = !alle;
  el.paneelSelectie.hidden = alle;
}

el.tabAlle.addEventListener('click', function () { toonTabblad('alle'); });
el.tabSelectie.addEventListener('click', function () { toonTabblad('selectie'); });

document.querySelector('.tabbladen').addEventListener('keydown', function (gebeurtenis) {
  if (gebeurtenis.key !== 'ArrowLeft' && gebeurtenis.key !== 'ArrowRight') return;
  var naarAlle = el.tabAlle.getAttribute('aria-selected') === 'false';
  toonTabblad(naarAlle ? 'alle' : 'selectie');
  (naarAlle ? el.tabAlle : el.tabSelectie).focus();
});

/* ------------------------------------------------------------------ *
 * Tabblad "alle spellen": Eindstand per spel + beheer
 * ------------------------------------------------------------------ */

function tekenSpellenlijst() {
  el.spellenlijst.textContent = '';
  el.spellenlijst.classList.toggle('beheren', beheermodus);
  el.lijstLeeg.hidden = stand.spellen.length > 0;

  stand.spellen.forEach(function (spel) {
    var rij = document.createElement('li');
    rij.className = 'spel-rij';

    if (beheermodus && bewerktId === spel.id) {
      rij.appendChild(maakNaamInvoer(spel));
    } else {
      var naam = document.createElement('span');
      naam.className = 'spel-naam';
      naam.textContent = spel.naam;
      rij.appendChild(naam);

      var eindstand = document.createElement('span');
      eindstand.className = 'eindstand';
      eindstand.textContent = eindstandTekst(spel);
      rij.appendChild(eindstand);

      if (beheermodus) {
        rij.appendChild(maakRijKnop('✎', 'Naam van ' + spel.naam + ' wijzigen', '', function () {
          bewerktId = spel.id;
          tekenSpellenlijst();
        }));
        rij.appendChild(maakRijKnop('✕', spel.naam + ' verwijderen', 'verwijder', function () {
          verwijderSpel(spel);
        }));
      }
    }

    el.spellenlijst.appendChild(rij);
  });

  if (bewerktId) {
    var invoer = el.spellenlijst.querySelector('.naam-invoer');
    if (invoer) invoer.focus();
  }
}

function maakRijKnop(teken, label, extraKlasse, bijKlik) {
  var knop = document.createElement('button');
  knop.type = 'button';
  knop.className = 'rij-knop' + (extraKlasse ? ' ' + extraKlasse : '');
  knop.textContent = teken;
  knop.setAttribute('aria-label', label);
  knop.addEventListener('click', bijKlik);
  return knop;
}

/** Invoerveld om een spelnaam te wijzigen. De Stand blijft ongemoeid. */
function maakNaamInvoer(spel) {
  var fragment = document.createDocumentFragment();

  var invoer = document.createElement('input');
  invoer.type = 'text';
  invoer.className = 'naam-invoer';
  invoer.value = spel.naam;
  invoer.maxLength = 60;
  invoer.setAttribute('aria-label', 'Nieuwe naam voor ' + spel.naam);
  fragment.appendChild(invoer);

  function opslaan() {
    var nieuw = invoer.value.trim();
    if (nieuw !== '') {
      spel.naam = nieuw;
      bewaar();
    }
    bewerktId = null;
    tekenAlles();
  }

  function annuleren() {
    bewerktId = null;
    tekenSpellenlijst();
  }

  invoer.addEventListener('keydown', function (gebeurtenis) {
    if (gebeurtenis.key === 'Enter') { gebeurtenis.preventDefault(); opslaan(); }
    if (gebeurtenis.key === 'Escape') { gebeurtenis.preventDefault(); annuleren(); }
  });

  fragment.appendChild(maakRijKnop('✓', 'Naam opslaan', '', opslaan));
  fragment.appendChild(maakRijKnop('✕', 'Wijzigen annuleren', '', annuleren));

  return fragment;
}

function verwijderSpel(spel) {
  var bevestigd = window.confirm(
    'Spel "' + spel.naam + '" verwijderen?\n\n' +
    'De Stand (' + eindstandTekst(spel) + ') gaat dan ook weg.'
  );
  if (!bevestigd) return;

  stand.spellen = stand.spellen.filter(function (ander) { return ander.id !== spel.id; });
  if (stand.geselecteerdId === spel.id) stand.geselecteerdId = null;
  if (bewerktId === spel.id) bewerktId = null;
  bewaar();
  tekenAlles();
}

el.beheerKnop.addEventListener('click', function () {
  beheermodus = !beheermodus;
  if (!beheermodus) bewerktId = null;
  el.beheerKnop.setAttribute('aria-expanded', String(beheermodus));
  el.beheerKnop.textContent = beheermodus ? 'Beheren afronden' : 'Spellen beheren';
  el.toevoegFormulier.hidden = !beheermodus;
  tekenSpellenlijst();
  if (beheermodus) el.nieuweNaam.focus();
});

el.toevoegFormulier.addEventListener('submit', function (gebeurtenis) {
  gebeurtenis.preventDefault();
  var naam = el.nieuweNaam.value.trim();
  if (naam === '') return;

  stand.spellen.push(maakSpel(naam)); // startstand: Chris 0 - Ida 0
  bewaar();
  el.nieuweNaam.value = '';
  el.nieuweNaam.focus();
  tekenAlles();
});

/* ------------------------------------------------------------------ *
 * Tabblad spelselectie: spel kiezen, Uitslag invoeren, Corrigeren
 * ------------------------------------------------------------------ */

function tekenSpelkiezer() {
  el.spelkiezer.textContent = '';
  el.kiezerLeeg.hidden = stand.spellen.length > 0;

  stand.spellen.forEach(function (spel) {
    var knop = document.createElement('button');
    knop.type = 'button';
    knop.className = 'kies-knop';
    knop.textContent = spel.naam;
    knop.setAttribute('aria-pressed', String(spel.id === stand.geselecteerdId));
    knop.addEventListener('click', function () {
      stand.geselecteerdId = spel.id;
      bewaar();
      tekenSpelkiezer();
      tekenGekozenSpel();
    });
    el.spelkiezer.appendChild(knop);
  });
}

/** Bouwt het paneel van het geselecteerde spel opnieuw op. */
function tekenGekozenSpel() {
  var spel = geselecteerdSpel();
  el.gekozenSpel.hidden = !spel;
  if (!spel) return;

  el.gekozenNaam.textContent = spel.naam;
  werkStandBij(true);
}

/** Werkt alleen de getallen bij, zonder het paneel opnieuw op te bouwen. */
function werkStandBij(ookInvoervelden) {
  var spel = geselecteerdSpel();
  if (!spel) return;

  el.standChris.textContent = String(spel.chris);
  el.standIda.textContent = String(spel.ida);

  if (ookInvoervelden) {
    el.correctieChris.value = String(spel.chris);
    el.correctieIda.value = String(spel.ida);
  }
}

/** Uitslag invoeren: precies één Winnaar, +1 op de Stand van dat spel. */
function uitslagInvoeren(speler) {
  var spel = geselecteerdSpel();
  if (!spel) return;

  spel[speler] = spel[speler] + 1;
  bewaar();
  werkStandBij(true);
  tekenSpellenlijst();
}

el.chrisWint.addEventListener('click', function () { uitslagInvoeren('chris'); });
el.idaWint.addEventListener('click', function () { uitslagInvoeren('ida'); });

/* Corrigeren: elke wijziging wordt direct bewaard en getoond. Niet beperkt
   tot het terugdraaien van de laatst ingevoerde Uitslag. */
function corrigeer(speler, invoer) {
  var spel = geselecteerdSpel();
  if (!spel) return;

  spel[speler] = invoer.value.trim() === '' ? 0 : heelGetal(invoer.value);
  bewaar();
  werkStandBij(false);
  tekenSpellenlijst();
}

[['chris', el.correctieChris], ['ida', el.correctieIda]].forEach(function (paar) {
  var speler = paar[0];
  var invoer = paar[1];

  invoer.addEventListener('input', function () { corrigeer(speler, invoer); });

  /* Bij verlaten het veld netjes terugzetten op de bewaarde waarde,
     zodat lege of ongeldige invoer weer een getal toont. */
  invoer.addEventListener('blur', function () {
    var spel = geselecteerdSpel();
    if (spel) invoer.value = String(spel[speler]);
  });
});

document.querySelectorAll('.stap').forEach(function (knop) {
  knop.addEventListener('click', function () {
    var spel = geselecteerdSpel();
    if (!spel) return;

    var speler = knop.dataset.speler;
    spel[speler] = Math.max(0, spel[speler] + Number(knop.dataset.stap));
    bewaar();
    werkStandBij(true);
    tekenSpellenlijst();
  });
});

/* ------------------------------------------------------------------ *
 * Start
 * ------------------------------------------------------------------ */

function tekenAlles() {
  tekenSpellenlijst();
  tekenSpelkiezer();
  tekenGekozenSpel();
}

/* Een eerder geselecteerd spel kan verwijderd zijn in een vorige sessie. */
if (stand.geselecteerdId && !vindSpel(stand.geselecteerdId)) {
  stand.geselecteerdId = null;
}

tekenAlles();
