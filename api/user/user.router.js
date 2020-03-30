const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createuser, getuserbyemail } = require("../user/user.services");
let userrouter = require("express").Router();
const saltRounds = 10;
const keys = process.env.SECRET;

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
  return res.status(200).json({
   success: 1,
   data: results
  });
 });
});

userrouter.route("/login").post((req, res) => {
 const body = req.body;
 getuserbyemail(body, (error, result) => {
  if (error) {
   res.status(500).json({
    success: 0,
    message: error
   });
  }
  if (!result) {
   return res.status(400).json({ password: "email or password is incorrect" });
  }
  //console.log(result.password);
  bcrypt.compare(body.password, result.password).then(isMatch => {
   if (isMatch) {
    // create jwt payload
    const payload = { id: result.id, name: result.name };
    //signin token
    jwt.sign(payload, keys, { expiresIn: 60 * 60 }, (err, token) => {
     return res.json({
      success: 1,
      token: "Bearer " + token
     });
    });
   } else {
    res.status(400).json({
     success: 0,
     message: "incorrect password"
    });
   }
  });
 });
});

module.exports = userrouter;
