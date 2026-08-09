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
| vibrant purple and black   | Donkere paars-zwarte basis; paars en roze zijn de accenten, nooit grijs                      |
| pastel goth                | Zacht roze en lila tégen diep zwartpaars — schattig en donker tegelijk, geen van beide alleen |
| 3D vinyl toy, glossy       | Elk vlak leest als gegoten plastic: glans langs de bovenrand, schaduw langs de onderrand      |
| soft studio lighting       | Zachte, wijde slagschaduwen en een roze afstraling; geen harde randen of felle contrasten     |
| kawaii, chibi              | Royale afronding (13–26px), bolle knoppen, vriendelijke ronde vormen                         |
| playful, mischievous       | Speelse details mogen, maar nooit ten koste van de leesbaarheid van de Stand                 |
| solid light pink background| De roze vlakke achtergrond hoort bij de mascotte-render, niet bij het app-venster            |

De app zelf blijft dus donker paars/zwart — dat is ook wat de spec als acceptance
criterium vastlegt. Het lichtroze is de plaat waar de mascotte op staat, zoals bij
een toy-render. Wil je ooit een licht thema, dan is dat een aparte beslissing.

## Design tokens

De kleuren en effecten staan als custom properties boven in `styles.css`
(`--paars`, `--roze`, `--nacht`, `--glans`, …). Gebruik die tokens in plaats van
nieuwe losse kleurwaarden, zodat de app één materiaal blijft.

De glans zit in twee tokens: `--glans` voor knoppen en actieve elementen
(uitgesproken plastic-glans) en `--glans-zacht` voor panelen en rijen.

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
