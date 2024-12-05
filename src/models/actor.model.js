const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Actor";
const COLLECTION_NAME = "Actors";

const ActorSchema = new Schema(
  {
    actor_name: { type: String, required: true },
    actor_birth: { type: Date },
    actor_thumbnail: { type: String },
    actor_desc: { type: String },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, ActorSchema);
