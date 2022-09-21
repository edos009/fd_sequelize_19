const express = require("express");
const router = require("./router");
const handleErrors = require("./middlewares/handleErrors");
const app = express();

app.use(express.json());

//ROUTER
app.use("/api", router);

app.use(handleErrors);

module.exports = app;
