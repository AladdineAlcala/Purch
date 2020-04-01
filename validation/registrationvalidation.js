const db = require("../config/connect");
const validator = require("validator");
const chk = require("./checkempty");
const { getuserbyemail } = require("../api/user/user.services");

//const connection = async () => await db.getConnection();

module.exports = function validateuserregistration(data) {
 let error = {};

 if (validator.isEmpty(data.name, { ignore_whitespace: false })) {
  error.name = "Cannot accept empty string";
 } else {
  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
   error.name = "Name must be min of 3 characters";
  }
 }

 if (validator.isEmpty(data.email, { ignore_whitespace: false })) {
  error.email = "Cannot accept empty email address";
 } else {
  if (
   !validator.isEmail(data.email, {
    allow_display_name: false,
    require_display_name: false,
    allow_utf8_local_part: true,
    require_tld: true,
    allow_ip_domain: false,
    domain_specific_validation: false
   })
  ) {
   error.username = "Invalid email format";
  } else {
   //check email if exist in database
   etuserbyemail(body.email, (error, result) => {
    if (error) {
     error.email = "Email address already registered";
    }
    if (result) {
     error.email = "Email address already registered";
    }
   });
  }
 }

 if (validator.isEmpty(data.password, { ignore_whitespace: false })) {
  error.password = "Cannot accept empty string";
 }

 console.log(error);

 return {
  error,
  isvalid: chk.is_empty(error)
 };
};
