import Raven from 'raven-js'
import api from '@/api.js'
import * as types from './mutation-types'

export const loadMeta = async ({ commit, state }) => {
  try {
    const response = await api.get('/meta/')
    commit(types.SET_META, response.data)
  } catch (error) {
    Raven.captureException(error)
  }
}
