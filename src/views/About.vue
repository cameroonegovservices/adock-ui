<template lang="pug">
v-container.adock-search-background(fluid fill-height)
  v-layout(row justify-center)
    v-flex(xs12 sm11 md9 lg8 xl6)
      v-card.elevation-8
        v-card-text.adock-help
          h4.display-1 En savoir plus

          h6.title Qui sommes-nous ?

          p Simple, gratuit, et accessible à tous, A Dock est le premier moteur de recherche public rassemblant tous les transporteurs de marchandises en France. A Dock est un projet d’Etat, qui, dans un secteur très concurrentiel, européen et partiellement régulé, a deux objectifs principaux :

          ol
            li Garantir à toutes les entreprises de transport en France, petites, moyennes ou grandes, la même visibilité au regard de leurs spécialités et de leurs zones géographiques d'intervention.
            li Garantir aux donneurs d’ordre un accès simple, rapide et consolidé aux données essentielles à leurs transactions commerciales.

          h6.title Comment travaillons-nous ?

          p
            | A Dock est développé et opéré par la Direction Générale des infrastructures, des transports et de la mer (DGITM), avec l’appui de la 
            |
            a(href="https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel") Fabrique Numérique
            | , l'incubateur des ministères de la transition écologique et solidaire et de la cohésion des territoires et des relations avec les collectivités territoriales, et s'inscrit directement dans la démarche de beta.gouv.fr, qui porte les projets de création de services publics numériques.

          p
            | Nous sommes également membre de la communauté
            |
            a(href="https://www.ecologique-solidaire.gouv.fr/france-mobilites-french-mobility") France Mobilités-French Mobility
            | .

          p
            | Nous travaillons inspirés par la « méthode Agile » : sans cahier des charges, en cycles courts et amélioration continue, et surtout, au contact permanent de nos utilisateurs.
            br
            | Transporteurs, chargeurs, commissionnaires, vos avis et besoins nous intéressent : n’hésitez pas, à nous écrire à
            |
            a(mailto="contact@adock.beta.gouv.fr")  contact@adock.beta.gouv.fr
            |  !

          h6.title De nouvelles fonctionnalités sont-elles prévues ?

          p Nous ne souhaitons pas rester un simple annuaire : nous avons comme ambition qu’A Dock devienne l’outil de simplification des relations entre les différents acteurs du secteur du transport de marchandises en France. À cet effet, nous comptons rendre prochainement possible la dématérialisation et le téléchargement de documents administratifs nécessaires à la bonne conduite de ces relations.

          h5.headline Foire aux Questions

          h6.title Comment sont classés les résultats de recherche ?

          p Notre but est de fournir en priorité les entreprises locales et spécialisées. Seuls les résultats correspondant à tous les critères de recherche renseignés seront affichés puis sont triés dans l'ordre suivant :

          ol
            li aire de travail la plus restreinte (départemental, France ou internationale)
            li nombre de départements le plus faible
            li siège dans la zone de recherche
            li niveau de complétude de la fiche
            li ordre alphabétique du nom d'enseigne

          h6.title Je suis transporteur, comment m’assurer d’une bonne visibilité sur adock.beta.gouv.fr ?

          p C’est facile !

          p Inscrite au registre électronique national des entreprises de transport par route, votre entreprise bénéficie déjà d’une fiche pré-remplie sur adock.beta.gouv.fr.

          p Pour compléter les informations de votre fiche, il vous suffit de :

          ol
            li Rechercher la fiche de votre entreprise, en renseignant son nom ou numéro de SIRET.
            li Créer un compte utilisateur ou se connecter grâce à FranceConnect, si vous possédez déjà un compte de ce type.
            li Une fois inscrit et connecté, vous pourrez compléter la fiche de votre entreprise.

          br
          p N’oubliez pas de confirmer les modifications quand vous avez fini, en cliquant sur le lien du courriel envoyé à l'adresse électronique de l'entreprise.

          p Apparaissez ainsi en tête des recherches en quelques clics, grâce à une fiche complète, c’est-à-dire que vous avez renseigné 100 % des informations essentielles à vos futurs donneurs d’ordre !

          h6.title Je suis transporteur, ma fiche transporteur reste-t-elle active si je cesse mon activité ?

          p La fiche de votre entreprise ne disparaîtra pas automatiquement du site avec la fin de votre activité, elle restera accessible par la saisie de son nom ou numéro de SIRET.
          p Néanmoins, votre entreprise n’apparaîtra plus dans la liste des transporteurs disponibles.
          p Conformément à la loi, vous disposez d’un droit de d’accès, de rétraction et de suppression de vos données. Vous pouvez l’exercer en nous contactant à contact@adock.beta.gouv.fr.

          h6.title Est-ce que nous utilisons des « cookies ?

          p Oui. Un « cookie » est un petit fichier texte déposé sur votre ordinateur lorsque vous consultez adock.beta.gouv.fr. C’est outil de suivi d’audience qui nous permet de mesurer le nombre de visites et les pages les plus visitées, pour en tirer des statistiques.

          iframe(src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr")

          p Vos visites sur adock.beta.gouv.fr contribuent donc à enrichir nos statistiques.

          h6.title Pourquoi n’affichons-nous pas de bannière de consentement aux cookies, comme la plupart des autres sites web ?

          p
            | Rien d’exceptionnel, ce n’est un pas de passe-droit lié à un site « .gouv.fr ». Dans le cadre des « cookies », nous collectons exclusivement des données
            |
            strong anonymes
            |
            | d’audience, qui, selon la recommandation « Cookies » de la CNIL, sont exemptées de consentement préalable de l’internaute.

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

          h6.title Je contribue à enrichir vos données, puis-je y accéder ?

          p
            | Bien sûr ! Les statistiques d’usage de la majorité de nos produits,
            | dont adock.beta.gouv.fr, sont disponibles en accès libre sur
            |
            a(href="adock.beta.gouv.fr/stats") adock.beta.gouv.fr/stats
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
