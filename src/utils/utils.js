export const getError = (body, errorData = []) => {
  const error = errorData.find((error) => {
    return error.body === body;
  });
  return error;
};
