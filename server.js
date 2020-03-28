const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const _materials = require("./routes/material");

const app = express();

const port = process.env.PORT || 4000;
app.use(logger("dev"));
app.use(bodyparser.json());
//To parse result in json format
app.use(bodyparser.urlencoded({ extended: false }));

//Here we will enable CORS, so that we can access api on cross domain.
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
 res.header(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
 );
 next();
});

/* const wrappingconnection = async () => {
 const connection = await db.getConnection();
 //console.log(connection);
 return connection;
}; */

//wrappingfunctions();

//endpoint that start with users
app.use("/api/materials", _materials);

app.listen(port, function(err, res) {
 console.log(` app running on port ${port}`);
});
