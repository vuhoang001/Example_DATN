const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const { uploadDisk } = require("../config/multer.config");

const { authentication } = require("../helpers/auth");
const episodeController = require("../controller/episode.controller");

router.get("/", AsyncHandle(episodeController.GetAll));
router.get("/:idEpisode", AsyncHandle(episodeController.GetById));

router.use(authentication);

router.post(
  "/",
  uploadDisk.fields([{ name: "link", maxCount: 1 }]),
  AsyncHandle(episodeController.Create)
);
router.patch(
  "/:idEpisode",
  uploadDisk.fields([{ name: "link", maxCount: 1 }]),
  AsyncHandle(episodeController.Update)
);
router.delete("/:idEpisode", AsyncHandle(episodeController.Delete));

module.exports = router;
