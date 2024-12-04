const express = require("express");
const router = express.Router();

router.use("/", require("./account.route"));

module.exports = router;
