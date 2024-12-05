const { BadRequestError } = require("../core/error.response");
const actorModel = require("../models/actor.model");

class ActorService {
  Create = async (payload) => {
    const holderActor = await actorModel.create(payload);
    if (!holderActor) throw new BadRequestError("Can create actor");
    return holderActor;
  };

  GetAll = async () => {
    const holderAcctors = await actorModel.find();
    if (!holderAcctors) throw new BadRequestError("Can not get list actor");
    return holderAcctors;
  };

  GetById = async (idActor) => {
    if (!idActor) throw new BadRequestError("Missing idActor");
    const holderActor = await actorModel.findOne({ _id: idActor });
    if (!holderActor) throw new BadRequestError("get_by_id_1");
    return holderActor;
  };

  EditById = async (idActor, payload) => {
    if (!idActor) throw new BadRequestError("Missing idActor");
    const holderActor = await actorModel.findOne({ _id: idActor });
    if (!holderActor) throw new BadRequestError("edit_by_id_1");

    Object.assign(holderActor, payload);
    const result = await holderActor.save();
    if (!result) throw new BadRequestError("edit_by_id_2");
    return result;
  };

  DeleteById = async (idActor) => {
    if (!idActor) throw new BadRequestError("Missing idActor");
    const delteActor = await actorModel.deleteOne({ _id: idActor });
    if (delteActor.deletedCount !== 1)
      throw new BadRequestError("delte_by_id_1");
    return delteActor;
  };
}

module.exports = new ActorService();
