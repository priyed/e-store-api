class APIError extends Error {
  constructor(message, status_code) {
    super(message);
    this.status_code = status_code;
  }
}

const createError = (message, status_code) =>
  new APIError(message, status_code);

module.exports = { createError, APIError };
