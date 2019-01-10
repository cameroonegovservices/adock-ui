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

  setToken(token) {
    if (token) {
      storage.token = token;
    }
  },

  deleteToken() {
    delete storage.token;
  },

  isLoggedIn() {
    return !!this.getToken();
  }
};
