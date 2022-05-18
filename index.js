const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const logger = require("./middleware/logger");
const auth =require("./middleware/authentication");
const app = express();
const courses = require("./route/courses");
const home  = require('./route/home');
app.use(express.json());
app.use(logger);
app.use(auth);
app.use(helmet());
app.use("./api/courses", courses, home);

console.log(`app: ${app.get("env")}`);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Using Morgan");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));