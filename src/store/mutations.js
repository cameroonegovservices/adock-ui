export const state = {
  choices: {
    workingAreas: {},
    specialities: {},
    objectifCO2: {}
  },
  options: {
    workingAreas: [],
    specialities: []
  },
  messages: [],
  meta: {
    carrier: {},
    version: ""
  },
  user: {}
};

function getOptionsFromChoices(choices) {
  const options = [];
  for (let [k, v] of Object.entries(choices)) {
    options.push({ value: k, text: v });
  }
  return options;
}

export const mutations = {
  REMOVE_MESSAGES(state) {
    state.messages.splice(0);
  },
  ADD_MESSAGE(state, payload) {
    state.messages.push(payload.message);
  },
  SET_META(state, payload) {
    state.options.workingAreas = getOptionsFromChoices(
      payload.choices.WORKING_AREA_CHOICES
    );
    state.choices.workingAreas = payload.choices.WORKING_AREA_CHOICES;
    state.options.specialities = getOptionsFromChoices(
      payload.choices.SPECIALITY_CHOICES
    );
    state.choices.specialities = payload.choices.SPECIALITY_CHOICES;
    state.choices.objectifCO2 = payload.choices.OBJECTIF_CO2_CHOICES;
    if (payload.carrier) {
      // Format the payload data before assignment
      if (payload.carrier.date) {
        payload.carrier.date = new Date(payload.carrier.date);
        payload.carrier.localeDate = payload.carrier.date.toLocaleDateString();
      }

      if (payload.carrier.count) {
        payload.carrier.localeCount = payload.carrier.count.toLocaleString();
      }
      state.meta.carrier = payload.carrier;
    }
    state.meta.version = payload.version;
  },
  USER_LOG_IN(state, payload) {
    state.user = payload.user;
  },
  USER_LOG_OUT(state) {
    state.user = {};
  }
};
