const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const Template = require("./template");

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});
app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.use("/", userRouter);
app.use("/", authRouter);

module.exports = app;
