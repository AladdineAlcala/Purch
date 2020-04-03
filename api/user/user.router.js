const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createuser, getuserbyemail } = require("../user/user.services");
let userrouter = require("express").Router();
const saltRounds = 10;
const keys = process.env.SECRET;
const validatelogin = require("../../validation/loginvalidation");
const validateuserregistration = require("../../validation/registrationvalidation");

// a middleware function with no mount path. This code is executed for every request to the router
userrouter.use(function(req, res, next) {
 console.log("Users @Time:", Date.now());
 next();
});

//@route  -> api/users
//@desc -> add new user
//@access -> public
userrouter.route("/").post((req, res) => {
 const body = req.body;
 console.log(body);
 const { error, isvalid } = validateuserregistration(body); //distructoring

 console.log(isvalid);

 if (!isvalid) {
  res.status(500).json({
   success: 0,
   message: error
  });
 } else {
  let email = body.email;
  getuserbyemail(email, (err, result) => {
   console.log(result);
   if (result != null && Object.keys(result).length != 0) {
    error.email = "Email already registered";
    res.status(500).json({
     success: 0,
     message: error
    });
   } else {
    // user inputs validate true

    createuser(body, function(err, results) {
     if (err) {
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
    }); // end create
   }
  });
 }
});

//@route  -> api/users/login
//@desc -> login user
//@access -> public
userrouter.route("/login").post((req, res) => {
 const body = req.body;
 const { error, isvalid } = validatelogin(body);

 if (!isvalid) {
  res.status(500).json({
   success: 0,
   message: error
  });
 } else {
  getuserbyemail(body.email, (error, result) => {
   if (error) {
    res.status(500).json({
     success: 0,
     message: error_code
    });
   }
   if (!result) {
    return res.status(400).json({ password: "email or incorrect" });
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
  }); //end of func getuseremail
 }
});

module.exports = userrouter;
