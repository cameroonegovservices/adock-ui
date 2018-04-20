import api from '@/api.js'
import * as types from './mutation-types'

export const loadMeta = async ({ commit, state }) => {
  const meta = await api.getMeta()
  if (meta) {
    commit(types.SET_META, meta)
  }
}
