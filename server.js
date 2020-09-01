const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const projectsRouter = require("./routers/projects-router");

const server = express();

server.use(cors());

server.use(express.json());

server.use(helmet());

server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);

module.exports = server;
