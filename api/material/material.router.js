const {
 create,
 getmaterials,
 getmaterialbyid,
 removematerial
} = require("./material.services");

let mat_router = require("express").Router();

// a middleware function with no mount path. This code is executed for every request to the router
mat_router.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

//api/materials
//get all material

mat_router.route("/").get((req, res) => {
 getmaterials(function(error, results) {
  if (error) {
   console.log(error);
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log("from router ");
  res.status(200).json({
   success: 1,
   data: results
  });
 });
});

//api/material/id
//get all material

mat_router.route("/:id").get((req, res) => {
 const id = req.params.id;
 getmaterialbyid(id, function(error, results) {
  if (error) {
   console.log(error);
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log("from router ");
  res.status(200).json({
   success: 1,
   data: results
  });
 });
});

//api/materials
//post new material
mat_router.route("/").post((req, res) => {
 const body = req.body;

 create(body, function(error, results) {
  if (error) {
   console.log(error);
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log("from router ");
  res.status(200).json({
   success: 1,
   data: results
  });
 });
});

//api/material/id
//remove material
mat_router.route("/:id").delete((req, res) => {
 const id = req.params.id;
 removematerial(id, function(error, results) {
  if (error) {
   console.log(error);
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log("from router ");
  res.status(200).json({
   success: 1,
   data: results
  });
 });
});

module.exports = mat_router;
