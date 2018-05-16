import 'vuetify/src/stylus/app.styl'
import {
  transitions,
  VApp,
  VAlert,
  VAvatar,
  VBtn,
  VCard,
  VChip,
  VDivider,
  VFooter,
  VGrid,
  VIcon,
  VList,
  VSelect,
  VSnackbar,
  VSubheader,
  VTextField,
  VToolbar,
  VTooltip
} from 'vuetify'
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
    VDivider,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VSelect,
    VSnackbar,
    VSubheader,
    VTextField,
    VToolbar,
    VTooltip
  },
  directives: {
    Ripple
  }
}

export default vuetifyOptions
