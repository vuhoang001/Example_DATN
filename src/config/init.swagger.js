const YAML = require("yamljs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

const accessPath = YAML.load(path.join(__dirname, "../docs/access.docs.yaml"));

const actorPath = YAML.load(path.join(__dirname, "../docs/actor.docs.yaml"));

const categoryPath = YAML.load(
  path.join(__dirname, "../docs/category.docs.yaml")
);

const moviePath = YAML.load(path.join(__dirname, "../docs/movie.docs.yaml"));

const espisodePath = YAML.load(
  path.join(__dirname, "../docs/episode.docs.yaml")
);
swaggerDocument.paths = {
  ...swaggerDocument.paths,
  ...accessPath.paths,
  ...actorPath.paths,
  ...categoryPath.paths,
  ...moviePath.paths,
  ...espisodePath.paths,
};

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
};

module.exports = { setupSwagger };
