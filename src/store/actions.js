import api from '@/api.js'

export const actions = {
  loadMeta: async ({ commit, state }) => {
    const meta = await api.getMeta()
    if (meta) {
      commit('SET_META', meta)
    }
  }
}

export default actions
