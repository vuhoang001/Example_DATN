const { BadRequestError } = require("../../core/error.response");
const account_model = require("../account.model");

const GetAccountById = async (id) => {
  if (!id) throw new BadRequestError("Can not get id");
  const holder_account = await account_model.findOne({ _id: id });
  if (!holder_account) throw new BadRequestError("Can not get holder_account");
  return holder_account;
};

module.exports = { GetAccountById };
