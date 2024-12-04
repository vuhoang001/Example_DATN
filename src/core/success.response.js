const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");

class SuccessResponse {
  constructor({
    message,
    rearonStatus = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {},
  }) {
    this.message = !message ? rearonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

module.exports = { SuccessResponse };
