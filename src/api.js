import axios from 'axios'
import Raven from 'raven-js'

export const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
})

export const searchTransporteursUrl = '/transporteurs/recherche'
export const metaUrl = '/meta'

export function getTransporteurUrl (transporteurSiret) {
  return `/transporteurs/${transporteurSiret}/`
}

function handleGlobalErrors (error) {
  if (error.response === undefined) {
    Raven.captureException(error)
    return {
      global: `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
    }
  } else if (error.response && error.response.status === 500) {
    // Django will call Raven itself
    return {
      global: `Le service a retourné une erreur. Les administrateurs ont été informés du problème.`
    }
  } else if (error.response && error.response.status === 404) {
    return {
      global: "La ressource demandée n'existe pas."
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
      errors: null
    }

    try {
      const response = await axiosInstance.get(metaUrl)
      data.meta = response.data
    } catch (error) {
      data.errors = handleGlobalErrors(error)
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
      data.errors = handleGlobalErrors(error)
      if (data.errors == null && error.response.data && error.response.data.message) {
        data.errors = {
          global: error.response.data.message
        }
      }
    }

    return data
  },

  async fetchTransporteur (transporteurSiret) {
    const data = {
      transporteur: null,
      errors: null
    }

    try {
      const url = getTransporteurUrl(transporteurSiret)
      const response = await axiosInstance.get(url)
      data.transporteur = response.data
    } catch (error) {
      // FIXME Add not found message
      data.errors = handleGlobalErrors(error)
    }

    return data
  },

  async updateTransporteur (transporteurSiret, form) {
    const data = {
      transporteur: null,
      errors: null
    }

    try {
      const url = getTransporteurUrl(transporteurSiret)
      const response = await axiosInstance.patch(url, form)
      data.transporteur = response.data
    } catch (error) {
      data.errors = handleGlobalErrors(error)
      if (data.errors == null && error.response.status === 400 && error.response.data) {
        // An object with an entry for each field
        data.errors = error.response.data
      }
    }

    return data
  }
}

export default api
