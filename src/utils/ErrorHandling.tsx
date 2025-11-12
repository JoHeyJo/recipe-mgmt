export function errorHandling(location: string, error: { message: string, response?: {status?: number, data: {error: string}}}) {
  console.log(error)
  console.error(`Error in ${location} =>`, error.message);
  const status = error.response?.status
  const serverError = error.response?.data.error
  const clientError = error.message
  if(serverError && status === 400){
    return serverError.split(":")[serverError.split(":").length - 1];
  }
  if(clientError) return clientError
}
