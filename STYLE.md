# Stijlgids — Ida en Chris Vakantie Spelletjes

De vaste visuele richting voor deze app. Nieuwe schermen, iconen en illustraties
volgen deze prompt; wijk er niet van af zonder hem hier bij te werken.

## De stijlprompt

Dit is de canonieke prompt. Gebruik hem letterlijk voor beeldgeneratie, en als
toetssteen bij elke UI-beslissing.

```text
A cute chibi white rabbit with imp-like features, wearing a black jester's hat
with a pink skull emblem, black devil tail, playful and mischievous expression,
kawaii aesthetic, pastel goth, vibrant purple and black color palette, soft
studio lighting, 3D vinyl toy style, smooth glossy finish, solid light pink
background.
```

## Wat dat betekent voor de UI

| Uit de prompt              | Vertaling naar het scherm                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| vibrant purple and black   | Paars en roze zijn de accenten en het zwart is de tekstkleur — nooit grijs                    |
| pastel goth                | Zacht roze en lila tégen diep zwartpaarse tekst — schattig en donker tegelijk                 |
| 3D vinyl toy, glossy       | Elk vlak leest als gegoten plastic: glans langs de bovenrand, schaduw langs de onderrand      |
| soft studio lighting       | Zachte, wijde en warm getinte slagschaduwen; geen harde randen of hard zwart                  |
| kawaii, chibi              | Royale afronding (13–26px), bolle knoppen, vriendelijke ronde vormen                         |
| playful, mischievous       | Speelse details mogen, maar nooit ten koste van de leesbaarheid van de Stand                 |
| solid light pink background| De achtergrond van de app zelf: één vlakke lichtroze laag, met een zweem lila voor diepte      |

De app staat dus op een lichtroze vlak, met paars en zwart als accenten: donkere
paarszwarte tekst, en paars-naar-roze verlopen op de knoppen en het actieve tabblad.
Het paneelvlak is bijna wit met een roze zweem, zodat de kaarten van de achtergrond
loskomen zonder hard wit te worden.

Op knopvlakken staat witte tekst, dus die verlopen zijn bewust dieper gehouden
(`--knop-paars`, `--knop-roze`) dan de accentkleuren die op de lichte achtergrond
worden gebruikt. Alle tekstcombinaties halen de WCAG AA-norm; controleer dat opnieuw
als je aan de kleuren draait.

## Design tokens

De kleuren en effecten staan als custom properties boven in `styles.css`
(`--roze-vlak`, `--paars-diep`, `--tekst`, `--glans`, …). Gebruik die tokens in plaats
van nieuwe losse kleurwaarden, zodat de app één materiaal blijft.

De glans zit in twee tokens: `--glans` voor de donkere knopvlakken (uitgesproken
plastic-glans) en `--glans-licht` voor de lichte panelen, rijen en invoervelden.

## De mascotte

`mascotte.svg` is de prompt uitgetekend: chibi wit konijn, zwarte narrenmuts met
roze doodshoofd, duivelsstaart, ondeugende wenkbrauwen, blosjes, op een lichtroze
plaat. Het is met de hand opgebouwde SVG en blijft leesbaar tot ongeveer 40px, dus
hij kan ook als klein icoon mee.

## Rechten

Deze stijl is *geïnspireerd op* het genre, maar alle illustraties in deze repo zijn
eigen werk. Neem geen officiële licentie-illustraties of officiële karakters over —
de spec sluit dat expliciet uit. Laat gegenereerd beeld daarom altijd via deze
prompt maken en niet door een bestaand personage na te tekenen.
