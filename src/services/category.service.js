const { BadRequestError } = require("../core/error.response");
const categoryModel = require("../models/category.model");

class CategoryService {
  Create = async (payload) => {
    const holderData = await categoryModel.create(payload);
    if (!holderData) throw new BadRequestError("cant create category");
    return holderData;
  };

  GetAll = async () => {
    const holderData = await categoryModel.find();
    if (!holderData) throw new BadRequestError("cant find all category");
    return holderData;
  };

  GetById = async (idCategory) => {
    if (!idCategory) throw new BadRequestError("cant find idCategory");
    const holderData = await categoryModel.findOne({ _id: idCategory });
    return holderData;
  };

  Update = async (idCategory, payload) => {
    if (!idCategory || !payload)
      throw new BadRequestError("cant find idCategory or payload");

    const holderCategory = await categoryModel.findOne({ _id: idCategory });
    if (!holderCategory) throw new BadRequestError("cant find holderCategory");
    Object.assign(holderCategory, payload);
    await holderCategory.save();
    return 1;
  };

  Delete = async (idCategory) => {
    if (!idCategory) throw new BadRequestError("cant find idCategory");
    const dltData = await categoryModel.deleteOne({ _id: idCategory });
    if (dltData.deletedCount == 0)
      throw new BadRequestError("Cant not delete category");
    return 1;
  };
}

module.exports = new CategoryService();
