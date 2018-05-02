<template lang="pug">
v-container.adock-search-background(fluid fill-height)
  v-layout(row justify-center)
    v-flex(xs12 sm11 md9 lg8 xl6)
      v-card.elevation-8
        v-card-text
          p.headline Conditions générales d'utilisation

          p.title Contact

          p
            |
            | Pour toutes questions relatives à l'utilisation du service, de vos données
            | personnelles ou pour tout autre sujet concernant A Dock, vous pouvez nous
            | contacter par mail à&nbsp;
            a(href="mailto:contact@adock.beta.gouv.fr") contact@adock.beta.gouv.fr

          p.title Éditeur

          p
            | Incubateur de services numériques de la Direction interministérielle du
            | numérique et du système d'information et de communication de l'État :
            br
            | DINSIC
            br
            | 20, avenue de Ségur
            br
            | 75007 Paris.

          p.title Hébergement

          p
            | Le site est hébergé en France à Roubaix chez :
            br
            | OVH
            br
            | 2 rue Kellermann
            br
            | 59100 Roubaix
            br
            | Téléphone : +33 9 72 10 10 07

          p.title Données de navigation

          p.subheading Cookies déposés et opt-out

          p
            | Ce site dépose un petit fichier texte (un « cookie ») sur votre
            | ordinateur lorsque vous le consultez. Cela nous permet de mesurer le
            | nombre de visites et de comprendre quelles sont les pages les plus
            | consultées.

          iframe(src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr")

          p.subheading Ce site n’affiche pas de bannière de consentement aux cookies, pourquoi ?

          p
            | C’est vrai, vous n’avez pas eu à cliquer sur un bloc qui recouvre la
            | moitié de la page pour dire que vous êtes d’accord avec le dépôt de
            | cookies — même si vous ne savez pas ce que ça veut dire !

          p
            | Rien d’exceptionnel, pas de passe-droit lié à un
            code .gouv.fr.
            | Nous respectons simplement la loi, qui dit que certains outils de
            | suivi d’audience, correctement configurés pour respecter la vie
            | privée, sont exemptés d’autorisation préalable.

          p
            | Nous utilisons pour cela
            |
            a(href="https://www.piwik.org") Piwik
            | ,
            |
            a(href="https://piwik.org/free-software/") un outil libre
            | , paramétré pour être
            | en conformité avec la
            |
            a(href="https://www.cnil.fr/fr/solutions-pour-la-mesure-daudience") recommandation « Cookies » de la CNIL
            | . Cela signifie que votre adresse IP, par exemple, est anonymisée avant
            | d’être enregistrée. Il est donc impossible d’associer vos visites sur
            | ce site à votre personne.

          p.subheading Je contribue à enrichir vos données, puis-je y accéder ?

          p
            | Bien sûr ! Les statistiques d’usage de la majorité de nos produits,
            | dont adock.beta.gouv.fr, sont disponibles en accès libre sur
            |
            a(href="http://stats.data.gouv.fr/index.php?module=CoreHome&action=index&idSite=50&period=day&date=yesterday#?module=Dashboard&action=embeddedIndex&idSite=50&period=day&date=yesterday&idDashboard=1") stats.data.gouv.fr.
</template>

<style lang="stylus">
.adock-search-background
  background: no-repeat top/100% url('../assets/search-background.jpg')
  background-color: white

iframe
  border: 1px solid
</style>
