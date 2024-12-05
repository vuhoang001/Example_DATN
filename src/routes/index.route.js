const express = require("express");
const router = express.Router();

router.use("/actor", require("./actor.route"));
router.use("/category", require("./category.route"));
router.use("/", require("./account.route"));

module.exports = router;
