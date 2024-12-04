const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database
require("./database/init.mongodb");

// Import router
app.use("/", require("./routes/index.route"));

app.use((req, res, next) => {
  const err = new Error("nt fnd");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 501;
  return res.status(status).json({
    status: status,
    code: status,
    stack: err.stack,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
