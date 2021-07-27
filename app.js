const fs = require("fs");
const marked = require("marked");
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const { configureDb } = require("./db/configureDb");
const { v1 } = require("./v1");
const { v2 } = require("./v2");

const app = express();

app.db = configureDb();

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/v1", v1);
app.use("/v2", v2);

app.get("/", function (_, res) {
  var path = __dirname + "/README.md";
  var file = fs.readFileSync(path, "utf8");
  res.send(marked(file.toString()));
});

module.exports = app;
