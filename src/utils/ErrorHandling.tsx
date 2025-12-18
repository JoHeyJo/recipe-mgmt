export function errorHandling(
  location: string,
  error: {
    message: string;
    response?: { status?: number; data: { error: string } };
  }
) {
  console.log(error);
  console.error(`Error in ${location} =>`, error.message);
  const status = error.response?.status;
  const serverError = error.response?.data.error;
  const clientError = error.message;
  if (serverError && status === 400) {
    console.log("error in 400", status);
    return serverError.split(":")[serverError.split(":").length - 1];
  }
  if (serverError && status === 401) {
    return serverError;
  }
  if (clientError) return clientError;
}
