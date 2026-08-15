# Spec — Ida en Chris Vakantie Spelletjes

Formele specificatie op basis van `scenarios.md` en `ubiquitous_language.md`.
Termen gebruiken consistent de Ubiquitous Language (Spel, Spellenlijst, Winnaar, Uitslag,
Stand, Eindstand, Totaalscore, Uitgelicht/voorstaand, Profiel, Overzichtstabblad,
Spel-tabblad, Corrigeren, Persistente opslag).

> **Versie 2** — verwerkt de prototype-feedback van Ida (gevalideerd door Chris) en
> stijlrichtlijn v2. Nieuw in deze versie: Totaalranking, Profielen en de uitlichting
> van de voorstaande speler.

---

## Feature: Totaalranking bekijken

```gherkin
Feature: Totaalranking over alle spellen
  Als Chris of Ida
  wil ik in één oogopslag zien wie er over alle gespeelde spellen samen voorstaat
  zodat ik niet per spel hoef te vergelijken

  Scenario: Totaalscore tonen bovenaan het overzichtstabblad
    Given er staan één of meer spellen in de Spellenlijst
    When ik het Overzichtstabblad open
    Then zie ik bovenaan per speler de Totaalscore
    And de Totaalscore is de som van alle gewonnen potjes van die speler over alle spellen
    And elk spel weegt daarbij even zwaar

  Scenario: Voorstaande speler wordt uitgelicht
    Given Chris heeft een hogere Totaalscore dan Ida
    When ik het Overzichtstabblad open
    Then wordt het Profiel van Chris visueel uitgelicht als voorstaand
    And het Profiel van Ida wordt niet uitgelicht

  Scenario: Gelijke Totaalscore
    Given Chris en Ida hebben dezelfde Totaalscore
    When ik het Overzichtstabblad open
    Then wordt geen van beide Profielen uitgelicht

  Scenario: Totaalranking herberekenen na een Uitslag
    Given ik zie de Totaalranking
    When er bij een willekeurig spel een Uitslag wordt ingevoerd
    Then is de Totaalscore van de Winnaar met 1 opgehoogd
    And de uitlichting volgt direct de nieuwe Totaalranking
```

---

## Feature: Profielen bovenaan het overzichtstabblad

```gherkin
Feature: Vaste speler-profielen
  Als Chris of Ida
  wil ik onszelf herkennen aan een eigen icoon
  zodat de ranking meteen leesbaar is

  Scenario: Twee vaste profielen tonen
    When ik het Overzichtstabblad open
    Then staan bovenaan twee Profielen: één voor Chris en één voor Ida
    And elk Profiel toont een konijntje-icoon, de naam van de speler en de Totaalscore

  Scenario: Het konijntje-icoon ligt vast per speler
    Given ik heb het Overzichtstabblad eerder geopend
    When ik het Overzichtstabblad opnieuw open
    Then heeft Chris hetzelfde konijntje-icoon als daarvoor
    And heeft Ida haar eigen, andere konijntje-icoon
    And het icoon wordt nooit willekeurig gekozen
```

---

## Feature: Eindstand bekijken op het overzichtstabblad

```gherkin
Feature: Overzicht van alle spellen
  Als Chris of Ida
  wil ik in één oogopslag de Eindstand van alle spellen zien
  zodat ik weet wie er per spel voor staat

  Scenario: Eindstand tonen per spel
    Given er staan één of meer spellen in de Spellenlijst
    When ik het Overzichtstabblad open
    Then zie ik onder de Profielen voor elk spel de naam en de Eindstand
    And ik zie geen extra details zoals een datum

  Scenario: Nog geen enkel spel gespeeld
    Given een spel staat in de Spellenlijst maar heeft nog geen Uitslag
    When ik het Overzichtstabblad open
    Then zie ik voor dat spel een Eindstand van "Chris 0 - Ida 0"
```

---

## Feature: Spel selecteren en Uitslag invoeren

```gherkin
Feature: Uitslag invoeren voor een geselecteerd spel
  Als Chris of Ida
  wil ik een spel selecteren en de winnaar van een potje aangeven
  zodat de Stand van dat spel wordt bijgewerkt

  Scenario: Spel selecteren
    When ik het Spel-tabblad open
    And ik kies een spel uit de Spellenlijst
    Then zie ik de huidige Stand van dat spel
    And ik zie de knoppen "Chris wint" en "Ida wint"

  Scenario: Uitslag invoeren voor Chris
    Given ik heb een spel geselecteerd
    When ik op de knop "Chris wint" tik
    Then wordt de Stand van Chris voor dat spel met 1 opgehoogd

  Scenario: Uitslag invoeren voor Ida
    Given ik heb een spel geselecteerd
    When ik op de knop "Ida wint" tik
    Then wordt de Stand van Ida voor dat spel met 1 opgehoogd
```

---

## Feature: Stand corrigeren

