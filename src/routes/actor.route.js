const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const { uploadDisk } = require("../config/multer.config");

const { authentication } = require("../helpers/auth");
const actorController = require("../controller/actor.controller");

router.get("/", AsyncHandle(actorController.GetAll));
router.get("/:idActor", AsyncHandle(actorController.GetById));

// router.use(authentication);

router.post(
  "/",
  uploadDisk.fields([{ name: "actor_thumbnail", maxCount: 3 }]),
  AsyncHandle(actorController.Create)
);
router.patch(
  "/:idActor",
  uploadDisk.fields([{ name: "actor_thumbnail", maxCount: 3 }]),
  AsyncHandle(actorController.EditById)
);
router.delete("/:idActor", AsyncHandle(actorController.DeleteById));

module.exports = router;
