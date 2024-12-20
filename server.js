const app = require("./src/app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("Web is running");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server express");
  });
});
