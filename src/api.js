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

function handleNetworkError (error) {
  Raven.captureException(error)
  return [
    `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
  ]
}

export const api = {
  async getMeta () {
    const data = {
      meta: null,
      errors: null
    }

    try {
      const response = await axiosInstance.get(metaUrl)
      data.meta = response.data
    } catch (error) {
      data.errors = handleNetworkError(error)
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
      if (error.response && error.response.data && error.response.data.message) {
        data.errors = [ error.response.data.message ]
      } else {
        data.errors = handleNetworkError(error)
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
      data.errors = handleNetworkError(error)
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
      if (error.response && error.response.data) {
        data.errors = error.response.data
      } else {
        data.errors = handleNetworkError(error)
      }
    }

    return data
  }
}

export default api