```gherkin
Feature: Stand handmatig corrigeren
  Als Chris of Ida
  wil ik de aantallen overwinningen van een spel handmatig aanpassen
  zodat foutieve invoer (ook van langer geleden) hersteld kan worden

  Scenario: Aantal overwinningen aanpassen
    Given ik heb een spel geselecteerd op het Spel-tabblad
    When ik het aantal overwinningen van Chris en/of Ida handmatig wijzig
    Then wordt de nieuwe Stand direct opgeslagen en getoond
    And dit is niet beperkt tot het terugdraaien van alleen de laatst ingevoerde Uitslag

  Scenario: Totaalranking volgt een correctie
    Given ik heb de Stand van een spel gecorrigeerd
    When ik het Overzichtstabblad open
    Then is de Totaalscore van beide spelers automatisch herberekend
    And de uitlichting van de voorstaande speler klopt met die nieuwe Totaalscore
```

---

## Feature: Spellenlijst beheren

```gherkin
Feature: Spellen toevoegen, bewerken en verwijderen
  Als Chris of Ida
  wil ik de Spellenlijst kunnen aanpassen
  zodat deze aansluit bij wat we daadwerkelijk meenemen op vakantie

  Scenario: Nieuw spel toevoegen
    When ik een nieuwe spelnaam toevoeg aan de Spellenlijst
    Then verschijnt het spel op beide tabbladen
    And de startstand is "Chris 0 - Ida 0"

  Scenario: Spel bewerken
    Given een spel staat in de Spellenlijst
    When ik de naam van dat spel wijzig
    Then wordt de naam overal in de app bijgewerkt
    And de bestaande Stand blijft behouden

  Scenario: Spel verwijderen
    Given een spel staat in de Spellenlijst
    When ik dat spel verwijder
    Then verdwijnt het spel van beide tabbladen
    And de bijbehorende Stand wordt niet langer getoond
    And de Totaalscore van beide spelers wordt zonder dat spel herberekend
```

---

## Feature: Persistente opslag

```gherkin
Feature: Gegevens blijven bewaard tussen sessies
  Als Chris of Ida
  wil ik dat de Spellenlijst en Standen bewaard blijven
  zodat we niets kwijtraken als we de app sluiten en later weer openen

  Scenario: App opnieuw openen
    Given er zijn spellen en Standen ingevoerd in een eerdere sessie
    When de app opnieuw geopend wordt (ook op een andere dag)
    Then zijn alle spellen en Standen nog aanwezig zoals ze achtergelaten waren
    And is de Totaalranking gelijk aan die van voor het sluiten
```

---

## Acceptance criteria — algemeen (niet-functioneel)

Context: De app wordt gebruikt op één gedeeld toestel door Chris en Ida.
- [ ] Geen synchronisatie tussen meerdere toestellen nodig
- [ ] Er is altijd exact één Winnaar per Uitslag (Chris of Ida) — geen gelijkspel, geen scores
- [ ] De Totaalscore wordt afgeleid uit de Standen, niet los bijgehouden, zodat een
      correctie de Totaalranking altijd meteen klopt
- [ ] Visuele stijl: eigen Kuromi-geïnspireerde esthetiek volgens de stijlgids in
      `STYLE.md` (v2: lila als hoofdaccent, hartjes- en konijntjespatroon op de
      achtergrond, schedeltjes/strikjes als accent), geen officiële licentie-illustraties
- [ ] Titel bovenaan de app: "Ida en Chris Vakantie Spelletjes"

---

## Ingevulde keuzes waar de bron ruimte liet

De stijlrichtlijn laat de invulling van deze punten expliciet aan de engineer over:

| Punt | Gekozen invulling |
| ---- | ----------------- |
| Vorm van de uitlichting | Gouden rand om het Profiel plus een kroontje-badge "Voorstaand" — dus niet alleen kleur, ook een label |
| Aantal varianten achtergrond-konijntje | Vijf, elk met een andere blik (vooruit, links, rechts-omhoog, blije dichte oogjes, knipoog) |

Aannames die niet uit de bronnen volgen en dus bevestiging verdienen:
- **Gelijke Totaalscore** — de bronnen beschrijven alleen wie er voorstaat. Gekozen: bij
  een gelijke Totaalscore (inclusief 0 om 0, dus vóór het eerste potje) wordt niemand
  uitgelicht.
- **Tabbladnamen** — de zichtbare labels heten nu "Overzicht" en "Spel", passend bij de
  termen Overzichtstabblad en Spel-tabblad uit de Ubiquitous Language.

---

## ⚠️ Niet in scope / uitgesteld / openstaand
- ⚠️ **Datum bij Uitslag** — expliciet als "leuk, niet verplicht" bestempeld. Geen
  Gherkin-scenario opgenomen; mogelijke toekomstige uitbreiding.
- ⚠️ **Initiële Spellenlijst** — buiten scope van dit traject; Chris en Ida vullen de
  definitieve lijst zelf in. De app start met een voorzet die via **Spellen beheren**
  aangepast kan worden.
- ❓ **Term "Totaalscore" te valideren** — uit `ubiquitous_language.md`: het is nog niet
  bevestigd of Ida deze term zelf gebruikte, of dat het een AI-invulling is voor haar
  wens "wie er bovenaan staat van alle spellen". De term staat nu zo in code en UI; een
  hernoeming raakt alleen de labels, niet het gedrag.
