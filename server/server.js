const mongoose = require("mongoose");

const config = require("./../config/config");
const app = require("./express");

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, err => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
