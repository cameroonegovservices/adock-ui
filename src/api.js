import axios from 'axios'
import Raven from 'raven-js'

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000
})

// URLs
export const searchTransporteursUrl = '/transporteurs/recherche/'
export const metaUrl = '/meta/'

export function getTransporteurUrl (transporteurSiret) {
  return `/transporteurs/${transporteurSiret}/`
}

function handleCommunicationError (axiosError) {
  if (axiosError.response === undefined) {
    Raven.captureException(axiosError)
    return {
      message: `Le serveur ${process.env.VUE_APP_API_URL} est inaccessible.`,
      status: 503
    }
  } else if (axiosError.response && axiosError.response.status === 500) {
    // Django will call Raven itself
    return {
      message: `Le service a retourné une erreur. Les administrateurs ont été informés du problème.`,
      status: axiosError.response.status
    }
  } else if (axiosError.response && axiosError.response.status === 404) {
    let message = "La ressource demandée n'existe pas"
    if (axiosError.request && axiosError.request.responseURL) {
      message += ` « ${axiosError.request.responseURL} »`
    }
    message += '.'
    return {
      message,
      status: axiosError.response.status
    }
  }
}

export const api = {
  /* The data structure contains:
     - a field with the instance or the list of instances
     - a field errors which can be a string or an object with an entry for each field (form)
  */
  async getMeta () {
    const data = {
      meta: null,
      error: null
    }

    try {
      const response = await axiosInstance.get(metaUrl)
      data.meta = response.data
    } catch (error) {
      data.error = handleCommunicationError(error)
    }

    return data
  },

  async searchTransporteurs (params) {
    const data = {
      transporteurs: null,
      limit: null,
      errors: null
    }

    try {
      const response = await axiosInstance.get(searchTransporteursUrl, params)
      data.transporteurs = response.data.results
      data.limit = response.data.limit || 0
    } catch (error) {
      data.error = handleCommunicationError(error)
      if (data.error == null && error.response.data && error.response.data.message) {
        data.error = {
          message: error.response.data.message,
          status: 400
        }
      }
    }

    return data
  },

  async fetchTransporteur (transporteurSiret) {
    const url = getTransporteurUrl(transporteurSiret)
    const data = {
      transporteur: null,
      error: null
    }

    try {
      const response = await axiosInstance.get(url)
      data.transporteur = response.data
    } catch (error) {
      data.error = handleCommunicationError(error)
    }

    return data
  },

  async updateTransporteur (transporteurSiret, form) {
    const url = getTransporteurUrl(transporteurSiret)
    const data = {
      transporteur: null,
      errors: null
    }
    try {
      const response = await axiosInstance.patch(url, form)
      data.transporteur = response.data
    } catch (axiosError) {
      if (axiosError.response && axiosError.response.status === 400 && axiosError.response.data) {
        // The form isn't valid
        data.errors = {
          fields: axiosError.response.data
        }
      } else {
        const mainError = handleCommunicationError(axiosError)
        if (mainError) {
          data.errors = {
            main: mainError
          }
        }
      }
    }

    return data
  }
}

export default api
