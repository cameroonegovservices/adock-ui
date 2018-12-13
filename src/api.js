import axios from "axios";
import Raven from "raven-js";

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: process.env.VUE_APP_AXIOS_TIMEOUT
});

// Server URLs
export const loginUrl = "/accounts/login/";
export const metaUrl = "/meta/";
export const searchCarriersUrl = "/carriers/search/";
export const statsCarriersUrl = "/carriers/stats/";

export function getCarrierUrl(carrierSiret) {
  return `/carriers/${carrierSiret}/`;
}

export function getConfirmEmailUrl(carrierSiret, token) {
  return `/carriers/${carrierSiret}/confirm_email/${token}/`;
}

export function getEditCodeUrl(carrierSiret) {
  return `/carriers/${carrierSiret}/send_code/`;
}

function handleCommunicationError(axiosError) {
  if (axiosError.response === undefined) {
    Raven.captureException(axiosError);
    return {
      message: `Le serveur ${process.env.VUE_APP_API_URL} est inaccessible.`,
      status: 503
    };
  } else if (axiosError.response) {
    const data = {
      status: axiosError.response.status
    };

    if (data.status === 500) {
      // Django will call Raven itself
      data.message = `Le service a retourné une erreur. Les administrateurs ont été informés du problème.`;
    } else if (data.status === 404) {
      let message = "La ressource demandée n'existe pas";
      if (axiosError.request && axiosError.request.responseURL) {
        message += ` « ${axiosError.request.responseURL} »`;
      }
      message += ".";
      data.message = message;
    } else if (data.status === 400 && axiosError.response.data) {
      Object.assign(data, axiosError.response.data);
    }

    return data;
  }
}

function handleInvalidFormAndCommunicationError(axiosError) {
  let errors = null;
  if (
    axiosError.response &&
    axiosError.response.status === 400 &&
    axiosError.response.data
  ) {
    // The form isn't valid
    errors = {
      fields: axiosError.response.data
    };
  } else {
    const mainError = handleCommunicationError(axiosError);
    if (mainError) {
      errors = {
        main: mainError
      };
    }
  }
  return errors;
}

export const api = {
  /* The data structure contains:
     - a field with the instance or the list of instances
     - a field errors which can be a string or an object with an entry for each field (form)
  */
  async getData(url) {
    const data = {
      data: null,
      error: null
    };

    try {
      const response = await axiosInstance.get(url);
      data.data = response.data;
    } catch (error) {
      data.error = handleCommunicationError(error);
    }

    return data;
  },

  async getMeta() {
    return this.getData(metaUrl);
  },

  async getStats() {
    return this.getData(statsCarriersUrl);
  },

  async searchCarriers(params) {
    const data = {
      carriers: null,
      limit: null,
      errors: null
    };

    try {
      const response = await axiosInstance.get(searchCarriersUrl, params);
      data.carriers = response.data.results;
      data.limit = response.data.limit || 0;
    } catch (error) {
      data.error = handleCommunicationError(error);
    }

    return data;
  },

  async fetchCarrier(carrierSiret) {
    const url = getCarrierUrl(carrierSiret);
    const data = {
      carrier: null,
      error: null
    };

    try {
      const response = await axiosInstance.get(url);
      data.carrier = response.data.carrier;
    } catch (error) {
      data.error = handleCommunicationError(error);
    }

    return data;
  },

  async login(email, password) {
    const data = {
      user: null,
      errors: null
    };
    try {
      const response = await axiosInstance.post(loginUrl, {
        username: email,
        password
      });
      if (response.status === 200) {
        console.log("Invalid credentials.");
      }
    } catch (axiosError) {
      data.errors = handleCommunicationError(axiosError);
    }
  },

  async updateCarrier(carrierSiret, payload) {
    const url = getCarrierUrl(carrierSiret);
    const data = {
      carrier: null,
      errors: null
    };
    try {
      const response = await axiosInstance.patch(url, payload);
      data.carrier = response.data.carrier;
      data.confirmation_email_sent =
        response.data.confirmation_email_sent || false;
    } catch (axiosError) {
      data.errors = handleInvalidFormAndCommunicationError(axiosError);
    }
    return data;
  },

  async confirmEmail(carrierSiret, token) {
    const url = getConfirmEmailUrl(carrierSiret, token);
    try {
      const response = await axiosInstance.get(url);
      return {
        message: response.data.message,
        status: response.status
      };
    } catch (axiosError) {
      return handleCommunicationError(axiosError);
    }
  },

  async mailEditCode(carrierSiret) {
    const url = getEditCodeUrl(carrierSiret);
    try {
      const response = await axiosInstance.get(url);
      return {
        email: response.data.email,
        edit_code_at: response.data.edit_code_at,
        edit_code_timeout_at: response.data.edit_code_timeout_at,
        status: response.status
      };
    } catch (axiosError) {
      return handleCommunicationError(axiosError);
    }
  }
};

export default api;
