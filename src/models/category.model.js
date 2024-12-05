const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Categories";

const CategorySchema = new Schema(
  {
    name_category: { type: String, required: true },
    desc_category: { type: String },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, CategorySchema);
