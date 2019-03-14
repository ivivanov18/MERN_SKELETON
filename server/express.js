const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const CURRENT_WORKING_DIR = process.cwd();

const Template = require("./template");

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const compile = require("./devBundle");

// import React from "react";
// import ReactDOMServer from "react-dom/server";
// import StaticRouter from "react-router-dom/StaticRouter";
// import MainRouter from "./../client/MainRouter";
// import { SheetsRegistry } from "react-jss/lib/jss";
// import JssProvider from "react-jss/lib/JssProvider";
// import {
//   MuiThemeProvider,
//   createMuiTheme,
//   createGenerateClassName
// } from "@material-ui/core/styles";
// import { indigo, pink } from "@material-ui/core/colors";

const app = express();

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // if (context.url) {
  //   return res.redirect(303, context.url);
  // }
  // const css = sheetsRegistry.toString();
  res.status(200).send(Template());
});

app.use("/", userRouter);
app.use("/", authRouter);

// app.get("*", (req, res) => {
//   const sheetsRegistry = new SheetsRegistry();
//   const theme = createMuiTheme({
//     palette: {
//       primary: {
//         light: "#757de8",
//         main: "#3f51b5",
//         dark: "#002984",
//         contrastText: "#fff"
//       },
//       secondary: {
//         light: "#ff79b0",
//         main: "#ff4081",
//         dark: "#c60055",
//         contrastText: "#000"
//       },
//       openTitle: indigo["400"],
//       protectedTitle: pink["400"],
//       type: "light"
//     }
//   });
//   const generateClassName = createGenerateClassName();
//   const context = {};
//   const markup = ReactDOMServer.renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <JssProvider
//         registry={sheetsRegistry}
//         generateClassName={generateClassName}
//       >
//         <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
//           <MainRouter />
//         </MuiThemeProvider>
//       </JssProvider>
//     </StaticRouter>
//   );
//   if (context.url) {
//     return res.redirect(303, context.url);
//   }
//   const css = sheetsRegistry.toString();
//   res.status(200).send(
//     Template({
//       markup: markup,
//       css: css
//     })
//   );
// });

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

compile(app);

module.exports = app;
