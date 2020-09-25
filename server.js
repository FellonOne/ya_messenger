const express = require("express");
const PORT = 80;

function init() {
  const app = express();

  app.use(express.static("./dist"));

  app.get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

  return app;
}

init().listen(PORT, () => console.log(`Server started on port: ${PORT}`));
