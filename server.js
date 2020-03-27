const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const gemsRouter = require("./gems/gems-router");
const usersRouter = require("./users/users-router");
const photoRouter = require("./photo/photo-router");
const completedRouter = require("./completed/completed-router");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/gems", gemsRouter);
server.use("/api/users", usersRouter);
server.use("/api/photo", photoRouter);
server.use("/api/completed", completedRouter);

server.get("/", (req, res) => {
  res.send("Server Running")
    
});

module.exports = server;
