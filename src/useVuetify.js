import Vue from "vue";
// New Vuetify 1.3 can automatically import all the Vuetify components excepted
// in PUG templates :(so we need to explicitly register our components.
import Vuetify, {
  VAlert,
  VApp,
  VAutocomplete,
  VAvatar,
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VChip,
  VCombobox,
  VDataTable,
  VDivider,
  VFooter,
  VForm,
  VIcon,
  VImg,
  VList,
  VListTile,
  VListTileAction,
  VListTileActionText,
  VListTileContent,
  VListTileSubTitle,
  VListTileTitle,
  VNavigationDrawer,
  VProgressCircular,
  VSelect,
  VSnackbar,
  VSubheader,
  VTextarea,
  VTextField,
  VToolbar,
  VToolbarItems,
  VToolbarSideIcon,
  VToolbarTitle,
  VTooltip
} from "vuetify/lib";
import VGrid from "vuetify/lib/components/VGrid/";
import transitions from "vuetify/lib/components/transitions/";
import { Ripple } from "vuetify/lib/directives";
import "vuetify/src/stylus/app.styl";
import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VAutocomplete,
    VAvatar,
    VBtn,
    VCard,
    VCardText,
    VCardTitle,
    VChip,
    VCombobox,
    VDataTable,
    VDivider,
    VFooter,
    VForm,
    VGrid,
    VIcon,
    VImg,
    VList,
    VListTile,
    VListTileAction,
    VListTileActionText,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle,
    VNavigationDrawer,
    VProgressCircular,
    VSelect,
    VSnackbar,
    VSubheader,
    VTextField,
    VTextarea,
    VToolbar,
    VToolbarItems,
    VToolbarSideIcon,
    VToolbarTitle,
    VTooltip,
    transitions
  },
  customProperties: false,
  directives: {
    Ripple
  },
  lang: {
    locales: { fr },
    current: "fr"
  }
});
