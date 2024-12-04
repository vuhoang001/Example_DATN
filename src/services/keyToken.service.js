const keyTokenModel = require("../models/keysToken.model");
const { BadRequestError } = require("../core/error.response");

class KeyTokenService {
  createKeys = async (payload) => {
    const { user, refreshToken } = payload;
    if (!user || !refreshToken)
      throw new BadRequestError("Misisng user or refreshtoken");

    const keys = await keyTokenModel.findOneAndUpdate(
      {
        user: user._id,
      },
      {
        refreshToken: refreshToken,
      },
      { new: true, upsert: true }
    );

    if (!keys) throw new BadRequestError("Can not create keys");
    return keys;
  };

  findKeyByUserId = async (id) => {
    if (!id) throw new BadRequestError("Id is missing");
    const holderKey = await keyTokenModel.findOne({ user: id });
    if (!holderKey) throw new BadRequestError("Can nto find holderkey");
    return holderKey;
  };

  findKeyByRefreshToken = async (refreshToken) => {
    if (!refreshToken) throw new BadRequestError("Cant find refreshToken");
    const holder_refresh_token = await keyTokenModel.findOne({
      refreshToken: refreshToken,
    });
    if (!holder_refresh_token)
      throw new BadRequestError("Can not find holder_refresh_token");
    return holder_refresh_token;
  };

  removeKeyTokenByUserId = async (id) => {
    if (!id) throw new BadRequestError("Can not find id");
    return await keyTokenModel.deleteOne({
      user: id,
    });
  };
}

module.exports = new KeyTokenService();
