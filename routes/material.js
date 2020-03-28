"use strict";

const express = require("express");
const mysql = require("mysql2");

const db = require("../connect");

const app = express();

let router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

async function getconnection() {
 const connection = await db.getConnection();
 console.log("Connected to database");
 return connection;
}

router.route("/").get((req, res) => {
 const connection = getconnection();
 connection
  .then(db =>
   db.execute("select * from material", function(err, result) {
    if (err) {
     return res.status(400).json(err);
    }

    db.release();
    res.json(result);
    //console.log(result);
   })
  )
  .catch(err => res.status(400).json(err));
});

/* app.get("/", (req, res) => {
 const connection = getconnection();
 connection
  .then(db =>
   db.execute("select * from material", function(err, result) {
    if (err) {
     return res.status(400).json(err);
    }

    db.release();
    res.json(result);
    //console.log(result);
   })
  )
  .catch(err => res.status(400).json(err));
});
 */

module.exports = router;
