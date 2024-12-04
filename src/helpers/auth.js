const jwt = require("jsonwebtoken");

const { AuthFailureError, BadRequestError } = require("../core/error.response");
const AsyncHandle = require("./AsyncHandle");
const { GetAccountById } = require("../models/repo/account.repo");

const HEADERS = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload) => {
  try {
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2 days",
    });

    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7 days",
    });

    const refresh_token_time = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const access_token_time = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    return {
      access_token,
      refresh_token,
      rtokenExp: refresh_token_time.exp,
      atokenExp: access_token_time.exp,
    };
  } catch (error) {
    return error;
  }
};

const authentication = AsyncHandle(async (req, res, next) => {
  const bearer = req.headers[HEADERS.AUTHORIZATION];
  let refresh_token = req.headers[HEADERS.REFRESH_TOKEN];
  let access_token;
  if (bearer) {
    access_token = bearer.split(" ")[1];
  }

  if (!refresh_token && !access_token) {
    throw new AuthFailureError("Misisng refresh_token or access_token");
  }

  if (refresh_token) {
    const decoded_user = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decoded_user) throw new BadRequestError("Can not get decoded_user");
    const holder_user = await GetAccountById(decoded_user.UserId);
    if (!holder_user) throw new BadRequestError("Can not get holder_user");
    req.user = decoded_user;
    req.refreshToken = refresh_token;
  }

  if (access_token) {
    const decode_user = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const holder_user = await GetAccountById(decode_user.UserId);
    if (!holder_user) throw new BadRequestError("Can not get holder_user");
    req.user = decode_user;
  }
  next();
});

module.exports = { createTokenPair, authentication };
