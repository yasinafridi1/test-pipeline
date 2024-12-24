const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
