import * as types from './mutation-types'

export const state = {
  choices: {
    workingAreas: {},
    specialities: {}
  },
  options: {
    workingAreas: [],
    specialities: []
  },
  meta: {
    transporteur: {},
    version: ''
  }
}

function getOptionsFromChoices (choices) {
  const options = []
  for (let [k, v] of Object.entries(choices)) {
    options.push({value: k, text: v})
  }
  return options
}

export const mutations = {
  [types.SET_META] (state, payload) {
    state.options.workingAreas = getOptionsFromChoices(payload.choices.WORKING_AREA_CHOICES)
    state.choices.workingAreas = payload.choices.WORKING_AREA_CHOICES
    state.options.specialities = getOptionsFromChoices(payload.choices.SPECIALITY_CHOICES)
    state.choices.specialities = payload.choices.SPECIALITY_CHOICES
    if (payload.transporteur) {
      // Format the payload data before assignment
      if (payload.transporteur.date) {
        payload.transporteur.date = new Date(payload.transporteur.date)
        payload.transporteur.localeDate = payload.transporteur.date.toLocaleDateString()
      }

      if (payload.transporteur.count) {
        payload.transporteur.localeCount = payload.transporteur.count.toLocaleString()
      }
      state.meta.transporteur = payload.transporteur
    }
    state.meta.version = payload.version
  }
}
