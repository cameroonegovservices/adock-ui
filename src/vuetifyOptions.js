import {
  transitions,
  VAlert,
  VApp,
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
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import { Ripple } from 'vuetify/es5/directives'

export const vuetifyOptions = {
  components: {
    transitions,
    VApp,
    VAlert,
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
