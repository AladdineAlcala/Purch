const {
 create,
 getmaterials,
 getmaterialbyid,
 removematerial
} = require("./material.services");

const passport = require("passport");
let mat_router = require("express").Router();

// a middleware function with no mount path. This code is executed for every request to the router
mat_router.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

//@route  -> api/materials
//@desc -> get all material
//@access -> private
mat_router
 .route("/")
 .get(passport.authenticate("jwt", { session: false }), (req, res) => {
  getmaterials(function(error, results) {
   if (error) {
    console.log(error);
    return res.status(500).json({
     success: 0,
     message: error
    });
   }
   //console.log("from router ");
   return res.status(200).json({
    success: 1,
    data: results
   });
  });
 });

//@route  -> api/materials/id
//@desc -> get materials by id
//@access -> private
mat_router.route("/:id").get((req, res) => {
 const id = req.params.id;
 getmaterialbyid(id, function(error, results) {
  if (error) {
   console.log(error);
   return res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log("from router ");
  return res.status(200).json({
   success: 1,
   data: results
  });
 });
});

//@route  -> api/materials
//@desc -> add new material
//@access -> private
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

//@route  -> api/materials/id
//@desc -> delete material
//@access -> private
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
