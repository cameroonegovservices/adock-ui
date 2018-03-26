import * as types from './mutation-types'

export const state = {
  choices: {
    workingAreas: {}
  }
}

export const mutations = {
  [types.SET_META] (state, payload) {
    state.choices.workingAreas = payload.choices.WORKING_AREA_CHOICES
  }
}
