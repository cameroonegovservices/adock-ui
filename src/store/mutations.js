export const state = {
  choices: {
    objectifCO2: {},
    specialities: {},
    workingAreas: {}
  },
  // Options are computed from choices provided by /meta (easier to use)
  options: {
    certificates: [],
    specialities: [],
    workingAreas: []
  },
  messages: [],
  meta: {
    carrier: {},
    version: ""
  },
  user: null
};

function getOptionsFromChoices(choices) {
  const options = [];
  if (choices != null) {
    for (let [k, v] of Object.entries(choices)) {
      options.push({ value: k, text: v });
    }
  }
  return options;
}

export const mutations = {
  MESSAGES_REMOVE(state) {
    state.messages.splice(0);
  },
  MESSAGE_ADD(state, payload) {
    state.messages.push(payload.message);
  },
  META_SET(state, payload) {
    // Sometimes, choices and options are required by the app or just one of them.
    state.options.certificates = getOptionsFromChoices(
      payload.choices.CERTIFICATE_CHOICES
    );

    state.choices.objectifCO2 = payload.choices.OBJECTIF_CO2_CHOICES;

    state.options.specialities = getOptionsFromChoices(
      payload.choices.SPECIALITY_CHOICES
    );
    state.choices.specialities = payload.choices.SPECIALITY_CHOICES;

    state.options.workingAreas = getOptionsFromChoices(
      payload.choices.WORKING_AREA_CHOICES
    );
    state.choices.workingAreas = payload.choices.WORKING_AREA_CHOICES;

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
  USER_SET(state, payload) {
    state.user = payload.user;
  },
  USER_DELETE(state) {
    state.user = null;
  }
};
