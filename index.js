const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const route = require("./routes/routes");
app.use("/api/v1", route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE baby</h1>`);
});
