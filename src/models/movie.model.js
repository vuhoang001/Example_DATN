const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Movie";
const COLLECTION_NAME = "Movies";

const MovieSchema = new Schema(
  {
    movie_name: { type: String },
    movie_director: { type: Schema.Types.ObjectId, ref: "Actor" },
    movie_cast: { type: [Schema.Types.ObjectId], ref: "Actor" },
    movie_desc: { type: String },
    movie_rating: { type: Number },
    movie_poster: { type: String },
    movie_video: { type: String },
    movie_category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
    movie_comment: {
      user_comment: {
        type: Schema.Types.ObjectId,
        ref: "Actor",
      },
      comment: { type: String },
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = model(DOCUMENT_NAME, MovieSchema);
