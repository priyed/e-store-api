const { APIError } = require("../errors/custom-error");

const errorHandler = async (err, req, res, next) => {
  console.log(err);
  if (err instanceof APIError) {
    return res.status(err.status_code).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandler;
