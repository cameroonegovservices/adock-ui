import api from "./api";

export async function routeLoadCarrier(routeTo, routeFrom, onSuccess) {
  const url = api.getCarrierUrl(routeTo.params.carrierSiret);
  const response = await api.get(url);
  if (response.status === 200) {
    // Success
    return onSuccess(response.data);
  } else {
    // Error
    let fallbackUrl;
    if (response.status === 404) {
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
        message: response.data.message,
        status: response.status,
        fallbackUrl
      }
    };
  }
}
