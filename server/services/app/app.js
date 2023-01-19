if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.status(200).json({ msg: "App API" }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app sslistening on port ${port}`);
});

module.exports = app;
