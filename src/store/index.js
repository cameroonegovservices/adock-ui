import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import { mutations, state } from './mutations'

Vue.use(Vuex)

const options = {
  state,
  mutations,
  actions
}

const store = new Vuex.Store(options)

export default store
export { options, state }
