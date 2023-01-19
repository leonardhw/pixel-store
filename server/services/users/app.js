// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const { mongoConnect } = require("./configs/mongo");
const router = require("./router/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoConnect().then(() => {
  app.get("/", (req, res) => res.status(200).json({ msg: "Users API" }));
  app.use(router);
  app.listen(port, () => {
    console.log(`Mongodb - Users listening on port ${port}`);
  });
});
