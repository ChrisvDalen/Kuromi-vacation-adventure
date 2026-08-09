# Spec — Ida en Chris Vakantie Spelletjes

Formele specificatie op basis van `scenarios.md` en `ubiquitous_language.md`.
Termen gebruiken consistent de Ubiquitous Language (Spel, Spellenlijst, Winnaar, Stand, Eindstand, Uitslag invoeren, Corrigeren, Persistente opslag).

---

## Feature: Eindstand bekijken op tabblad "alle spellen"

```gherkin
Feature: Overzicht van alle spellen
  Als Chris of Ida
  wil ik in één oogopslag de eindstand van alle spellen zien
  zodat ik weet wie er per spel voor staat

  Scenario: Eindstand tonen per spel
    Given er staan één of meer spellen in de Spellenlijst
    When ik het tabblad "alle spellen" open
    Then zie ik voor elk spel de naam en de Eindstand
    And ik zie geen extra details zoals een leiders-indicator of datum

  Scenario: Nog geen enkel spel gespeeld
    Given een spel staat in de Spellenlijst maar heeft nog geen Uitslag
    When ik het tabblad "alle spellen" open
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
    When ik het tabblad spelselectie open
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
    Given ik heb een spel geselecteerd op het tabblad spelselectie
    When ik het aantal overwinningen van Chris en/of Ida handmatig wijzig
    Then wordt de nieuwe Stand direct opgeslagen en getoond
    And dit is niet beperkt tot het terugdraaien van alleen de laatst ingevoerde Uitslag
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
```

---

## Acceptance criteria — algemeen (niet-functioneel)

Context: De app wordt gebruikt op één gedeeld toestel door Chris en Ida.
- [ ] Geen synchronisatie tussen meerdere toestellen nodig
- [ ] Er is altijd exact één Winnaar per Uitslag (Chris of Ida) — geen gelijkspel, geen scores
- [ ] Visuele stijl: eigen Kuromi-geïnspireerde esthetiek volgens de stijlprompt in `STYLE.md` (lichtroze achtergrond, paars/zwart als accent, pastel goth, schattig), geen officiële licentie-illustraties
- [ ] Titel bovenaan de app: "Ida en Chris Vakantie Spelletjes"

> Noot: het criterium over de visuele stijl luidde oorspronkelijk "paars/zwart,
> schattig, strikjes-vibe". Dat is na het opstellen van deze spec aangescherpt tot de
> stijlprompt in `STYLE.md`, met een lichtroze achtergrond in plaats van een donkere.

---

## ⚠️ Niet in scope / uitgesteld
- ⚠️ **Datum bij Uitslag** — expliciet als "leuk, niet verplicht" bestempeld. Geen Gherkin-scenario opgenomen; mogelijke toekomstige uitbreiding.
- ⚠️ **Initiële Spellenlijst** — inhoud nog niet bekend, moet door Chris worden aangeleverd voordat de app gebouwd kan worden met een gevulde lijst.
