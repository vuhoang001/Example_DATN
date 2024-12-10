const { BadRequestError } = require("../core/error.response");
const espisodeModel = require("../models/episode.model");

class EpisodeService {
  Cerate = async (payload) => {
    const data_created = await espisodeModel.create(payload);
    if (!data_created) throw new BadRequestError("can not create espisode");
    return data_created;
  };

  GetAll = async () => {
    const holder_data = await espisodeModel.find();
    if (holder_data.length == 0)
      throw new BadRequestError("can not get any espisode");
    return holder_data;
  };

  GetById = async (idEpisode) => {
    if (!idEpisode) throw new BadRequestError("missing idEspisode");
    const holder_data = await espisodeModel.findOne({ _id: idEpisode });
    return holder_data;
  };

  Update = async (idEpisode, payload) => {
    if (!idEpisode) throw new BadRequestError("missing idEpisode");
    const holder_data = await espisodeModel.findOne({ _id: idEpisode });
    if (!holder_data) throw new BadRequestError("Can find any holder_data");

    Object.assign(holder_data, payload);
    return 1;
  };

  Delete = async (idEpisode) => {
    if (!idEpisode) throw new BadRequestError("missing idEspisode");
    const holder_data = await espisodeModel.deleteOne({ _id: idEpisode });
    if (holder_data.deletedCount == 0) {
      throw new BadRequestError("can delete record");
    }
    return 1;
  };
}

module.exports = new EpisodeService();
