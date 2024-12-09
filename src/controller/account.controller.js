const { SuccessResponse } = require("../core/success.response");
const accountServices = require("../services/account.service");
const { url_image } = require("../utils");

class AccountController {
  GetMe = async (req, res, next) => {
    const idAccount = req.user.UserId;
    new SuccessResponse({
      message: "Get me success",
      metadata: await accountServices.GetMe(idAccount),
    }).send(res);
  };

  UpdateMe = async (req, res, next) => {
    const idAccount = req.user.UserId;
    let payload = req.body;
    console.log(req.files.thumbnail[0].filename);
    if (req.files.thumbnail.length > 0) {
      payload.thumbnail = url_image(
        req.files.thumbnail[0].filename.toString()
      );
    }
    new SuccessResponse({
      message: "update me success",
      metadata: await accountServices.UpdateMe(idAccount, payload),
    }).send(res);
  };
  Login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success!",
      metadata: await accountServices.login(req.body),
    }).send(res);
  };

  Register = async (req, res, next) => {
    new SuccessResponse({
      message: "Register success!",
      metadata: await accountServices.register(req.body),
    }).send(res);
  };

  Log_out = async (req, res, next) => {
    const user = req.user;
    new SuccessResponse({
      message: "log_out success!",
      metadata: await accountServices.logout(user),
    }).send(res);
  };

  HandleRefreshToken = async (req, res, next) => {
    const refreshtoken = req.refreshToken;
    const user = req.user;
    new SuccessResponse({
      message: "handle_refresh_token_success",
      metadata: await accountServices.handleRefreshToken(user, refreshtoken),
    }).send(res);
  };
}

module.exports = new AccountController();
