export function errorHandling(location: string, error: { message: string, response?: {data: {error: string}}}) {
  console.error(`Error in ${location} =>`, error.message);
  const errorMessage = error.response?.data.error
  if(errorMessage){
    return errorMessage.split(":")[errorMessage.split(":").length - 1];
  }
}
