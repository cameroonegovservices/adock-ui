import api from "./api";

export async function routeLoadCarrier(routeTo, routeFrom, onSuccess) {
  const response = await api.fetchCarrier(routeTo.params.carrierSiret);
  if (response.error === null) {
    // Success
    return onSuccess(response);
  } else {
    // Error
    let fallbackUrl;
    if (response.error.status === 404) {
      // Unavailable
      fallbackUrl = "/";
    } else {
      // Try again
      fallbackUrl = routeTo.path;
    }
    // Redirect to our URL named 'error'
    return {
      name: "error",
      params: {
        message: response.error.message,
        status: response.error.status,
        fallbackUrl
      }
    };
  }
}
