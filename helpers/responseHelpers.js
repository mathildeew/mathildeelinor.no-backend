/**
 * Respond with JSON
 * @param {Object} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {Object} data - Data to send in response.
 */
export const respondWithJson = (res, status, data) => {
  res.status(status).json(data);
};
