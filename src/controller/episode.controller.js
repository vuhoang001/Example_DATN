const { SuccessResponse } = require("../core/success.response");
const { url_image } = require("../utils");
const episodeService = require("../services/episode.service");

class EspisodeController {
  Create = async (req, res, next) => {
    let payload = req.body;
    payload = JSON.parse(payload.items);
    if (req.files.link && req.files.link.length > 0) {
      payload.espisode_link = url_image(req.files.link[0].filename.toString());
    }
    new SuccessResponse({
      message: "create espisode success",
      metadata: payload,
    }).send(res);
  };

  GetAll = async (req, res, next) => {
    new SuccessResponse({
      message: "get all",
      metadata: await episodeService.GetAll(),
    }).send(res);
  };

  GetById = async (req, res, next) => {
    const idEspisode = req.params.idEpisode;
    new SuccessResponse({
      message: "get espisode by id",
      metadata: await episodeService.GetById(idEspisode),
    }).send(res);
  };

  Update = async (req, res, next) => {
    const idEspisode = req.params.idEpisode;
    let payload = req.body;
    payload = JSON.parse(payload.items);
    if (req.files.link && req.files.link.length > 0) {
      payload.espisode_link = url_image(req.files.link[0].filename.toString());
    }
    new SuccessResponse({
      message: "update success",
      metadata: await episodeService.Update(idEspisode, payload),
    }).send(res);
  };

  Delete = async (req, res, next) => {
    const idEspisode = req.params.idEpisode;

    new SuccessResponse({
      message: "delte success",
      metadata: await episodeService.Delete(idEspisode),
    }).send(res);
  };
}

module.exports = new EspisodeController();
