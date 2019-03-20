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

/*
  Code from https://auth0.com/docs/api-auth/tutorials/nonce#persist-nonces-across-requests
  that uses Web Crypto API.
*/
function randomString(length) {
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~";
  let result = "";

  while (length > 0) {
    var bytes = new Uint8Array(16);
    var random = window.crypto.getRandomValues(bytes);

    random.forEach(function(c) {
      if (length == 0) {
        return;
      }
      if (c < charset.length) {
        result += charset[c];
        length--;
      }
    });
  }
  return result;
}

export default {
  generateNonce() {
    const nonce = randomString(16);
    storage.nonce = nonce;
    return nonce;
  },

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
    if (!payload.token) {
      return false;
    }

    let decodedToken = null;
    try {
      decodedToken = jwtDecode(payload.token);
    } catch (e) {
      Raven.captureException(e);
      return false;
    }

    if (storage.nonce) {
      /* A nonce is expected */
      let decodedIdToken = null;
      try {
        decodedIdToken = jwtDecode(payload.id_token);
      } catch (e) {
        Raven.captureException(e);
        return false;
      }

      if (storage.nonce !== decodedIdToken.nonce) {
        Raven.captureMessage("Different nonce detected.");
        return false;
      }
    }

    // Store only after validations
    storage.tokenType = payload.token_type;
    storage.token = payload.token;
    storage.expiresIn = payload.expires_in;
    if (payload.id_token) {
      storage.idToken = payload.id_token;
    }
    storage.userId = decodedToken.user_id;
    storage.expiration = decodedToken.exp;
    return true;
  },

  deleteTokenData() {
    delete storage.tokenType;
    delete storage.token;
    delete storage.expiresIn;
    delete storage.idToken;
    delete storage.nonce;
    delete storage.username;
    delete storage.expiration;
  }
};
