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

export const api = {
  async getMeta () {
    let meta
    try {
      const response = await axiosInstance.get(metaUrl)
      meta = response.data
    } catch (error) {
      Raven.captureException(error)
      meta = null
    }

    return meta
  },

  async searchTransporteurs (params) {
    const data = {
      transporteurs: null,
      limit: null,
      error: null
    }

    try {
      const response = await axiosInstance.get(searchTransporteursUrl, params)
      data.transporteurs = response.data.results
      data.limit = response.data.limit || 0
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        data.error = error.response.data.message
      } else {
        // Default
        Raven.captureException(error)
        data.error = `Impossible de contacter le serveur ${process.env.VUE_APP_API_URL}`
      }
    }

    return data
  },

  async fetchTransporteur (transporteurSiret) {
    let transporteur

    try {
      const url = getTransporteurUrl(transporteurSiret)
      const response = await axiosInstance.get(url)
      transporteur = response.data
    } catch (error) {
      Raven.captureException(error)
      transporteur = null
    }

    return transporteur
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
      }
    }

    return data
  }
}

export default api
