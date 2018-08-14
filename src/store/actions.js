import api from '@/api.js'

export const actions = {
  loadMeta: async ({ commit, state }) => {
    const response = await api.getMeta()
    if (response.error == null) {
      commit('SET_META', response.data)
    }
  }
}

export default actions
