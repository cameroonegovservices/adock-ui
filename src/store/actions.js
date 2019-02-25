import jwtDecode from "jwt-decode";
import * as Sentry from "@sentry/browser";

import auth from "@/auth";
import api from "@/api";

export const actions = {
  loadMeta: async ({ commit }) => {
    const response = await api.get(api.metaUrl);
    if (response.status === 200) {
      commit("META_SET", response.data);
    }
  },

  userLogIn: ({ commit }, payload) => {
    let decodedJwt = null;

    auth.setTokenData(payload);
    try {
      decodedJwt = jwtDecode(auth.getToken());
    } catch (e) {
      Sentry.captureException(e);
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

  userLogOut: async ({ commit }) => {
    const idToken = auth.getIdToken();
    if (idToken) {
      const response = await api.get(api.franceConnectLogoutUrl, {
        id_token: idToken
      });
      // It's possible the user hasn't been disconnected from FranceConnect, in
      // this case, we only display a message.
      if (response.data.message) {
        commit("MESSAGE_ADD", {
          message: response.data.message
        });
      }
      auth.deleteTokenData();
      commit("USER_LOG_OUT");
    }
  }
};

export default actions;
