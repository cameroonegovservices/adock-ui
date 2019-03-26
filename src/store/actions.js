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

  userLogIn: async ({ commit, dispatch, state }, payload) => {
    if (!auth.setTokenData(payload)) {
      return false;
    }

    let rc = await dispatch("loadUserProfile");
    if (rc) {
      commit("MESSAGE_ADD", {
        message: `Connecté en tant que « ${state.user.email} » via ${
          state.user.provider_display
        }.`
      });
    }
    return rc;
  },

  userLogInFromStorage: async ({ dispatch }) => {
    const token = auth.getToken();

    if (!token) {
      return false;
    }

    return await dispatch("loadUserProfile");
  },

  userLogOut: async ({ commit }) => {
    let response = null;
    const idToken = auth.getIdToken();

    if (idToken) {
      // Logout from FC
      response = await api.get(api.franceConnectLogoutUrl, {
        id_token: idToken
      });
    }

    auth.deleteTokenData();
    commit("USER_DELETE");

    if (response && response.status === 302) {
      // Redirect to FC that will redirect to UI logout view
      window.location = response.data.url;
    }
  }
};

export default actions;
