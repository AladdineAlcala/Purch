const validator = require("validator");
const chk = require("./checkempty");
let error = {};

module.exports = function validateuserregistration(data) {
 data.name = !chk.is_empty(data.name) ? data.name : "";
 data.email = !chk.is_empty(data.email) ? data.email : "";
 data.password = !chk.is_empty(data.password) ? data.password : "";

 if (validator.isEmpty(data.name, { ignore_whitespace: false })) {
  error.name = "Cannot accept empty name";
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
   error.email = "Invalid email format";
  }
 }

 if (validator.isEmpty(data.password, { ignore_whitespace: false })) {
  error.password = "Cannot accept empty password";
 }

 console.log(error);

 return {
  error,
  isvalid: chk.is_empty(error)
 };
};
