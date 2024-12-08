const { SuccessResponse } = require("../core/success.response");
const movieService = require("../services/movie.service");
const { url_image } = require("../utils");

class MovieController {
  Create = async (req, res, next) => {
    const payload = req.body;
    if (req.files.movie_poster && req.files.movie_poster.length > 0) {
      payload.movie_poster = url_image(
        req.files.movie_poster[0].filename.toString()
      );
    }

    if (req.files.movie_video && req.files.movie_video.length > 0) {
      payload.movie_video = url_image(
        req.files.movie_video[0].filename.toString()
      );
    }

    new SuccessResponse({
      message: "create movie success",
      metadata: await movieService.Create(payload),
    }).send(res);
  };

  GetAll = async (req, res, next) => {
    const limit = req.query.limit;
    const page = req.query.page;
    new SuccessResponse({
      message: "Get all success",
      metadata: await movieService.GetAll(page, limit),
    }).send(res);
  };

  GetById = async (req, res, next) => {
    const idMovie = req.params.idMovie;
    new SuccessResponse({
      message: "Get movie by id",
      metadata: await movieService.GetById(idMovie),
    }).send(res);
  };

  Update = async (req, res, next) => {
    const payload = req.body;
    const idMovie = req.params.idMovie;
    new SuccessResponse({
      message: "Update movie by id",
      metadata: await movieService.Edit(idMovie, payload),
    }).send(res);
  };

  Delete = async (req, res, next) => {
    const idMovie = req.params.idMovie;
    new SuccessResponse({
      message: "Delete movie by id",
      metadata: await movieService.Delete(idMovie),
    }).send(res);
  };
}

module.exports = new MovieController();
