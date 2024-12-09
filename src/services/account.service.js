const { BadRequestError } = require("../core/error.response");
const accountModel = require("../models/account.model");
const bcrypt = require("bcrypt");
const { createTokenPair } = require("../helpers/auth");

const { getInfoData } = require("../utils/index");
const key_token_service = require("./keyToken.service");

class AccountServices {
  GetMe = async (idAccount) => {
    if (!idAccount)
      throw new BadRequestError("Something went wrong can not find idAccount");
    const data = accountModel.findOne({ _id: idAccount }).select("-password");
    if (!data) throw new BadRequestError("Dont find any data");
    return data;
  };

  UpdateMe = async (idAccount, payload) => {
    if (!idAccount) throw new BadRequestError("Can not find idAccount");
    const data = await accountModel.findOne({ _id: idAccount });
    if (!data) throw new BadRequestError("dont find any data");

    Object.assign(data, payload);

    const result = await data.save();
    if (!result) throw new BadRequestError("Somethingwentwrong");
    return 1;
  };
  register = async (payload) => {
    const { email, password } = payload;
    if (!email || !password)
      throw new BadRequestError("Missing email or password :::ACCNTSRVCS");

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    if (!hashedPassword)
      throw new BadRequestError("Missing hashed password ::: ACCNTSRVCS");

    const newAccount = await accountModel.create({
      email: email,
      password: hashedPassword,
    });

    if (!newAccount)
      throw new BadRequestError("Can not create account 1 ::ACCNTSRVCS");

    return {
      user: getInfoData({
        fields: ["_id", "email", "phone", "thumbnail", "status", "roles"],
        object: newAccount,
      }),
    };
  };

  login = async (payload) => {
    const { email, password } = payload;
    if (!email || !password)
      throw new BadRequestError("Missing email or password ::: ACCNTSRVCS");

    const holderAccount = await accountModel.findOne({ email: email });
    if (!holderAccount) throw new BadRequestError("Account is not registed!");

    const match = await bcrypt.compare(
      password.toString(),
      holderAccount.password
    );
    if (!match) throw new BadRequestError("Username or password is wrong");

    const tokens = await createTokenPair({
      UserId: holderAccount._id,
      email: holderAccount.email,
    });

    if (!tokens) throw new BadRequestError("Can not login 1");

    const dataKey = {
      user: holderAccount,
      refreshToken: tokens.refresh_token,
    };
    const keyStore = await key_token_service.createKeys(dataKey);
    if (!keyStore) throw new BadRequestError("Cant not create key_store");

    return {
      user: getInfoData({
        fields: ["_id", "email", "phone", "thumbnail", "status", "roles"],
        object: holderAccount,
      }),
      accessToken: tokens.access_token,
      atokenExp: tokens.atokenExp,
      refreshToken: tokens.refresh_token,
      rtokenExp: tokens.rtokenExp,
    };
  };

  logout = async (user) => {
    const userId = user.UserId;
    if (!userId) throw new BadRequestError("Missing user_id or email");
    const holder_key_token = await key_token_service.removeKeyTokenByUserId(
      userId
    );
    if (holder_key_token.deletedCount !== 1)
      throw new BadRequestError("log_out failed");
    return 1;
  };

  handleRefreshToken = async (user, refreshToken) => {
    const user_id = user.UserId;
    const email = user.email;
    if (!user_id || !email)
      throw new BadRequestError("missing_user_id_or_email");
    const key_store = await key_token_service.findKeyByRefreshToken(
      refreshToken
    );

    if (!key_store) throw new BadRequestError("cant_find_key_store");

    if (key_store.refreshTokenUsed.includes(refreshToken)) {
      await key_token_service.removeKeyTokenByUserId(user_id);
      throw new BadRequestError("refresh_token_in_refresh_token_used");
    }

    const holder_user = await accountModel.findOne({ email: email });
    if (!holder_user) throw new BadRequestError("can_not_find_holder_user");

    const tokens = await createTokenPair({
      UserId: holder_user._id,
      email,
    });

    if (!tokens) throw new BadRequestError("can_not_create_tokens");

    const holder_tokens = await key_token_service.findKeyByUserId(
      holder_user._id
    );
    if (!holder_tokens) throw new BadRequestError("can_not_find_holder_tokens");

    const update = await holder_tokens.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    if (!update) throw new BadRequestError("can_not_upadte_holder_tokens");
    return {
      user: getInfoData({
        fields: ["_id", "email"],
        object: holder_user,
      }),
      accessToken: tokens.access_token,
      atokenExp: tokens.atokenExp,
      refreshToken: tokens.refresh_token,
      rtokenExp: tokens.rtokenExp,
    };
  };
}

module.exports = new AccountServices();
