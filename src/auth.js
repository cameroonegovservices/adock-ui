/* globals localStorage */
import jwtDecode from "jwt-decode";
import Raven from "raven-js";

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

  getTokenType() {
    return storage.tokenType;
  },

  setTokenData(payload) {
    if (payload.token) {
      let decodedJwt = null;
      try {
        decodedJwt = jwtDecode(payload.token);
      } catch (e) {
        Raven.captureException(e);
        return false;
      }

      storage.tokenType = payload.tokenType;
      if (payload.token) {
        storage.token = payload.token;
      }
      storage.expiresIn = payload.expiresIn;
      if (payload.idToken) {
        storage.idToken = payload.idToken;
      }
      storage.username = decodedJwt.username;
      storage.expiration = decodedJwt.exp;
      return true;
    }
  },

  deleteTokenData() {
    delete storage.tokenType;
    delete storage.token;
    delete storage.expiresIn;
    delete storage.idToken;

    delete storage.username;
    delete storage.expiration;
  },

  isLoggedIn() {
    return !!this.getToken();
  }
};
