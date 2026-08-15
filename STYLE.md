# Stijlgids — Ida en Chris Vakantie Spelletjes

De vaste visuele richting voor deze app. Nieuwe schermen, iconen en illustraties
volgen deze prompt; wijk er niet van af zonder hem hier bij te werken.

> **Versie 2** — stijlrichtlijn v2 verschuift het zwaartepunt van donkerpaars/zwart
> naar lila, en voegt een achtergrondpatroon van hartjes en konijntjes toe plus twee
> vaste profiel-konijntjes. De basis blijft: eigen Kuromi/Hello Kitty-geïnspireerde
> esthetiek, schattig, met strikjes en schedeltjes — géén officiële illustraties.

## De stijlprompt

Dit is de canonieke prompt. Gebruik hem letterlijk voor beeldgeneratie, en als
toetssteen bij elke UI-beslissing.

```text
A cute chibi white rabbit with imp-like features, wearing a black jester's hat
with a lilac skull emblem, black devil tail, playful and mischievous expression,
kawaii aesthetic, pastel goth, vibrant lilac and purple color palette with black
accents, soft studio lighting, 3D vinyl toy style, smooth glossy finish, solid
lilac background with a subtle pattern of small hearts and tiny rabbits.
```

## Wat dat betekent voor de UI

| Uit de prompt                     | Vertaling naar het scherm                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| vibrant lilac and purple          | Lila is het hoofdaccent; dieper paars draagt de knoppen en het actieve tabblad               |
| black accents                     | Zwart blijft de tekstkleur (met paarse ondertoon) en zit in de schedeltjes/kapjes — nooit grijs |
| pastel goth                       | Zacht lila en roze tégen diep zwartpaarse tekst — schattig en donker tegelijk                |
| 3D vinyl toy, glossy              | Elk vlak leest als gegoten plastic: glans langs de bovenrand, schaduw langs de onderrand     |
| soft studio lighting              | Zachte, wijde en warm getinte slagschaduwen; geen harde randen of hard zwart                 |
| kawaii, chibi                     | Royale afronding (13–26px), bolle knoppen, vriendelijke ronde vormen                        |
| playful, mischievous              | Speelse details mogen, maar nooit ten koste van de leesbaarheid van de Stand                |
| solid lilac background            | De achtergrond van de app zelf: één lila laag, met een roze gloed rechtsboven voor diepte    |
| subtle pattern of hearts, rabbits | Decoratief patroon áchter alles; panelen blijven dekkend zodat tekst nooit op het patroon staat |

De app staat dus op een lila vlak, met dieper paars en roze als accenten: donkere
paarszwarte tekst, en paars-naar-roze verlopen op de knoppen en het actieve tabblad.
Het paneelvlak is bijna wit met een lila zweem, zodat de kaarten van de achtergrond
loskomen zonder hard wit te worden.

Op knopvlakken staat witte tekst, dus die verlopen zijn bewust dieper gehouden
(`--knop-paars`, `--knop-roze`) dan de accentkleuren die op de lichte achtergrond
worden gebruikt. Alle tekstcombinaties halen de WCAG AA-norm; controleer dat opnieuw
als je aan de kleuren draait.

## Het achtergrondpatroon

`achtergrond.svg` is een tegel van 240×240 die in `styles.css` herhaald wordt: hartjes
en vijf konijntjes-varianten die elk net iets anders kijken (vooruit, naar links,
rechts-omhoog, blije dichte oogjes, en een knipoog). Alleen de blik verschilt per
variant — de vorm blijft gelijk, anders wordt het patroon onrustig.

Het patroon is bewust laag in contrast (opacity `.16` voor de konijntjes, `.2` voor de
hartjes). Het is decoratie, geen informatie: standen en knoppen staan altijd op een
dekkend paneel. Verhoog die waarden niet zonder de leesbaarheid opnieuw te bekijken.

## De konijntjes

| Bestand              | Waarvoor                                                                             |
| -------------------- | -------------------------------------------------------------------------------------- |
| `mascotte.svg`       | De mascotte in de kop: chibi wit konijn, zwarte narrenmuts met roze doodshoofd, duivelsstaart |
| `profiel-chris.svg`  | Vast profiel-icoon van Chris: zwarte kap met lila doodshoofd, ondeugende grijns, beide oren rechtop |
| `profiel-ida.svg`    | Vast profiel-icoon van Ida: lila strikje met klein doodshoofdje, één omgeklapt oor, hartje op de wang |

De twee profiel-iconen zijn **permanent** aan één speler gekoppeld en worden nooit
willekeurig gekozen — dat is een harde eis uit de stijlrichtlijn. Ze zijn zo getekend
dat ze ook los van kleur uit elkaar te houden zijn: kap versus strik, en een ander
oorstandje. Alles is met de hand opgebouwde SVG en blijft leesbaar tot ongeveer 40px.

## Uitlichting van de voorstaande speler

De speler met de hoogste Totaalscore krijgt een gouden rand om het Profiel, een gouden
gloed eromheen en een kroontje-badge met het woord "Voorstaand". De stijlrichtlijn laat
de exacte vorm aan de engineer; de keuze voor rand *plus* badge is bewust, zodat de
uitlichting niet alleen aan kleur hangt. Bij een gelijke Totaalscore wordt niemand
uitgelicht.

## Design tokens

De kleuren en effecten staan als custom properties boven in `styles.css`
(`--lila-vlak`, `--lila`, `--paars-diep`, `--roze-diep`, `--goud`, `--tekst`, `--glans`, …).
Gebruik die tokens in plaats van nieuwe losse kleurwaarden, zodat de app één materiaal blijft.

De glans zit in twee tokens: `--glans` voor de donkere knopvlakken (uitgesproken
plastic-glans) en `--glans-licht` voor de lichte panelen, rijen en invoervelden.

## Rechten

Deze stijl is *geïnspireerd op* het genre, maar alle illustraties in deze repo zijn
eigen werk. Neem geen officiële licentie-illustraties of officiële karakters over —
de spec sluit dat expliciet uit. Laat gegenereerd beeld daarom altijd via deze
prompt maken en niet door een bestaand personage na te tekenen.
