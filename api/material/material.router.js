//const db = require("../../config/connect");
const { create } = require("./material.services");

let router = require("express").Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

//api/materials
//add new material
router.route("/").post((req, res) => {
 const body = req.body;
 //console.log("post material");

 create(body, function(error, result) {
  if (err) {
   console.log(err);
   res.status(500).json({
    success: 0,
    message: "Error on parsing data"
   });

   console.log(result);
   /* res.status(200).json({
    success: 1,
    data: results
   }); */
  }
 });
});

module.exports = router;
