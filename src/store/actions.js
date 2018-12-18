import auth from "@/auth";
import api from "@/api";

export const actions = {
  loadMeta: async ({ commit }) => {
    const response = await api.getMeta();
    if (response.error == null) {
      commit("SET_META", response.data);
    }
  },

  userLogIn: ({ commit }, payload) => {
    auth.setToken(payload.token);
    commit("USER_LOG_IN", {
      user: {
        // FIXME
        first_name: "Raymond",
        last_name: "Dujardin"
      }
    });
  },

  userLogOut: ({ commit }) => {
    auth.deleteToken();
    commit("USER_LOG_OUT");
  }
};

export default actions;
