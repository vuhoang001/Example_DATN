const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { setupSwagger } = require("./config/init.swagger");

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

// Import database
require("./database/init.mongodb");

// Import router
app.use("/", require("./routes/index.route"));

// Defined static files
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

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
