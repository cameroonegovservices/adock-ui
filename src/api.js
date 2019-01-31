import axios from "axios";
import Raven from "raven-js";

import auth from "./auth";

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: process.env.VUE_APP_AXIOS_TIMEOUT
});

// Add JWT token to requests if available
axiosInstance.interceptors.request.use(function(config) {
  const token = auth.getToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export const api = {
  // Server URLs
  franceConnectCallbackUrl: "/accounts/fc/callback/",
  franceConnectLogoutUrl: "/accounts/fc/logout/",
  loginCreateUrl: "/accounts/create/",
  loginUrl: "/accounts/login/",
  metaUrl: "/meta/",
  searchCarriersUrl: "/carriers/search/",
  statsCarriersUrl: "/carriers/stats/",

  getAccountActivateUrl(userId, token) {
    return `/accounts/${userId}/activate/${token}/`;
  },

  getCarrierCertificateUrl(carrierSiret) {
    return `/carriers/${carrierSiret}/certificate/`;
  },

  getCarrierUrl(carrierSiret) {
    return `/carriers/${carrierSiret}/`;
  },

  getConfirmEmailUrl(carrierSiret, token) {
    return `/carriers/${carrierSiret}/confirm_email/${token}/`;
  },

  getEditCodeUrl(carrierSiret) {
    return `/carriers/${carrierSiret}/send_code/`;
  },

  handleCommunicationError(axiosError) {
    let message = null;
    // Returns an object with 'status' (integer), 'data.message' (text) and all the
    // attributes of 400 responses.
    if (axiosError.response == null) {
      Raven.captureException(axiosError);
      return {
        data: {
          message: `Le serveur ${
            process.env.VUE_APP_API_URL
          } est inaccessible ou erreur d'exécution Javascript.`
        },
        status: 503
      };
    }

    const response = axiosError.response;
    if (response.status === 500) {
      // Django will call Raven itself
      message = `Le service a retourné une erreur. Les administrateurs ont été informés du problème.`;
    } else if (response.status === 404) {
      message = "La ressource demandée n'existe pas";
      if (axiosError.request && axiosError.request.responseURL) {
        message += ` « ${axiosError.request.responseURL} »`;
      }
      message += ".";
    }

    if (message) {
      response.data = Object.assign({}, response.data, { message });
    }

    return response;
  },

  /* The data structure contains:
     - a field with the instance or the list of instances
     - a field 'errors' which can be a string or an object with an entry for each field (form)
  */
  async get(url, params) {
    try {
      return await axiosInstance.get(url, { params });
    } catch (axiosError) {
      return this.handleCommunicationError(axiosError);
    }
  },

  async method(method, url, data) {
    try {
      return await axiosInstance({
        method,
        url,
        data
      });
    } catch (axiosError) {
      return this.handleCommunicationError(axiosError);
    }
  },

  post(url, data) {
    return this.method("post", url, data);
  },

  patch(url, data) {
    return this.method("patch", url, data);
  }
};

export default api;
