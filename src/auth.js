/* globals localStorage */

function isLocalStorageAvailable() {
  const v = "value";
  try {
    localStorage.setItem(v, v);
    localStorage.removeItem(v);
    return true;
  } catch (e) {
    return false;
  }
}

let storage;

if (isLocalStorageAvailable()) {
  storage = localStorage;
} else {
  storage = {};
}

export default {
  getToken() {
    return storage.token;
  },

  getIdToken() {
    return storage.idToken;
  },

  setTokenData(payload) {
    if (payload.token) {
      storage.tokenType = payload.token_type;
      storage.token = payload.token;
      storage.expiresIn = payload.expires_in;
      storage.idToken = payload.id_token;
    }
  },

  deleteTokenData() {
    delete storage.tokenType;
    delete storage.token;
    delete storage.expiresIn;
    delete storage.idToken;
  },

  isLoggedIn() {
    return !!this.getToken();
  }
};
