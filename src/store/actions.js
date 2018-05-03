import api from '@/api.js'

export const actions = {
  loadMeta: async ({ commit, state }) => {
    const response = await api.getMeta()
    if (response.errors == null) {
      commit('SET_META', response.meta)
    }
    // FIXME On error, the user should refresh...
  }
}

export default actions
