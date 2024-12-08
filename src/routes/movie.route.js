const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const { uploadDisk } = require("../config/multer.config");

const { authentication } = require("../helpers/auth");
const movieController = require("../controller/movie.controller");

router.get("/", AsyncHandle(movieController.GetAll));
router.get("/:idMovie", AsyncHandle(movieController.GetById));

// router.use(authentication);

router.post(
  "/",
  uploadDisk.fields([
    { name: "movie_poster", maxCount: 3 },
    {
      name: "movie_video",
      maxCount: 1,
    },
  ]),
  AsyncHandle(movieController.Create)
);
router.patch(
  "/:idMovie",
  uploadDisk.fields([
    { name: "movie_poster", maxCount: 3 },
    {
      name: "movie_video",
      maxCount: 1,
    },
  ]),
  AsyncHandle(movieController.Update)
);
router.delete("/:idMove", AsyncHandle(movieController.Delete));

module.exports = router;
