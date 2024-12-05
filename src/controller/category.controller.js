const { SuccessResponse } = require("../core/success.response");

const categoryService = require("../services/category.service");

class CategoryController {
  Create = async (req, res, next) => {
    const payload = req.body;
    new SuccessResponse({
      message: "Create success",
      metadata: await categoryService.Create(payload),
    }).send(res);
  };

  GetAll = async (req, res, next) => {
    new SuccessResponse({
      message: "Get_all_success",
      metadata: await categoryService.GetAll(),
    }).send(res);
  };

  GetById = async (req, res, next) => {
    const idCategory = req.params.idCategory;
    new SuccessResponse({
      message: "get_by_id_success",
      metadata: await categoryService.GetById(idCategory),
    }).send(res);
  };

  Update = async (req, res, next) => {
    const idCategory = req.params.idCategory;
    const payload = req.body;
    new SuccessResponse({
      message: "update_success",
      metadata: await categoryService.Update(idCategory, payload),
    }).send(res);
  };

  Delete = async (req, res, next) => {
    const idCategory = req.params.idCategory;
    new SuccessResponse({
      message: "delete_success",
      metadata: await categoryService.Delete(idCategory),
    }).send(res);
  };
}

module.exports = new CategoryController();
