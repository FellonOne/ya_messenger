const express = require('express');
const PORT = 4000;

function init() {
  const app = express();

  app.use(express.static(`./`));

  return app;
}

init().listen(PORT, () => console.log(`Server started on port: ${PORT}`));