const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const Template = require("./template");

const app = express();

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send(Template());
});
module.exports = app;
