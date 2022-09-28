const express = require("express");
const cors = require("cors");
const router = require("./routers");
const handleErrors = require("./middlewares/handleErrors");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("public"));

//ROUTER
app.use("/api", router);

app.use(handleErrors);

module.exports = app;
