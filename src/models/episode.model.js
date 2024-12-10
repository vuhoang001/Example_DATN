const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Espisode";
const COLLECTION_NAME = "Espisodes";

const espisodeSchema = new Schema(
  {
    episode_name: {
      type: String,
      default: "",
    },
    episode_thumbnail: {
      type: String,
      default: "",
    },
    episode_description: {
      type: String,
      default: "",
    },
    episode_time: {
      type: Number,
    },
    episode_link: {
      type: String,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, espisodeSchema);
