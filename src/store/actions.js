import api from '@/api.js'

export const loadMeta = async ({ commit, state }) => {
  const meta = await api.getMeta()
  if (meta) {
    commit('SET_META', meta)
  }
}
