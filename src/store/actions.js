import jwtDecode from "jwt-decode";
import Raven from "raven-js";

import auth from "@/auth";
import api from "@/api";

export const actions = {
  loadMeta: async ({ commit }) => {
    const response = await api.getMeta();
    if (response.error == null) {
      commit("META_SET", response.data);
    }
  },

  userLogIn: ({ commit }, payload) => {
    let decodedJwt = null;

    auth.setToken(payload.token);
    try {
      decodedJwt = jwtDecode(payload.token);
    } catch (e) {
      Raven.captureException(e);
    }

    if (decodedJwt) {
      commit("USER_LOG_IN", {
        user: decodedJwt
      });
    }
  },

  userLogInFromStorage: ({ commit }) => {
    const token = auth.getToken();

    if (token) {
      const decodedJwt = jwtDecode(token);
      commit("USER_LOG_IN", {
        user: decodedJwt
      });
    }
  },

  userLogOut: ({ commit }) => {
    auth.deleteToken();
    commit("USER_LOG_OUT");
  }
};

export default actions;
