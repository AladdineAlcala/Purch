const { createuser, getUsers } = require("../user/user.services");
let userrouter = require("express").Router();

// a middleware function with no mount path. This code is executed for every request to the router
userrouter.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

userrouter.route("/").post((req, res) => {
 const body = req.body;
 createuser(body, function(error, results) {
  if (error) {
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  //console.log(result);
  res.status(200).json({
   success: 1,
   data: results
  });
 });
});

module.exports = userrouter;
