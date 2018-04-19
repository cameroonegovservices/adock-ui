import axios from 'axios'
import Raven from 'raven-js'

const adockAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
})

const searchTransporteursUrl = '/transporteurs/recherche'

export default {
  searchTransporteurs (params) {
    const data = {
      transporteurs: null,
      limit: null,
      error: null
    }

    try {
      const response = adockAxios.get(searchTransporteursUrl, params)
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

  getTransporteurUrl (transporteurSiret) {
    return `/transporteurs/${transporteurSiret}/`
  },

  async fetchTransporteur (transporteurSiret) {
    try {
      const url = this.getTransporteurUrl(transporteurSiret)
      const response = await adockAxios.get(url)
      return response.data
    } catch (error) {
      Raven.captureException(error)
      return null
    }
  }
}
