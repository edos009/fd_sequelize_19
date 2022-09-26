const express = require("express");
const router = require("./routers");
const handleErrors = require("./middlewares/handleErrors");
const app = express();

app.use(express.json());
app.use(express.static("public"));

//ROUTER
app.use("/api", router);

app.use(handleErrors);

module.exports = app;
