const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const server = express();

// global middlewares
server.use(express.json()); // parse requests with JSON
server.use(cors()); // restricts server from being accessed by other sites or domains
server.use(helmet()); // protects the app by setting HTTP headers

// enables routes for actions and projects
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

// catch all endpoint that indicates that server/api is up
server.use("*", (req, res) => {
  res.send(`<h1>API is up!</h1>`);
});

module.exports = server;
