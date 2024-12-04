const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Account";
const COLLECTION_NAME = "Accounts";

const AccountSchema = new Schema(
  {
    fullName: {
      type: String,
      defualt: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      default: true,
    },
    roles: {
      type: String,
      default: "C",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, AccountSchema);
