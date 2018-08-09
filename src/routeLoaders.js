import api from './api'

export async function routeLoadTransporteur (routeTo, routeFrom, onSuccess) {
  const response = await api.fetchTransporteur(routeTo.params.transporteurSiret)
  if (response.error === null) {
    // Success
    return onSuccess(response)
  } else {
    // Error
    let fallbackUrl
    if (response.error.status === 404) {
      // Unavailable
      fallbackUrl = '/'
    } else {
      // Try again
      fallbackUrl = routeTo.path
    }
    // Redirect to our URL named 'error'
    return {
      name: 'error',
      params: {
        message: response.error.message,
        status: response.error.status,
        fallbackUrl
      }
    }
  }
}
