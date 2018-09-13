<template lang="pug">
v-container.adock-search-background(fluid fill-height)
  v-layout(row justify-center)
    v-flex(xs12 sm11 md9 lg8 xl6)
      v-card.elevation-8
        v-card-text
          p.headline En savoir plus

          p.title Qui sommes-nous ?

          p
            | A Dock est un produit qui grandit au sein de la&nbsp;
            a(href='https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel') Fabrique Numérique
            | , l'incubateur des services numériques du Ministère de la
            | Transition Ecologique et Solidaire. Un incubateur qui s'inscrit
            | directement dans la démarche portée par&nbsp;
            a(href='https://beta.gouv.fr/') beta.gouv.fr
            | .

          p.title Pourquoi A Dock est un projet d'état

          p
            | Le monde du transport de marchandises est très concurrentiel,
            | européen et partiellement régulé. Le rôle de l'Etat est d'offrir à
            | l'ensemble des entreprises les mêmes chances de réussite. Ainsi A Dock
            | garantit à toutes les entreprises de transport françaises, petites,
            | moyennes ou grandes, la même visibilité au regard de leurs spécialités
            | et de leurs zones géographiques d'intervention. Parallèlement, A Dock
            | donne à leurs commanditaires un accès simple, rapide et consolidé aux
            | données essentielles pour leurs transactions commerciales.

          p.title Qu'est-ce que sera A Dock demain ?

          p
            | Pour aller plus loin que le simple annuaire et afin de toujours
            | plus simplifier la relation chargeur-transporteur, A Dock va évoluer.
            | Nous comptons prochainement compléter les fiches transporteurs avec de
            | nouveaux documents officiels téléchargeables tel que l'extrait KBIS
            | par exemple.

          p.title Comment travaillons nous ?

          p
            | Nous travaillons avec des méthodes inspirées du Lean Startup. Sans
            | cahier des charges, au contact permanent des utilisateurs, en
            | amélioration continue et en cycles courts. L'évolution d'A Dock et les
            | prochaines fonctionnalités dépendent de vos besoins. Vous pouvez nous
            | écrire à&nbsp;
            a(href="mailto:contact@adock.beta.gouv.fr") contact@adock.beta.gouv.fr !

          p.title Comment sont classés les résultats d'une recherche

          p
            | Tout d'abord seuls les résultats qui correspondent à tous les critères
            | sont retournés puis il sont triés dans l'ordre suivant :

          ol
            li aire de travail la plus restreinte (départemental, France ou internationale)
            li nombre de départements le plus faible
            li siège dans la zone de recherche
            li niveau de complétude de la fiche
            li ordre alphabétique du nom d'enseigne

          p Le but étant de fournir en priorité des entreprises locales et spécialisées.
</template>

<style lang="stylus">
.adock-search-background
  background: no-repeat top/100% url('../assets/search-background.jpg')
  background-color: white

iframe
  border: 1px solid
</style>
