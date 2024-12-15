const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("<h1>Welcome to the app</h1>");
});

app.listen(process.env.PORT);
