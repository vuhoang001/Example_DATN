const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");

const { authentication } = require("../helpers/auth");
const accountController = require("../controller/account.controller");

router.post("/login", AsyncHandle(accountController.Login));
router.post("/register", AsyncHandle(accountController.Register));

router.use(authentication);
router.post("/logout", AsyncHandle(accountController.Log_out));
router.post("/handle", AsyncHandle(accountController.HandleRefreshToken));
module.exports = router;
