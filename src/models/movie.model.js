const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Movie";
const COLLECTION_NAME = "Movies";

const MovieSchema = new Schema(
  {
    movie_name: { type: String, required: true },
    movie_director: {
      type: [Schema.Types.ObjectId],
      ref: "Actor",
      default: [],
    },
    movie_cast: { type: [Schema.Types.ObjectId], ref: "Actor", default: [] },
    movie_desc: { type: String },
    movie_rating: { type: Number, default: 0 },
    movie_poster: { type: String },
    movie_trailer: { type: String },
    movie_video: { type: String },
    movie_type: {
      type: String,
      enum: ["M", "S"],
      required: true,
    },
    movie_category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    movie_espisodes: {
      type: [Schema.Types.ObjectId],
      ref: "Espisode",
      default: [],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, MovieSchema);
