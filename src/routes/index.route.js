const express = require("express");
const router = express.Router();

router.use("/actor", require("./actor.route"));
router.use("/category", require("./category.route"));
router.use("/movie", require("./movie.route"));
router.use("/episode", require("./episode.route"));
router.use("/", require("./account.route"));

module.exports = router;
