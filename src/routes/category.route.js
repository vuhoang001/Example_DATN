const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const { uploadDisk } = require("../config/multer.config");

const { authentication } = require("../helpers/auth");
const categoryController = require("../controller/category.controller");

router.get("/", AsyncHandle(categoryController.GetAll));
router.get("/:idCategory", AsyncHandle(categoryController.GetById));
// router.use(authentication);

router.post("/", AsyncHandle(categoryController.Create));
router.patch("/:idCategory", AsyncHandle(categoryController.Update));
router.delete("/:idCategory", AsyncHandle(categoryController.Delete));
module.exports = router;
