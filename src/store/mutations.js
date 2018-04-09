import * as types from './mutation-types'

export const state = {
  choices: {
    workingAreas: {}
  },
  selects: {
    workingAreas: []
  },
  transporteur: {},
  version: ''
}

export const mutations = {
  [types.SET_META] (state, payload) {
    for (let [k, v] of Object.entries(payload.choices.WORKING_AREA_CHOICES)) {
      state.selects.workingAreas.push({value: k, text: v})
    }
    state.choices.workingAreas = payload.choices.WORKING_AREA_CHOICES
    state.transporteur = payload.transporteur
    state.version = payload.version
  }
}
