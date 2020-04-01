const validator = require("validator");
const chk = require("./checkempty");

module.exports = function validateuserregistration(data) {
 let error = {};

 if (validator.isEmpty(data.name, { ignore_whitespace: false })) {
  error.name = "Cannot accept empty string";
 }

 if (validator.isEmpty(data.email, { ignore_whitespace: false })) {
  error.email = "Cannot accept empty string";
 } else if (
  !validator.isEmail(data.email, {
   allow_display_name: false,
   require_display_name: false,
   allow_utf8_local_part: true,
   require_tld: true,
   allow_ip_domain: false,
   domain_specific_validation: false
  })
 ) {
  error.email - "Invalid email format";
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
