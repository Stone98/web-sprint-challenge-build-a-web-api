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

module.exports = server;
