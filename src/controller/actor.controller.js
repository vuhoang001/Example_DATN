const { SuccessResponse } = require("../core/success.response");
const actorService = require("../services/actor.service");
const { url_image } = require("../utils/index");

class ActorController {
  Create = async (req, res, next) => {
    let payload = req.body;
    if (req.files.actor_thumbnail.length > 0) {
      payload.actor_thumbnail = url_image(
        req.files.actor_thumbnail[0].filename.toString()
      );
    }
    new SuccessResponse({
      message: "create_success",
      metadata: await actorService.Create(payload),
    }).send(res);
  };

  GetAll = async (req, res, next) => {
    new SuccessResponse({
      message: "get_all",
      metadata: await actorService.GetAll(),
    }).send(res);
  };

  GetById = async (req, res, next) => {
    const idActor = req.params.idActor;
    new SuccessResponse({
      message: "get_by_id",
      metadata: await actorService.GetById(idActor),
    }).send(res);
  };

  EditById = async (req, res, next) => {
    const idActor = req.params.idActor;
    let payload = req.body;
    if (req.files.actor_thumbnail.length > 0) {
      payload.actor_thumbnail = url_image(
        req.files.actor_thumbnail[0].filename.toString()
      );
    }
    new SuccessResponse({
      message: "edit_success",
      metadata: await actorService.EditById(idActor, payload),
    }).send(res);
  };

  DeleteById = async (req, res, next) => {
    const idActor = req.params.idActor;
    new SuccessResponse({
      message: "delete_success",
      metadata: await actorService.DeleteById(idActor),
    }).send(res);
  };
}

module.exports = new ActorController();
