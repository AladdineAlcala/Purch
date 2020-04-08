const validator = require("validator");
const chk = require("./checkempty");

module.exports = function validatelogin(data) {
 let error = {};
 if (validator.isEmpty(data.email, { ignore_whitespace: false })) {
  error.username = "Name must be more than 3 characters";
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
  }
 }

 if (validator.isEmpty(data.password, { ignore_whitespace: false })) {
  error.password = "Password is required";
 }
 /*  console.log(error);
 console.log(chk.is_empty(error)); */
 return {
  error,
  isvalid: chk.is_empty(error)
 };
};
