# Ida en Chris Vakantie Spelletjes

Een app om bij te houden wie welk spel wint tijdens de vakantie van Ida en Chris.

## Openen

Zet de drie bestanden op een webserver (bijvoorbeeld GitHub Pages) en open `index.html`.
Lokaal uitproberen kan met een simpele server vanuit deze map:

```
python3 -m http.server 8000
```

en dan `http://localhost:8000` openen. Een webserver is nodig omdat de app de
standen bewaart in `localStorage`; browsers blokkeren dat bij het rechtstreeks
openen van een bestand via `file://`.

## Hoe het werkt

**Tabblad "Alle spellen"** — de Eindstand van elk spel in één oogopslag, in de vorm
`Chris 0 - Ida 0`. Onder de lijst zit **Spellen beheren**: daarmee verschijnen per
spel een hernoem- en verwijderknop plus het formulier om een nieuw spel toe te
voegen. Buiten die modus blijft het overzicht kaal, zonder extra details.

**Tabblad "Spelselectie"** — kies een spel, zie de Stand, en tik **Chris wint** of
**Ida wint** om een Uitslag in te voeren. Onder **Stand corrigeren** pas je de
aantallen overwinningen rechtstreeks aan; dat is niet beperkt tot het terugdraaien
van de laatste Uitslag.

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
| `app.js`       | Spellenlijst, Standen en persistente opslag                 |
| `mascotte.svg` | De mascotte, met de hand opgebouwde SVG                     |
| `STYLE.md`     | De stijlprompt en hoe die naar de UI vertaalt               |
| `spec.md`      | De formele specificatie waar de app op gebouwd is           |

## Vormgeving

De visuele richting ligt vast in [`STYLE.md`](STYLE.md): een chibi wit konijntje met
zwarte narrenmuts en roze doodshoofd, pastel goth, paars/zwart, 3D vinyl toy met
glossy finish. Die prompt is leidend voor nieuwe schermen en illustraties. Alle
illustraties in deze repo zijn eigen werk.

## Achtergrond

Opgesteld volgens het Vibe · Spec · Harness framework. De spec in [`spec.md`](spec.md)
is afgeleid van de Vibe-fase output (`scenarios.md` en `ubiquitous_language.md`). De
code gebruikt consistent de Ubiquitous Language van het domein: Spel, Spellenlijst,
Winnaar, Stand, Eindstand, Uitslag invoeren, Corrigeren, Persistente opslag.

Bewust nog niet gebouwd, conform de spec: een datum bij een Uitslag.
