import api from '@/api.js'
import * as types from './mutation-types'

export const loadMeta = async ({ commit, state }) => {
  const response = await api.get('/meta/')
  commit(types.SET_META, response.data)
}
