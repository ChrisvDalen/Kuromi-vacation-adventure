# Ida en Chris Vakantie Spelletjes

Een app om bij te houden wie welk spel wint tijdens de vakantie van Ida en Chris.

## Op de iPhone zetten

De app staat online via GitHub Pages. Zet hem daarna op het beginscherm, dan opent
hij schermvullend met een eigen icoon, zonder Safari-balken.

1. **Pages aanzetten** (eenmalig): repo → **Settings** → **Pages** → onder *Build and
   deployment* bij *Source* kiezen voor **Deploy from a branch**, branch
   `claude/vakantie-spelletjes-spec-onyxeo` en map `/ (root)` → **Save**. Na een
   paar minuten staat de app op
   `https://chrisvdalen.github.io/Kuromi-vacation-adventure/`.
2. **Op het beginscherm zetten**: open die link in **Safari** op de iPhone, tik op de
   deelknop (het vierkantje met de pijl omhoog), scroll naar **Zet op beginscherm** en
   tik op **Voeg toe**.

Doe stap 2 in Safari, niet in Chrome — alleen Safari kan op iOS iets op het
beginscherm zetten, en de standen worden per browser apart bewaard.

## Lokaal uitproberen

```
python3 -m http.server 8000
```

en dan `http://localhost:8000` openen. Een webserver is nodig omdat de app de
standen bewaart in `localStorage`; browsers blokkeren dat bij het rechtstreeks
openen van een bestand via `file://`.

## Controleren of alles nog klopt

De app heeft geen bouwstap: de bestanden gaan zoals ze zijn naar GitHub Pages. Om
te controleren of er niets stuk is — een typefout in `app.js`, een kapot
`manifest.webmanifest`, of een verwijzing naar een plaatje dat niet bestaat —
draai je:

```
node scripts/check.mjs
```

Diezelfde controle draait automatisch bij elke push en pull request, via
`.github/workflows/ci.yml`.

## Hoe het werkt

**Overzichtstabblad ("Overzicht")** — bovenaan staat de **Totaalranking**: twee vaste
profielen, elk met een eigen konijntje-icoon, de naam en de Totaalscore. Die
Totaalscore is de som van alle gewonnen potjes over alle spellen samen, waarbij elk
spel even zwaar weegt. Wie voorstaat krijgt een gouden rand en een kroontje-badge; bij
een gelijke stand wordt niemand uitgelicht.

Daaronder staat de Eindstand van elk spel, in de vorm `Chris 0 - Ida 0`. Onder de
lijst zit **Spellen beheren**: daarmee verschijnen per spel een hernoem- en
verwijderknop plus het formulier om een nieuw spel toe te voegen. Buiten die modus
blijft het overzicht kaal, zonder extra details.

**Spel-tabblad ("Spel")** — kies een spel, zie de Stand, en tik **Chris wint** of
**Ida wint** om een Uitslag in te voeren. Onder **Stand corrigeren** pas je de
aantallen overwinningen rechtstreeks aan; dat is niet beperkt tot het terugdraaien
van de laatste Uitslag. De Totaalranking wordt na elke wijziging opnieuw uit de
Standen berekend, dus ook een correctie of een verwijderd spel telt meteen door.

Alles wordt direct bewaard in `localStorage` van het toestel zelf. Eén gedeeld
toestel, geen synchronisatie, geen account.

## Startlijst

De app start met acht gangbare vakantiespellen: Rummikub, Yahtzee, Uno, Skip-Bo,
Triominos, Pesten, Klaverjassen en Qwixx. Dat is een voorzet — pas de lijst aan via
**Spellen beheren** zodat hij klopt met wat jullie echt meenemen. De startlijst wordt
alleen bij de allereerste keer openen gebruikt; daarna is de bewaarde Spellenlijst
leidend, ook als die leeg is.

## Bestanden

| Bestand        | Inhoud                                                     |
| -------------- | ---------------------------------------------------------- |
| `index.html`   | Structuur van de twee tabbladen                             |
| `styles.css`   | Vormgeving volgens de stijlgids                             |
| `app.js`       | Spellenlijst, Standen, Totaalranking en persistente opslag  |
| `mascotte.svg` | De mascotte, met de hand opgebouwde SVG                     |
| `profiel-chris.svg`, `profiel-ida.svg` | De twee vaste profiel-konijntjes    |
| `achtergrond.svg` | Het herhalende patroon van hartjes en kleine konijntjes  |
| `icoon-*.png`  | App-iconen voor het beginscherm, afgeleid van `mascotte.svg` |
| `manifest.webmanifest` | Naam, kleuren en iconen voor de app op het beginscherm |
| `STYLE.md`     | De stijlprompt en hoe die naar de UI vertaalt               |
| `spec.md`      | De formele specificatie waar de app op gebouwd is           |

## Vormgeving

De visuele richting ligt vast in [`STYLE.md`](STYLE.md) (versie 2): een chibi wit
konijntje met zwarte narrenmuts en doodshoofd, pastel goth, lila als hoofdaccent met
paars en zwart eromheen, 3D vinyl toy met glossy finish, op een subtiel patroon van
hartjes en kleine konijntjes die elk net iets anders kijken. Die prompt is leidend voor
nieuwe schermen en illustraties. Alle illustraties in deze repo zijn eigen werk.

## Achtergrond

Opgesteld volgens het Vibe · Spec · Harness framework. De spec in [`spec.md`](spec.md)
is afgeleid van de Vibe-fase output (`scenarios.md` en `ubiquitous_language.md`), en is
inmiddels bijgewerkt met de prototype-feedback van Ida. De code gebruikt consistent de
Ubiquitous Language van het domein: Spel, Spellenlijst, Winnaar, Uitslag, Stand,
Eindstand, Totaalscore, Uitgelicht/voorstaand, Profiel, Overzichtstabblad, Spel-tabblad,
Corrigeren, Persistente opslag.

Bewust nog niet gebouwd, conform de spec: een datum bij een Uitslag. Nog te valideren
bij Ida: of "Totaalscore" haar eigen term is — zie het openstaande punt onderaan
[`spec.md`](spec.md).
