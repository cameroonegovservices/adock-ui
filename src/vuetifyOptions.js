import {
  transitions,
  VAlert,
  VApp,
  VAutocomplete,
  VAvatar,
  VBtn,
  VCard,
  VChip,
  VCombobox,
  VDataTable,
  VDivider,
  VFooter,
  VGrid,
  VIcon,
  VImg,
  VList,
  VNavigationDrawer,
  VProgressCircular,
  VSelect,
  VSnackbar,
  VSubheader,
  VTextarea,
  VTextField,
  VToolbar,
  VTooltip
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import { Ripple } from 'vuetify/es5/directives'

export const vuetifyOptions = {
  components: {
    transitions,
    VApp,
    VAlert,
    VAutocomplete,
    VAvatar,
    VBtn,
    VCard,
    VChip,
    VCombobox,
    VDataTable,
    VDivider,
    VFooter,
    VGrid,
    VIcon,
    VImg,
    VList,
    VNavigationDrawer,
    VProgressCircular,
    VSelect,
    VSnackbar,
    VSubheader,
    VTextField,
    VTextarea,
    VToolbar,
    VTooltip
  },
  directives: {
    Ripple
  }
}

export default vuetifyOptions
