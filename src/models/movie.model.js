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
    movie_video: { type: String },
    movie_category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    movie_comment: {
      user_comment: {
        type: Schema.Types.ObjectId,
        ref: "Actor",
      },
      comment: { type: String },
    },
    movie_duration: {
      type: Number,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, MovieSchema);
