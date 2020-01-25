const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require("./routers/projects-router");
const actionsRouter = require("./routers/actions-router");

const server = express();

server.use(express.json());

server.use(helmet());

server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
