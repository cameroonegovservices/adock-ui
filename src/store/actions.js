import auth from "@/auth";
import api from "@/api";

export const actions = {
  loadMeta: async ({ commit }) => {
    const response = await api.get(api.metaUrl);
    if (response.status === 200) {
      commit("META_SET", response.data);
    }
  },

  loadUserProfile: async ({ commit }) => {
    const response = await api.get(api.profileUrl);
    if (response.status !== 200) {
      return false;
    }

    commit("USER_SET", response.data);
    return true;
  },

  userLogIn: async ({ dispatch }, payload) => {
    if (!auth.setTokenData(payload)) {
      return false;
    }

    return await dispatch("loadUserProfile");
  },

  userLogInFromStorage: async ({ dispatch }) => {
    const token = auth.getToken();

    if (!token) {
      return false;
    }

    return await dispatch("loadUserProfile");
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
      commit("USER_DELETE");
    }
  }
};

export default actions;
