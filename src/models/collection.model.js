const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Collection";
const COLLECTION_NAME = "Collections";

const CollectionSchema = new Schema(
  {
    collection_name: {
      type: String,
      default: "",
    },
    collection_description: {
      type: String,
      default: "",
    },
    collection_espisodes: {
      type: [Schema.Types.ObjectId],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, CollectionSchema);
