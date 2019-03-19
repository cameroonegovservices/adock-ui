<template lang="pug">
v-container.adock-search-background(fluid fill-height)
  v-layout(row justify-center)
    v-flex(xs12 sm11 md9 lg8 xl6)
      v-card.elevation-8
        v-card-text.adock-help
          v-flex.adock-align-right(xs12 offset-md8 md4)
            p(v-if="!user.has_accepted_cgu")
              | Acception en bas de page
            v-icon(large) arrow_downward

          h4.display-1 Conditions générales d'utilisation

          p
            | Le présent document a pour objet de régler les relations entre les
            | différents intervenants sur ce site et de définir les conditions et
            | modalités d’utilisation des services proposés sur adock.beta.gouv.fr.

          h5.headline Présentation

          p

            | A Dock est un service numérique à destination des professionnels
            | du secteur du transport de marchandises. Il s’agit d’une application
            | web qui permet :

          ol
            li À toutes les entreprises de transport de marchandises en France d’avoir la même visibilité au regard de leurs spécialités et de leurs zones géographiques d’intervention, par la mise à disposition de leurs informations professionnelles dans une fiche synthétique.
            li Aux donneurs d’ordre de trouver leurs futurs prestataires grâce à un moteur de recherche simple et gratuit, et d’accéder ainsi rapidement aux données essentielles à leurs transactions commerciales.

          br

          p
            | Le service est développé et opéré par la Direction Générale des
            | infrastructures des transports et de la mer (DGITM), avec l’appui de la
            |
            a(href="https://www.ecologique-solidaire.gouv.fr/fabrique-numerique-lincubateur-services-numeriques-du-pole-ministeriel") Fabrique numérique
            |  du ministère de la Transition Écologique et Solidaire et du ministère de la Cohésion des Territoires et des relations avec les collectivités territoriales, ainsi que l’incubateur de services numériques beta.gouv.fr de la Direction Interministérielle du Numérique et du Système d’Information et de Communication de l’État (DINSIC).

          p
            | Le code du logiciel est libre, sous licence
            |
            a(href="https://github.com/MTES-MCT/adock-api/blob/master/LICENSE") AGPL
            | , et peut donc être vérifié et amélioré par tous.

          h5.headline Vocabulaire

          p
            strong « Nous »
            |  se réfère à l'éditeur de A Dock
            br
            strong « Vous »
            |  se réfère à un utilisateur de A Dock.
            br
            strong « Le service »
            |  se réfère indistinctement à l’application web adock.beta.gouv.fr et à son interface de programmation applicative (API), documentée via
            |
            a(href="https://github.com/MTES-MCT/adock-api/blob/master/docs/openapi.yaml") OpenAPI v3
            |.

          h5.headline Utilisation

          p
            | A Dock est en accès libre à l’adresse
            |
            a(href="https://adock.beta.gouv.fr") adock.beta.gouv.fr
            | . Son utilisation est gratuite et facultative.
            | Si vous utilisez le service, vous en acceptez les conditions générales d’utilisation (CGU).  Nous nous réservons le droit de bloquer, sans information préalable ni compensation financière, les usages mettant en péril l’utilisation du logiciel.
            | L’utilisation de A Dock requiert une connexion internet et un navigateur récent. Son utilisation avec Internet Explorer 11 n’est pas optimale.

          h5.headline Données

          h6.title Données relevant du secret des affaires

          p Nous ne publions aucune donnée et information relevant du secret des affaires.

          h6.title Données à caractère personnel

          p
            |
            | A Dock demande et stocke diverses informations nominatives (nom, prénom, adresse email). Une fois réunies, ces données ont
            |
            strong caractère personnel
            | .

          p Nous nous engageons à ce que la collecte et le traitement de vos données, effectués à partir du site soient conformes au règlement général sur la protection des données du 27 avril 2016, applicable depuis le 25 mai 2018, et à la loi informatique et libertés dans sa dernière version modifiée du 20 juin 2018.
          p Nous nous engageons à ne jamais exploiter les informations que vous nous transmettez dans un but commercial ou publicitaire. De manière générale, nous n’acceptons aucune forme de publicité autre que celle qui constitue la présentation de nos partenaires.
          p Nous nous engageons à prendre toutes les mesures nécessaires pour garantir la sécurité des informations que vous nous fournissez. Les informations sont enregistrées dans un centre de données sécurisé. Seules nos équipes techniques peuvent y accéder.

          h6.title Responsable du traitement

          p Le responsable du traitement de vos données à caractère personnel est :

          p
            | Le Ministère de la Transition écologique et solidaire
            br
            |	Direction Générale des infrastructures des transports et de la mer (DGITM)
            br
            |	Mission Transport Intelligent (MTI)
            br
            |	1 place Carpeaux
            br
            |	92800 Puteaux

          h6.title Traitement des données et utilisation

          p Nous ne pouvons utiliser vos données à caractère personnel qu’à des fins à la fois légitimes et nécessaires. Cela signifie concrètement que nous traitons vos données à caractère personnel pour des finalités de :

          ul
            li création de compte utilisateur, afin de faciliter et sécuriser l’utilisation et la navigation sur adock.beta.gouv.fr.
            li mise à disposition aux professionnels du secteur du transport de marchandises, afin de simplifier leurs relations commerciales.

          br
          p La nature des opérations réalisées sur les données est : recherche, collecte, conservation, suppression et archivage.
          p Les données à caractère personnel traitées sont : nom, prénom, adresse email, date et lieu de naissance, genre, nationalité.
          p Les données sont conservées pour une durée de : 
          ul
            li 3 ans pour les données personnelles nécessaires au fonctionnement du site en tant que moteur de recherche permettant aux professionnels du secteur de trouver et d’accéder aux informations essentielles à leurs relations commerciales.
            li Les données à caractère personnel seront ensuite supprimés définitivement ou versées en base archive.

          br

          p
            |
            | Pour toutes questions relatives à l'utilisation du service, de vos données
            | personnelles ou pour tout autre sujet concernant A Dock, vous pouvez nous
            | contacter par mail à&nbsp;
            a(href="mailto:contact@adock.beta.gouv.fr") contact@adock.beta.gouv.fr


          h6.title Vos droits

          p
            | En application de la réglementation en matière de données à caractère personnel,
            |
            strong vous avez un droit d’accès, de rectification et de suppression de vos données.
            |
            | Pour l’exercer, envoyez-nous un courriel à l’adresse contact@adock.beta.gouv.fr, en précisant l’objet de votre demande et les éléments permettant d’identifier les données que vous souhaitez voir supprimées.
            | Après vérification que ces données vous appartiennent bien, nous les supprimerons définitivement de adock.beta.gouv.fr.

          p Par voie postale :

          p
            | Ministère de la Transition écologique et solidaire
            br
            | Direction Générale des infrastructures, du transport et de la mer
            br
            | Mission Transport Intelligent (MTI)
            br
            | 1 place Carpeaux
            br
            | 92800 Puteaux

          p Cette demande écrite est accompagnée d’une copie du titre d’identité avec signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.
          p
            | Le délégué à la protection des données du ministère de la transition écologique et solidaire peut également être contacté à l’adresse suivante :
            |
            a(mailto="dpd.daj.sg@developpement-durable.gouv.fr") dpd.daj.sg@developpement-durable.gouv.fr
            | .
          p Conformément au règlement général sur la protection des données, vous disposez du droit d’introduire une réclamation auprès de la CNIL (3 place de Fontenoy – TSA 80715 – 75334 PARIS CEDEX 07).


          h6.title Procédure en cas de violations de données à caractère personnel

          p En cas de destruction, de perte, d'altération, de divulgation non autorisée de données à caractère personnel transmises, conservées ou traitées d'une autre manière, ou d'accès non autorisé à de telles données, de manière accidentelle ou illicite, susceptible d'engendrer un risque élevé pour les droits et libertés de l’utilisateur, nous vous en informerons des faits et des mesures prises, dans les meilleurs délais.
          p Nous nous assurerons également que le nécessaire soit fait quant à la notification de la violation en question à la CNIL dans les 72 heures après en avoir pris connaissance, à moins que la violation ne présente pas un risque élevé pour vos droits et libertés.

          h5.headline Qualité des données publiées et absence de garantie

          p Nous publions sur A Dock des données à titre informatif. Par conséquent, les informations publiées sur A Dock ne sauraient engager la responsabilité de leur éditeur ou d’un quelconque service de l’État, l’utilisateur y recourant ayant conscience des potentielles erreurs ou omissions qu’elles peuvent comporter.
          p Nous nous efforçons de livrer des données de la meilleure qualité possible. Toutefois, malgré toute notre attention, elles peuvent encore comporter des erreurs ou omissions. Si vous constatez une erreur ou omission parmi les données vous concernant, nous vous invitons à la rectifier.
          p Vous pouvez également nous écrire à contact@adock.beta.gouv.fr pour nous faire part d’erreurs ou d’omissions, avec tous les éléments à votre disposition nous permettant de l’identifier.

          h5.headline Données de navigation (Cookies)

          p Nous déposons des cookies de mesure d’audience (nombre de visites, pages consultées), respectant les conditions d’exemption du consentement de l’internaute définies par la recommandation « Cookies » de la Commission nationale informatique et libertés (CNIL). Cela signifie, notamment, que ces cookies ne servent qu’à la production de statistiques anonymes et ne permettent pas de suivre votre navigation sur d’autres sites.
          p Nous déposons également des cookies de navigation, aux fins strictement techniques, qui ne sont pas conservés (mémorisation, pendant la durée de la session, des paramètres de filtrage et de préférence de fond cartographique). La consultation de la plateforme n’est pas affectée lorsque les utilisateurs utilisent des navigateurs désactivant les cookies.
          p Les adresses IP sont collectées et conservées pour une durée de six (6) mois.

          h5.headline Propriété intellectuelle

          p Ce site est la propriété exclusive du ministère de la transition écologique et solidaire et ministère de la cohésion des territoires et des relations avec les collectivités territoriales. Toute reproduction ou représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation expresse de son propriétaire est interdite et constituerait une contrefaçon sanctionnée par les articles L. 335-2 du Code de la propriété intellectuelle.
          p Si vous souhaitez reproduire ou réutiliser des contenus présents sur ce site, veuillez contacter le webmestre (contact@adock.beta.gouv.fr) pour connaître les conditions de réutilisation applicables.
          p Les marques dont est titulaire le ministère de la transition écologique et solidaire et le ministère de la cohésion des territoires et des relations avec les collectivités territoriales, ainsi que ses logos figurant sur le site sont des marques régulièrement déposées auprès de l’Institut national de la propriété industrielle (INPI). Toute reproduction totale ou partielle de ces marques ou de ces logos effectuées à partir des éléments du site sans l’autorisation expresse du propriétaire de ce site est prohibée au sens des articles L. 713-2 et suivants du Code de la propriété intellectuelle. Tout contrefacteur s’expose aux sanctions prévues aux articles L. 716-1 et suivants du code de la propriété intellectuelle.

          h6.title Crédits photo

          p Les photos présentes sur la page A propos sont à créditer aux auteurs suivants : pixabay.com (Licence CC0).

          h5.headline Évolutions

          p Nous pouvons faire évoluer A Dock sans information préalable. Nous ajoutons régulièrement de nouvelles fonctionnalités et raffinons l'interface sur la base de vos retours et des évolutions règlementaires.
          p Nous pouvons suspendre l'accès à A Dock sans information préalable, notamment pour des raisons de maintenance. Nous mettons l'application à jour plusieurs fois par semaine. L'indisponibilité ne dépasse généralement pas quelques minutes.
          p Nous pouvons amender ces conditions d’utilisation. Tout changement significatif sera notifié aux utilisateurs avant l'entrée en vigueur des nouvelles conditions. Tout l’historique de ces conditions (https://github.com/MTES-MCT/adock/ui/blob/master/src/views/CGU.vue) est librement accessible.

          h5.headline Mentions légales

          h6.title Éditeur

          p A Dock est édité par la Fabrique numérique du ministère de la transition écologique et solidaire et du ministère de la cohésion des territoires et des relations avec les collectivités territoriales, (1 place Carpeaux, 92800 Puteaux), avec l’appui de l’incubateur de services numériques (beta.gouv.fr) de la direction interministérielle du numérique et du système d’information et de communication de l’État (DINSIC).

          h6.title Directeur de la publication

          p
            | Monsieur le Directeur Général de la DGITM
            br
            | 1 place Carpeaux
            br
            | 92800 Puteaux

          h6.title Prestataire d’hébergement

          p
            | Le site A Dock est hébergé par la société OVH dont les serveurs se situent en France.
            br
            | Inscrite au RCS (Roubaix – Tourcoing 424 761 419 00045)
            br
            | SIREN : Code APE 6202A
            br
            | N° TVA : FR 22 424 761 419
            br
            | Siège social : 2 rue Kellermann, 59100 Roubaix, France

          v-alert(
            type="error"
            :value="!!errorMessage"
          ) {{ errorMessage }}
          v-flex(xs12 offset-md7 md5)
            v-checkbox(
                v-if="!user.has_accepted_cgu"
                label="Je certifie avoir lu et accepté les CGU"
                @change="cguChange"
                :disabled="cguCheckboxDisabled"
              )
</template>

<style lang="stylus">
.adock-search-background
  background: no-repeat top/100% url('../assets/search-background.jpg')
  background-color: white

iframe
  border: 1px solid
</style>

<script>
import api from "@/api";
import { mapState } from "vuex";

import { resetOnShowMixin } from "@/mixins";

export default {
  name: "cgu",
  componentUrl: "cgu",

  mixins: [resetOnShowMixin],

  computed: {
    ...mapState(["user"])
  },

  methods: {
    getDefaultData() {
      return {
        errorMessage: "",
        cguCheckboxDisabled: false
      };
    },

    async cguChange(value) {
      if (value) {
        this.cguCheckboxDisabled = true;
        const response = await api.patch(api.profileUrl, {
          has_accepted_cgu: value
        });
        if (response.status === 200) {
          // Update user
          this.$store.commit("USER_SET", response.data);
          this.$store.commit("MESSAGE_ADD", {
            message:
              "Vous avez approuvé les Conditions Générales d'Utilisation."
          });
          this.$router.push({ name: "search" });
        } else {
          this.errorMessage = response.data.message;
        }
      }
    }
  }
};
</script>
