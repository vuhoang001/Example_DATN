const { BadRequestError, NotFoundError } = require("../core/error.response");
const movieModel = require("../models/movie.model");

class MovieService {
  Create = async (payload) => {
    if (!Array.isArray(payload.movie_director)) {
      payload.movie_director = [];
    }
    if (!Array.isArray(payload.movie_cast)) {
      payload.movie_cast = [];
    }
    if (!Array.isArray(payload.movie_category)) {
      payload.movie_category = [];
    }

    const holderData = await movieModel.create(payload);
    if (!holderData) throw new BadRequestError("can not create holderData");
    return payload;
  };

  GetAll = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const holderData = await movieModel.find().skip(skip).limit(limit);
    if (!holderData) throw new NotFoundError("Can find any holderData");

    const totalDocuments = await movieModel.countDocuments();

    const totalPages = Math.ceil(totalDocuments / limit);
    return {
      data: holderData,
      totalPages: totalPages,
      currentPages: parseInt(page),
      totalDocuments: totalDocuments,
    };
  };

  GetById = async (idMovie) => {
    if (!idMovie) throw new BadRequestError("Id not found");
    const holderData = await movieModel.findOne({ _id: idMovie });
    if (!holderData) throw new NotFoundError("Can find any holderData");
    return holderData;
  };

  Edit = async (idMovie, payload) => {
    if (!idMovie) throw new NotFoundError("idNotfound");
    if (!Array.isArray(payload.movie_director)) {
      payload.movie_director = [];
    }
    if (!Array.isArray(payload.movie_cast)) {
      payload.movie_cast = [];
    }
    if (!Array.isArray(payload.movie_category)) {
      payload.movie_category = [];
    }
    const holderData = await movieModel.findOne({ _id: idMovie });
    if (!holderData) throw new NotFoundError("not found any holderData");

    Object.assign(holderData, payload);

    await holderData.save();

    return 1;
  };

  Delete = async (idMovie) => {
    if (!idMovie) throw new NotFoundError("can not find idmovie");

    const holderMovie = await movieModel.deleteOne({ _id: idMovie });
    if (holderMovie.deletedCount == 0)
      throw new BadRequestError("not found any movie to deltee");

    return 1;
  };
}

module.exports = new MovieService();
