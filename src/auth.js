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
    storage.tokenType = payload.tokenType;
    storage.token = payload.token;
    storage.expiresIn = payload.expiresIn;
    storage.idToken = payload.idToken;
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
