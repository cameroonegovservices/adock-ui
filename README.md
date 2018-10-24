[![CircleCI](https://circleci.com/gh/MTES-MCT/adock-ui.svg?style=svg)](https://circleci.com/gh/MTES-MCT/adock-ui)

# A Dock - UI

> Simplifions les relations transporteurs/chargeurs

## Description

Ce dépôt contient le code de l'application frontend du projet A Dock.
L'application permet de rechercher un transporteur inscrit au registre français
des transporteurs selon différents critères et de les contacter.

L'application de type SPA est conçue pour fonctionner avec le serveur
[Adock-api](https://github.com/MTES-MCT/adock-api/).

Au chargement, l'application effectue une requête sur le serveur pour obtenir
les informations dites `meta` (liste de choix, version, statistiques, etc). Ces
informations sont stockées dans le store de l'application ([Vuex][vuex]).

Chaque recherche effectue une requête CORS sans authentification sur le serveur
pour obtenir une liste de transporteurs (avec limite sur le nombre de
résultats).

Lorsqu'un transporteur est sélectionné, l'application redirige (via
[vue-router][vue-router]) sur sa fiche, il est alors possible de consulter et de
modifier certaines informations sur le transporteur en vue d'actualisation. Les
transporteurs avec les fiches les mieux actualisées sont mieux classés dans les
résultats de recherche.

L'agencement visuel suit les conventions de Material Design et est implémenté
via [Vuetify][vuetify].

Les tests unitaires sont écrits avec [Jest][jest] et les tests « end to end »
avec [Cypress][cypress].

## Dépendances

- [Vue][vue]
- [vue-router][vue-router]
- [Vuex][vuex]
- [Vuetify][Vuetify]
- [Axios][axios]
- [vue-cli][vue-cli]
- [Jest][jest]
- [cypress][cypress]

## Configuration

Les paramètres de configuration sont définis dans les fichiers
`.env.development` et `.env.production` (en fonction des environnements). Pour
ajouter des paramètres non versionnés, vous pouvez créer des fichiers avec
l'extension `.local` pour surcharger les valeurs de ces fichiers.

Ainsi l'URL du client Raven de Sentry doit être enregistrée dans
`.env.production.local` sous le nom `VUE_APP_RAVEN_URL`.

## Utilisation

* `yarn serve` sert l'application pour le développement
* `yarn build` compile la version de production
* `yarn test:unit` lance les tests unitaires
* `yarn test:e2e` lance les tests E2E.

Avant de lancer les tests E2E, lancez le client en mode développement, le
serveur Django et créez le transporteur suivant via la commande ``manage.py
shell_plus`` :

```python
from adock.carriers import factories
Carrier.objects.filter(pk='80005226884728').delete()
factories.CarrierFactory(
  raison_sociale='A DOCK TRANSPORTEUR',
  siret='80005226884728',
  working_area='DEPARTEMENT',
  working_area_departements=[34],
)
```


Les variables d'environnement telles que l'URL du serveur sont passées via les
fichiers `.env.development` (ou `.env.development.local` pour surcharger) et
`.env.production`.

[vue]: https://vuejs.org/
[vue-router]: https://router.vuejs.org
[vuex]: https://vuex.vuejs.org/
[vuetify]: https://vuetifyjs.com
[axios]: https://github.com/axios/axios
[vue-cli]: https://github.com/vuejs/vue-cli
[jest]: https://facebook.github.io/jest/
[cypress]: https://www.cypress.io/
