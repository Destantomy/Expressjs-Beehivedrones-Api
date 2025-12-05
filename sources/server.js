const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.listen(port, () => {
  console.log(`server up and running on http://localhost:${port}`);
});