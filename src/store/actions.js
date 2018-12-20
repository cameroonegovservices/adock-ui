import jwtDecode from "jwt-decode";

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
    auth.setToken(payload.token);
    const decodedJwt = jwtDecode(payload.token);
    commit("USER_LOG_IN", {
      user: decodedJwt
    });
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
