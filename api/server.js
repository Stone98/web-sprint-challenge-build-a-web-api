const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("*", (req, res) => {
  res.send(`<h1>API is up!</h1>`);
});

module.exports = server;
