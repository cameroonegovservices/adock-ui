import axios from 'axios'
import Raven from 'raven-js'

const adockAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
})

const searchTransporteursUrl = '/transporteurs/recherche'
const metaUrl = '/meta'

function getTransporteurUrl (transporteurSiret) {
  return `/transporteurs/${transporteurSiret}/`
}

export default {
  async getMeta () {
    let meta
    try {
      const response = await adockAxios.get(metaUrl)
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
      const response = await adockAxios.get(searchTransporteursUrl, params)
      data.transporteurs = response.data.results
      data.limit = response.data.limit
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
      const response = await adockAxios.get(url)
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
      const response = await adockAxios.patch(url, form)
      data.transporteur = response.data
    } catch (error) {
      if (error.response && error.response.data) {
        data.errors = error.response.data
      }
    }

    return data
  }
}
