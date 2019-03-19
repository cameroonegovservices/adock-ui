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
  tokenHasExpired() {
    if (!storage.expiration) {
      return false;
    }

    const now = new Date().getTime() / 1000;
    const expiration = Number(storage.expiration);
    return expiration - now <= 0;
  },

  getToken() {
    if (this.tokenHasExpired()) {
      return null;
    }

    return storage.token || null;
  },

  getIdToken() {
    return storage.idToken;
  },

  getTokenType() {
    return storage.tokenType;
  },

  getUserId() {
    return storage.userId;
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
      storage.userId = decodedJwt.user_id;
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
  }
};
